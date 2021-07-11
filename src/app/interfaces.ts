export enum EAnimation {
  FLY = 'Fly',
  FOCUS = 'Focus',
  SLIDE = 'Slide'
}

export interface Page<T> {
  results: T[];
  page_size: number;
  count: number;
  page_count: number;
  page_number: number;
}

export interface IUser {
  username?: string;
  first_name: string;
  last_name: string;
  email?: string;
  user_icon? : string;
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
  user?: IUser;
}

export type IBlogPage = Page<IBlogPost>;

export interface IBlogPostAction {
  name: string;
  payload: IBlogPost;
}
