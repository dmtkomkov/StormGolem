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

export interface Post {
  title: string;
  body: string;
  created: Date;
}

export interface BlogPage {
  results: Post[];
  page_size: number;
  count: number;
  page_count: number;
  page_number: number;
}
