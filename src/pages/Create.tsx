
import React from "react";
import { useTheme } from "@/context/ThemeContext";
import MainLayout from "@/layouts/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Upload, X, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Create = () => {
  const { theme } = useTheme();
  const { toast } = useToast();
  
  const formClass = () => {
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
        return "quantum-button";
      case "prism":
        return "prism-button";
      case "eclipse":
        return "eclipse-button";
      default:
        return "quantum-button";
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: "Collab created!",
      description: "Your new collaborative project has been created successfully.",
    });
  };

  return (
    <MainLayout>
      <div className="py-12">
        <h1 className="font-exo font-bold text-3xl md:text-4xl mb-8">Create a New Collab</h1>
        
        <div className={`p-6 md:p-8 rounded-lg ${formClass()}`}>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="title" className="block mb-2 font-medium">
                Collab Title
              </label>
              <Input
                id="title"
                placeholder="Give your collab a catchy title"
                required
                className={`w-full p-3 rounded border
                  ${theme === "quantum" ? "bg-quantum-background border-quantum-border" : ""}
                  ${theme === "prism" ? "bg-prism-background border-prism-border" : ""}
                  ${theme === "eclipse" ? "bg-eclipse-background border-eclipse-border" : ""}
                `}
              />
            </div>
            
            <div>
              <label htmlFor="description" className="block mb-2 font-medium">
                Description
              </label>
              <Textarea
                id="description"
                placeholder="Describe what you want to create and what kind of collaborators you're looking for"
                required
                rows={5}
                className={`w-full p-3 rounded border
                  ${theme === "quantum" ? "bg-quantum-background border-quantum-border" : ""}
                  ${theme === "prism" ? "bg-prism-background border-prism-border" : ""}
                  ${theme === "eclipse" ? "bg-eclipse-background border-eclipse-border" : ""}
                `}
              />
              <p className="text-xs text-muted-foreground mt-1">
                Markdown formatting supported. Max 2000 characters.
              </p>
            </div>
            
            <div>
              <label className="block mb-2 font-medium">
                Cover Image
              </label>
              <div className={`border-2 border-dashed rounded-lg p-8 text-center
                ${theme === "quantum" ? "border-quantum-border" : ""}
                ${theme === "prism" ? "border-prism-border" : ""}
                ${theme === "eclipse" ? "border-eclipse-border" : ""}
              `}>
                <Upload className="mx-auto mb-2" />
                <p>Drag & drop an image or click to browse</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Supports JPEG, PNG, WebP. Max size 5MB.
                </p>
                <Button type="button" variant="outline" className="mt-4">
                  Select Image
                </Button>
              </div>
            </div>
            
            <div>
              <label className="block mb-2 font-medium">
                Collab Categories
              </label>
              <div className="flex flex-wrap gap-2">
                <div className={`px-3 py-2 rounded-full text-sm flex items-center gap-2
                  ${theme === "quantum" ? "bg-quantum-primary/10 text-quantum-primary" : ""}
                  ${theme === "prism" ? "bg-prism-primary/10 text-prism-primary" : ""}
                  ${theme === "eclipse" ? "bg-eclipse-primary/10 text-eclipse-primary" : ""}
                `}>
                  Design
                  <button type="button">
                    <X size={16} />
                  </button>
                </div>
                <div className={`px-3 py-2 rounded-full text-sm flex items-center gap-2
                  ${theme === "quantum" ? "bg-quantum-primary/10 text-quantum-primary" : ""}
                  ${theme === "prism" ? "bg-prism-primary/10 text-prism-primary" : ""}
                  ${theme === "eclipse" ? "bg-eclipse-primary/10 text-eclipse-primary" : ""}
                `}>
                  Illustration
                  <button type="button">
                    <X size={16} />
                  </button>
                </div>
                <Button type="button" variant="outline" className="rounded-full flex items-center gap-2">
                  <Plus size={16} />
                  Add Category
                </Button>
              </div>
            </div>
            
            <div>
              <label className="block mb-2 font-medium">
                Collaboration Roles
              </label>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Input
                    placeholder="Role name (e.g., Writer, Designer)"
                    className={`
                      ${theme === "quantum" ? "bg-quantum-background border-quantum-border" : ""}
                      ${theme === "prism" ? "bg-prism-background border-prism-border" : ""}
                      ${theme === "eclipse" ? "bg-eclipse-background border-eclipse-border" : ""}
                    `}
                  />
                  <Button type="button" variant="ghost">
                    <X size={16} />
                  </Button>
                </div>
                <Button type="button" variant="outline" className="flex items-center gap-2">
                  <Plus size={16} />
                  Add Role
                </Button>
              </div>
            </div>
            
            <div className="pt-4">
              <Button type="submit" className={`${buttonClass()} w-full`}>
                Create Collab
              </Button>
            </div>
          </form>
        </div>
      </div>
    </MainLayout>
  );
};

export default Create;
