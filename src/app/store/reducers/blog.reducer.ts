import {BlogAction, EBlogAction} from "../actions/blog.actions";
import {IBlogState, initialBlogState} from "../states/blog.state";
import {selectBlogPost} from "../../shared/helpers/blog.helpers";

export const blogReducer = (state: IBlogState = initialBlogState, action: BlogAction): IBlogState => {
  switch (action.type) {

    case EBlogAction.LoadBlogPosts: return {...state, loading: true};
    case EBlogAction.LoadBlogPostsSuccess: return {blogPosts: action.payload, loading: false};
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
};