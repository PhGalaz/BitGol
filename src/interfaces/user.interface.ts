export interface IUser {
  id: number;
  name: string;
  last_name: string;
  email: string;
  role: {
    id: number;
    name: string;
  };
  status: {
    id: number;
    name: string;
  };
}

declare global {
  // eslint-disable-next-line no-unused-vars
  namespace Express {
    // eslint-disable-next-line no-unused-vars
    interface Request {
      currentUser?: IUser;
    }
  }
}
