
import { User } from '@/types/user';
import { userService } from '../services/userService';

export const userRoutes = {
  login: async (email: string, password: string): Promise<User> => {
    return userService.login(email, password);
  },
  signup: async (username: string, email: string, password: string): Promise<User> => {
    return userService.signup(username, email, password);
  },
  getCurrentUser: async (): Promise<User | null> => {
    return userService.getCurrentUser();
  },
  logout: async (): Promise<void> => {
    return userService.logout();
  },
  updateProfile: async (userId: string, userData: Partial<User>): Promise<User> => {
    return userService.updateProfile(userId, userData);
  },
  getUserById: async (userId: string): Promise<User | null> => {
    return userService.getUserById(userId);
  },
  searchUsers: async (query: string): Promise<User[]> => {
    return userService.searchUsers(query);
  }
};
