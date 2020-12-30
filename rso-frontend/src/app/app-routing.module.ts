import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {UsersComponent} from './user/users.component';
import {UserPodrobnostiComponent} from './user/user-podrobnosti.component';
import {UsersDodajComponent} from './user/users-dodaj.component';
import {UsersUrediComponent} from './user/users-uredi.component';

const routes: Routes = [
    {path: '', redirectTo: '/uporabniki', pathMatch: 'full'},
    {path: 'uporabniki', component: UsersComponent},
    {path: 'uporabniki/:id', component: UserPodrobnostiComponent},
    {path: 'dodajuporabnika', component: UsersDodajComponent},
    {path: 'urediuporabnika/:id', component: UsersUrediComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
