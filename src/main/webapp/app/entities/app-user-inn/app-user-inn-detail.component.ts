import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAppUserInn } from 'app/shared/model/app-user-inn.model';

@Component({
  selector: 'jhi-app-user-inn-detail',
  templateUrl: './app-user-inn-detail.component.html'
})
export class AppUserInnDetailComponent implements OnInit {
  appUser: IAppUserInn;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ appUser }) => {
      this.appUser = appUser;
    });
  }

  previousState() {
    window.history.back();
  }
}
