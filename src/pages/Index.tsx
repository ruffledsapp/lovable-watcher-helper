import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-purple-100">
      {/* Header */}
      <header className="fixed top-0 w-full bg-white/80 backdrop-blur-sm border-b border-purple-100 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
            Watcher.my
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm">
              Login
            </Button>
            <Button>Sign Up</Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
              Discover Your Next Watch
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Search and organize your favorite shows and movies in one place
            </p>
            
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto">
              <Input
                type="text"
                placeholder="Search for shows, movies, and more..."
                className="w-full h-14 pl-5 pr-12 rounded-full border-2 border-purple-200 focus:border-purple-400 transition-colors"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button 
                type="submit"
                size="icon"
                className="absolute right-2 top-2 rounded-full"
              >
                <Search className="h-5 w-5" />
              </Button>
            </form>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-8 mt-20">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

const features = [
  {
    title: "Smart Search",
    description: "Find exactly what you want to watch with our intelligent search system",
    icon: Search
  },
  {
    title: "Organize",
    description: "Keep track of your watchlist and organize your favorite content",
    icon: Search
  },
  {
    title: "Discover",
    description: "Get personalized recommendations based on your taste",
    icon: Search
  }
];

export default Index;