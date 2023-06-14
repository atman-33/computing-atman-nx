import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { readFile, readdir } from 'fs';
import * as constants from 'libs/src/shared/constants';
import * as helpers from 'libs/src/shared/helpers';
import { Category, Post, PostResponse, Tag } from 'libs/src/shared/models';
import * as utils from 'libs/src/shared/utils';
import { join } from 'path';
import { promisify } from 'util';

@Injectable()
export class PostsService {

  /**
   * ページに対応した記事データを取得
   * @param page 
   * @param category 
   * @param tag 
   * @param searchQuery 
   * @returns 
   */
  async findPosts(page: number, category: string, tag: string, searchQuery: string): Promise<PostResponse> {

    if (category) {
      // console.log(`category: ${category}`);
      return this.findCategoryPosts(category, page);
    }

    if (tag) {
      // console.log(`tag: ${tag}`);
      return this.findTagPosts(tag, page);
    }

    if (searchQuery) {
      return this.searchPosts(searchQuery, page);
    }

    const allPosts = await this.findAllPosts();
    const posts = this.findPagePosts(allPosts, page, constants.default.POSTS_PER_PAGE);
    return { posts: posts, totalCount: allPosts.length };
  }

  /**
   * 指定されたidの記事を取得
   * @param id 
   * @returns 
   */
  async findPostById(id: string): Promise<Post> {
    // console.log(id);

    const filePath = join(process.cwd(), 'dist/server/assets/posts', id, 'index.md');
    try {
      const content = promisify(readFile)(filePath, { encoding: 'utf-8' });
      return this.parsePostContent(id, await content);
    } catch (error) {
      console.error(`Failed to read file: ${filePath}`);
      console.error(error);
    }
  }

  /**
   * 関連記事を取得
   * @param post 
   * @returns 
   */
  async findRelatedPosts(post: Post): Promise<Post[]> {
    const relatedPosts: Post[] = [];

    const allPosts = await this.findAllPosts();

    // Filter posts based on categories
    for (const category of post.categories) {
      const postsWithCategory = allPosts.filter(p =>
        p.categories.includes(category) && !relatedPosts.includes(p) && p.id !== post.id
      );
      relatedPosts.push(...postsWithCategory);
    }

    // Filter posts based on tags
    for (const tag of post.tags) {
      const postsWithTag = allPosts.filter(p =>
        p.tags.includes(tag) && !relatedPosts.includes(p) && p.id !== post.id
      );
      relatedPosts.push(...postsWithTag);
    }

    // Shuffle the related posts array
    const shuffledPosts = utils.shuffleArray(relatedPosts);

    // Return the first 5 posts (or fewer if there are less than 5)
    return shuffledPosts.slice(0, constants.default.RELATED_ARTICLES_COUNT);
  }

  /**
   * 画像を取得
   * @param id 
   * @param file 
   * @param res 
   * @returns 
   */
  getPostImageFile(id: string, file: string, res: Response) {

    const imageFilePath = join(process.cwd(), 'dist/server/assets/posts', id, file);
    return res.sendFile(imageFilePath);
  }

  /**
   * 記事IDの一覧を取得
   * @returns 
   */
  async findPostIds(): Promise<string[]> {
    const folderPath = join(process.cwd(), 'dist/server/assets/posts');
    try {
      const dirents = await promisify(readdir)(
        folderPath, {
        withFileTypes: true,
      });

      const folders = dirents
        .filter((dirent) => dirent.isDirectory())
        .map((dirent) => dirent.name);
      return folders;
    } catch (error) {
      console.error(`Failed to read directories: ${error}`);
      throw new Error('Failed to read directories');
    }
  }

  /**
   * カテゴリでフィルタした記事一覧を取得
   * @param category 
   * @param page 
   * @returns 
   */
  async findCategoryPosts(category: string, page: number): Promise<PostResponse> {
    let allPosts = await this.findAllPosts();

    if (category) {
      allPosts = allPosts.filter(post => post.categories.includes(category));
    }

    const posts = this.findPagePosts(allPosts, page, constants.default.POSTS_PER_PAGE);

    return { posts: posts, totalCount: allPosts.length };
  }

  /**
   * タグでフィルタした記事一覧を取得
   * @param tag 
   * @param page 
   * @returns 
   */
  async findTagPosts(tag: string, page: number): Promise<PostResponse> {
    let allPosts = await this.findAllPosts();

    if (tag) {
      allPosts = allPosts.filter(post => post.tags.includes(tag));
    }

    const posts = this.findPagePosts(allPosts, page, constants.default.POSTS_PER_PAGE);

    return { posts: posts, totalCount: allPosts.length };
  }

  /**
   * 検索キーワードを含む記事を取得
   * @param searchQuery 
   * @param page 
   * @returns 
   */
  async searchPosts(searchQuery: string, page: number): Promise<PostResponse> {
    let allPosts = await this.findAllPosts();

    if (searchQuery) {
      const searchTerms = searchQuery.toLowerCase().replace('　', ' ').split(' ');

      allPosts = allPosts.filter(it => {
        const titleMatch = searchTerms.every(term =>
          it.title.toLowerCase().includes(term)
        );
        const articleMatch = searchTerms.every(term =>
          it.article.toLowerCase().includes(term)
        );
        return titleMatch || articleMatch;
      });
    }

    // console.log(`Posts count: ${allPosts.length}`);
    const posts = this.findPagePosts(allPosts, page, constants.default.POSTS_PER_PAGE);
    return { posts: posts, totalCount: allPosts.length };
  }

  /**
   * 各カテゴリとその登録数を取得
   * @returns 
   */
  async findCagegoryList(): Promise<Category[]> {
    const allPosts = await this.findAllPosts();

    const categories: Category[] = allPosts.reduce((acc, post) => {
      post.categories.forEach((category) => {
        const existingCategory = acc.find((c) => c.name === category);
        if (existingCategory) {
          existingCategory.count++;
        } else {
          acc.push({ name: category, count: 1 });
        }
      });
      return acc;
    }, [] as Category[]);

    return categories;
  }

  /**
   * 各タグとその登録数を取得
   * @returns 
   */
  async findTagList(): Promise<Tag[]> {
    const allPosts = await this.findAllPosts();

    const tags: Tag[] = allPosts.reduce((acc, post) => {
      post.tags.forEach((tag) => {
        const existingTag = acc.find((c) => c.name === tag);
        if (existingTag) {
          existingTag.count++;
        } else {
          acc.push({ name: tag, count: 1 });
        }
      });
      return acc;
    }, [] as Tag[]);

    return tags;
  }

  /**
   * 記事を全て取得
   * @returns 
   */
  private async findAllPosts(): Promise<Post[]> {
    const ids = await this.findPostIds();

    let allPosts: Post[] = [];
    for (const id of ids) {
      allPosts.push(await this.findPostById(id));
    }

    allPosts = utils.sortByDate(allPosts, 'date', 'desc');  // 新規投稿順にソート

    return allPosts;
  }

  /**
   * ページサイズに区切った記事を取得
   * @param allPosts 
   * @param page 
   * @returns 
   */
  private findPagePosts(allPosts: Post[], page: number, pageSize: number): Post[] {
    if (page === undefined) {
      page = 1;
    }

    const startIndex = (page - 1) * pageSize;
    const endIndex = page * pageSize;
    const pagePosts = allPosts.slice(startIndex, endIndex); // ページ番号に対応したデータのIDの配列を取得

    const posts: Post[] = [];
    for (const post of pagePosts) {
      posts.push(post);
    }

    return posts;
  }

  /**
   * 記事ソースのmdファイルの中身をPostクラス構造に変換
   * @param id 
   * @param content 
   * @returns 
   */
  private parsePostContent(id: string, content: string): Post {
    // console.log(`id: ${id}`);

    let post: Post = {
      id: id,
      title: helpers.getMetadataValue(content, 'title:'),
      date: helpers.getMetadataValue(content, 'date:'),
      thumbnail: helpers.getMetadataValue(content, 'thumbnail:'),
      tags: helpers.getMetadataArray(content, 'tags:'),
      categories: helpers.getMetadataArray(content, 'categories:'),
      article: helpers.getMdContent(content),
    };

    post = this.addPrefixTothumbnail(post);
    post = this.addPrefixToImageSource(post);

    return post;
  }

  private addPrefixTothumbnail(post: Post): Post {
    if (post.thumbnail) {
      post.thumbnail = join('/api/posts/img', post.id, post.thumbnail);
    }
    return post;
  }

  private addPrefixToImageSource(post: Post): Post {
    post.article = helpers.addMdPrefixToImageSource(post.article, './api/posts/img/' + post.id + '/');
    return post;
  }
}
