import { useEffect, useCallback, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setTokens, updateTokenPrice, setLoading, setError, Token } from '@/store/slices/tokenSlice';

// Mock data - in real app this would come from API
const mockTokenData = {
  new: [
    { id: '1', name: 'SolanaAI', symbol: 'SOLAI', price: 0.0234, change24h: 156.7, marketCap: 2340000, volume24h: 890000, liquidity: 450000 },
    { id: '2', name: 'DeFiMax', symbol: 'DMAX', price: 1.23, change24h: -12.4, marketCap: 12300000, volume24h: 2340000, liquidity: 890000 },
    { id: '3', name: 'MetaSOL', symbol: 'MSOL', price: 45.67, change24h: 23.8, marketCap: 45670000, volume24h: 12300000, liquidity: 5600000 },
    { id: '4', name: 'CryptoBot', symbol: 'CBOT', price: 0.567, change24h: 89.2, marketCap: 5670000, volume24h: 1890000, liquidity: 780000 },
    { id: '5', name: 'TokenFi', symbol: 'TFI', price: 12.34, change24h: -5.6, marketCap: 23400000, volume24h: 4560000, liquidity: 2340000 },
  ],
  stretch: [
    { id: '16', name: 'Jupiter', symbol: 'JUP', price: 1.23, change24h: 8.91, marketCap: 1200000000, volume24h: 890000000, liquidity: 450000000 },
    { id: '17', name: 'Raydium', symbol: 'RAY', price: 4.56, change24h: 15.23, marketCap: 890000000, volume24h: 456000000, liquidity: 234000000 },
    { id: '18', name: 'Orca', symbol: 'ORCA', price: 3.89, change24h: -2.34, marketCap: 678000000, volume24h: 234000000, liquidity: 123000000 },
    { id: '19', name: 'Serum', symbol: 'SRM', price: 0.89, change24h: 12.67, marketCap: 234000000, volume24h: 123000000, liquidity: 67000000 },
    { id: '20', name: 'Mango', symbol: 'MNGO', price: 0.045, change24h: -8.9, marketCap: 123000000, volume24h: 67000000, liquidity: 34000000 },
  ],
  migrated: [
    { id: '31', name: 'Solana', symbol: 'SOL', price: 245.67, change24h: 12.34, marketCap: 115200000000, volume24h: 2400000000, liquidity: 1200000000 },
    { id: '32', name: 'USDC', symbol: 'USDC', price: 1.00, change24h: 0.01, marketCap: 45000000000, volume24h: 8900000000, liquidity: 4500000000 },
    { id: '33', name: 'Bonk', symbol: 'BONK', price: 0.000023, change24h: -15.67, marketCap: 1890000000, volume24h: 234000000, liquidity: 89000000 },
    { id: '34', name: 'Pyth', symbol: 'PYTH', price: 0.67, change24h: 23.45, marketCap: 2340000000, volume24h: 456000000, liquidity: 234000000 },
    { id: '35', name: 'Jito', symbol: 'JTO', price: 3.45, change24h: 7.89, marketCap: 890000000, volume24h: 178000000, liquidity: 89000000 },
  ],
  all: [
    { rank: 1, name: 'Solana', symbol: 'SOL', price: 245.67, change24h: 12.34, marketCap: 115200000000, volume24h: 2400000000, category: 'Layer 1' },
    { rank: 2, name: 'Jupiter', symbol: 'JUP', price: 1.23, change24h: 8.91, marketCap: 1200000000, volume24h: 890000000, category: 'DEX' },
    { rank: 3, name: 'Raydium', symbol: 'RAY', price: 4.56, change24h: 15.23, marketCap: 890000000, volume24h: 456000000, category: 'DEX' },
    { rank: 4, name: 'Pyth Network', symbol: 'PYTH', price: 0.67, change24h: 23.45, marketCap: 2340000000, volume24h: 456000000, category: 'Oracle' },
    { rank: 5, name: 'Jito', symbol: 'JTO', price: 3.45, change24h: 7.89, marketCap: 890000000, volume24h: 178000000, category: 'Staking' },
  ].map((token, index) => ({ ...token, id: `all-${index + 1}` }))
};

const fetchTokens = async (category: 'new' | 'stretch' | 'migrated' | 'all'): Promise<Token[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, Math.random() * 1000 + 500));
  
  // Simulate occasional errors
  if (Math.random() < 0.05) {
    throw new Error('Failed to fetch token data');
  }
  
  return mockTokenData[category];
};

export const useTokenData = (category: 'new' | 'stretch' | 'migrated' | 'all') => {
  const dispatch = useAppDispatch();
  const { sortBy, sortOrder, filterCategory } = useAppSelector((state) => state.tokens);

  const {
    data: tokens = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['tokens', category],
    queryFn: () => fetchTokens(category),
    staleTime: 30000, // 30 seconds
    refetchInterval: 60000, // 1 minute
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });

  // Update Redux store when data changes
  useEffect(() => {
    if (tokens.length > 0) {
      dispatch(setTokens({ category, tokens }));
    }
  }, [tokens, category, dispatch]);

  // Update loading state
  useEffect(() => {
    dispatch(setLoading(isLoading));
  }, [isLoading, dispatch]);

  // Update error state
  useEffect(() => {
    dispatch(setError(error?.message || null));
  }, [error, dispatch]);

  // Sorted and filtered tokens
  const processedTokens = useMemo(() => {
    let filtered = tokens;

    // Apply category filter
    if (filterCategory && category === 'all') {
      filtered = tokens.filter(token => token.category === filterCategory);
    }

    // Apply sorting
    const sorted = [...filtered].sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];

      // Handle string sorting for name
      if (sortBy === 'name') {
        aValue = (aValue as string).toLowerCase();
        bValue = (bValue as string).toLowerCase();
      }

      if (sortOrder === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

    return sorted;
  }, [tokens, sortBy, sortOrder, filterCategory, category]);

  // Real-time price updates
  const updatePrices = useCallback(() => {
    tokens.forEach(token => {
      // Simulate price changes
      const change = (Math.random() - 0.5) * 0.1; // ±5% max change
      const newPrice = Math.max(0.000001, token.price * (1 + change));
      const newChange24h = token.change24h + (Math.random() - 0.5) * 2;

      dispatch(updateTokenPrice({
        id: token.id,
        price: newPrice,
        change24h: newChange24h,
      }));
    });
  }, [tokens, dispatch]);

  // Set up real-time updates
  useEffect(() => {
    const interval = setInterval(updatePrices, 5000); // Update every 5 seconds
    return () => clearInterval(interval);
  }, [updatePrices]);

  return {
    tokens: processedTokens,
    isLoading,
    error,
    refetch,
  };
};

export const useTokenSearch = (searchTerm: string) => {
  const { allTokens } = useAppSelector((state) => state.tokens);

  return useMemo(() => {
    if (!searchTerm.trim()) return [];

    const term = searchTerm.toLowerCase();
    return allTokens.filter(token =>
      token.name.toLowerCase().includes(term) ||
      token.symbol.toLowerCase().includes(term)
    );
  }, [allTokens, searchTerm]);
};

export const useTokenById = (tokenId: string | null) => {
  const { newPairs, finalStretch, migrated, allTokens } = useAppSelector((state) => state.tokens);

  return useMemo(() => {
    if (!tokenId) return null;

    const allTokensList = [...newPairs, ...finalStretch, ...migrated, ...allTokens];
    return allTokensList.find(token => token.id === tokenId) || null;
  }, [tokenId, newPairs, finalStretch, migrated, allTokens]);
};