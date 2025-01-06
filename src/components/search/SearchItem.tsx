import { SearchItemProps } from "@/types/search";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

export function SearchItem({ result, onSelect, isHighlighted }: SearchItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -5 }}
      className={`px-4 py-3 cursor-pointer ${
        isHighlighted ? "bg-purple-50" : "hover:bg-purple-50"
      }`}
      onClick={() => onSelect(result)}
    >
      <div className="flex gap-3">
        {result.poster && (
          <img
            src={result.poster}
            alt={result.title}
            className="w-12 h-16 object-cover rounded"
          />
        )}
        <div className="flex flex-col gap-1 flex-1">
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
            {result.rating && (
              <div className="flex items-center gap-1 text-yellow-500">
                <Star size={14} fill="currentColor" />
                <span className="text-xs">{result.rating}</span>
              </div>
            )}
          </div>
          <span className="text-sm text-gray-600 line-clamp-2">
            {result.synopsis}
          </span>
        </div>
      </div>
    </motion.div>
  );
}