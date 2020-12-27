import { BlogAction, EBlogAction } from "@store/actions";
import { IBlogState, initialBlogState } from "@store/states";
import { IBlogPost } from "@interfaces";

const EMPTY_BLOG_POST: IBlogPost = { id: 0, title: '', body: '', selected: false };

export function blogReducer(state: IBlogState = initialBlogState, action: BlogAction): IBlogState {
  switch (action.type) {

    case EBlogAction.LoadBlogPosts: return {...state, loading: true};
    case EBlogAction.LoadBlogPostsSuccess: {
      let blogPosts: IBlogPost[];
      if (!action.reload && state.blogPosts) {
        blogPosts = state.blogPosts.concat(action.payload);
      } else {
        blogPosts = [EMPTY_BLOG_POST].concat(action.payload);
      }
      return {
        ...state,
        blogPosts: blogPosts,
        loading: false,
      };
    }
    case EBlogAction.LoadBlogPostsError: return {...state, loading: false};

    case EBlogAction.ResetBlog: return initialBlogState;

    default: return state;
  }
}

