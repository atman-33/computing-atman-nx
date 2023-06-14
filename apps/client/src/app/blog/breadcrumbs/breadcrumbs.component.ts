import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss'],
})
export class BreadcrumbsComponent {

  @Input()
  categories: string[] = [];
  @Input()
  tags: string[] = [];
  @Input()
  postTitle = '';

  @Output() resetPosts = new EventEmitter();

}
