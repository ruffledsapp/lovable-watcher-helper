import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useState, useEffect } from "react";
import { SearchBar } from "@/components/SearchBar";

const Index = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-purple-100">
      {/* Header */}
      <header className="fixed top-0 w-full bg-white/80 backdrop-blur-sm border-b border-purple-100 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
              (my) watcher
            </div>
            <span className="text-sm text-gray-600 hidden md:inline">
              what makes us different
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm">
              login
            </Button>
            <Button>
              jump in
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
                We find your
              </span>
              <span 
                className={`block mt-2 transition-all duration-1000 transform ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
              >
                Next Watch
              </span>
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Search and organize your favorite shows and movies in one place
            </p>
            
            {/* Search Section */}
            <div className="max-w-2xl mx-auto">
              <SearchBar />
            </div>
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