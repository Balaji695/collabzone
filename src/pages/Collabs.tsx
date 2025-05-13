
import React, { useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import MainLayout from "@/layouts/MainLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CollabCard from "@/components/CollabCard";
import { mockCollabs } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";

const Collabs = () => {
  const { theme } = useTheme();
  
  // Simulate user's collabs
  const myCollabs = mockCollabs.slice(0, 2);
  const joinedCollabs = mockCollabs.slice(2, 4);
  
  const tabsClass = () => {
    switch (theme) {
      case "quantum":
        return "border-quantum-border";
      case "prism":
        return "border-prism-border";
      case "eclipse":
        return "border-eclipse-border";
      default:
        return "border-quantum-border";
    }
  };
  
  const tabsTriggerClass = () => {
    let selectedClass = "";
    switch (theme) {
      case "quantum":
        selectedClass = "bg-quantum-primary text-white";
        break;
      case "prism":
        selectedClass = "bg-prism-primary text-white";
        break;
      case "eclipse":
        selectedClass = "bg-eclipse-primary text-white";
        break;
      default:
        selectedClass = "bg-quantum-primary text-white";
    }
    return {
      selected: selectedClass,
      notSelected: "hover:bg-muted/50"
    };
  };
  
  const buttonClass = () => {
    switch (theme) {
      case "quantum":
        return "quantum-button";
      case "prism":
        return "prism-button";
      case "eclipse":
        return "eclipse-button";
      default:
        return "quantum-button";
    }
  };

  return (
    <MainLayout>
      <div className="py-12">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <h1 className="font-exo font-bold text-3xl md:text-4xl mb-4 md:mb-0">Your Collabs</h1>
          <Link to="/create">
            <Button className={`${buttonClass()} flex items-center gap-2`}>
              <Plus size={18} />
              <span>Create Collab</span>
            </Button>
          </Link>
        </div>
        
        <Tabs defaultValue="my-collabs" className={`border rounded-lg p-1 ${tabsClass()}`}>
          <TabsList className="w-full grid grid-cols-2">
            <TabsTrigger 
              value="my-collabs"
              className={`data-[state=active]:${tabsTriggerClass().selected} data-[state=inactive]:${tabsTriggerClass().notSelected}`}
            >
              My Collabs
            </TabsTrigger>
            <TabsTrigger 
              value="joined-collabs"
              className={`data-[state=active]:${tabsTriggerClass().selected} data-[state=inactive]:${tabsTriggerClass().notSelected}`}
            >
              Joined Collabs
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="my-collabs" className="pt-6">
            {myCollabs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {myCollabs.map(collab => (
                  <CollabCard key={collab.id} {...collab} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <p className="text-xl mb-4">You haven't created any collabs yet.</p>
                <Link to="/create">
                  <Button className={buttonClass()}>Start Your First Collab</Button>
                </Link>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="joined-collabs" className="pt-6">
            {joinedCollabs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {joinedCollabs.map(collab => (
                  <CollabCard key={collab.id} {...collab} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <p className="text-xl mb-4">You haven't joined any collabs yet.</p>
                <Link to="/explore">
                  <Button className={buttonClass()}>Explore Collabs</Button>
                </Link>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Collabs;
