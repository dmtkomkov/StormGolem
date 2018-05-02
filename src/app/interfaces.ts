export interface User {
  username: string;
  first_name: string;
  last_name: string;
  email: string;
}

export interface LoginUser {
  username: string;
  password: string;
}

export interface Token {
  token: string;
}
