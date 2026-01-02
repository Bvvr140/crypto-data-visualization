import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Token {
  id: string;
  name: string;
  symbol: string;
  price: number;
  change24h: number;
  marketCap: number;
  volume24h: number;
  liquidity?: number;
  category?: string;
  rank?: number;
}

interface TokenState {
  newPairs: Token[];
  finalStretch: Token[];
  migrated: Token[];
  allTokens: Token[];
  loading: boolean;
  error: string | null;
  sortBy: 'price' | 'change24h' | 'marketCap' | 'volume24h' | 'name';
  sortOrder: 'asc' | 'desc';
  filterCategory: string | null;
}

const initialState: TokenState = {
  newPairs: [],
  finalStretch: [],
  migrated: [],
  allTokens: [],
  loading: false,
  error: null,
  sortBy: 'marketCap',
  sortOrder: 'desc',
  filterCategory: null,
};

const tokenSlice = createSlice({
  name: 'tokens',
  initialState,
  reducers: {
    setTokens: (state, action: PayloadAction<{ category: 'new' | 'stretch' | 'migrated' | 'all', tokens: Token[] }>) => {
      const { category, tokens } = action.payload;
      switch (category) {
        case 'new':
          state.newPairs = tokens;
          break;
        case 'stretch':
          state.finalStretch = tokens;
          break;
        case 'migrated':
          state.migrated = tokens;
          break;
        case 'all':
          state.allTokens = tokens;
          break;
      }
    },
    updateTokenPrice: (state, action: PayloadAction<{ id: string, price: number, change24h: number }>) => {
      const { id, price, change24h } = action.payload;
      const updateToken = (tokens: Token[]) => {
        const token = tokens.find(t => t.id === id);
        if (token) {
          token.price = price;
          token.change24h = change24h;
        }
      };
      
      updateToken(state.newPairs);
      updateToken(state.finalStretch);
      updateToken(state.migrated);
      updateToken(state.allTokens);
    },
    setSorting: (state, action: PayloadAction<{ sortBy: TokenState['sortBy'], sortOrder: TokenState['sortOrder'] }>) => {
      state.sortBy = action.payload.sortBy;
      state.sortOrder = action.payload.sortOrder;
    },
    setFilter: (state, action: PayloadAction<string | null>) => {
      state.filterCategory = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setTokens, updateTokenPrice, setSorting, setFilter, setLoading, setError } = tokenSlice.actions;
export default tokenSlice.reducer;