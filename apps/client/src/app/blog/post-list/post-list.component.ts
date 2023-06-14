import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { ActivatedRoute, Router } from '@angular/router';
import * as constants from 'libs/src/shared/constants';
import { Category, Post, Tag } from 'libs/src/shared/models';
import * as utils from 'libs/src/shared/utils/index';
import { map } from 'rxjs';
import Constants from '../../shared/constants';
import { PostService } from '../shared/post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
})
export class PostListComponent implements OnInit {

  public readonly defaultThumbnail = Constants.DEFAULT_BLOG_THUMBNAIL_PATH;
  public readonly articleLeadMaxLength = Constants.ARTICLE_LEAD_MAX_LENGTH;

  public posts: Post[] = [];
  public totalPostsCount!: number;
  public postsPerPage = constants.default.POSTS_PER_PAGE;

  public currentPage = 1;
  public currentCategory!: string;
  public currentTag!: string;
  public currentSearchQuery!: string;

  public sidebarCategories: Category[] = [];
  public sidebarTags: Tag[] = [];

  public breadcrumbCategories: string[] = [];
  public breadcrumbTags: string[] = [];

  public isGreaterThanXS!: boolean;

  public searchText = '';

  public loading = true;

  constructor(
    private postService: PostService,
    private route: ActivatedRoute,
    private router: Router,
    private mediaObserver: MediaObserver,
    private changeDetectorRef: ChangeDetectorRef) {
  }

  /**
   * 初期化処理
   */
  ngOnInit() {
    console.log('run ngOnInit!');

    // 1. 画面の横幅をobserve
    const media$ = this.mediaObserver.asObservable();
    media$.subscribe(() => {
      this.isGreaterThanXS = this.mediaObserver.isActive('gt-xs');
      this.changeDetectorRef.detectChanges();
    });

    // 2. クエリパラメータの変更をobserve
    const queryParamsObservable$ = this.route.queryParams.pipe(
      map(params => ({
        page: +params['page'] || 1,
        category: params['category'] || '',
        tag: params['tag'] || '',
        q: params['q'] || ''
      }))
    );
    queryParamsObservable$.subscribe({
      next: ({ page, category, tag, q }) => {
        console.log('query params changed!');
        this.loading = true;

        // クエリパラメーターの変更を処理
        this.currentPage = page;
        this.currentCategory = category;
        this.currentTag = tag;
        this.currentSearchQuery = q;

        // breadcrumbを更新
        if (category) {
          this.breadcrumbCategories = [category];
        } else {
          this.breadcrumbCategories = [];
        }

        if (tag) {
          this.breadcrumbTags = [tag];
        } else {
          this.breadcrumbTags = [];
        }

        // post一覧を更新
        this.loadPosts();
      },
      error: (err: HttpErrorResponse) => console.error(err)
    });

    // サイドバーのカテゴリー一覧を設定
    this.postService.getCategoryList().subscribe({
      next: (data) => {
        this.sidebarCategories = utils.sortByNumber(data, 'count', 'desc');
      },
      error: (err: HttpErrorResponse) => console.error(err)
    });

    // サイドバーのタグ一覧を設定
    this.postService.getTagList().subscribe({
      next: (data) => {
        this.sidebarTags = utils.sortByNumber(data, 'count', 'desc');
      },
      error: (err: HttpErrorResponse) => console.error(err)
    });
  }

  /**
   * 表示用postデータを読み込み
   */
  loadPosts() {
    // postデータを更新
    const postObservable$ = this.postService.getPosts(
      this.currentPage, this.currentCategory, this.currentTag, this.currentSearchQuery);
    postObservable$.subscribe({
      next: (data) => {

        this.posts = data.posts;
        this.totalPostsCount = data.totalCount;
        console.log('update posts! page: ' + this.currentPage);

        // 記事のリード文抽出
        this.posts = this.posts.map(post => {
          return {
            ...post,
            article: utils.extractLead(post.article, this.articleLeadMaxLength)
          };
        });
        // console.log('totalPostsCount: ' + this.totalPostsCount);

        this.loading = false;
        setTimeout(() => {
          this.loading = false;
        }, 5000); // 5秒後にloadingをfalseにする
      },
      error: (err) => { console.error('Error: ' + err.error); }
    });
  }

  onChangePage(page: number) {
    console.log(`onChangePage page: ${page}`);

    this.router.navigate([], {
      queryParams: { page: page },
      queryParamsHandling: 'merge'
    });
  }

  onResetPosts() {
    this.currentPage = 1;
  }

  search() {
    console.log('Search Text:', this.searchText);

    this.router.navigate([], {
      queryParams: { q: this.searchText },
    });
  }

  clearSearchText() {
    this.searchText = '';
  }
}
