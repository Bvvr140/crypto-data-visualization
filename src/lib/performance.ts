import React, { memo, useMemo, useCallback } from 'react';

// Performance monitoring utilities
export const measurePerformance = (name: string, fn: () => void) => {
  if (typeof window !== 'undefined' && window.performance) {
    const start = performance.now();
    fn();
    const end = performance.now();
    console.log(`${name} took ${end - start} milliseconds`);
  } else {
    fn();
  }
};

// Debounce utility for search and filtering
export const useDebounce = <T extends (...args: unknown[]) => unknown>(
  callback: T,
  delay: number
): T => {
  return useCallback(
    (...args: Parameters<T>) => {
      const timeoutId = setTimeout(() => callback(...args), delay);
      return () => clearTimeout(timeoutId);
    },
    [callback, delay]
  ) as T;
};

// Throttle utility for scroll events
export const useThrottle = <T extends (...args: unknown[]) => unknown>(
  callback: T,
  delay: number
): T => {
  const lastCallRef = React.useRef(0);
  return useCallback(
    (...args: Parameters<T>) => {
      const now = Date.now();
      if (now - lastCallRef.current >= delay) {
        lastCallRef.current = now;
        return callback(...args);
      }
      return undefined;
    },
    [callback, delay]
  ) as T;
};

// Virtual scrolling hook for large lists
export const useVirtualScroll = (
  items: unknown[],
  itemHeight: number,
  containerHeight: number
) => {
  return useMemo(() => {
    const visibleCount = Math.ceil(containerHeight / itemHeight);
    const buffer = Math.floor(visibleCount / 2);
    
    return {
      visibleCount: visibleCount + buffer * 2,
      startIndex: 0, // This would be calculated based on scroll position
      endIndex: Math.min(visibleCount + buffer * 2, items.length),
    };
  }, [items.length, itemHeight, containerHeight]);
};

// Memoization helper for expensive calculations
export const useMemoizedCalculation = <T>(
  calculation: () => T,
  dependencies: React.DependencyList
): T => {
  return useMemo(() => calculation(), dependencies);
};

// Performance-optimized component wrapper
export const withPerformanceOptimization = <P extends object>(
  Component: React.ComponentType<P>,
  displayName?: string
) => {
  const OptimizedComponent = memo(Component);
  OptimizedComponent.displayName = displayName || Component.displayName || Component.name;
  return OptimizedComponent;
};

// Intersection Observer hook for lazy loading
export const useIntersectionObserver = (
  callback: (entries: IntersectionObserverEntry[]) => void,
  options?: IntersectionObserverInit
) => {
  const observer = useMemo(() => {
    if (typeof window === 'undefined') return null;
    
    return new IntersectionObserver(callback, {
      threshold: 0.1,
      rootMargin: '50px',
      ...options,
    });
  }, [callback, options]);

  return observer;
};

// Image lazy loading utility
export const useLazyImage = (src: string, placeholder?: string) => {
  const [imageSrc, setImageSrc] = React.useState(placeholder || '');
  const [isLoaded, setIsLoaded] = React.useState(false);

  React.useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setImageSrc(src);
      setIsLoaded(true);
    };
    img.src = src;
  }, [src]);

  return { imageSrc, isLoaded };
};

// Bundle size optimization - dynamic imports
export const loadComponent = (importFn: () => Promise<{ default: React.ComponentType<any> }>) => {
  return React.lazy(importFn);
};

// Performance metrics collection
export const collectPerformanceMetrics = () => {
  if (typeof window === 'undefined' || !window.performance) return null;

  const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
  const paint = performance.getEntriesByType('paint');

  return {
    // Core Web Vitals
    FCP: paint.find(entry => entry.name === 'first-contentful-paint')?.startTime || 0,
    LCP: 0, // Would need to be measured with PerformanceObserver
    CLS: 0, // Would need to be measured with PerformanceObserver
    FID: 0, // Would need to be measured with PerformanceObserver
    
    // Navigation timing
    domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
    loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
    
    // Resource timing
    totalLoadTime: navigation.loadEventEnd - navigation.fetchStart,
    dnsLookup: navigation.domainLookupEnd - navigation.domainLookupStart,
    tcpConnection: navigation.connectEnd - navigation.connectStart,
    serverResponse: navigation.responseEnd - navigation.requestStart,
  };
};