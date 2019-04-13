export interface IUser {
  username: string;
  first_name: string;
  last_name: string;
  email: string;
}

export interface ILoginUser {
  username: string;
  password: string;
}

export interface IToken {
  token: string;
}

export interface IBlogPost {
  id?: number;
  title: string;
  body: string;
  created?: Date;
  selected?: boolean;
}

export interface IBlogPage {
  results: IBlogPost[];
  page_size: number;
  count: number;
  page_count: number;
  page_number: number;
}

export interface ITokenDto {
  username: string;
  user_id: number;
  email: string;
  orig_iat: number;
  exp: number;
}
