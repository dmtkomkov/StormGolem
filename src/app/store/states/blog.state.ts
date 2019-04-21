import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IBlogPost } from "@interfaces";

export interface IBlogState {
  blogPosts: IBlogPost[];
  loading: boolean;
}

export const initialBlogState: IBlogState = {
  blogPosts: null,
  loading: false,
};

export const blogSlice = createFeatureSelector<IBlogState>('blog');

export const blogPostsSlice = createSelector(
  blogSlice,
  (blogState: IBlogState) => blogState.blogPosts,
);