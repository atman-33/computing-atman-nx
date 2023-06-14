import { Component, Input } from '@angular/core';
import { Category } from '@libs/shared/domain';

@Component({
  selector: 'can-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
})
export class CategoryListComponent {

  @Input()
  categories: Category[] = [];
}
