import { NextRequest, NextResponse } from 'next/server';
import { createPublicClient, createWalletClient, http, parseAbi } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { rootstockTestnet } from 'viem/chains';

// Agent API for programmatic minting
// This endpoint allows AI agents to mint SBTs without Web3 wallet interaction

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`;
const RPC_URL = process.env.NEXT_PUBLIC_RPC_URL || 'https://public-node.testnet.rsk.co';

const contractABI = parseAbi([
  'function mint() external',
  'function hasMinted(address) view returns (bool)',
  'function totalSupply() view returns (uint256)',
  'function remainingSupply() view returns (uint256)',
  'function paused() view returns (bool)',
]);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { privateKey, walletAddress } = body;

    // Validate input
    if (!privateKey && !walletAddress) {
      return NextResponse.json(
        { error: 'Either privateKey or walletAddress is required' },
        { status: 400 }
      );
    }

    // Create public client for reading
    const publicClient = createPublicClient({
      chain: rootstockTestnet,
      transport: http(RPC_URL),
    });

    // Check contract status
    const [isPaused, totalSupply, remainingSupply] = await Promise.all([
      publicClient.readContract({
        address: CONTRACT_ADDRESS,
        abi: contractABI,
        functionName: 'paused',
      }),
      publicClient.readContract({
        address: CONTRACT_ADDRESS,
        abi: contractABI,
        functionName: 'totalSupply',
      }),
      publicClient.readContract({
        address: CONTRACT_ADDRESS,
        abi: contractABI,
        functionName: 'remainingSupply',
      }),
    ]);

    if (isPaused) {
      return NextResponse.json(
        {
          error: 'Minting is currently paused',
          status: 'paused',
          totalSupply: Number(totalSupply),
          remainingSupply: Number(remainingSupply),
        },
        { status: 403 }
      );
    }

    if (remainingSupply === 0n) {
      return NextResponse.json(
        {
          error: 'Max supply reached',
          status: 'sold_out',
          totalSupply: Number(totalSupply),
        },
        { status: 403 }
      );
    }

    // If only checking status (no privateKey provided)
    if (!privateKey) {
      const address = walletAddress as `0x${string}`;
      const hasMinted = await publicClient.readContract({
        address: CONTRACT_ADDRESS,
        abi: contractABI,
        functionName: 'hasMinted',
        args: [address],
      });

      return NextResponse.json({
        status: 'available',
        hasMinted,
        totalSupply: Number(totalSupply),
        remainingSupply: Number(remainingSupply),
        message: hasMinted
          ? 'Address has already minted'
          : 'Address can mint',
      });
    }

    // Mint with provided private key
    const account = privateKeyToAccount(privateKey as `0x${string}`);

    // Check if already minted
    const hasMinted = await publicClient.readContract({
      address: CONTRACT_ADDRESS,
      abi: contractABI,
      functionName: 'hasMinted',
      args: [account.address],
    });

    if (hasMinted) {
      return NextResponse.json(
        {
          error: 'Address has already minted',
          address: account.address,
        },
        { status: 400 }
      );
    }

    // Create wallet client for writing
    const walletClient = createWalletClient({
      account,
      chain: rootstockTestnet,
      transport: http(RPC_URL),
    });

    // Simulate transaction first
    const { request: simulateRequest } = await publicClient.simulateContract({
      address: CONTRACT_ADDRESS,
      abi: contractABI,
      functionName: 'mint',
      account: account.address,
    });

    // Execute mint
    const hash = await walletClient.writeContract(simulateRequest);

    // Wait for confirmation
    const receipt = await publicClient.waitForTransactionReceipt({ hash });

    return NextResponse.json({
      success: true,
      txHash: hash,
      address: account.address,
      blockNumber: Number(receipt.blockNumber),
      gasUsed: Number(receipt.gasUsed),
      message: 'SBT minted successfully!',
    });

  } catch (error: any) {
    console.error('Mint error:', error);

    return NextResponse.json(
      {
        error: error.message || 'Failed to mint',
        details: error.toString(),
      },
      { status: 500 }
    );
  }
}

// GET endpoint for checking status without minting
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const address = searchParams.get('address');

    const publicClient = createPublicClient({
      chain: rootstockTestnet,
      transport: http(RPC_URL),
    });

    const [isPaused, totalSupply, remainingSupply] = await Promise.all([
      publicClient.readContract({
        address: CONTRACT_ADDRESS,
        abi: contractABI,
        functionName: 'paused',
      }),
      publicClient.readContract({
        address: CONTRACT_ADDRESS,
        abi: contractABI,
        functionName: 'totalSupply',
      }),
      publicClient.readContract({
        address: CONTRACT_ADDRESS,
        abi: contractABI,
        functionName: 'remainingSupply',
      }),
    ]);

    const response: any = {
      status: isPaused ? 'paused' : 'active',
      totalSupply: Number(totalSupply),
      remainingSupply: Number(remainingSupply),
      maxSupply: 10000,
    };

    if (address) {
      const hasMinted = await publicClient.readContract({
        address: CONTRACT_ADDRESS,
        abi: contractABI,
        functionName: 'hasMinted',
        args: [address as `0x${string}`],
      });
      response.hasMinted = hasMinted;
      response.address = address;
    }

    return NextResponse.json(response);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to fetch status' },
      { status: 500 }
    );
  }
}
