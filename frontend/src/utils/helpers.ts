export const formatAddress = (address: string): string => {
  if (!address) return '';
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

export const formatNumber = (num: number | bigint): string => {
  return num.toLocaleString('en-US');
};

export const formatPercentage = (value: number, decimals: number = 2): string => {
  return value.toFixed(decimals) + '%';
};

export const basisPointsToPercentage = (basisPoints: bigint): number => {
  return Number(basisPoints) / 100;
};

export const calculateProgress = (current: bigint, total: bigint): number => {
  if (total === 0n) return 0;
  return (Number(current) / Number(total)) * 100;
};

export const formatDate = (timestamp: number): string => {
  return new Date(timestamp * 1000).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const formatDateTime = (timestamp: number): string => {
  return new Date(timestamp * 1000).toLocaleString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const getTimeUntilMilestone = (milestoneTimestamp: number): {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
} => {
  const now = Math.floor(Date.now() / 1000);
  const diff = milestoneTimestamp - now;

  if (diff < 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };
  }

  const days = Math.floor(diff / 86400);
  const hours = Math.floor((diff % 86400) / 3600);
  const minutes = Math.floor((diff % 3600) / 60);
  const seconds = diff % 60;

  return { days, hours, minutes, seconds, isPast: false };
};

export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error('Failed to copy:', err);
    return false;
  }
};

export const openInExplorer = (
  type: 'address' | 'tx' | 'token',
  value: string,
  chainId: number
): void => {
  const baseUrl = chainId === 31
    ? 'https://rootstock-testnet.blockscout.com'
    : 'https://rootstock.blockscout.com';

  let url = '';
  switch (type) {
    case 'address':
      url = `${baseUrl}/address/${value}`;
      break;
    case 'tx':
      url = `${baseUrl}/tx/${value}`;
      break;
    case 'token':
      url = `${baseUrl}/token/${value}`;
      break;
  }

  window.open(url, '_blank', 'noopener,noreferrer');
};
