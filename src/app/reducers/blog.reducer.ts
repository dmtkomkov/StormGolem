import {BlogAction, EBlogAction} from "../actions/blog.actions";
import {IBlogState, initialBlogState} from "../states/blog.state";
import {selectBlogPost} from "../helpers/blog.helpers";

export const blogReducer = (state: IBlogState = initialBlogState, action: BlogAction): IBlogState => {

  switch (action.type) {

    case EBlogAction.LoadBlogPosts: return {...state, loading: true};

    case EBlogAction.LoadBlogPostsSuccess: return {...state, blogPosts: action.payload, loading: false};

    case EBlogAction.LoadBlogPostsError: return {...state, blogPosts: null, loading: false};

    case EBlogAction.CreateBlogPost: return {...state, loading: true};

    case EBlogAction.CreateBlogPostSuccess: return {...state, loading: true};

    case EBlogAction.CreateBlogPostError: return {...state, loading: false};

    case EBlogAction.SelectBlogPost: return {...state, blogPosts: selectBlogPost(state.blogPosts, action.payload)};

    case EBlogAction.ResetBlog: return initialBlogState;

    default: return state;
  }
};