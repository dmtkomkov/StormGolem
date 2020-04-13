import { BlogAction, EBlogAction } from "@store/actions";
import { IBlogState, initialBlogState } from "@store/states";
import { selectBlogPost } from "@shared/helpers";

export function blogReducer(state: IBlogState = initialBlogState, action: BlogAction): IBlogState {
  switch (action.type) {

    case EBlogAction.LoadBlogPosts: return {...state, loading: true};
    case EBlogAction.LoadBlogPostsSuccess: return {
      blogPosts: state.blogPosts && !action.reload ? state.blogPosts.concat(action.payload.slice(1)) : action.payload,
      loading: false
    };
    case EBlogAction.LoadBlogPostsError: return initialBlogState;

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

