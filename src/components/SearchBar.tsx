import { useState } from "react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchResult {
  id: string;
  title: string;
  synopsis: string;
}

// Mock data - replace with actual API call later
const mockResults: SearchResult[] = [
  {
    id: "1",
    title: "Breaking Bad",
    synopsis: "A high school chemistry teacher turned methamphetamine manufacturer partners with a former student to secure his family's financial future."
  },
  {
    id: "2",
    title: "Stranger Things",
    synopsis: "When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces, and one strange little girl."
  },
  {
    id: "3",
    title: "The Crown",
    synopsis: "This drama follows the political rivalries and romance of Queen Elizabeth II's reign and the events that shaped the second half of the 20th century."
  }
];

export function SearchBar() {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);

  const handleSearch = async (query: string) => {
    console.log("Searching for:", query);
    setIsLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Filter mock results - replace with actual API call
    const filtered = mockResults.filter(result => 
      result.title.toLowerCase().includes(query.toLowerCase())
    );
    
    setResults(filtered);
    setIsLoading(false);
  };

  return (
    <Command className="rounded-lg border shadow-md bg-white">
      <CommandInput
        placeholder="Search shows and movies..."
        onValueChange={handleSearch}
        className="h-14"
      />
      
      {isLoading && (
        <div className="flex items-center justify-center p-4">
          <Loader2 className="h-6 w-6 animate-spin text-purple-600" />
        </div>
      )}
      
      <CommandEmpty className="p-4 text-center text-sm text-gray-500">
        No results found.
      </CommandEmpty>
      
      <CommandGroup className="max-h-[300px] overflow-auto">
        {results.map((result) => (
          <CommandItem
            key={result.id}
            value={result.title}
            className="px-4 py-3 cursor-pointer hover:bg-purple-50"
          >
            <div className="flex flex-col gap-1">
              <span className="font-medium">{result.title}</span>
              <span className="text-sm text-gray-600 line-clamp-2">
                {result.synopsis}
              </span>
            </div>
          </CommandItem>
        ))}
      </CommandGroup>
    </Command>
  );
}