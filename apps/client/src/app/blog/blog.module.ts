import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { PrismService } from '../shared/services/prism.service';
import { BlogComponent } from './blog.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { PaginationComponent } from './pagination/pagination.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { PostListComponent } from './post-list/post-list.component';
import { PostService } from './shared/post.service';
import { CategoryListComponent } from './sidebar/category-list/category-list.component';
import { TagListComponent } from './sidebar/tag-list/tag-list.component';

const routes: Routes = [
    {
        path: 'blog', component: BlogComponent,
        children: [
            // デフォルトはリダイレクト
            { path: '', redirectTo: 'posts', pathMatch: 'full', title: 'Blog list | Computing Atman' },

            // htmlにrouter-outletを実装する事で、URL「***/blog」に PostListComponent を表示 
            { path: 'posts', component: PostListComponent, title: 'Blog list | Computing Atman' },

            // :*** で、変数を格納
            { path: 'posts/:id', component: PostDetailComponent }
        ]
    }
];

@NgModule({
    // 利用するコンポーネントを登録
    declarations: [
        BlogComponent,
        PostListComponent,
        PostDetailComponent,
        BreadcrumbsComponent,
        PaginationComponent,
        CategoryListComponent,
        TagListComponent
    ],
    imports: [
        // RouterModuleのforRootはapp-routing.module.tsで利用。モジュールはforChildでルーター登録
        RouterModule.forChild(routes),
        // CommonModuleはngFor,ngIf等を利用する場合に必要
        CommonModule,
        FormsModule
    ],
    providers: [PrismService, PostService],
    bootstrap: []
})
export class BlogModule { }