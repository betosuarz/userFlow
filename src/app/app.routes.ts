import { Routes } from '@angular/router';
import { UserListComponent } from './pages/user-list/user-list.component';
import { UserViewComponent } from './pages/user-view/user-view.component';
import { UserFormComponent } from './pages/user-form/user-form.component';

export const routes: Routes = [
    { path: "", pathMatch: "full", redirectTo: "userList" },
    { path: "userList", component: UserListComponent },
    { path: "user/:iduser", component: UserViewComponent },
    { path: "newUser", component: UserFormComponent },
    { path: "update/user/:id", component: UserFormComponent },
    { path: "**", redirectTo: "userList"}
];

