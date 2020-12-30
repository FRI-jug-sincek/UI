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
        UsersUrediComponent
    ],
    providers: [UserService],
    bootstrap: [AppComponent]
})
export class AppModule {
}

