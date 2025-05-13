
import { Project } from '@/types/project';
import { userService } from './userService';

// Mock projects data store
let projects: Project[] = [
  {
    id: "project-1",
    title: "UI Design System",
    description: "A comprehensive design system for web applications",
    tags: ["design", "ui", "system"],
    owner: "user-123",
    collaborators: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "project-2",
    title: "E-commerce Platform",
    description: "An online marketplace with payment integration",
    tags: ["ecommerce", "payment", "web"],
    owner: "user-123",
    collaborators: ["user-456"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

// Load projects from localStorage
const loadProjects = () => {
  try {
    const savedProjects = localStorage.getItem("collab-zone-projects");
    if (savedProjects) {
      projects = JSON.parse(savedProjects);
    }
  } catch (error) {
    console.error("Error loading projects:", error);
  }
};

// Save projects to localStorage
const saveProjects = () => {
  try {
    localStorage.setItem("collab-zone-projects", JSON.stringify(projects));
  } catch (error) {
    console.error("Error saving projects:", error);
  }
};

// Initialize by loading existing projects
loadProjects();

export const projectService = {
  getAllProjects: async (): Promise<Project[]> => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 300));
    return [...projects];
  },
  
  getProjectById: async (id: string): Promise<Project | null> => {
    await new Promise(resolve => setTimeout(resolve, 200));
    return projects.find(p => p.id === id) || null;
  },
  
  createProject: async (project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>): Promise<Project> => {
    const timestamp = new Date().toISOString();
    
    const newProject = {
      ...project,
      id: `project-${Date.now()}`,
      createdAt: timestamp,
      updatedAt: timestamp
    };
    
    projects.push(newProject);
    saveProjects();
    return newProject;
  },
  
  updateProject: async (id: string, projectUpdate: Partial<Project>): Promise<Project> => {
    const index = projects.findIndex(p => p.id === id);
    if (index === -1) {
      throw new Error(`Project with id ${id} not found`);
    }
    
    const updatedProject = {
      ...projects[index],
      ...projectUpdate,
      updatedAt: new Date().toISOString()
    };
    
    projects[index] = updatedProject;
    saveProjects();
    return updatedProject;
  },
  
  deleteProject: async (id: string): Promise<boolean> => {
    const initialLength = projects.length;
    projects = projects.filter(p => p.id !== id);
    
    if (projects.length < initialLength) {
      saveProjects();
      return true;
    }
    
    return false;
  },
  
  getUserProjects: async (userId: string): Promise<Project[]> => {
    return projects.filter(p => 
      p.owner === userId || p.collaborators.includes(userId)
    );
  },
  
  addCollaborator: async (projectId: string, userId: string): Promise<Project> => {
    // First check if user exists
    const user = await userService.getUserById(userId);
    if (!user) {
      throw new Error(`User with id ${userId} not found`);
    }
    
    const index = projects.findIndex(p => p.id === projectId);
    if (index === -1) {
      throw new Error(`Project with id ${projectId} not found`);
    }
    
    // Check if user is already a collaborator
    if (projects[index].collaborators.includes(userId)) {
      return projects[index];
    }
    
    // Add collaborator
    const updatedProject = {
      ...projects[index],
      collaborators: [...projects[index].collaborators, userId],
      updatedAt: new Date().toISOString()
    };
    
    projects[index] = updatedProject;
    saveProjects();
    return updatedProject;
  },
  
  removeCollaborator: async (projectId: string, userId: string): Promise<Project> => {
    const index = projects.findIndex(p => p.id === projectId);
    if (index === -1) {
      throw new Error(`Project with id ${projectId} not found`);
    }
    
    // Remove collaborator
    const updatedProject = {
      ...projects[index],
      collaborators: projects[index].collaborators.filter(id => id !== userId),
      updatedAt: new Date().toISOString()
    };
    
    projects[index] = updatedProject;
    saveProjects();
    return updatedProject;
  },
  
  searchProjects: async (query: string): Promise<Project[]> => {
    const lowercaseQuery = query.toLowerCase();
    return projects.filter(p => 
      p.title.toLowerCase().includes(lowercaseQuery) || 
      p.description.toLowerCase().includes(lowercaseQuery) || 
      p.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
    );
  }
};
