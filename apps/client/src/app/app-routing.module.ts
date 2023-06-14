import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthModule } from './auth/auth.module';
import { BlogModule } from './blog/blog.module';
import { TemplatesModule } from './templates/templates.module';
import { TopPageComponent } from './top-page/top-page.component';


/**
 * SPA用の画面遷移先（path）設定
 * @remark pathの先頭に/は不要（OK:detail NG:/detail）
 */
const routes: Routes = [
    { path: 'top-page', component: TopPageComponent, title: 'Computing Atman' },
    { path: '', component: TopPageComponent, pathMatch: 'full', title: 'Computing Atman' }
];

/**
 * 子モジュールをimport
 */
@NgModule({
    declarations: [
        TopPageComponent
    ],
    imports: [
        RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' }),
        NgbModule,  // angular dropdown
        AuthModule,
        BlogModule,
        TemplatesModule
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
