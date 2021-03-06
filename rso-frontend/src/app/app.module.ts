import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';

import {AppRoutingModule} from './app-routing.module';

import {AppComponent} from './app.component';
import {UsersComponent} from './user/users.component';
import {UsersDodajComponent} from './user/users-dodaj.component';
import {UsersUrediComponent} from './user/users-uredi.component';
import {UserPodrobnostiComponent} from './user/user-podrobnosti.component';
import {UserService} from './user/services/user.service';

import {ApartmentsComponent} from './apartment/apartments.component';
import {ApartmentsDodajComponent} from './apartment/apartments-dodaj.component';
import {ApartmentsUrediComponent} from './apartment/apartments-uredi.component';
import {ApartmentPodrobnostiComponent} from './apartment/apartment-podrobnosti.component';
import {ApartmentService} from './apartment/services/apartment.service';

import {ImagesComponent} from './image/images.component';
import {ImagesQueryComponent} from './image/images-query.component';
import {ImagesDodajComponent} from './image/images-dodaj.component';
import {ImagesUrediComponent} from './image/images-uredi.component';
import {ImagePodrobnostiComponent} from './image/image-podrobnosti.component';
import {ImageService} from './image/services/image.service';

import {ChatPodrobnostiComponent} from './chat/chat-podrobnosti.component';
import { ChatService } from './chat/services/chat.service';

import {MainComponent} from './main/main.component';
import {UserAccountComponent} from './main/user-account.component';
import {ApartmentAccountComponent} from './main/apartment-account.component';

import {MatchesComponent} from './matching/matches.component';
import {MatchService} from './matching/services/match.service';



@NgModule({
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        FormsModule
    ],
    declarations: [
        AppComponent,
        UsersComponent,
        UserPodrobnostiComponent,
        UsersDodajComponent,
        UsersUrediComponent,

        ApartmentsComponent,
        ApartmentPodrobnostiComponent,
        ApartmentsDodajComponent,
        ApartmentsUrediComponent,

        ImagesComponent,
        ImagePodrobnostiComponent,
        ImagesDodajComponent,
        ImagesUrediComponent,

        ChatPodrobnostiComponent,
        MainComponent,
        UserAccountComponent,
        ApartmentAccountComponent,
        ImagesQueryComponent,

        MatchesComponent,
    ],
    providers: [
        UserService,
        ApartmentService,
        ImageService,
        ChatService,
        MatchService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}

