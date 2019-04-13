import {BlogAction, EBlogAction} from "../actions/blog.actions";
import {IBlogState, initialBlogState} from "../states/blog.state";
import {selectBlogPost} from "../helpers/blog.helpers";
import {IBlogPost} from "@interfaces";

export const blogReducer = (
  state: IBlogState = initialBlogState,
  action: BlogAction
): IBlogState => {
  switch (action.type) {
    case EBlogAction.LoadBlogPosts: {
      return {
        ...state,
        loading: true,
      }
    }
    case EBlogAction.LoadBlogPostsSuccess: {
      return {
        ...state,
        blogPosts: action.payload,
        loading: false,
      }
    }
    case EBlogAction.LoadBlogPostsError: {
      return {
        ...state,
        blogPosts: null,
        loading: false,
      }
    }
    case EBlogAction.SelectBlogPost: {
      const newBlogPosts: IBlogPost[] = state.blogPosts? selectBlogPost(state.blogPosts, action.payload): null;
      return {
        ...state,
        blogPosts: newBlogPosts,
      }
    }
    default:
      return state;
  }
};