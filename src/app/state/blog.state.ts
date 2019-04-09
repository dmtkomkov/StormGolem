import { IBlogPost } from "@interfaces";

export interface IBlogState {
  blogPosts: IBlogPost[],
  selectedBlogPost: number;
}

export const initialBlogState: IBlogState = {
  blogPosts: null,
  selectedBlogPost: NaN,
};