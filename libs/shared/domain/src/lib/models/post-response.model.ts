import { Post } from './post.model';

export interface PostResponse {
  posts: Post[];
  totalCount: number;
}