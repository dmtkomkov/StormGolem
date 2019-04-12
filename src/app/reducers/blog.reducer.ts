import {BlogAction, EBlogAction} from "../actions/blog.actions";
import {IBlogState, initialBlogState} from "../states/blog.state";

export const blogReducer = (
  state: IBlogState = initialBlogState,
  action: BlogAction
): IBlogState => {
  switch (action.type) {
    case EBlogAction.LoadBlogPosts: {
      console.log(EBlogAction.LoadBlogPosts);
      return {
        ...state,
        selectedBlogPost: NaN,
      }
    }
    case EBlogAction.LoadBlogPostsSuccess: {
      console.log(EBlogAction.LoadBlogPostsSuccess);
      return {
        ...state,
        blogPosts: action.payload,
        selectedBlogPost: NaN,
      }
    }
    case EBlogAction.LoadBlogPostsError: {
      console.log(EBlogAction.LoadBlogPostsError);
      return {
        ...state,
        blogPosts: null,
        selectedBlogPost: NaN,
      }
    }
    default:
      return state;
  }
};