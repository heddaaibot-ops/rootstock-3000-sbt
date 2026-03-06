// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/**
 * @title Rootstock3000SBT
 * @dev Soul Bound Token 紀念 Rootstock 主網運行 3000 天
 *
 * 特性：
 * - 總量：100,000 個
 * - 每個地址限鑄 1 個
 * - 完全不可轉移（Soul Bound）
 * - 免費鑄造（僅支付 Gas）
 * - 記錄鑄造時間和區塊資訊
 *
 * Rootstock 主網上線：2018-01-16
 * 3000 天里程碑：2026-04-04
 */
contract Rootstock3000SBT is ERC721, Ownable, Pausable, ReentrancyGuard {

    // ============================================
    // 常量
    // ============================================

    /// @notice SBT 最大供應量
    uint256 public constant MAX_SUPPLY = 100000;

    /// @notice Rootstock 主網上線日期（Unix timestamp）
    uint256 public constant LAUNCH_DATE = 1516060800; // 2018-01-16 00:00:00 UTC

    /// @notice 3000 天里程碑日期（Unix timestamp）
    uint256 public constant MILESTONE_DATE = 1743609600; // 2026-04-04 00:00:00 UTC

    // ============================================
    // 狀態變量
    // ============================================

    /// @notice 當前已鑄造的 Token ID
    uint256 private _currentTokenId;

    /// @notice 元數據 Base URI
    string private _baseTokenURI;

    /// @notice 記錄每個地址是否已鑄造
    mapping(address => bool) public hasMinted;

    /// @notice 記錄每個 Token 的鑄造時間戳
    mapping(uint256 => uint256) public mintTimestamp;

    /// @notice 記錄每個 Token 鑄造時的 Rootstock 區塊號
    mapping(uint256 => uint256) public mintBlockNumber;

    // ============================================
    // 事件
    // ============================================

    /// @notice 鑄造事件
    event SBTMinted(
        address indexed to,
        uint256 indexed tokenId,
        uint256 timestamp,
        uint256 blockNumber
    );

    /// @notice Base URI 更新事件
    event BaseURIUpdated(string newBaseURI);

    // ============================================
    // 建構函數
    // ============================================

    /**
     * @dev 初始化合約
     * @param initialOwner 初始 owner 地址
     * @param baseURI 初始 Base URI
     */
    constructor(
        address initialOwner,
        string memory baseURI
    ) ERC721("Rootstock 3000 Days", "RSK3K") Ownable(initialOwner) {
        _baseTokenURI = baseURI;
        // 合約部署時處於暫停狀態，等待 owner 開放
        _pause();
    }

    // ============================================
    // 核心功能：鑄造
    // ============================================

    /**
     * @notice 鑄造 Soul Bound Token
     * @dev 完全開放，先到先得，每個地址限鑄 1 個
     *
     * 要求：
     * - 合約未暫停
     * - 調用者尚未鑄造
     * - 未達到最大供應量
     */
    function mint() external nonReentrant whenNotPaused {
        // 檢查：是否已鑄造
        require(!hasMinted[msg.sender], "Already minted");

        // 檢查：是否還有剩餘
        require(_currentTokenId < MAX_SUPPLY, "Max supply reached");

        // 獲取當前 Token ID
        uint256 tokenId = _currentTokenId;

        // 標記已鑄造
        hasMinted[msg.sender] = true;

        // 記錄鑄造資訊
        mintTimestamp[tokenId] = block.timestamp;
        mintBlockNumber[tokenId] = block.number;

        // 鑄造
        _safeMint(msg.sender, tokenId);

        // Token ID 遞增
        _currentTokenId++;

        // 發送事件
        emit SBTMinted(msg.sender, tokenId, block.timestamp, block.number);
    }

    // ============================================
    // Soul Bound 實現
    // ============================================

    /**
     * @dev 覆寫 _update 以實現 Soul Bound 特性
     * @notice 除了鑄造（from == address(0)），禁止所有轉移
     *
     * 這意味著：
     * - 不能 transfer
     * - 不能 burn（to == address(0) 也被禁止）
     * - 錢包丟失 = Token 永遠鎖定
     */
    function _update(
        address to,
        uint256 tokenId,
        address auth
    ) internal virtual override returns (address) {
        address from = _ownerOf(tokenId);

        // 只允許鑄造（from == address(0)）
        // 禁止所有其他操作（包括轉移和銷毀）
        require(
            from == address(0),
            "Soul Bound: Token cannot be transferred or burned"
        );

        return super._update(to, tokenId, auth);
    }

    // ============================================
    // 元數據
    // ============================================

    /**
     * @notice 返回 Token 元數據 URI
     * @param tokenId Token ID
     * @return Token URI
     */
    function tokenURI(uint256 tokenId)
        public
        view
        virtual
        override
        returns (string memory)
    {
        _requireOwned(tokenId);

        string memory baseURI = _baseURI();
        return bytes(baseURI).length > 0
            ? string(abi.encodePacked(baseURI, _toString(tokenId), ".json"))
            : "";
    }

    /**
     * @notice 設置 Base URI（僅 Owner）
     * @param newBaseURI 新的 Base URI
     */
    function setBaseURI(string memory newBaseURI) external onlyOwner {
        _baseTokenURI = newBaseURI;
        emit BaseURIUpdated(newBaseURI);
    }

    /**
     * @dev 內部函數：返回 Base URI
     */
    function _baseURI() internal view virtual override returns (string memory) {
        return _baseTokenURI;
    }

    // ============================================
    // 查詢函數
    // ============================================

    /**
     * @notice 查詢當前已鑄造數量
     */
    function totalSupply() public view returns (uint256) {
        return _currentTokenId;
    }

    /**
     * @notice 查詢剩餘可鑄造數量
     */
    function remainingSupply() public view returns (uint256) {
        return MAX_SUPPLY - _currentTokenId;
    }

    /**
     * @notice 查詢地址是否已鑄造
     * @param user 用戶地址
     */
    function hasUserMinted(address user) public view returns (bool) {
        return hasMinted[user];
    }

    /**
     * @notice 查詢 Token 鑄造時間
     * @param tokenId Token ID
     */
    function getMintTimestamp(uint256 tokenId) public view returns (uint256) {
        _requireOwned(tokenId);
        return mintTimestamp[tokenId];
    }

    /**
     * @notice 查詢 Token 鑄造區塊號
     * @param tokenId Token ID
     */
    function getMintBlockNumber(uint256 tokenId) public view returns (uint256) {
        _requireOwned(tokenId);
        return mintBlockNumber[tokenId];
    }

    /**
     * @notice 查詢 Token 是否在里程碑日期後鑄造
     * @param tokenId Token ID
     */
    function isMintedAfterMilestone(uint256 tokenId) public view returns (bool) {
        _requireOwned(tokenId);
        return mintTimestamp[tokenId] >= MILESTONE_DATE;
    }

    /**
     * @notice 獲取鑄造進度百分比（精確到小數點後 2 位）
     * @return 百分比（例如 1234 代表 12.34%）
     */
    function getMintProgressBasisPoints() public view returns (uint256) {
        if (_currentTokenId == 0) return 0;
        return (_currentTokenId * 10000) / MAX_SUPPLY;
    }

    // ============================================
    // 管理功能
    // ============================================

    /**
     * @notice 暫停鑄造（僅 Owner）
     * @dev 用於控制開放時間或緊急情況
     */
    function pause() external onlyOwner {
        _pause();
    }

    /**
     * @notice 恢復鑄造（僅 Owner）
     */
    function unpause() external onlyOwner {
        _unpause();
    }

    // ============================================
    // 輔助函數
    // ============================================

    /**
     * @dev 將 uint256 轉換為 string
     */
    function _toString(uint256 value) internal pure returns (string memory) {
        if (value == 0) {
            return "0";
        }
        uint256 temp = value;
        uint256 digits;
        while (temp != 0) {
            digits++;
            temp /= 10;
        }
        bytes memory buffer = new bytes(digits);
        while (value != 0) {
            digits -= 1;
            buffer[digits] = bytes1(uint8(48 + uint256(value % 10)));
            value /= 10;
        }
        return string(buffer);
    }
}
