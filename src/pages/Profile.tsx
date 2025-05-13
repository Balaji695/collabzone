
import React from "react";
import { useTheme } from "@/context/ThemeContext";
import { useAuth } from "@/context/AuthContext";
import MainLayout from "@/layouts/MainLayout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CollabCard from "@/components/CollabCard";
import { mockCollabs } from "@/data/mockData";
import { Edit2, Settings, LogOut } from "lucide-react";

const Profile = () => {
  const { theme } = useTheme();
  const { user, logout } = useAuth();
  
  // Simulate user collabs
  const userCollabs = mockCollabs.slice(0, 3);
  
  const profileBoxClass = () => {
    switch (theme) {
      case "quantum":
        return "quantum-card";
      case "prism":
        return "prism-card";
      case "eclipse":
        return "eclipse-card";
      default:
        return "quantum-card";
    }
  };
  
  const buttonClass = () => {
    switch (theme) {
      case "quantum":
        return "bg-quantum-primary hover:bg-quantum-accent text-white";
      case "prism":
        return "bg-prism-primary hover:bg-prism-accent text-white";
      case "eclipse":
        return "bg-eclipse-primary hover:bg-eclipse-accent text-white";
      default:
        return "bg-quantum-primary hover:bg-quantum-accent text-white";
    }
  };
  
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

  const badgeClass = () => {
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
    <MainLayout>
      <div className="py-12">
        <div className={`rounded-lg overflow-hidden mb-8 ${profileBoxClass()}`}>
          <div className={`h-32 md:h-48
            ${theme === "quantum" ? "bg-quantum-grid bg-quantum-grid-size" : ""}
            ${theme === "prism" ? "bg-prism-gradient animate-grid-flow" : ""}
            ${theme === "eclipse" ? "bg-eclipse-metal" : ""}
          `} />
          
          <div className="p-6 relative">
            <div className="flex flex-col md:flex-row">
              <div className="relative -mt-16 md:-mt-20">
                <div className={`w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4
                  ${theme === "quantum" ? "border-quantum-background" : ""}
                  ${theme === "prism" ? "border-prism-background" : ""}
                  ${theme === "eclipse" ? "border-eclipse-background" : ""}
                `}>
                  <img
                    src={user?.avatar || "https://i.pravatar.cc/150?img=30"}
                    alt={user?.username || "User"}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              <div className="mt-4 md:mt-0 md:ml-6 flex flex-col md:flex-row justify-between w-full">
                <div>
                  <h1 className="text-2xl font-bold font-exo">{user?.username || "User"}</h1>
                  <p className="text-muted-foreground">{user?.email || "user@example.com"}</p>
                  
                  <div className="flex flex-wrap gap-2 mt-3">
                    <span className={`px-3 py-1 rounded-full text-sm ${badgeClass()}`}>
                      Artist
                    </span>
                    <span className={`px-3 py-1 rounded-full text-sm ${badgeClass()}`}>
                      Designer
                    </span>
                    <span className={`px-3 py-1 rounded-full text-sm ${badgeClass()}`}>
                      Developer
                    </span>
                  </div>
                </div>
                
                <div className="flex gap-2 mt-4 md:mt-0">
                  <Button variant="outline" size="sm" className="rounded-full">
                    <Edit2 size={16} className="mr-1" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" className="rounded-full">
                    <Settings size={16} className="mr-1" />
                    Settings
                  </Button>
                  <Button variant="outline" size="sm" className="rounded-full" onClick={logout}>
                    <LogOut size={16} className="mr-1" />
                    Logout
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 text-center">
              <div>
                <p className="text-2xl font-bold">{userCollabs.length}</p>
                <p className="text-sm text-muted-foreground">Collabs</p>
              </div>
              <div>
                <p className="text-2xl font-bold">124</p>
                <p className="text-sm text-muted-foreground">Contributions</p>
              </div>
              <div>
                <p className="text-2xl font-bold">48</p>
                <p className="text-sm text-muted-foreground">Following</p>
              </div>
              <div>
                <p className="text-2xl font-bold">217</p>
                <p className="text-sm text-muted-foreground">Followers</p>
              </div>
            </div>
          </div>
        </div>
        
        <Tabs defaultValue="collabs" className={`border rounded-lg p-1 ${tabsClass()}`}>
          <TabsList className="grid grid-cols-3">
            <TabsTrigger 
              value="collabs"
              className={`data-[state=active]:${tabsTriggerClass().selected} data-[state=inactive]:${tabsTriggerClass().notSelected}`}
            >
              Collabs
            </TabsTrigger>
            <TabsTrigger 
              value="portfolio"
              className={`data-[state=active]:${tabsTriggerClass().selected} data-[state=inactive]:${tabsTriggerClass().notSelected}`}
            >
              Portfolio
            </TabsTrigger>
            <TabsTrigger 
              value="activity"
              className={`data-[state=active]:${tabsTriggerClass().selected} data-[state=inactive]:${tabsTriggerClass().notSelected}`}
            >
              Activity
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="collabs" className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userCollabs.map(collab => (
                <CollabCard key={collab.id} {...collab} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="portfolio" className="pt-6">
            <p className="text-center py-8 text-muted-foreground">Portfolio items will be displayed here.</p>
          </TabsContent>
          
          <TabsContent value="activity" className="pt-6">
            <p className="text-center py-8 text-muted-foreground">Recent activity will be displayed here.</p>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Profile;
