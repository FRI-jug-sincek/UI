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

import {ImagesComponent} from './image/images.component';
import {ImagesQueryComponent} from './image/images-query.component';
import {ImagePodrobnostiComponent} from './image/image-podrobnosti.component';
import {ImagesDodajComponent} from './image/images-dodaj.component';
import {ImagesUrediComponent} from './image/images-uredi.component';

import {ChatPodrobnostiComponent} from './chat/chat-podrobnosti.component';

import {MainComponent} from './main/main.component';
import {UserAccountComponent} from './main/user-account.component';



const routes: Routes = [
    {path: '', redirectTo: '/uporabniki', pathMatch: 'full'},
    {path: 'uporabniki', component: UsersComponent},
    {path: 'uporabniki/:id', component: UserPodrobnostiComponent},
    {path: 'dodaj-uporabnika', component: UsersDodajComponent},
    {path: 'uredi-uporabnika/:id', component: UsersUrediComponent},

    {path: 'stanovanja', component: ApartmentsComponent},
    {path: 'stanovanja/:id', component: ApartmentPodrobnostiComponent},
    {path: 'dodaj-stanovanje', component: ApartmentsDodajComponent},
    {path: 'uredi-stanovanje/:id', component: ApartmentsUrediComponent},

    {path: 'slike', component: ImagesComponent},
    {path: 'slike/:id', component: ImagePodrobnostiComponent},
    {path: 'dodaj-sliko', component: ImagesDodajComponent},
    {path: 'uredi-sliko/:id', component: ImagesUrediComponent},
    {path: 'pregled-slik/:entity/:key', component: ImagesQueryComponent},

    {path: 'chat/:id', component: ChatPodrobnostiComponent},

    {path: 'home/:id', component: MainComponent},
    {path: 'account/:id', component: UserAccountComponent},

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
