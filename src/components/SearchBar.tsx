import { useState, useCallback } from "react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useDebounce } from "@/hooks/useDebounce";

interface SearchResult {
  id: string;
  title: string;
  synopsis: string;
  verified?: boolean;
  type: 'movie' | 'tv';
  year: string;
}

// Enhanced mock data with popular shows and movies
const mockResults: SearchResult[] = [
  {
    id: "1",
    title: "House MD",
    synopsis: "An antisocial maverick doctor who specializes in diagnostic medicine does whatever it takes to solve puzzling cases that come his way using his crack team of doctors and his wits.",
    verified: true,
    type: 'tv',
    year: '2004'
  },
  {
    id: "2",
    title: "I, Robot",
    synopsis: "In 2035, a technophobic cop investigates a crime that may have been perpetrated by a robot, which leads to a larger threat to humanity. Starring Will Smith.",
    verified: true,
    type: 'movie',
    year: '2004'
  },
  {
    id: "3",
    title: "Breaking Bad",
    synopsis: "A high school chemistry teacher turned methamphetamine manufacturer partners with a former student to secure his family's financial future.",
    verified: true,
    type: 'tv',
    year: '2008'
  },
  {
    id: "4",
    title: "Stranger Things",
    synopsis: "When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces, and one strange little girl.",
    verified: true,
    type: 'tv',
    year: '2016'
  },
  {
    id: "5",
    title: "The Crown",
    synopsis: "This drama follows the political rivalries and romance of Queen Elizabeth II's reign and the events that shaped the second half of the 20th century.",
    verified: true,
    type: 'tv',
    year: '2016'
  },
  {
    id: "6",
    title: "House of Cards",
    synopsis: "A Congressman works with his equally conniving wife to exact revenge on the people who betrayed him.",
    verified: true,
    type: 'tv',
    year: '2013'
  }
];

export function SearchBar() {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Debounce search query to prevent too many API calls
  const debouncedSearch = useDebounce(searchQuery, 300);

  const handleSearch = useCallback(async (query: string) => {
    setSearchQuery(query);
    
    if (!query) {
      setResults([]);
      return;
    }
    
    setIsLoading(true);
    console.log("Searching for:", query);
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Enhanced search logic with better matching
      const filtered = mockResults.filter(result => {
        const searchLower = query.toLowerCase();
        const titleLower = result.title.toLowerCase();
        const synopsisLower = result.synopsis.toLowerCase();
        
        return titleLower.includes(searchLower) || 
               synopsisLower.includes(searchLower);
      });
      
      setResults(filtered);
    } catch (error) {
      console.error("Search error:", error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <Command className="rounded-lg border shadow-md bg-white">
      <CommandInput
        placeholder="Search shows and movies..."
        value={searchQuery}
        onValueChange={handleSearch}
        className="h-14"
      />
      
      <CommandList>
        <AnimatePresence mode="wait">
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center justify-center p-4"
            >
              <Loader2 className="h-6 w-6 animate-spin text-purple-600" />
            </motion.div>
          )}
          
          {!isLoading && results.length === 0 && searchQuery && (
            <CommandEmpty className="p-4 text-center text-sm text-gray-500">
              No results found. Try a different search term.
            </CommandEmpty>
          )}
          
          {!isLoading && results.length > 0 && (
            <CommandGroup heading="Search Results" className="max-h-[300px] overflow-auto">
              {results.map((result) => (
                <motion.div
                  key={result.id}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                >
                  <CommandItem
                    value={result.title}
                    className="px-4 py-3 cursor-pointer hover:bg-purple-50"
                  >
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{result.title}</span>
                        <span className="text-sm text-gray-500">({result.year})</span>
                        <span className="px-2 py-0.5 text-xs bg-purple-100 text-purple-700 rounded-full">
                          {result.type}
                        </span>
                        {result.verified && (
                          <span className="px-2 py-0.5 text-xs bg-green-100 text-green-700 rounded-full">
                            Verified
                          </span>
                        )}
                      </div>
                      <span className="text-sm text-gray-600 line-clamp-2">
                        {result.synopsis}
                      </span>
                    </div>
                  </CommandItem>
                </motion.div>
              ))}
            </CommandGroup>
          )}
        </AnimatePresence>
      </CommandList>
    </Command>
  );
}