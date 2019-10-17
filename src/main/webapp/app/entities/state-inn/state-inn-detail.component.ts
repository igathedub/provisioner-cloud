import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IStateInn } from 'app/shared/model/state-inn.model';

@Component({
  selector: 'jhi-state-inn-detail',
  templateUrl: './state-inn-detail.component.html'
})
export class StateInnDetailComponent implements OnInit {
  state: IStateInn;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ state }) => {
      this.state = state;
    });
  }

  previousState() {
    window.history.back();
  }
}
