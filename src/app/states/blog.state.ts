import { IBlogPost } from "@interfaces";

export interface IBlogState {
  blogPosts: IBlogPost[];
  loading: boolean;
}

export const initialBlogState: IBlogState = {
  blogPosts: null,
  loading: false,
};