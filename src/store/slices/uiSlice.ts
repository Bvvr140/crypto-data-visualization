import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ActiveSection = 'discover' | 'pulse' | 'trackers' | 'perpetuals' | 'yield' | 'vision' | 'portfolio' | 'rewards';

interface UiState {
  activeSection: ActiveSection;
  mobileMenuOpen: boolean;
  quickBuyAmount: number;
  modals: {
    tokenDetails: { open: boolean; tokenId: string | null };
    settings: { open: boolean };
    walletConnect: { open: boolean };
  };
  popovers: {
    notifications: { open: boolean };
    userMenu: { open: boolean };
  };
  theme: 'light' | 'dark' | 'system';
  sidebarCollapsed: boolean;
}

const initialState: UiState = {
  activeSection: 'discover',
  mobileMenuOpen: false,
  quickBuyAmount: 0.5,
  modals: {
    tokenDetails: { open: false, tokenId: null },
    settings: { open: false },
    walletConnect: { open: false },
  },
  popovers: {
    notifications: { open: false },
    userMenu: { open: false },
  },
  theme: 'dark',
  sidebarCollapsed: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setActiveSection: (state, action: PayloadAction<ActiveSection>) => {
      state.activeSection = action.payload;
    },
    setMobileMenuOpen: (state, action: PayloadAction<boolean>) => {
      state.mobileMenuOpen = action.payload;
    },
    setQuickBuyAmount: (state, action: PayloadAction<number>) => {
      state.quickBuyAmount = action.payload;
    },
    openModal: (state, action: PayloadAction<{ modal: keyof UiState['modals']; data?: { tokenId?: string } }>) => {
      const { modal, data } = action.payload;
      state.modals[modal].open = true;
      if (modal === 'tokenDetails' && data?.tokenId) {
        state.modals.tokenDetails.tokenId = data.tokenId;
      }
    },
    closeModal: (state, action: PayloadAction<keyof UiState['modals']>) => {
      const modal = action.payload;
      state.modals[modal].open = false;
      if (modal === 'tokenDetails') {
        state.modals.tokenDetails.tokenId = null;
      }
    },
    togglePopover: (state, action: PayloadAction<keyof UiState['popovers']>) => {
      const popover = action.payload;
      state.popovers[popover].open = !state.popovers[popover].open;
    },
    closePopover: (state, action: PayloadAction<keyof UiState['popovers']>) => {
      const popover = action.payload;
      state.popovers[popover].open = false;
    },
    setTheme: (state, action: PayloadAction<UiState['theme']>) => {
      state.theme = action.payload;
    },
    toggleSidebar: (state) => {
      state.sidebarCollapsed = !state.sidebarCollapsed;
    },
  },
});

export const {
  setActiveSection,
  setMobileMenuOpen,
  setQuickBuyAmount,
  openModal,
  closeModal,
  togglePopover,
  closePopover,
  setTheme,
  toggleSidebar,
} = uiSlice.actions;

export default uiSlice.reducer;