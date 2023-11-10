export interface User {
  id: number;
  username: string;
  email: string;
  isVerified: boolean;
  profilePic: string;
  dob: string;
  first_name: string;
  last_name: string;
}

export interface LoginState {
  loading: boolean;
  user: User;
  token: string;
  error: string;
  tokenSuccess: boolean;
  userSuccess: boolean;
  status: number;
}
