import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PriceData {
  time: string;
  price: number;
  volume: number;
  ma: number;
}

interface PriceState {
  btcData: PriceData[];
  currentPrice: number;
  priceChange: number;
  isConnected: boolean;
  lastUpdate: number;
  priceHistory: Record<string, PriceData[]>;
}

const initialState: PriceState = {
  btcData: [
    { time: '09:00', price: 94800, volume: 1200, ma: 94950 },
    { time: '09:30', price: 95200, volume: 1450, ma: 95000 },
    { time: '10:00', price: 94950, volume: 980, ma: 95050 },
    { time: '10:30', price: 95800, volume: 1680, ma: 95100 },
    { time: '11:00', price: 96200, volume: 2100, ma: 95200 },
    { time: '11:30', price: 95900, volume: 1750, ma: 95300 },
    { time: '12:00', price: 96800, volume: 2300, ma: 95450 },
    { time: '12:30', price: 97100, volume: 1950, ma: 95600 },
    { time: '13:00', price: 96750, volume: 1600, ma: 95750 },
    { time: '13:30', price: 97400, volume: 2450, ma: 95900 },
    { time: '14:00', price: 97650, volume: 2200, ma: 96100 },
    { time: '14:30', price: 97200, volume: 1800, ma: 96300 },
    { time: '15:00', price: 97234, volume: 1950, ma: 96500 },
  ],
  currentPrice: 97234,
  priceChange: 2.45,
  isConnected: true,
  lastUpdate: Date.now(),
  priceHistory: {},
};

const priceSlice = createSlice({
  name: 'prices',
  initialState,
  reducers: {
    updateBtcData: (state, action: PayloadAction<PriceData>) => {
      state.btcData = [...state.btcData.slice(-12), action.payload];
      state.currentPrice = action.payload.price;
      state.lastUpdate = Date.now();
      
      // Calculate price change from first data point
      const firstPrice = state.btcData[0]?.price || action.payload.price;
      state.priceChange = ((action.payload.price - firstPrice) / firstPrice) * 100;
    },
    setPriceHistory: (state, action: PayloadAction<{ symbol: string; data: PriceData[] }>) => {
      const { symbol, data } = action.payload;
      state.priceHistory[symbol] = data;
    },
    setConnectionStatus: (state, action: PayloadAction<boolean>) => {
      state.isConnected = action.payload;
    },
    resetPriceData: (state) => {
      state.btcData = initialState.btcData;
      state.currentPrice = initialState.currentPrice;
      state.priceChange = initialState.priceChange;
      state.priceHistory = {};
    },
  },
});

export const { updateBtcData, setPriceHistory, setConnectionStatus, resetPriceData } = priceSlice.actions;
export default priceSlice.reducer;