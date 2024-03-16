import { Routes } from '@angular/router';
import { UserListComponent } from './pages/user-list/user-list.component';
import { UserViewComponent } from './pages/user-view/user-view.component';

export const routes: Routes = [
    { path: "", pathMatch: "full", redirectTo: "userList" },
    { path: "userList", component: UserListComponent },
    { path: "user/:iduser", component: UserViewComponent },
    { path: "**", redirectTo: "userList"}
];