
import React, { useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import { Users, MessageSquare, Star, Share2 } from "lucide-react";
import { Link } from "react-router-dom";

interface CollabCardProps {
  id: string;
  title: string;
  description: string;
  image?: string;
  author: {
    name: string;
    avatar: string;
  };
  contributors: number;
  comments: number;
  stars: number;
  tags: string[];
}

const CollabCard: React.FC<CollabCardProps> = ({
  id,
  title,
  description,
  image,
  author,
  contributors,
  comments,
  stars,
  tags,
}) => {
  const { theme } = useTheme();
  const [isHovered, setIsHovered] = useState(false);
  
  const cardClass = () => {
    switch (theme) {
      case "quantum":
        return `quantum-card ${isHovered ? "quantum-glow" : ""}`;
      case "prism":
        return `prism-card ${isHovered ? "prism-glow" : ""}`;
      case "eclipse":
        return `eclipse-card ${isHovered ? "eclipse-glow" : ""}`;
      default:
        return "quantum-card";
    }
  };
  
  const tagClass = () => {
    switch (theme) {
      case "quantum":
        return "bg-quantum-primary/20 text-quantum-primary";
      case "prism":
        return "bg-prism-primary/20 text-prism-primary";
      case "eclipse":
        return "bg-eclipse-primary/20 text-eclipse-primary";
      default:
        return "bg-quantum-primary/20 text-quantum-primary";
    }
  };

  return (
    <Link to={`/collabs/${id}`}>
      <div
        className={`${cardClass()} transform transition-all duration-500 ease-in-out ${isHovered ? "scale-[1.02]" : ""}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative">
          {image ? (
            <img 
              src={image} 
              alt={title} 
              className="w-full h-48 object-cover object-center"
            />
          ) : (
            <div className={`w-full h-48 flex items-center justify-center
              ${theme === "quantum" ? "bg-quantum-primary/20" : ""}
              ${theme === "prism" ? "bg-prism-gradient" : ""}
              ${theme === "eclipse" ? "bg-eclipse-metal" : ""}
            `}>
              <h3 className="text-2xl font-exo font-bold">{title.substring(0, 1)}</h3>
            </div>
          )}
          
          <div className="absolute top-3 right-3 px-2 py-1 rounded text-xs font-medium bg-black/50 backdrop-blur-sm flex items-center space-x-1">
            <Users size={12} />
            <span>{contributors}</span>
          </div>
        </div>
        
        <div className="p-4">
          <div className="flex items-center mb-3">
            <img src={author.avatar} alt={author.name} className="w-8 h-8 rounded-full mr-2" />
            <span className="text-sm">{author.name}</span>
          </div>
          
          <h3 className="font-exo font-bold text-xl mb-2">{title}</h3>
          <p className="text-sm mb-4 opacity-80 line-clamp-2">{description}</p>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.slice(0, 3).map((tag) => (
              <span key={tag} className={`text-xs px-2 py-1 rounded-full ${tagClass()}`}>
                {tag}
              </span>
            ))}
          </div>
          
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <MessageSquare size={14} className="mr-1" />
                <span>{comments}</span>
              </div>
              <div className="flex items-center">
                <Star size={14} className="mr-1" />
                <span>{stars}</span>
              </div>
            </div>
            <div>
              <Share2 size={14} />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CollabCard;
