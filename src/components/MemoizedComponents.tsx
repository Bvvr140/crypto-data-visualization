import React, { memo, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Token } from '@/store/slices/tokenSlice';
import { RefreshCw, Filter, Star } from 'lucide-react';

interface TokenRowProps {
  token: Token;
  onTokenClick: (token: Token) => void;
}

export const MemoizedTokenRow = memo<TokenRowProps>(({ token, onTokenClick }) => {
  const handleClick = () => onTokenClick(token);
  
  return (
    <div 
      className="flex items-center justify-between p-3 border-b border-border/50 hover:bg-muted/30 transition-colors cursor-pointer"
      onClick={handleClick}
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
  );
});

MemoizedTokenRow.displayName = 'MemoizedTokenRow';

interface TokenStocksListProps {
  title: string;
  tokens: Token[];
  onTokenClick: (token: Token) => void;
  onRefresh: () => void;
  onFilter: () => void;
}

export const MemoizedTokenStocksList = memo<TokenStocksListProps>(({ 
  title, 
  tokens, 
  onTokenClick, 
  onRefresh, 
  onFilter 
}) => {
  const sortedTokens = useMemo(() => {
    return [...tokens].sort((a, b) => b.marketCap - a.marketCap);
  }, [tokens]);

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">{title}</CardTitle>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={onRefresh}>
              <RefreshCw className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={onFilter}>
              <Filter className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="max-h-96 overflow-y-auto">
          {sortedTokens.map((token) => (
            <MemoizedTokenRow
              key={token.id}
              token={token}
              onTokenClick={onTokenClick}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
});

MemoizedTokenStocksList.displayName = 'MemoizedTokenStocksList';

interface StatsCardProps {
  title: string;
  value: string;
  change: string;
  description: string;
}

export const MemoizedStatsCard = memo<StatsCardProps>(({ title, value, change, description }) => {
  const isPositive = change.startsWith('+');
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold">{value}</span>
          <Badge variant={isPositive ? 'default' : 'destructive'}>
            {change}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground mt-1">{description}</p>
      </CardContent>
    </Card>
  );
});

MemoizedStatsCard.displayName = 'MemoizedStatsCard';

interface TokenTableRowProps {
  token: Token & { rank?: number };
  onTokenClick: (token: Token) => void;
  onWatchClick: (token: Token) => void;
}

export const MemoizedTokenTableRow = memo<TokenTableRowProps>(({ token, onTokenClick, onWatchClick }) => {
  const formatNumber = (num: number) => {
    if (num >= 1e9) return `${(num / 1e9).toFixed(1)}B`;
    if (num >= 1e6) return `${(num / 1e6).toFixed(1)}M`;
    if (num >= 1e3) return `${(num / 1e3).toFixed(1)}K`;
    return num.toString();
  };

  const handleTokenClick = () => onTokenClick(token);
  const handleWatchClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onWatchClick(token);
  };

  return (
    <tr 
      className="border-b border-border/30 hover:bg-muted/20 transition-colors cursor-pointer"
      onClick={handleTokenClick}
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
        <Button size="sm" variant="ghost" className="h-7 px-2 text-xs" onClick={handleWatchClick}>
          <Star className="w-3 h-3 mr-1" />
          Watch
        </Button>
      </td>
    </tr>
  );
});

MemoizedTokenTableRow.displayName = 'MemoizedTokenTableRow';