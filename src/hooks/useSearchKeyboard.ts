import { useState, useEffect, KeyboardEvent } from 'react';
import { SearchResult } from '@/types/search';

export function useSearchKeyboard(results: SearchResult[], onSelect: (result: SearchResult) => void) {
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  useEffect(() => {
    setHighlightedIndex(-1);
  }, [results]);

  const handleKeyDown = (e: KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex(prev => 
          prev < results.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex(prev => 
          prev > 0 ? prev - 1 : prev
        );
        break;
      case 'Enter':
        if (highlightedIndex >= 0 && results[highlightedIndex]) {
          onSelect(results[highlightedIndex]);
        }
        break;
      case 'Escape':
        setHighlightedIndex(-1);
        break;
    }
  };

  return {
    highlightedIndex,
    handleKeyDown
  };
}