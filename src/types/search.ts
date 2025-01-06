export interface SearchResult {
  id: string;
  title: string;
  synopsis: string;
  verified?: boolean;
  type: 'movie' | 'tv';
  year: string;
  poster?: string;
  rating?: number;
}

export interface SearchItemProps {
  result: SearchResult;
  onSelect: (result: SearchResult) => void;
  isHighlighted: boolean;
}