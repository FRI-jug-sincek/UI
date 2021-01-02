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
import {ApartmentAccountComponent} from './main/apartment-account.component';


const routes: Routes = [
    {path: '', redirectTo: '/users', pathMatch: 'full'},
    {path: 'users', component: UsersComponent},
    {path: 'users/:id', component: UserPodrobnostiComponent},
    {path: 'add-user', component: UsersDodajComponent},
    {path: 'edit-user/:id', component: UsersUrediComponent},

    {path: 'apartments', component: ApartmentsComponent},
    {path: 'apartments/:id', component: ApartmentPodrobnostiComponent},
    {path: 'add-apartment', component: ApartmentsDodajComponent},
    {path: 'edit-apartment/:id', component: ApartmentsUrediComponent},

    {path: 'images', component: ImagesComponent},
    {path: 'images/:id', component: ImagePodrobnostiComponent},
    {path: 'add-image', component: ImagesDodajComponent},
    {path: 'edit-image/:id', component: ImagesUrediComponent},
    {path: 'images-overview/:entity/:key', component: ImagesQueryComponent},

    {path: 'chat/:id', component: ChatPodrobnostiComponent},

    {path: 'home/:entity/:id', component: MainComponent},
    {path: 'user-account/:id', component: UserAccountComponent},
    {path: 'apartment-account/:id', component: ApartmentAccountComponent},

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
