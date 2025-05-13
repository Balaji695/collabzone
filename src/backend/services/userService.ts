
import { User } from '@/types/user';

// Mock users data store
let users: User[] = [];

// Load any saved users from localStorage
const loadUsers = () => {
  try {
    const savedUsers = localStorage.getItem("collab-zone-users");
    if (savedUsers) {
      users = JSON.parse(savedUsers);
    }
  } catch (error) {
    console.error("Error loading users:", error);
  }
};

// Save users to localStorage
const saveUsers = () => {
  try {
    localStorage.setItem("collab-zone-users", JSON.stringify(users));
  } catch (error) {
    console.error("Error saving users:", error);
  }
};

// Initialize by loading existing users
loadUsers();

export const userService = {
  login: async (email: string, password: string): Promise<User> => {
    // Simulate authentication check
    const user = users.find(u => u.email === email);
    
    if (!user) {
      // For demo purposes, create a user if none exists
      const mockUser = {
        id: "user-" + Math.floor(Math.random() * 1000),
        username: email.split("@")[0],
        email,
        avatar: "/placeholder.svg",
      };
      
      users.push(mockUser);
      saveUsers();
      
      // Store current user
      localStorage.setItem("collab-zone-user", JSON.stringify(mockUser));
      return mockUser;
    }
    
    // Store current user
    localStorage.setItem("collab-zone-user", JSON.stringify(user));
    return user;
  },
  
  signup: async (username: string, email: string, password: string): Promise<User> => {
    // Check if user already exists
    if (users.some(u => u.email === email)) {
      throw new Error("User with this email already exists");
    }
    
    // Create new user
    const newUser = {
      id: "user-" + Math.floor(Math.random() * 1000),
      username,
      email,
      avatar: "/placeholder.svg",
    };
    
    users.push(newUser);
    saveUsers();
    
    // Store current user
    localStorage.setItem("collab-zone-user", JSON.stringify(newUser));
    return newUser;
  },
  
  getCurrentUser: async (): Promise<User | null> => {
    const savedUser = localStorage.getItem("collab-zone-user");
    if (savedUser) {
      return JSON.parse(savedUser);
    }
    return null;
  },
  
  logout: async (): Promise<void> => {
    localStorage.removeItem("collab-zone-user");
  },
  
  updateProfile: async (userId: string, userData: Partial<User>): Promise<User> => {
    const index = users.findIndex(u => u.id === userId);
    
    if (index === -1) {
      throw new Error(`User with id ${userId} not found`);
    }
    
    // Update user
    const updatedUser = {
      ...users[index],
      ...userData
    };
    
    users[index] = updatedUser;
    saveUsers();
    
    // If this is the current user, update their stored data too
    const currentUser = await userService.getCurrentUser();
    if (currentUser && currentUser.id === userId) {
      localStorage.setItem("collab-zone-user", JSON.stringify(updatedUser));
    }
    
    return updatedUser;
  },
  
  getUserById: async (userId: string): Promise<User | null> => {
    const user = users.find(u => u.id === userId);
    return user || null;
  },
  
  searchUsers: async (query: string): Promise<User[]> => {
    const lowercaseQuery = query.toLowerCase();
    return users.filter(u => 
      u.username.toLowerCase().includes(lowercaseQuery) || 
      u.email.toLowerCase().includes(lowercaseQuery)
    );
  }
};
