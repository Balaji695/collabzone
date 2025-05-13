
import React, { useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import MainLayout from "@/layouts/MainLayout";
import CollabCard from "@/components/CollabCard";
import { mockCollabs } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Search, Filter, Flame, TrendingUp, Star } from "lucide-react";
import { Input } from "@/components/ui/input";

const Explore = () => {
  const { theme } = useTheme();
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  
  const filterClass = (filterName: string) => {
    let baseClass = "flex items-center gap-2 ";
    
    if (filter === filterName) {
      switch (theme) {
        case "quantum":
          return baseClass + "quantum-button";
        case "prism":
          return baseClass + "prism-button";
        case "eclipse":
          return baseClass + "eclipse-button";
        default:
          return baseClass + "quantum-button";
      }
    } else {
      return baseClass + "bg-opacity-20 text-foreground";
    }
  };
  
  const filteredCollabs = mockCollabs.filter(collab => 
    collab.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    collab.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    collab.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  
  return (
    <MainLayout>
      <div className="py-12">
        <h1 className="font-exo font-bold text-3xl md:text-4xl mb-8">Explore Collabs</h1>
        
        <div className={`p-4 rounded-lg mb-8 
          ${theme === "quantum" ? "quantum-card" : ""} 
          ${theme === "prism" ? "prism-card" : ""} 
          ${theme === "eclipse" ? "eclipse-card" : ""}
        `}>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search collabs, creators, or tags..."
                className={`pl-10 w-full
                  ${theme === "quantum" ? "bg-quantum-background border-quantum-border" : ""}
                  ${theme === "prism" ? "bg-prism-background border-prism-border" : ""}
                  ${theme === "eclipse" ? "bg-eclipse-background border-eclipse-border" : ""}
                `}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button className="flex items-center gap-2">
              <Filter size={18} />
              <span>Filters</span>
            </Button>
          </div>
          
          <div className="flex flex-wrap gap-2 mt-4">
            <Button className={filterClass("all")} onClick={() => setFilter("all")}>
              All
            </Button>
            <Button className={filterClass("trending")} onClick={() => setFilter("trending")}>
              <TrendingUp size={18} />
              <span>Trending</span>
            </Button>
            <Button className={filterClass("popular")} onClick={() => setFilter("popular")}>
              <Star size={18} />
              <span>Popular</span>
            </Button>
            <Button className={filterClass("recent")} onClick={() => setFilter("recent")}>
              <Flame size={18} />
              <span>Recent</span>
            </Button>
          </div>
        </div>
        
        {filteredCollabs.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <p className="text-xl mb-4">No collabs found matching your search criteria.</p>
            <Button onClick={() => setSearchTerm("")}>Clear Search</Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCollabs.map(collab => (
              <CollabCard key={collab.id} {...collab} />
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Explore;
