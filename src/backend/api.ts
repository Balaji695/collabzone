
import { routes } from './routes';

// Central API client that applications will use to access backend functionality
export const api = {
  user: routes.user,
  project: routes.project
};
