import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../auth/shared/auth.guard';
import { UserService } from './shared/user.service';
import { UserListComponent } from './user-list/user-list.component';
import { UserManagementComponent } from './user-management.component';

const routes: Routes = [
    {
        path: 'user-management', component: UserManagementComponent,
        children: [
            { path: '', redirectTo: 'user-list', pathMatch: 'full', title: 'User list | Computing Atman' },
            { path: 'user-list', component: UserListComponent, canActivate: [AuthGuard], title: 'User list | Computing Atman' }
        ]
    },
];

@NgModule({
    // 利用するコンポーネントを登録
    declarations: [
        UserManagementComponent,
        UserListComponent
    ],
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
    ],
    providers: [UserService],
    bootstrap: []
})
export class UserManagementModule { }