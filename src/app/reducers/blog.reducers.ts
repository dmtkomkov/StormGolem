import { BlogAction, EBlogAction } from "../actions/blog.actions";
import { IBlogState, initialBlogState } from "../state/blog.state";

export const blogReducers = (
  state: IBlogState = initialBlogState,
  action: BlogAction
): IBlogState => {
  switch (action.type) {
    case EBlogAction.GetBlogPosts: {
      console.log('ACTION!!!');
      return {
        ...state,
        blogPosts: null,
        selectedBlogPost: NaN,
      }
    }
    case EBlogAction.GetBlogPostsSuccess: {
      return {
        ...state,
        blogPosts: action.payload,
        selectedBlogPost: NaN,
      }
    }
    default:
      return state;
  }
};