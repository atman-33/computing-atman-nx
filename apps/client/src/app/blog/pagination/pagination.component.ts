import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})

export class PaginationComponent {
  @Input()
  totalPosts!: number;
  @Input()
  postsPerPage!: number;
  @Input()
  currentPage!: number;
  @Output() changePage = new EventEmitter<number>();

  get totalPages() {
    // console.log(`totalPages: ${this.totalPosts}`);
    return Math.ceil(this.totalPosts / this.postsPerPage);
  }

  get pages() {
    const pages = [];
    for (let i = 1; i <= this.totalPages; i++) {
      pages.push(i);
    }
    return pages;
  }
}
