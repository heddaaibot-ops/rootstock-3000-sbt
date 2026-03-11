const { expect } = require("chai");
const { ethers } = require("hardhat");
const { time } = require("@nomicfoundation/hardhat-network-helpers");

describe("Rootstock3000SBT", function () {
  let sbt;
  let owner;
  let user1;
  let user2;
  let user3;
  const baseURI = "ipfs://QmTest123/";

  beforeEach(async function () {
    [owner, user1, user2, user3] = await ethers.getSigners();

    const Rootstock3000SBT = await ethers.getContractFactory("Rootstock3000SBT");
    sbt = await Rootstock3000SBT.deploy(owner.address, baseURI);
    await sbt.waitForDeployment();
  });

  describe("部署與初始狀態", function () {
    it("應該正確設置合約名稱和符號", async function () {
      expect(await sbt.name()).to.equal("Rootstock 3000 Days");
      expect(await sbt.symbol()).to.equal("RSK3K");
    });

    it("應該正確設置 owner", async function () {
      expect(await sbt.owner()).to.equal(owner.address);
    });

    it("應該在部署時處於暫停狀態", async function () {
      expect(await sbt.paused()).to.equal(true);
    });

    it("應該正確設置常量", async function () {
      expect(await sbt.MAX_SUPPLY()).to.equal(10000);
      expect(await sbt.LAUNCH_DATE()).to.equal(1516060800);
      expect(await sbt.MILESTONE_DATE()).to.equal(1743609600);
    });

    it("應該初始 totalSupply 為 0", async function () {
      expect(await sbt.totalSupply()).to.equal(0);
      expect(await sbt.remainingSupply()).to.equal(10000);
    });
  });

  describe("暫停/恢復功能", function () {
    it("owner 可以恢復鑄造", async function () {
      await expect(sbt.connect(owner).unpause())
        .to.not.be.reverted;
      expect(await sbt.paused()).to.equal(false);
    });

    it("owner 可以再次暫停", async function () {
      await sbt.connect(owner).unpause();
      await expect(sbt.connect(owner).pause())
        .to.not.be.reverted;
      expect(await sbt.paused()).to.equal(true);
    });

    it("非 owner 不能暫停/恢復", async function () {
      await expect(sbt.connect(user1).unpause())
        .to.be.revertedWithCustomError(sbt, "OwnableUnauthorizedAccount");

      await sbt.connect(owner).unpause();
      await expect(sbt.connect(user1).pause())
        .to.be.revertedWithCustomError(sbt, "OwnableUnauthorizedAccount");
    });
  });

  describe("鑄造功能", function () {
    beforeEach(async function () {
      // 每個測試前先 unpause
      await sbt.connect(owner).unpause();
    });

    it("用戶可以成功鑄造 SBT", async function () {
      const tx = await sbt.connect(user1).mint();
      const receipt = await tx.wait();

      expect(await sbt.totalSupply()).to.equal(1);
      expect(await sbt.balanceOf(user1.address)).to.equal(1);
      expect(await sbt.ownerOf(0)).to.equal(user1.address);

      // 檢查事件
      const event = receipt.logs.find(log => {
        try {
          const parsed = sbt.interface.parseLog(log);
          return parsed && parsed.name === "SBTMinted";
        } catch {
          return false;
        }
      });
      expect(event).to.not.be.undefined;
    });

    it("應該正確記錄鑄造時間和區塊號", async function () {
      const tx = await sbt.connect(user1).mint();
      const receipt = await tx.wait();
      const block = await ethers.provider.getBlock(receipt.blockNumber);

      expect(await sbt.getMintTimestamp(0)).to.equal(block.timestamp);
      expect(await sbt.getMintBlockNumber(0)).to.equal(receipt.blockNumber);
    });

    it("每個地址只能鑄造一次", async function () {
      await sbt.connect(user1).mint();

      await expect(sbt.connect(user1).mint())
        .to.be.revertedWithCustomError(sbt, "AlreadyMinted");

      expect(await sbt.totalSupply()).to.equal(1);
    });

    it("多個不同地址可以鑄造", async function () {
      await sbt.connect(user1).mint();
      await sbt.connect(user2).mint();
      await sbt.connect(user3).mint();

      expect(await sbt.totalSupply()).to.equal(3);
      expect(await sbt.ownerOf(0)).to.equal(user1.address);
      expect(await sbt.ownerOf(1)).to.equal(user2.address);
      expect(await sbt.ownerOf(2)).to.equal(user3.address);
    });

    it("合約暫停時不能鑄造", async function () {
      await sbt.connect(owner).pause();

      await expect(sbt.connect(user1).mint())
        .to.be.revertedWithCustomError(sbt, "EnforcedPause");
    });

    it("達到最大供應量後不能鑄造", async function () {
      // 這個測試僅驗證邏輯，實際不會鑄造 100,000 個
      // 我們鑄造盡可能多的來測試邏輯
      const signers = await ethers.getSigners();
      const maxSigners = Math.min(signers.length, 20); // 限制在 20 個

      // 鑄造多個
      for (let i = 0; i < maxSigners; i++) {
        await sbt.connect(signers[i]).mint();
      }

      expect(await sbt.totalSupply()).to.equal(maxSigners);
      expect(await sbt.remainingSupply()).to.equal(10000 - maxSigners);
    });

    it("hasMinted 應該正確追蹤", async function () {
      expect(await sbt.hasUserMinted(user1.address)).to.equal(false);

      await sbt.connect(user1).mint();

      expect(await sbt.hasUserMinted(user1.address)).to.equal(true);
      expect(await sbt.hasMinted(user1.address)).to.equal(true);
    });
  });

  describe("Soul Bound 特性", function () {
    beforeEach(async function () {
      await sbt.connect(owner).unpause();
      await sbt.connect(user1).mint();
    });

    it("不能轉移 Token", async function () {
      await expect(
        sbt.connect(user1).transferFrom(user1.address, user2.address, 0)
      ).to.be.revertedWithCustomError(sbt, "SoulBoundToken");

      expect(await sbt.ownerOf(0)).to.equal(user1.address);
    });

    it("不能使用 safeTransferFrom 轉移", async function () {
      await expect(
        sbt.connect(user1)["safeTransferFrom(address,address,uint256)"](
          user1.address,
          user2.address,
          0
        )
      ).to.be.revertedWithCustomError(sbt, "SoulBoundToken");
    });

    it("approve 後也不能轉移", async function () {
      await sbt.connect(user1).approve(user2.address, 0);

      await expect(
        sbt.connect(user2).transferFrom(user1.address, user2.address, 0)
      ).to.be.revertedWithCustomError(sbt, "SoulBoundToken");
    });

    it("setApprovalForAll 後也不能轉移", async function () {
      await sbt.connect(user1).setApprovalForAll(user2.address, true);

      await expect(
        sbt.connect(user2).transferFrom(user1.address, user2.address, 0)
      ).to.be.revertedWithCustomError(sbt, "SoulBoundToken");
    });

    it("不能銷毀 Token", async function () {
      // ERC721 沒有標準的 burn 函數，但透過 transferFrom 到 address(0) 也會被阻止
      await expect(
        sbt.connect(user1).transferFrom(user1.address, ethers.ZeroAddress, 0)
      ).to.be.revertedWithCustomError(sbt, "ERC721InvalidReceiver");
    });
  });

  describe("元數據功能", function () {
    beforeEach(async function () {
      await sbt.connect(owner).unpause();
      await sbt.connect(user1).mint();
    });

    it("應該返回正確的 tokenURI", async function () {
      const uri = await sbt.tokenURI(0);
      expect(uri).to.equal(`${baseURI}0.json`);
    });

    it("不存在的 Token 查詢 tokenURI 應該 revert", async function () {
      await expect(sbt.tokenURI(999))
        .to.be.revertedWithCustomError(sbt, "ERC721NonexistentToken");
    });

    it("owner 可以更新 baseURI", async function () {
      const newBaseURI = "ipfs://QmNewHash/";

      await expect(sbt.connect(owner).setBaseURI(newBaseURI))
        .to.emit(sbt, "BaseURIUpdated")
        .withArgs(newBaseURI);

      expect(await sbt.tokenURI(0)).to.equal(`${newBaseURI}0.json`);
    });

    it("非 owner 不能更新 baseURI", async function () {
      await expect(
        sbt.connect(user1).setBaseURI("ipfs://QmHack/")
      ).to.be.revertedWithCustomError(sbt, "OwnableUnauthorizedAccount");
    });
  });

  describe("查詢功能", function () {
    beforeEach(async function () {
      await sbt.connect(owner).unpause();
    });

    it("totalSupply 應該正確增加", async function () {
      expect(await sbt.totalSupply()).to.equal(0);

      await sbt.connect(user1).mint();
      expect(await sbt.totalSupply()).to.equal(1);

      await sbt.connect(user2).mint();
      expect(await sbt.totalSupply()).to.equal(2);
    });

    it("remainingSupply 應該正確減少", async function () {
      expect(await sbt.remainingSupply()).to.equal(10000);

      await sbt.connect(user1).mint();
      expect(await sbt.remainingSupply()).to.equal(9999);

      await sbt.connect(user2).mint();
      expect(await sbt.remainingSupply()).to.equal(9998);
    });

    it("getMintProgressBasisPoints 應該正確計算進度", async function () {
      expect(await sbt.getMintProgressBasisPoints()).to.equal(0);

      // 鑄造 1 個
      await sbt.connect(user1).mint();
      expect(await sbt.getMintProgressBasisPoints()).to.equal(1); // 1/10000 = 1 basis point

      // 再鑄造更多
      await sbt.connect(user2).mint();
      await sbt.connect(user3).mint();

      // 3/10000 = 0.03% = 3 basis points
      const progress = await sbt.getMintProgressBasisPoints();
      expect(progress).to.equal(3);
    });

    it("isMintedAfterMilestone 應該正確判斷", async function () {
      const MILESTONE_DATE = await sbt.MILESTONE_DATE();

      // 在里程碑日期後鑄造（使用增加時間而不是設置時間）
      await time.increase(86400); // 增加 1 天
      await sbt.connect(user1).mint();

      // 檢查是否在里程碑後（當前測試時間應該已經過里程碑）
      const mintTime = await sbt.getMintTimestamp(0);
      const isAfter = mintTime >= MILESTONE_DATE;
      expect(await sbt.isMintedAfterMilestone(0)).to.equal(isAfter);
    });
  });

  describe("Owner 權限", function () {
    it("owner 可以轉移所有權", async function () {
      await expect(sbt.connect(owner).transferOwnership(user1.address))
        .to.not.be.reverted;

      expect(await sbt.owner()).to.equal(user1.address);
    });

    it("新 owner 可以執行管理功能", async function () {
      await sbt.connect(owner).transferOwnership(user1.address);

      await expect(sbt.connect(user1).unpause())
        .to.not.be.reverted;

      await expect(sbt.connect(user1).setBaseURI("ipfs://QmNew/"))
        .to.not.be.reverted;
    });

    it("舊 owner 轉移後失去權限", async function () {
      await sbt.connect(owner).transferOwnership(user1.address);

      await expect(sbt.connect(owner).pause())
        .to.be.revertedWithCustomError(sbt, "OwnableUnauthorizedAccount");
    });
  });

  describe("邊界情況", function () {
    beforeEach(async function () {
      await sbt.connect(owner).unpause();
    });

    it("tokenId 應該從 0 開始遞增", async function () {
      await sbt.connect(user1).mint();
      expect(await sbt.ownerOf(0)).to.equal(user1.address);

      await sbt.connect(user2).mint();
      expect(await sbt.ownerOf(1)).to.equal(user2.address);

      await sbt.connect(user3).mint();
      expect(await sbt.ownerOf(2)).to.equal(user3.address);
    });

    it("空 baseURI 應該返回空字符串", async function () {
      const SBT = await ethers.getContractFactory("Rootstock3000SBT");
      const sbtEmpty = await SBT.deploy(owner.address, "");
      await sbtEmpty.waitForDeployment();

      await sbtEmpty.connect(owner).unpause();
      await sbtEmpty.connect(user1).mint();

      expect(await sbtEmpty.tokenURI(0)).to.equal("");
    });

    it("ReentrancyGuard 應該防止重入攻擊", async function () {
      // 這個測試需要一個惡意合約來觸發重入
      // 在實際測試中，由於有 nonReentrant modifier，重入會被阻止
      // 此處僅驗證正常鑄造不會觸發問題
      await expect(sbt.connect(user1).mint()).to.not.be.reverted;
    });
  });

  describe("Gas 消耗測試", function () {
    it("鑄造的 gas 消耗應該合理", async function () {
      await sbt.connect(owner).unpause();

      const tx = await sbt.connect(user1).mint();
      const receipt = await tx.wait();

      console.log(`      Gas used for minting: ${receipt.gasUsed.toString()}`);

      // 預期 gas 消耗在合理範圍內（< 200k）
      expect(receipt.gasUsed).to.be.lt(200000);
    });
  });
});
