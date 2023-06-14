import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'libs/src/shared/models/post.model';
import * as utils from 'libs/src/shared/utils/index';
import Constants from '../../shared/constants';
import { PrismService } from '../../shared/services/prism.service';
import { PostService } from '../shared/post.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit, AfterViewChecked {

  public readonly defaultThumbnail = Constants.DEFAULT_BLOG_THUMBNAIL_PATH;
  public readonly articleLeadMaxLength = Constants.ARTICLE_LEAD_MAX_LENGTH;

  public post!: Post;
  public articleHtml!: string;

  public title!: string;
  public date: string | undefined;
  public thumbnail: string | undefined;
  public tags: string[] | undefined;
  public categories: string[] | undefined;

  private highlighted = false;

  public relatedPosts: Post[] = [];

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private prismService: PrismService,
    private titleService: Title) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {

      // const id = params.get('id') ?? '';

      // subscribeでファイルからデータ取得
      const postObservable$ = this.postService.getPostById(params.get('id') ?? '');
      postObservable$.subscribe({
        next: (data) => {
          this.post = data;

          this.title = data.title;
          this.titleService.setTitle(`${this.title} | Computing Atman`);
          
          console.log(this.title);

          this.date = data.date;
          this.thumbnail = data.thumbnail;
          this.tags = data.tags;
          this.categories = data.categories;

          this.articleHtml = utils.addClassToHtml(data.article, 'line-numbers', 'pre');

          this.highlighted = false;
        },
        error: (err: HttpErrorResponse) => console.error(err)
      });

      // 関連記事を表示
      const relatedPostsObservable$ = this.postService.getRelatedPosts(params.get('id') ?? '');
      relatedPostsObservable$.subscribe({
        next: (data) => {
          this.relatedPosts = data;
          this.relatedPosts = this.relatedPosts.map(post => {
            return {
              ...post,
              article: utils.extractLead(post.article, this.articleLeadMaxLength)
            };
          });
        },
        error: (err: HttpErrorResponse) => console.error(err)
      });
    });
  }

  ngAfterViewChecked() {
    console.log('ngAfterViewChecked!');
    if (!this.highlighted && this.articleHtml) {
      console.log('ハイライト!');

      this.highlightAll();
    }
  }

  private highlightAll() {
    this.prismService.highlightAll();
    this.highlighted = true;
  }
}
