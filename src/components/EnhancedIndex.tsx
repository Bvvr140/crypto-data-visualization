'use client';

import React, { Suspense } from 'react';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { store } from '@/store';
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import ErrorBoundary from '@/components/ErrorBoundary';
import Index from '@/pages/Index';
import TokenDetailsModal from '@/components/TokenDetailsModal';
import { useTokenById } from '@/hooks/useTokenData';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { closeModal } from '@/store/slices/uiSlice';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30000,
      refetchOnWindowFocus: false,
      retry: 3,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    },
  },
});

// Component to handle modal token data
const ModalProvider: React.FC = () => {
  const dispatch = useAppDispatch();
  const { modals } = useAppSelector((state) => state.ui);
  const token = useTokenById(modals.tokenDetails.tokenId);

  const handleClose = () => {
    dispatch(closeModal('tokenDetails'));
  };

  return (
    <TokenDetailsModal 
      token={token || undefined} 
      isOpen={modals.tokenDetails.open}
      onClose={handleClose}
    />
  );
};

const EnhancedIndex: React.FC = () => {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <Suspense fallback={<div className="min-h-screen bg-background flex items-center justify-center">Loading...</div>}>
              <Index />
              <ModalProvider />
              <Toaster />
            </Suspense>
          </TooltipProvider>
        </QueryClientProvider>
      </Provider>
    </ErrorBoundary>
  );
};

export default EnhancedIndex;