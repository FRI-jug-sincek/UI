import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {UsersComponent} from './user/users.component';
import {UserPodrobnostiComponent} from './user/user-podrobnosti.component';
import {UsersDodajComponent} from './user/users-dodaj.component';
import {UsersUrediComponent} from './user/users-uredi.component';

import {ApartmentsComponent} from './apartment/apartments.component';
import {ApartmentPodrobnostiComponent} from './apartment/apartment-podrobnosti.component';
import {ApartmentsDodajComponent} from './apartment/apartments-dodaj.component';
import {ApartmentsUrediComponent} from './apartment/apartments-uredi.component';


const routes: Routes = [
    {path: '', redirectTo: '/uporabniki', pathMatch: 'full'},
    {path: 'uporabniki', component: UsersComponent},
    {path: 'uporabniki/:id', component: UserPodrobnostiComponent},
    {path: 'dodajuporabnika', component: UsersDodajComponent},
    {path: 'urediuporabnika/:id', component: UsersUrediComponent},

    {path: 'stanovanja', component: ApartmentsComponent},
    {path: 'stanovanja/:id', component: ApartmentPodrobnostiComponent},
    {path: 'dodaj-stanovanje', component: ApartmentsDodajComponent},
    {path: 'uredi-stanovanje/:id', component: ApartmentsUrediComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
