import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { Category, Post, PostResponse, Tag } from 'libs/src/shared/models';

@Injectable()   // <= Angularでserviceを利用する際に必要
export class PostService {

    constructor(private http: HttpClient) { }

    getPosts(page: number, category: string, tag: string, searchQuery: string): Observable<PostResponse> {
        const encodedCategory = encodeURIComponent(category);
        const encodedTag = encodeURIComponent(tag);
        const encodedSearchQuery = encodeURIComponent(searchQuery);

        console.log(`/api/posts?page=${page}&category=${encodedCategory}&tag=${encodedTag}&q=${encodedSearchQuery}`);
        return this.http.get<PostResponse>(`/api/posts?page=${page}&category=${encodedCategory}&tag=${encodedTag}&q=${encodedSearchQuery}`);
    }

    getPostsByCategory(category: string, page: number): Observable<PostResponse> {
        return this.http.get<PostResponse>(`/api/posts/categories/${category}?page=${page}`);
    }

    getPostsByTag(tag: string, page: number): Observable<PostResponse> {
        return this.http.get<PostResponse>(`/api/posts/tags/${tag}?page=${page}`);
    }

    getPostById(id: string): Observable<Post> {
        return this.http.get<Post>(`/api/posts/items/${id}`);
    }

    getRelatedPosts(id: string): Observable<Post[]> {
        return this.http.get<Post[]>(`/api/posts/items/${id}/related`);
    }

    getPostImage(id: string, fileName: string): Observable<Blob> {
        return this.http.get<Blob>(`/api/posts/img/${id}/${fileName}`);
    }

    getCategoryList(): Observable<Category[]> {
        return this.http.get<Category[]>('/api/posts/category-list');
    }

    getTagList(): Observable<Tag[]> {
        return this.http.get<Tag[]>('/api/posts/tag-list');
    }
}