import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/auth.guard';
import { AuthService } from './shared/auth.service';
import { TokenInterceptor } from './shared/token.interceptor';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
    { path: 'signup', component: SignupComponent, title: 'Signup | Computing Atman'},
    { path: 'signin', component: SigninComponent, title: 'Signin | Computing Atman' },
];

@NgModule({
    // 利用するコンポーネントを登録
    declarations: [
        SignupComponent,
        SigninComponent,
    ],
    imports: [
        // RouterModuleのforRootはapp-routing.module.tsで利用。モジュールはforChildでルーター登録
        RouterModule.forChild(routes),
        // CommonModuleはngFor,ngIf等を利用する場合に必要
        CommonModule,
        FormsModule
    ],
    providers: [
        AuthGuard,
        AuthService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptor,
            multi: true
        }],
    bootstrap: []
})
export class AuthModule { }