import { BlogAction, EBlogAction } from "@store/actions";
import { IBlogState, initialBlogState } from "@store/states";
import { selectBlogPost } from "@shared/helpers";
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
        blogPosts: selectBlogPost(blogPosts, NaN),
        loading: false,
      };
    }
    case EBlogAction.LoadBlogPostsError: return {...state, loading: false};

    case EBlogAction.CreateBlogPost: return {...state, loading: true};
    case EBlogAction.CreateBlogPostSuccess: return {...state, loading: true};
    case EBlogAction.CreateBlogPostError: return {...state, loading: false};

    case EBlogAction.UpdateBlogPost: return {...state, loading: true};
    case EBlogAction.UpdateBlogPostSuccess: return {...state, loading: true};
    case EBlogAction.UpdateBlogPostError: return {...state, loading: false};

    case EBlogAction.DeleteBlogPost: return {...state, loading: true};
    case EBlogAction.DeleteBlogPostSuccess: return {...state, loading: true};
    case EBlogAction.DeleteBlogPostError: return {...state, loading: false};

    case EBlogAction.SelectBlogPost: return {...state, blogPosts: selectBlogPost(state.blogPosts, action.payload)};
    case EBlogAction.ResetBlog: return initialBlogState;

    default: return state;
  }
}

