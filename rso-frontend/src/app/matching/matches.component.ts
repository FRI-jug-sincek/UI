import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {Location} from '@angular/common';
import {Router} from '@angular/router';

import { switchMap } from 'rxjs/operators';

import {Match} from './models/match';
import {MatchService} from './services/match.service';
import {User} from '../user/models/user';
import {Apartment} from '../apartment/models/apartment';
import { UserService } from '../user/services/user.service';
import { ApartmentService } from '../apartment/services/apartment.service';

@Component({
    moduleId: module.id,
    selector: 'matches',
    templateUrl: 'matches.component.html'
})
export class MatchesComponent implements OnInit { 
    matches: Match[];
    isUser: boolean = false;

    constructor(private matchService: MatchService,
                private userService: UserService,
                private apartmentService: ApartmentService,
                private route: ActivatedRoute,
                private location: Location,
                private router: Router) {
    }

    ngOnInit(): void {
        if (this.route.snapshot.params.entity == 'user'){
            this.isUser = true;
        }
        this.route.params.pipe(
            switchMap((params: Params) => this.matchService.getMatches(this.route.snapshot.params.entity, this.route.snapshot.params.id)))
            .subscribe(m => {
                this.matches = m; 
            });
    }

    nazaj(): void {
        this.location.back();
    }

    toChat(match: Match): void {
        this.router.navigate(['/chat/', match.apartmentId, match.userId]);
    }

    unmatch(match: Match): void {
        this.matchService
            .unmatch(match)
            .subscribe(matchId => this.matches = this.matches.filter(u => u.id !== match.id));
    }
}
