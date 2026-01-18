export interface User {
    id: string;
    name: string;
    email: string;
    avatar_url: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}