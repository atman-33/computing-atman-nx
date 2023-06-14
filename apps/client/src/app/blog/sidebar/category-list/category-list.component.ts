import { Component, Input } from '@angular/core';
import { Category } from 'libs/src/shared/models/category.model';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
})
export class CategoryListComponent {

  @Input()
  categories: Category[] = [];
}
