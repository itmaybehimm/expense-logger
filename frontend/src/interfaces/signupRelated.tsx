export interface SignupState {
  loading: boolean;
  error: string;
  success: boolean;
  status: number;
}

export interface SignupFormData {
  username: string;
  password: string;
  dob: string;
  email: string;
  profile_pic: File | undefined;
  first_name: string;
  last_name: string;
}
