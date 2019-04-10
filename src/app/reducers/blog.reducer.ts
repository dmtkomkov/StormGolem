import {BlogAction, EBlogAction} from "../actions/blog.actions";
import {IBlogState, initialBlogState} from "../states/blog.state";

export const blogReducer = (
  state: IBlogState = initialBlogState,
  action: BlogAction
): IBlogState => {
  switch (action.type) {
    case EBlogAction.GetBlogPosts: {
      console.log(EBlogAction.GetBlogPosts);
      return {
        ...state,
        blogPosts: null,
        selectedBlogPost: NaN,
      }
    }
    case EBlogAction.GetBlogPostsSuccess: {
      console.log(EBlogAction.GetBlogPostsSuccess);
      return {
        ...state,
        blogPosts: action.payload,
        selectedBlogPost: NaN,
      }
    }
    case EBlogAction.GetBlogPostsError: {
      console.log(EBlogAction.GetBlogPostsError);
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