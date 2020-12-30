import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {Location} from '@angular/common';
import {Router} from '@angular/router';

import { switchMap } from 'rxjs/operators';

import {Chat} from './models/chat';
import {ChatService} from './services/chat.service';

@Component({
    moduleId: module.id,
    selector: 'chat-podrobnosti',
    templateUrl: 'chat-podrobnosti.component.html'
})
export class ChatPodrobnostiComponent implements OnInit {
    chat: Chat = new Chat;
    chats: Chat[];

    constructor(private chatService: ChatService,
                private route: ActivatedRoute,
                private location: Location,
                private router: Router) {
    }

    ngOnInit(): void {
        this.chat.apartmentId = this.route.snapshot.params.id;

        this.route.params.pipe(
            switchMap((params: Params) => this.chatService.getChatByApartment(+params['id'])))
            .subscribe(chats => this.chats = chats);
    }

    refreshMessages(): void {
        this.route.params.pipe(
            switchMap((params: Params) => this.chatService.getChatByApartment(+params['id'])))
            .subscribe(chats => this.chats = chats);
        
        this.chat = new Chat;
        this.chat.apartmentId = this.route.snapshot.params.id;
    }

    submitForm(): void {
        this.chatService.create(this.chat)
        .subscribe(() => this.refreshMessages());
    }
}
