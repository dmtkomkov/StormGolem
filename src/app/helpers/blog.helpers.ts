import { IBlogPost } from "@interfaces";

export function selectBlogPost(blogPosts: IBlogPost[], selectedPostId: number): IBlogPost[] {
  if (!blogPosts) return null;
  return blogPosts.map((blogPost: IBlogPost) => ({...blogPost, selected: blogPost.id === selectedPostId }));
}