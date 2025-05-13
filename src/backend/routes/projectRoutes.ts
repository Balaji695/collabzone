
import { Project } from '@/types/project';
import { projectService } from '../services/projectService';

export const projectRoutes = {
  getAllProjects: async (): Promise<Project[]> => {
    return projectService.getAllProjects();
  },
  getProjectById: async (id: string): Promise<Project | null> => {
    return projectService.getProjectById(id);
  },
  createProject: async (project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>): Promise<Project> => {
    return projectService.createProject(project);
  },
  updateProject: async (id: string, project: Partial<Project>): Promise<Project> => {
    return projectService.updateProject(id, project);
  },
  deleteProject: async (id: string): Promise<boolean> => {
    return projectService.deleteProject(id);
  },
  getUserProjects: async (userId: string): Promise<Project[]> => {
    return projectService.getUserProjects(userId);
  },
  addCollaborator: async (projectId: string, userId: string): Promise<Project> => {
    return projectService.addCollaborator(projectId, userId);
  },
  removeCollaborator: async (projectId: string, userId: string): Promise<Project> => {
    return projectService.removeCollaborator(projectId, userId);
  },
  searchProjects: async (query: string): Promise<Project[]> => {
    return projectService.searchProjects(query);
  }
};
