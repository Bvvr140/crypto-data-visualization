import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { TrendingUp, TrendingDown, ExternalLink, Star, Share2, Users, Activity, BarChart3 } from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip as ReTooltip,
  CartesianGrid,
} from 'recharts';

interface Token {
  id?: string;
  name: string;
  symbol: string;
  price: number;
  change24h: number;
  marketCap: number;
  volume24h: number;
  liquidity?: number;
  category?: string;
  rank?: number;
  holders?: number;
  transactions24h?: number;
  ath?: number;
  atl?: number;
  circulatingSupply?: number;
  totalSupply?: number;
  chartData?: Array<{
    day: string;
    price: number;
    volume: number;
  }>;
}

interface TokenDetailsModalProps {
  token?: Token;
  isOpen: boolean;
  onClose: () => void;
}

const TokenDetailsModal: React.FC<TokenDetailsModalProps> = ({ token, isOpen, onClose }) => {
  if (!token) return null;

  const formatNumber = (num: number) => {
    if (num >= 1e9) return `${(num / 1e9).toFixed(2)}B`;
    if (num >= 1e6) return `${(num / 1e6).toFixed(2)}M`;
    if (num >= 1e3) return `${(num / 1e3).toFixed(2)}K`;
    return num.toLocaleString();
  };

  const isPositive = token.change24h >= 0;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="text-lg font-bold">{token.symbol[0]}</span>
            </div>
            <div>
              <DialogTitle className="text-2xl">{token.name}</DialogTitle>
              <DialogDescription className="text-lg font-mono">
                {token.symbol}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Price Section */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-3xl font-bold">
                ${token.price.toFixed(token.price < 1 ? 6 : 2)}
              </p>
              <div className="flex items-center gap-2 mt-1">
                {isPositive ? (
                  <TrendingUp className="w-4 h-4 text-green-400" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-red-400" />
                )}
                <Badge variant={isPositive ? "default" : "destructive"}>
                  {isPositive ? '+' : ''}{token.change24h.toFixed(2)}%
                </Badge>
                <span className="text-sm text-muted-foreground">24h</span>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Star className="w-4 h-4 mr-2" />
                Watch
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </div>

          {/* Small Chart */}
          {token.chartData && (
            <div className="space-y-2">
              <h4 className="font-semibold flex items-center gap-2">
                <BarChart3 className="w-4 h-4" />
                7-Day Price Chart
              </h4>
              <div className="w-full h-48 bg-muted/20 rounded-lg p-4">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={token.chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis 
                      dataKey="day" 
                      tick={{ fontSize: 12, fill: 'rgba(255,255,255,0.6)' }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis 
                      tick={{ fontSize: 12, fill: 'rgba(255,255,255,0.6)' }}
                      axisLine={false}
                      tickLine={false}
                      tickFormatter={(value) => `$${value.toFixed(2)}`}
                    />
                    <ReTooltip 
                      contentStyle={{
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        borderRadius: '6px',
                      }}
                      formatter={(value: any) => [`$${value.toFixed(4)}`, 'Price']}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="price" 
                      stroke={isPositive ? "#22c55e" : "#ef4444"}
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          <Separator />

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Market Cap</p>
              <p className="text-lg font-semibold">${formatNumber(token.marketCap)}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">24h Volume</p>
              <p className="text-lg font-semibold">${formatNumber(token.volume24h)}</p>
            </div>
            {token.liquidity && (
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Liquidity</p>
                <p className="text-lg font-semibold">${formatNumber(token.liquidity)}</p>
              </div>
            )}
            {token.holders && (
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  Holders
                </p>
                <p className="text-lg font-semibold">{formatNumber(token.holders)}</p>
              </div>
            )}
            {token.transactions24h && (
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <Activity className="w-3 h-3" />
                  24h Transactions
                </p>
                <p className="text-lg font-semibold">{formatNumber(token.transactions24h)}</p>
              </div>
            )}
            {token.ath && (
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">All Time High</p>
                <p className="text-lg font-semibold text-green-400">${token.ath.toFixed(4)}</p>
              </div>
            )}
            {token.atl && (
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">All Time Low</p>
                <p className="text-lg font-semibold text-red-400">${token.atl.toFixed(4)}</p>
              </div>
            )}
            {token.category && (
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Category</p>
                <Badge variant="outline">{token.category}</Badge>
              </div>
            )}
            {token.rank && (
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Rank</p>
                <p className="text-lg font-semibold">#{token.rank}</p>
              </div>
            )}
          </div>

          {/* Supply Information */}
          {(token.circulatingSupply || token.totalSupply) && (
            <>
              <Separator />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {token.circulatingSupply && (
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Circulating Supply</p>
                    <p className="text-lg font-semibold">{formatNumber(token.circulatingSupply)} {token.symbol}</p>
                  </div>
                )}
                {token.totalSupply && (
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Total Supply</p>
                    <p className="text-lg font-semibold">{formatNumber(token.totalSupply)} {token.symbol}</p>
                  </div>
                )}
              </div>
            </>
          )}

          <Separator />

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button className="flex-1">
              Buy {token.symbol}
            </Button>
            <Button variant="outline" className="flex-1">
              Sell {token.symbol}
            </Button>
            <Button variant="outline" size="icon">
              <ExternalLink className="w-4 h-4" />
            </Button>
          </div>

          {/* Additional Info */}
          <div className="bg-muted/50 rounded-lg p-4 space-y-2">
            <h4 className="font-semibold">About {token.name}</h4>
            <p className="text-sm text-muted-foreground">
              {token.name} ({token.symbol}) is a {token.category?.toLowerCase() || 'cryptocurrency'} token 
              with a current market cap of ${formatNumber(token.marketCap)} and 24-hour trading volume 
              of ${formatNumber(token.volume24h)}.
              {token.holders && ` It has ${formatNumber(token.holders)} holders`}
              {token.transactions24h && ` and ${formatNumber(token.transactions24h)} transactions in the last 24 hours`}.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TokenDetailsModal;