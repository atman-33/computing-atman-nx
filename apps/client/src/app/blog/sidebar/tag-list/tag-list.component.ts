import { Component, Input } from '@angular/core';
import { Tag } from '@libs/shared/domain';

@Component({
  selector: 'can-tag-list',
  templateUrl: './tag-list.component.html',
  styleUrls: ['./tag-list.component.scss'],
})
export class TagListComponent {

  @Input()
  tags: Tag[] = [];

}
