'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider, Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { 
  Zap, 
  Wallet, 
  TrendingUp, 
  Target, 
  Coins, 
  Eye, 
  Briefcase, 
  Gift,
  BarChart3,
  Menu,
  Settings,
  Bell,
  RefreshCw,
  Star,
  Filter
} from 'lucide-react';
import {
  ResponsiveContainer,
  ComposedChart,
  Area,
  Line,
  XAxis,
  YAxis,
  Tooltip as ReTooltip,
  CartesianGrid,
} from 'recharts';
import TokenDetailsModal from '@/components/TokenDetailsModal';

const queryClient = new QueryClient();

type ActiveSection = 'discover' | 'pulse' | 'trackers' | 'perpetuals' | 'yield' | 'vision' | 'portfolio' | 'rewards';

const Index = () => {
  const [quickBuyAmount, setQuickBuyAmount] = useState(0.5);
  const [activeSection, setActiveSection] = useState<ActiveSection>('discover');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Modal state for token details
  const [selectedToken, setSelectedToken] = useState<any>(null);
  const [isTokenModalOpen, setIsTokenModalOpen] = useState(false);

  // Function to handle token click
  const handleTokenClick = (token: any) => {
    // Generate random additional data for the token
    const enhancedToken = {
      ...token,
      // Add random data
      holders: Math.floor(Math.random() * 50000) + 1000,
      transactions24h: Math.floor(Math.random() * 10000) + 100,
      ath: token.price * (1 + Math.random() * 5), // All time high
      atl: token.price * (0.1 + Math.random() * 0.5), // All time low
      circulatingSupply: Math.floor(Math.random() * 1000000000) + 1000000,
      totalSupply: Math.floor(Math.random() * 2000000000) + 1000000000,
      // Generate small chart data (7 days)
      chartData: Array.from({ length: 7 }, (_, i) => ({
        day: `Day ${i + 1}`,
        price: token.price * (0.8 + Math.random() * 0.4), // ±20% variation
        volume: Math.floor(Math.random() * token.volume24h * 2)
      }))
    };
    
    setSelectedToken(enhancedToken);
    setIsTokenModalOpen(true);
  };

  const closeTokenModal = () => {
    setIsTokenModalOpen(false);
    setSelectedToken(null);
  };

  // Real-time Bitcoin price data
  const [btcData, setBtcData] = useState([
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
  ]);

  const [currentPrice, setCurrentPrice] = useState(97234);
  const [priceChange, setPriceChange] = useState(2.45);

  // Navigation buttons
  const navigationButtons = [
    { id: 'discover', label: 'Discover', icon: Target, color: 'bg-primary/20 text-primary border-primary/30' },
    { id: 'pulse', label: 'Pulse', icon: Zap, color: 'bg-blue-500/20 text-blue-400 border-blue-500/30' },
    { id: 'trackers', label: 'Trackers', icon: TrendingUp, color: 'bg-green-500/20 text-green-400 border-green-500/30' },
    { id: 'perpetuals', label: 'Perpetuals', icon: Coins, color: 'bg-purple-500/20 text-purple-400 border-purple-500/30' },
    { id: 'yield', label: 'Yield', icon: BarChart3, color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' },
    { id: 'vision', label: 'Vision', icon: Eye, color: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30' },
    { id: 'portfolio', label: 'Portfolio', icon: Briefcase, color: 'bg-orange-500/20 text-orange-400 border-orange-500/30' },
    { id: 'rewards', label: 'Rewards', icon: Gift, color: 'bg-pink-500/20 text-pink-400 border-pink-500/30' },
  ] as const;

  // Mock token stocks data - EXPANDED with huge list
  const tokenStocks = {
    new: [
      { id: '1', name: 'SolanaAI', symbol: 'SOLAI', price: 0.0234, change24h: 156.7, marketCap: 2340000, volume24h: 890000, liquidity: 450000 },
      { id: '2', name: 'DeFiMax', symbol: 'DMAX', price: 1.23, change24h: -12.4, marketCap: 12300000, volume24h: 2340000, liquidity: 890000 },
      { id: '3', name: 'MetaSOL', symbol: 'MSOL', price: 45.67, change24h: 23.8, marketCap: 45670000, volume24h: 12300000, liquidity: 5600000 },
      { id: '4', name: 'CryptoBot', symbol: 'CBOT', price: 0.567, change24h: 89.2, marketCap: 5670000, volume24h: 1890000, liquidity: 780000 },
      { id: '5', name: 'TokenFi', symbol: 'TFI', price: 12.34, change24h: -5.6, marketCap: 23400000, volume24h: 4560000, liquidity: 2340000 },
      { id: '6', name: 'SolSwap', symbol: 'SSWAP', price: 0.089, change24h: 234.5, marketCap: 890000, volume24h: 456000, liquidity: 234000 },
      { id: '7', name: 'DegenCoin', symbol: 'DEGEN', price: 0.0045, change24h: 567.8, marketCap: 4500000, volume24h: 2340000, liquidity: 890000 },
      { id: '8', name: 'MoonShot', symbol: 'MOON', price: 0.234, change24h: 123.4, marketCap: 23400000, volume24h: 8900000, liquidity: 4560000 },
      { id: '9', name: 'RocketFuel', symbol: 'FUEL', price: 1.567, change24h: 78.9, marketCap: 15670000, volume24h: 5670000, liquidity: 2340000 },
      { id: '10', name: 'SolMeme', symbol: 'SMEME', price: 0.00123, change24h: 345.6, marketCap: 1230000, volume24h: 567000, liquidity: 234000 },
      { id: '11', name: 'AlphaCoin', symbol: 'ALPHA', price: 2.345, change24h: 45.6, marketCap: 23450000, volume24h: 8900000, liquidity: 4560000 },
      { id: '12', name: 'BetaToken', symbol: 'BETA', price: 0.678, change24h: -23.4, marketCap: 6780000, volume24h: 2340000, liquidity: 1230000 },
      { id: '13', name: 'GammaFi', symbol: 'GAMMA', price: 12.89, change24h: 67.8, marketCap: 128900000, volume24h: 45600000, liquidity: 23400000 },
      { id: '14', name: 'DeltaSwap', symbol: 'DELTA', price: 0.456, change24h: 12.3, marketCap: 4560000, volume24h: 1890000, liquidity: 890000 },
      { id: '15', name: 'EpsilonDAO', symbol: 'EPS', price: 5.678, change24h: -8.9, marketCap: 56780000, volume24h: 23400000, liquidity: 12300000 },
    ],
    stretch: [
      { id: '16', name: 'Jupiter', symbol: 'JUP', price: 1.23, change24h: 8.91, marketCap: 1200000000, volume24h: 890000000, liquidity: 450000000 },
      { id: '17', name: 'Raydium', symbol: 'RAY', price: 4.56, change24h: 15.23, marketCap: 890000000, volume24h: 456000000, liquidity: 234000000 },
      { id: '18', name: 'Orca', symbol: 'ORCA', price: 3.89, change24h: -2.34, marketCap: 678000000, volume24h: 234000000, liquidity: 123000000 },
      { id: '19', name: 'Serum', symbol: 'SRM', price: 0.89, change24h: 12.67, marketCap: 234000000, volume24h: 123000000, liquidity: 67000000 },
      { id: '20', name: 'Mango', symbol: 'MNGO', price: 0.045, change24h: -8.9, marketCap: 123000000, volume24h: 67000000, liquidity: 34000000 },
      { id: '21', name: 'Saber', symbol: 'SBR', price: 0.0234, change24h: 23.4, marketCap: 78900000, volume24h: 34500000, liquidity: 17800000 },
      { id: '22', name: 'Marinade', symbol: 'MNDE', price: 0.567, change24h: 5.67, marketCap: 345000000, volume24h: 156000000, liquidity: 89000000 },
      { id: '23', name: 'Solend', symbol: 'SLND', price: 1.234, change24h: -12.3, marketCap: 234000000, volume24h: 89000000, liquidity: 45000000 },
      { id: '24', name: 'Tulip', symbol: 'TULIP', price: 2.345, change24h: 34.5, marketCap: 123000000, volume24h: 56000000, liquidity: 28000000 },
      { id: '25', name: 'Quarry', symbol: 'QRY', price: 0.789, change24h: 7.89, marketCap: 89000000, volume24h: 34000000, liquidity: 17000000 },
      { id: '26', name: 'Friktion', symbol: 'FRIK', price: 3.456, change24h: -5.67, marketCap: 156000000, volume24h: 67000000, liquidity: 34000000 },
      { id: '27', name: 'Drift', symbol: 'DRIFT', price: 0.234, change24h: 45.6, marketCap: 67000000, volume24h: 23000000, liquidity: 12000000 },
      { id: '28', name: 'Zeta', symbol: 'ZETA', price: 1.567, change24h: 12.3, marketCap: 89000000, volume24h: 34000000, liquidity: 17000000 },
      { id: '29', name: 'Katana', symbol: 'KATA', price: 0.678, change24h: -23.4, marketCap: 45000000, volume24h: 18000000, liquidity: 9000000 },
      { id: '30', name: 'Aldrin', symbol: 'RIN', price: 2.789, change24h: 67.8, marketCap: 123000000, volume24h: 45000000, liquidity: 23000000 },
    ],
    migrated: [
      { id: '31', name: 'Solana', symbol: 'SOL', price: 245.67, change24h: 12.34, marketCap: 115200000000, volume24h: 2400000000, liquidity: 1200000000 },
      { id: '32', name: 'USDC', symbol: 'USDC', price: 1.00, change24h: 0.01, marketCap: 45000000000, volume24h: 8900000000, liquidity: 4500000000 },
      { id: '33', name: 'Bonk', symbol: 'BONK', price: 0.000023, change24h: -15.67, marketCap: 1890000000, volume24h: 234000000, liquidity: 89000000 },
      { id: '34', name: 'Pyth', symbol: 'PYTH', price: 0.67, change24h: 23.45, marketCap: 2340000000, volume24h: 456000000, liquidity: 234000000 },
      { id: '35', name: 'Jito', symbol: 'JTO', price: 3.45, change24h: 7.89, marketCap: 890000000, volume24h: 178000000, liquidity: 89000000 },
      { id: '36', name: 'Wormhole', symbol: 'W', price: 0.234, change24h: 34.5, marketCap: 567000000, volume24h: 123000000, liquidity: 67000000 },
      { id: '37', name: 'Helium', symbol: 'HNT', price: 8.90, change24h: -12.3, marketCap: 1230000000, volume24h: 234000000, liquidity: 123000000 },
      { id: '38', name: 'Render', symbol: 'RNDR', price: 12.34, change24h: 45.6, marketCap: 2340000000, volume24h: 456000000, liquidity: 234000000 },
      { id: '39', name: 'Chainlink', symbol: 'LINK', price: 23.45, change24h: 5.67, marketCap: 13450000000, volume24h: 890000000, liquidity: 456000000 },
      { id: '40', name: 'Uniswap', symbol: 'UNI', price: 8.90, change24h: -8.9, marketCap: 5340000000, volume24h: 234000000, liquidity: 123000000 },
      { id: '41', name: 'Aave', symbol: 'AAVE', price: 156.78, change24h: 12.3, marketCap: 2340000000, volume24h: 123000000, liquidity: 67000000 },
      { id: '42', name: 'Compound', symbol: 'COMP', price: 67.89, change24h: -23.4, marketCap: 890000000, volume24h: 67000000, liquidity: 34000000 },
      { id: '43', name: 'SushiSwap', symbol: 'SUSHI', price: 1.234, change24h: 34.5, marketCap: 234000000, volume24h: 45000000, liquidity: 23000000 },
      { id: '44', name: '1inch', symbol: '1INCH', price: 0.456, change24h: 7.89, marketCap: 123000000, volume24h: 23000000, liquidity: 12000000 },
      { id: '45', name: 'Curve', symbol: 'CRV', price: 0.789, change24h: -12.3, marketCap: 345000000, volume24h: 56000000, liquidity: 28000000 },
    ]
  };

  // HUGE COMPREHENSIVE STOCKS LIST for Discover page
  const allTokensList = [
    // Top 50 tokens with realistic data
    { rank: 1, name: 'Solana', symbol: 'SOL', price: 245.67, change24h: 12.34, marketCap: 115200000000, volume24h: 2400000000, category: 'Layer 1' },
    { rank: 2, name: 'Jupiter', symbol: 'JUP', price: 1.23, change24h: 8.91, marketCap: 1200000000, volume24h: 890000000, category: 'DEX' },
    { rank: 3, name: 'Raydium', symbol: 'RAY', price: 4.56, change24h: 15.23, marketCap: 890000000, volume24h: 456000000, category: 'DEX' },
    { rank: 4, name: 'Pyth Network', symbol: 'PYTH', price: 0.67, change24h: 23.45, marketCap: 2340000000, volume24h: 456000000, category: 'Oracle' },
    { rank: 5, name: 'Jito', symbol: 'JTO', price: 3.45, change24h: 7.89, marketCap: 890000000, volume24h: 178000000, category: 'Staking' },
    { rank: 6, name: 'Bonk', symbol: 'BONK', price: 0.000023, change24h: -15.67, marketCap: 1890000000, volume24h: 234000000, category: 'Meme' },
    { rank: 7, name: 'Orca', symbol: 'ORCA', price: 3.89, change24h: -2.34, marketCap: 678000000, volume24h: 234000000, category: 'DEX' },
    { rank: 8, name: 'Marinade', symbol: 'MNDE', price: 0.567, change24h: 5.67, marketCap: 345000000, volume24h: 156000000, category: 'Staking' },
    { rank: 9, name: 'Helium', symbol: 'HNT', price: 8.90, change24h: -12.3, marketCap: 1230000000, volume24h: 234000000, category: 'IoT' },
    { rank: 10, name: 'Render', symbol: 'RNDR', price: 12.34, change24h: 45.6, marketCap: 2340000000, volume24h: 456000000, category: 'AI/GPU' },
    { rank: 11, name: 'Wormhole', symbol: 'W', price: 0.234, change24h: 34.5, marketCap: 567000000, volume24h: 123000000, category: 'Bridge' },
    { rank: 12, name: 'Serum', symbol: 'SRM', price: 0.89, change24h: 12.67, marketCap: 234000000, volume24h: 123000000, category: 'DEX' },
    { rank: 13, name: 'Mango', symbol: 'MNGO', price: 0.045, change24h: -8.9, marketCap: 123000000, volume24h: 67000000, category: 'DeFi' },
    { rank: 14, name: 'Solend', symbol: 'SLND', price: 1.234, change24h: -12.3, marketCap: 234000000, volume24h: 89000000, category: 'Lending' },
    { rank: 15, name: 'Saber', symbol: 'SBR', price: 0.0234, change24h: 23.4, marketCap: 78900000, volume24h: 34500000, category: 'DEX' },
    { rank: 16, name: 'Tulip Protocol', symbol: 'TULIP', price: 2.345, change24h: 34.5, marketCap: 123000000, volume24h: 56000000, category: 'Yield' },
    { rank: 17, name: 'Drift Protocol', symbol: 'DRIFT', price: 0.234, change24h: 45.6, marketCap: 67000000, volume24h: 23000000, category: 'Perps' },
    { rank: 18, name: 'Zeta Markets', symbol: 'ZETA', price: 1.567, change24h: 12.3, marketCap: 89000000, volume24h: 34000000, category: 'Options' },
    { rank: 19, name: 'Friktion', symbol: 'FRIK', price: 3.456, change24h: -5.67, marketCap: 156000000, volume24h: 67000000, category: 'Options' },
    { rank: 20, name: 'Quarry Protocol', symbol: 'QRY', price: 0.789, change24h: 7.89, marketCap: 89000000, volume24h: 34000000, category: 'Mining' },
    { rank: 21, name: 'Katana', symbol: 'KATA', price: 0.678, change24h: -23.4, marketCap: 45000000, volume24h: 18000000, category: 'DEX' },
    { rank: 22, name: 'Aldrin', symbol: 'RIN', price: 2.789, change24h: 67.8, marketCap: 123000000, volume24h: 45000000, category: 'DEX' },
    { rank: 23, name: 'Step Finance', symbol: 'STEP', price: 0.123, change24h: 23.4, marketCap: 34000000, volume24h: 12000000, category: 'Portfolio' },
    { rank: 24, name: 'Bonfida', symbol: 'FIDA', price: 0.456, change24h: -12.3, marketCap: 67000000, volume24h: 23000000, category: 'DEX' },
    { rank: 25, name: 'Oxygen', symbol: 'OXY', price: 0.089, change24h: 45.6, marketCap: 23000000, volume24h: 8900000, category: 'DeFi' },
    { rank: 26, name: 'Solanium', symbol: 'SLIM', price: 0.234, change24h: 12.3, marketCap: 45000000, volume24h: 17000000, category: 'Launchpad' },
    { rank: 27, name: 'Port Finance', symbol: 'PORT', price: 0.567, change24h: -8.9, marketCap: 78000000, volume24h: 28000000, category: 'Lending' },
    { rank: 28, name: 'Synthetify', symbol: 'SNY', price: 0.123, change24h: 34.5, marketCap: 23000000, volume24h: 9000000, category: 'Synthetic' },
    { rank: 29, name: 'Parrot Protocol', symbol: 'PRT', price: 0.045, change24h: -23.4, marketCap: 12000000, volume24h: 4500000, category: 'DeFi' },
    { rank: 30, name: 'Cyclos', symbol: 'CYS', price: 0.789, change24h: 67.8, marketCap: 34000000, volume24h: 13000000, category: 'DEX' },
    { rank: 31, name: 'Cope', symbol: 'COPE', price: 0.234, change24h: 23.4, marketCap: 56000000, volume24h: 21000000, category: 'Social' },
    { rank: 32, name: 'Rope', symbol: 'ROPE', price: 0.0123, change24h: -45.6, marketCap: 8900000, volume24h: 3400000, category: 'Meme' },
    { rank: 33, name: 'SAMO', symbol: 'SAMO', price: 0.0089, change24h: 123.4, marketCap: 23000000, volume24h: 8900000, category: 'Meme' },
    { rank: 34, name: 'Star Atlas', symbol: 'ATLAS', price: 0.0034, change24h: 45.6, marketCap: 67000000, volume24h: 23000000, category: 'Gaming' },
    { rank: 35, name: 'Star Atlas DAO', symbol: 'POLIS', price: 0.234, change24h: 12.3, marketCap: 45000000, volume24h: 17000000, category: 'Gaming' },
    { rank: 36, name: 'DeFi Land', symbol: 'DFL', price: 0.0567, change24h: -23.4, marketCap: 34000000, volume24h: 12000000, category: 'Gaming' },
    { rank: 37, name: 'Aurory', symbol: 'AURY', price: 1.234, change24h: 34.5, marketCap: 89000000, volume24h: 32000000, category: 'Gaming' },
    { rank: 38, name: 'Genopets', symbol: 'GENE', price: 0.456, change24h: -12.3, marketCap: 56000000, volume24h: 21000000, category: 'Gaming' },
    { rank: 39, name: 'SolChicks', symbol: 'CHICKS', price: 0.0234, change24h: 67.8, marketCap: 23000000, volume24h: 8900000, category: 'Gaming' },
    { rank: 40, name: 'Cryowar', symbol: 'CWAR', price: 0.123, change24h: 23.4, marketCap: 34000000, volume24h: 13000000, category: 'Gaming' },
    { rank: 41, name: 'MonkeDAO', symbol: 'DAOSOL', price: 0.789, change24h: -8.9, marketCap: 45000000, volume24h: 17000000, category: 'DAO' },
    { rank: 42, name: 'Grape Protocol', symbol: 'GRAPE', price: 0.0456, change24h: 45.6, marketCap: 12000000, volume24h: 4500000, category: 'Social' },
    { rank: 43, name: 'Only1', symbol: 'LIKE', price: 0.234, change24h: 12.3, marketCap: 23000000, volume24h: 8900000, category: 'Social' },
    { rank: 44, name: 'Solcial', symbol: 'SLCL', price: 0.0123, change24h: -34.5, marketCap: 8900000, volume24h: 3400000, category: 'Social' },
    { rank: 45, name: 'Streamflow', symbol: 'STRM', price: 0.567, change24h: 23.4, marketCap: 34000000, volume24h: 13000000, category: 'Payments' },
    { rank: 46, name: 'Mean Finance', symbol: 'MEAN', price: 0.123, change24h: -12.3, marketCap: 23000000, volume24h: 8900000, category: 'DeFi' },
    { rank: 47, name: 'Hubble Protocol', symbol: 'HBB', price: 0.0789, change24h: 67.8, marketCap: 17000000, volume24h: 6700000, category: 'Stablecoin' },
    { rank: 48, name: 'UXD Protocol', symbol: 'UXP', price: 0.234, change24h: 34.5, marketCap: 45000000, volume24h: 17000000, category: 'Stablecoin' },
    { rank: 49, name: 'Cashio', symbol: 'CASH', price: 0.0456, change24h: -45.6, marketCap: 12000000, volume24h: 4500000, category: 'Stablecoin' },
    { rank: 50, name: 'Solrise Finance', symbol: 'SLRS', price: 0.123, change24h: 23.4, marketCap: 23000000, volume24h: 8900000, category: 'Fund' },
  ];

  // Real-time price updates
  useEffect(() => {
    const interval = setInterval(() => {
      setBtcData(prevData => {
        const now = new Date();
        const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
        
        const lastPrice = prevData[prevData.length - 1]?.price || 97234;
        const change = (Math.random() - 0.5) * 500;
        const newPrice = Math.max(90000, lastPrice + change);
        const newVolume = Math.max(500, Math.round(1500 + Math.random() * 1000));
        
        const recentPrices = [...prevData.slice(-19), { price: newPrice }];
        const newMA = recentPrices.reduce((sum, point) => sum + point.price, 0) / recentPrices.length;
        
        const newPoint = {
          time: timeStr,
          price: Math.round(newPrice * 100) / 100,
          volume: newVolume,
          ma: Math.round(newMA * 100) / 100
        };

        setCurrentPrice(newPoint.price);
        setPriceChange(((newPoint.price - prevData[0]?.price) / prevData[0]?.price * 100) || 2.45);

        return [...prevData.slice(-12), newPoint];
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const formatNumber = (num: number) => {
    if (num >= 1e9) return `${(num / 1e9).toFixed(1)}B`;
    if (num >= 1e6) return `${(num / 1e6).toFixed(1)}M`;
    if (num >= 1e3) return `${(num / 1e3).toFixed(1)}K`;
    return num.toString();
  };

  const TokenStocksList = ({ title, tokens, category }: { title: string, tokens: unknown[], category: string }) => (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">{title}</CardTitle>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <RefreshCw className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <Filter className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="max-h-96 overflow-y-auto">
          {tokens.map((token) => (
            <div 
              key={token.id} 
              className="flex items-center justify-between p-3 border-b border-border/50 hover:bg-muted/30 transition-colors cursor-pointer"
              onClick={() => handleTokenClick(token)}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-xs font-bold">{token.symbol[0]}</span>
                </div>
                <div>
                  <p className="font-medium text-sm">{token.symbol}</p>
                  <p className="text-xs text-muted-foreground">{token.name}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-mono text-sm">${token.price.toFixed(token.price < 1 ? 6 : 2)}</p>
                <Badge variant={token.change24h >= 0 ? "default" : "destructive"} className="text-xs">
                  {token.change24h >= 0 ? '+' : ''}{token.change24h.toFixed(1)}%
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  const renderSectionContent = () => {
    switch (activeSection) {
      case 'discover':
        return (
          <div className="space-y-6">
            {/* Bitcoin Real-Time Chart */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center">
                        <span className="text-orange-500 font-bold text-sm">₿</span>
                      </div>
                      Bitcoin (BTC/USD)
                    </CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">Real-time Bitcoin price chart</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold">${currentPrice.toLocaleString()}</p>
                    <p className={`text-sm ${priceChange >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {priceChange >= 0 ? '+' : ''}{priceChange.toFixed(2)}%
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="w-full h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={btcData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                      <defs>
                        <linearGradient id="btcPriceGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="rgba(249, 115, 22, 0.4)" />
                          <stop offset="100%" stopColor="rgba(249, 115, 22, 0.05)" />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="2 2" stroke="rgba(255,255,255,0.08)" />
                      <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: 'rgba(255,255,255,0.6)' }} />
                      <YAxis domain={['dataMin - 200', 'dataMax + 200']} axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: 'rgba(255,255,255,0.6)' }} />
                      <ReTooltip 
                        contentStyle={{
                          backgroundColor: 'rgba(0, 0, 0, 0.9)',
                          border: '1px solid rgba(249, 115, 22, 0.3)',
                          borderRadius: '6px',
                        }}
                      />
                      <Line type="monotone" dataKey="ma" stroke="rgba(156, 163, 175, 0.8)" strokeWidth={1} dot={false} strokeDasharray="3 3" />
                      <Area type="monotone" dataKey="price" stroke="rgba(249, 115, 22, 1)" fill="url(#btcPriceGradient)" strokeWidth={2} />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* HUGE COMPREHENSIVE STOCKS LIST */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Solana Ecosystem Tokens (Top 50)
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <RefreshCw className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Filter className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border/50">
                        <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">#</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Token</th>
                        <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Price</th>
                        <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">24h %</th>
                        <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Market Cap</th>
                        <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Volume 24h</th>
                        <th className="text-center py-3 px-4 text-sm font-medium text-muted-foreground">Category</th>
                        <th className="text-center py-3 px-4 text-sm font-medium text-muted-foreground">Action</th>
                      </tr>
                    </thead>
                    <tbody className="max-h-96 overflow-y-auto">
                      {allTokensList.map((token, index) => (
                        <tr 
                          key={token.rank} 
                          className="border-b border-border/30 hover:bg-muted/20 transition-colors cursor-pointer"
                          onClick={() => handleTokenClick(token)}
                        >
                          <td className="py-3 px-2 text-sm text-muted-foreground">{token.rank}</td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                                <span className="text-xs font-bold">{token.symbol[0]}</span>
                              </div>
                              <div>
                                <p className="font-medium text-sm">{token.symbol}</p>
                                <p className="text-xs text-muted-foreground">{token.name}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <p className="font-mono text-sm">${token.price.toFixed(token.price < 1 ? 6 : 2)}</p>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <Badge variant={token.change24h >= 0 ? "default" : "destructive"} className="text-xs">
                              {token.change24h >= 0 ? '+' : ''}{token.change24h.toFixed(1)}%
                            </Badge>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <p className="font-mono text-sm">${formatNumber(token.marketCap)}</p>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <p className="font-mono text-sm">${formatNumber(token.volume24h)}</p>
                          </td>
                          <td className="py-3 px-4 text-center">
                            <Badge variant="outline" className="text-xs">
                              {token.category}
                            </Badge>
                          </td>
                          <td className="py-3 px-4 text-center">
                            <Button 
                              size="sm" 
                              variant="ghost" 
                              className="h-7 px-2 text-xs"
                              onClick={(e) => {
                                e.stopPropagation();
                                // Handle watch functionality here
                              }}
                            >
                              <Star className="w-3 h-3 mr-1" />
                              Watch
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Token Stocks List - Three Columns */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <TokenStocksList title="New Pairs" tokens={tokenStocks.new} category="new" />
              <TokenStocksList title="Final Stretch" tokens={tokenStocks.stretch} category="stretch" />
              <TokenStocksList title="Migrated" tokens={tokenStocks.migrated} category="migrated" />
            </div>

            {/* Market Overview Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Total Value Locked</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold">$2.4B</span>
                    <Badge variant="default">+12.5%</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">Across all protocols</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold">156K</span>
                    <Badge variant="default">+8.3%</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">Last 24 hours</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Trading Volume</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold">$890M</span>
                    <Badge variant="default">+15.7%</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">Last 24 hours</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">New Tokens</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold">23</span>
                    <Badge variant="default">+4</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">Listed today</p>
                </CardContent>
              </Card>
            </div>

            {/* Trending & Popular Sections */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>🔥 Trending Now</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { symbol: 'BONK', name: 'Bonk', change: '+156.7%', reason: 'Meme season rally' },
                      { symbol: 'JUP', name: 'Jupiter', change: '+45.2%', reason: 'New DEX features' },
                      { symbol: 'PYTH', name: 'Pyth Network', change: '+34.8%', reason: 'Oracle expansion' },
                      { symbol: 'JTO', name: 'Jito', change: '+28.9%', reason: 'Staking rewards' },
                      { symbol: 'RAY', name: 'Raydium', change: '+23.4%', reason: 'Volume surge' },
                    ].map((token, index) => (
                      <div key={token.symbol} className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50">
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-bold text-muted-foreground">#{index + 1}</span>
                          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                            <span className="text-xs font-bold">{token.symbol[0]}</span>
                          </div>
                          <div>
                            <span className="font-medium text-sm">{token.symbol}</span>
                            <p className="text-xs text-muted-foreground">{token.reason}</p>
                          </div>
                        </div>
                        <Badge variant="default" className="text-xs">
                          {token.change}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>⭐ Most Popular</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { symbol: 'SOL', name: 'Solana', volume: '$2.4B', users: '156K' },
                      { symbol: 'JUP', name: 'Jupiter', volume: '$890M', users: '89K' },
                      { symbol: 'RAY', name: 'Raydium', volume: '$456M', users: '67K' },
                      { symbol: 'ORCA', name: 'Orca', volume: '$234M', users: '45K' },
                      { symbol: 'MNDE', name: 'Marinade', volume: '$156M', users: '34K' },
                    ].map((token, index) => (
                      <div key={token.symbol} className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50">
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-bold text-muted-foreground">#{index + 1}</span>
                          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                            <span className="text-xs font-bold">{token.symbol[0]}</span>
                          </div>
                          <div>
                            <span className="font-medium text-sm">{token.symbol}</span>
                            <p className="text-xs text-muted-foreground">{token.users} users</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-mono">{token.volume}</p>
                          <p className="text-xs text-muted-foreground">24h vol</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      case 'pulse':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { name: 'SOL Price', value: '$245.67', change: '+12.34%', description: 'Current Solana price' },
                { name: 'Market Cap', value: '$115.2B', change: '+8.91%', description: 'Total market capitalization' },
                { name: 'Volume 24h', value: '$2.4B', change: '+15.67%', description: 'Trading volume' },
                { name: 'Validators', value: '1,847', change: '+23', description: 'Active validators' },
              ].map((item, index) => (
                <Card key={index}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">{item.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold">{item.value}</span>
                        <Badge variant={item.change.startsWith('+') ? 'default' : 'destructive'}>
                          {item.change}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case 'trackers':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { name: 'DeFi Tracker', apy: '24.5%', tvl: '$12.4M', risk: 'Medium', status: 'Active' },
              { name: 'Meme Tracker', apy: '156.7%', tvl: '$5.2M', risk: 'High', status: 'Active' },
              { name: 'Blue Chip Tracker', apy: '8.9%', tvl: '$45.6M', risk: 'Low', status: 'Active' },
              { name: 'Gaming Tracker', apy: '67.3%', tvl: '$8.9M', risk: 'High', status: 'Paused' },
            ].map((item, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{item.name}</CardTitle>
                    <Badge variant={item.status === 'Active' ? 'default' : 'secondary'}>
                      {item.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">APY</p>
                      <p className="text-lg font-bold text-green-400">{item.apy}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">TVL</p>
                      <p className="text-lg font-bold">{item.tvl}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Risk</p>
                      <Badge variant={item.risk === 'Low' ? 'default' : item.risk === 'Medium' ? 'secondary' : 'destructive'}>
                        {item.risk}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        );

      case 'perpetuals':
        return (
          <div className="space-y-4">
            {[
              { pair: 'BTC-PERP', funding: '0.0123%', oi: '$234M', volume: '$1.2B', leverage: '100x' },
              { pair: 'ETH-PERP', funding: '-0.0045%', oi: '$156M', volume: '$890M', leverage: '50x' },
              { pair: 'SOL-PERP', funding: '0.0234%', oi: '$89M', volume: '$456M', leverage: '20x' },
            ].map((item, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Pair</p>
                      <p className="font-bold">{item.pair}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Funding Rate</p>
                      <p className={`font-mono ${item.funding.startsWith('-') ? 'text-red-400' : 'text-green-400'}`}>
                        {item.funding}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Open Interest</p>
                      <p className="font-mono">{item.oi}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">24h Volume</p>
                      <p className="font-mono">{item.volume}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Max Leverage</p>
                      <Badge variant="outline">{item.leverage}</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        );

      case 'yield':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { protocol: 'Marinade', apy: '7.2%', tvl: '$1.2B', token: 'mSOL', risk: 'Low' },
              { protocol: 'Jito', apy: '8.5%', tvl: '$890M', token: 'jitoSOL', risk: 'Low' },
              { protocol: 'Orca', apy: '45.6%', tvl: '$234M', token: 'ORCA-USDC', risk: 'Medium' },
              { protocol: 'Raydium', apy: '67.8%', tvl: '$156M', token: 'RAY-SOL', risk: 'High' },
            ].map((item, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{item.protocol}</CardTitle>
                    <Badge variant={item.risk === 'Low' ? 'default' : item.risk === 'Medium' ? 'secondary' : 'destructive'}>
                      {item.risk}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">APY</p>
                      <p className="text-xl font-bold text-green-400">{item.apy}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">TVL</p>
                      <p className="text-lg font-bold">{item.tvl}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Token</p>
                      <p className="font-mono text-sm">{item.token}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        );

      case 'vision':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { project: 'Solana Mobile', category: 'Hardware', score: 95, trend: 'Bullish', timeframe: '6M' },
              { project: 'Jupiter DEX', category: 'DeFi', score: 88, trend: 'Bullish', timeframe: '3M' },
              { project: 'Magic Eden', category: 'NFT', score: 76, trend: 'Neutral', timeframe: '1M' },
              { project: 'Phantom Wallet', category: 'Wallet', score: 92, trend: 'Bullish', timeframe: '12M' },
            ].map((item, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">{item.project}</CardTitle>
                      <p className="text-sm text-muted-foreground">{item.category}</p>
                    </div>
                    <Badge variant={item.trend === 'Bullish' ? 'default' : 'secondary'}>
                      {item.trend}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Vision Score</p>
                      <p className="text-2xl font-bold">{item.score}/100</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Timeframe</p>
                      <p className="font-mono">{item.timeframe}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        );

      case 'portfolio':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="w-5 h-5" />
                  Portfolio Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Value</p>
                    <p className="text-2xl font-bold">$68,326</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">24h Change</p>
                    <p className="text-xl font-bold text-green-400">+$2,847 (+4.34%)</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total P&L</p>
                    <p className="text-xl font-bold text-green-400">+$18,126 (+36.1%)</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Assets</p>
                    <p className="text-xl font-bold">6</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* REALISTIC PORTFOLIO PERFORMANCE GRAPH */}
            <Card>
              <CardHeader>
                <CardTitle>Portfolio Performance (6 Months)</CardTitle>
                <p className="text-sm text-muted-foreground">Historical performance and P&L tracking</p>
              </CardHeader>
              <CardContent>
                <div className="w-full h-96">
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={[
                      { date: '2024-07-01', value: 50200, pnl: 0, btc: 63000, sol: 140 },
                      { date: '2024-07-15', value: 51800, pnl: 1600, btc: 65200, sol: 145 },
                      { date: '2024-08-01', value: 49500, pnl: -700, btc: 61800, sol: 138 },
                      { date: '2024-08-15', value: 52400, pnl: 2200, btc: 64500, sol: 152 },
                      { date: '2024-09-01', value: 54100, pnl: 3900, btc: 67200, sol: 158 },
                      { date: '2024-09-15', value: 53200, pnl: 3000, btc: 66100, sol: 155 },
                      { date: '2024-10-01', value: 56800, pnl: 6600, btc: 69800, sol: 168 },
                      { date: '2024-10-15', value: 58900, pnl: 8700, btc: 71500, sol: 175 },
                      { date: '2024-11-01', value: 57200, pnl: 7000, btc: 70200, sol: 172 },
                      { date: '2024-11-15', value: 61400, pnl: 11200, btc: 74800, sol: 185 },
                      { date: '2024-12-01', value: 63800, pnl: 13600, btc: 78200, sol: 195 },
                      { date: '2024-12-15', value: 62100, pnl: 11900, btc: 76900, sol: 188 },
                      { date: '2024-12-25', value: 65500, pnl: 15300, btc: 82100, sol: 208 },
                      { date: '2024-12-31', value: 68326, pnl: 18126, btc: 97234, sol: 245 },
                    ]} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <defs>
                        <linearGradient id="portfolioGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="rgba(34, 197, 94, 0.3)" />
                          <stop offset="100%" stopColor="rgba(34, 197, 94, 0.05)" />
                        </linearGradient>
                        <linearGradient id="pnlGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="rgba(59, 130, 246, 0.3)" />
                          <stop offset="100%" stopColor="rgba(59, 130, 246, 0.05)" />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                      <XAxis 
                        dataKey="date" 
                        tickFormatter={(date) => new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        tick={{ fontSize: 12 }}
                        stroke="rgba(255,255,255,0.6)"
                      />
                      <YAxis 
                        yAxisId="left"
                        tick={{ fontSize: 12 }}
                        stroke="rgba(255,255,255,0.6)"
                        tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                      />
                      <YAxis 
                        yAxisId="right"
                        orientation="right"
                        tick={{ fontSize: 12 }}
                        stroke="rgba(255,255,255,0.6)"
                        tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                      />
                      <ReTooltip 
                        labelFormatter={(date) => new Date(date).toLocaleDateString()}
                        formatter={(value: any, name: any) => {
                          if (name === 'value') return [`$${value.toLocaleString()}`, 'Portfolio Value'];
                          if (name === 'pnl') return [`${value >= 0 ? '+' : ''}$${value.toLocaleString()}`, 'P&L'];
                          if (name === 'btc') return [`$${value.toLocaleString()}`, 'BTC Price'];
                          if (name === 'sol') return [`$${value.toLocaleString()}`, 'SOL Price'];
                          return [value, name];
                        }}
                        contentStyle={{
                          backgroundColor: 'rgba(0, 0, 0, 0.8)',
                          border: '1px solid rgba(255, 255, 255, 0.2)',
                          borderRadius: '8px'
                        }}
                      />
                      
                      {/* Portfolio Value Area */}
                      <Area 
                        yAxisId="left"
                        type="monotone" 
                        dataKey="value" 
                        stroke="rgba(34, 197, 94, 1)" 
                        fill="url(#portfolioGradient)" 
                        strokeWidth={3}
                      />
                      
                      {/* P&L Line */}
                      <Line 
                        yAxisId="right"
                        type="monotone" 
                        dataKey="pnl" 
                        stroke="rgba(59, 130, 246, 1)" 
                        strokeWidth={2}
                        dot={false}
                        strokeDasharray="5 5"
                      />
                      
                      {/* BTC Price Reference Line */}
                      <Line 
                        yAxisId="right"
                        type="monotone" 
                        dataKey="btc" 
                        stroke="rgba(249, 115, 22, 0.6)" 
                        strokeWidth={1}
                        dot={false}
                        strokeDasharray="2 2"
                      />
                      
                      {/* SOL Price Reference Line */}
                      <Line 
                        yAxisId="right"
                        type="monotone" 
                        dataKey="sol" 
                        stroke="rgba(138, 43, 226, 0.6)" 
                        strokeWidth={1}
                        dot={false}
                        strokeDasharray="2 2"
                      />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
                
                {/* Chart Legend */}
                <div className="flex items-center justify-center gap-6 mt-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-0.5 bg-green-500 rounded" />
                    <span>Portfolio Value</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-0.5 bg-blue-500 rounded border-dashed border border-blue-500" />
                    <span>P&L</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-0.5 bg-orange-500/60 rounded border-dashed border border-orange-500" />
                    <span>BTC Price</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-0.5 bg-purple-500/60 rounded border-dashed border border-purple-500" />
                    <span>SOL Price</span>
                  </div>
                </div>
                
                {/* Performance Metrics */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-4 border-t border-border/50">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">6M Return</p>
                    <p className="text-lg font-bold text-green-400">+36.1%</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Max Drawdown</p>
                    <p className="text-lg font-bold text-red-400">-1.4%</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Sharpe Ratio</p>
                    <p className="text-lg font-bold">2.34</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Win Rate</p>
                    <p className="text-lg font-bold text-green-400">78.5%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { asset: 'SOL', amount: '125.67', value: '$30,890', allocation: '45%', pnl: '+$4,567' },
                { asset: 'USDC', amount: '15,234', value: '$15,234', allocation: '22%', pnl: '$0' },
                { asset: 'JUP', amount: '8,945', value: '$11,003', allocation: '16%', pnl: '+$2,103' },
                { asset: 'RAY', amount: '2,456', value: '$11,199', allocation: '17%', pnl: '+$3,456' },
              ].map((item, index) => (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                          <span className="font-bold">{item.asset[0]}</span>
                        </div>
                        <div>
                          <p className="font-medium">{item.asset}</p>
                          <p className="text-sm text-muted-foreground">{item.amount}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{item.value}</p>
                        <p className="text-sm text-muted-foreground">{item.allocation}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case 'rewards':
        return (
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Gift className="w-5 h-5" />
                  Rewards Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Earned</p>
                    <p className="text-2xl font-bold text-green-400">$3,860</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Claimable</p>
                    <p className="text-xl font-bold">$3,275</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Programs</p>
                    <p className="text-xl font-bold">4</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { program: 'Staking Rewards', amount: '12.45 SOL', value: '$3,056', period: 'Monthly', status: 'Claimable' },
                { program: 'LP Rewards', amount: '456.78 JUP', value: '$562', period: 'Weekly', status: 'Claimed' },
                { program: 'Referral Bonus', amount: '23.45 USDC', value: '$23', period: 'Daily', status: 'Pending' },
                { program: 'Trading Rewards', amount: '0.89 SOL', value: '$219', period: 'Daily', status: 'Claimable' },
              ].map((item, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{item.program}</CardTitle>
                      <Badge variant={
                        item.status === 'Claimable' ? 'default' : 
                        item.status === 'Claimed' ? 'secondary' : 'outline'
                      }>
                        {item.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Amount</span>
                        <span className="font-mono font-bold">{item.amount}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Value</span>
                        <span className="font-mono text-green-400">{item.value}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Period</span>
                        <span className="text-sm">{item.period}</span>
                      </div>
                      {item.status === 'Claimable' && (
                        <Button className="w-full mt-3" size="sm">
                          Claim Rewards
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      default:
        return <div>Select a section to view data</div>;
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <div className="min-h-screen bg-background">
          {/* Header */}
          <header className="border-b border-border bg-card/80 backdrop-blur-sm">
            <div className="container mx-auto px-4 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                    <Zap className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h1 className="text-xl font-bold">AXIOM PULSE</h1>
                    <p className="text-sm text-muted-foreground">DeFi Discovery Platform</p>
                  </div>
                </div>

                {/* Desktop Navigation */}
                <div className="hidden lg:flex items-center gap-1 ml-6 flex-1">
                  {navigationButtons.map((button) => {
                    const Icon = button.icon;
                    const isActive = activeSection === button.id;
                    
                    return (
                      <Button
                        key={button.id}
                        variant={isActive ? "default" : "ghost"}
                        size="sm"
                        onClick={() => setActiveSection(button.id as ActiveSection)}
                        className={`flex items-center gap-2 whitespace-nowrap transition-all ${
                          isActive ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        {button.label}
                      </Button>
                    );
                  })}
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <label className="text-sm text-muted-foreground">Quick Buy:</label>
                    <div className="relative">
                      <span className="absolute left-2 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">◎</span>
                      <Input
                        type="number"
                        value={quickBuyAmount}
                        onChange={(e) => setQuickBuyAmount(Number(e.target.value))}
                        className="w-24 pl-6 text-sm"
                        min={0.01}
                        step={0.1}
                      />
                    </div>
                  </div>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Bell className="w-4 h-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Notifications</TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Settings className="w-4 h-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Settings</TooltipContent>
                  </Tooltip>

                  <Button variant="outline" className="gap-2">
                    <Wallet className="w-4 h-4" />
                    Connect Wallet
                  </Button>

                  {/* Mobile Menu */}
                  <div className="lg:hidden">
                    <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                      <SheetTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Menu className="w-4 h-4" />
                        </Button>
                      </SheetTrigger>
                      <SheetContent side="right" className="w-64">
                        <div className="flex flex-col gap-2 mt-6">
                          {navigationButtons.map((button) => {
                            const Icon = button.icon;
                            const isActive = activeSection === button.id;
                            
                            return (
                              <Button
                                key={button.id}
                                variant={isActive ? "default" : "ghost"}
                                className="justify-start gap-3"
                                onClick={() => {
                                  setActiveSection(button.id as ActiveSection);
                                  setMobileMenuOpen(false);
                                }}
                              >
                                <Icon className="w-4 h-4" />
                                {button.label}
                              </Button>
                            );
                          })}
                        </div>
                      </SheetContent>
                    </Sheet>
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="container mx-auto px-4 py-8">
            <div className="mb-6">
              <h2 className="text-3xl font-bold mb-2 capitalize">{activeSection}</h2>
              <p className="text-muted-foreground">
                {activeSection === 'discover' && 'Explore the Solana DeFi ecosystem with real-time data'}
                {activeSection === 'pulse' && 'Real-time market data and trending tokens'}
                {activeSection === 'trackers' && 'Automated investment strategies and portfolio trackers'}
                {activeSection === 'perpetuals' && 'Perpetual futures trading with leverage'}
                {activeSection === 'yield' && 'Yield farming and staking opportunities'}
                {activeSection === 'vision' && 'Market insights and project analysis'}
                {activeSection === 'portfolio' && 'Your portfolio overview and performance'}
                {activeSection === 'rewards' && 'Claim your earned rewards and bonuses'}
              </p>
            </div>

            {renderSectionContent()}
          </main>

          {/* Footer */}
          <footer className="border-t border-border py-6 mt-12">
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>Token Explorer Pro - DeFi Discovery Platform</span>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span>Live Data</span>
                </div>
              </div>
            </div>
          </footer>
        </div>
        
        {/* Token Details Modal */}
        <TokenDetailsModal 
          token={selectedToken} 
          isOpen={isTokenModalOpen} 
          onClose={closeTokenModal} 
        />
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default Index;