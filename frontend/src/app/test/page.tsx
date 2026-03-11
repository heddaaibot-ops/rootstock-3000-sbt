'use client';

import { useEffect, useState } from 'react';
import { createPublicClient, http } from 'viem';
import { ROOTSTOCK_CHAINS, CONTRACT_ADDRESS as CONTRACT_ADDR } from '@/utils/contract';

const ROOTSTOCK_TESTNET = ROOTSTOCK_CHAINS.testnet;
const CONTRACT_ADDRESS = CONTRACT_ADDR.testnet;
const CONTRACT_ABI = [
  'function totalSupply() view returns (uint256)',
  'function MAX_SUPPLY() view returns (uint256)',
  'function paused() view returns (bool)',
] as const;

export default function TestPage() {
  const [logs, setLogs] = useState<string[]>([]);
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const addLog = (message: string) => {
    console.log(message);
    setLogs(prev => [...prev, `[${new Date().toISOString()}] ${message}`]);
  };

  useEffect(() => {
    const testContractRead = async () => {
      try {
        addLog('🚀 Starting contract read test...');
        addLog(`📍 Contract: ${CONTRACT_ADDRESS}`);
        addLog(`🌐 RPC: ${ROOTSTOCK_TESTNET.rpcUrls.default.http[0]}`);

        addLog('🔧 Creating public client...');
        const client = createPublicClient({
          chain: ROOTSTOCK_TESTNET as any,
          transport: http(ROOTSTOCK_TESTNET.rpcUrls.default.http[0]),
        });
        addLog('✅ Public client created');

        addLog('📞 Reading totalSupply...');
        const totalSupply = await client.readContract({
          address: CONTRACT_ADDRESS as `0x${string}`,
          abi: CONTRACT_ABI,
          functionName: 'totalSupply',
        }) as bigint;
        addLog(`✅ totalSupply: ${totalSupply.toString()}`);

        addLog('📞 Reading MAX_SUPPLY...');
        const maxSupply = await client.readContract({
          address: CONTRACT_ADDRESS as `0x${string}`,
          abi: CONTRACT_ABI,
          functionName: 'MAX_SUPPLY',
        }) as bigint;
        addLog(`✅ MAX_SUPPLY: ${maxSupply.toString()}`);

        addLog('📞 Reading paused...');
        const isPaused = await client.readContract({
          address: CONTRACT_ADDRESS as `0x${string}`,
          abi: CONTRACT_ABI,
          functionName: 'paused',
        }) as boolean;
        addLog(`✅ paused: ${isPaused}`);

        setData({
          totalSupply: totalSupply.toString(),
          maxSupply: maxSupply.toString(),
          isPaused: isPaused.toString(),
        });

        addLog('🎉 All contract reads successful!');
      } catch (err: any) {
        const errorMsg = err.message || String(err);
        addLog(`❌ ERROR: ${errorMsg}`);
        setError(errorMsg);
        console.error('Full error:', err);
      }
    };

    testContractRead();
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#000',
      color: '#fff',
      padding: '20px',
      fontFamily: 'monospace'
    }}>
      <h1 style={{ color: '#FF6B00' }}>🧪 Contract Read Test</h1>

      <div style={{
        marginTop: '20px',
        padding: '20px',
        backgroundColor: '#111',
        borderRadius: '8px',
        border: '1px solid #333'
      }}>
        <h2>📊 Results</h2>
        {data && (
          <div style={{ marginTop: '10px' }}>
            <p>✅ <strong>Total Supply:</strong> {data.totalSupply}</p>
            <p>✅ <strong>Max Supply:</strong> {data.maxSupply}</p>
            <p>✅ <strong>Paused:</strong> {data.isPaused}</p>
          </div>
        )}
        {error && (
          <div style={{ color: '#ff4444', marginTop: '10px' }}>
            <p>❌ <strong>Error:</strong></p>
            <pre style={{
              backgroundColor: '#200',
              padding: '10px',
              borderRadius: '4px',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word'
            }}>{error}</pre>
          </div>
        )}
      </div>

      <div style={{
        marginTop: '20px',
        padding: '20px',
        backgroundColor: '#111',
        borderRadius: '8px',
        border: '1px solid #333'
      }}>
        <h2>📝 Logs</h2>
        <div style={{
          maxHeight: '400px',
          overflowY: 'auto',
          fontSize: '12px',
          lineHeight: '1.6'
        }}>
          {logs.map((log, i) => (
            <div key={i} style={{
              padding: '4px 0',
              borderBottom: '1px solid #222'
            }}>
              {log}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
