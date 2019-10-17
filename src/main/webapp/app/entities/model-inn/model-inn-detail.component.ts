import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IModelInn } from 'app/shared/model/model-inn.model';

@Component({
  selector: 'jhi-model-inn-detail',
  templateUrl: './model-inn-detail.component.html'
})
export class ModelInnDetailComponent implements OnInit {
  model: IModelInn;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ model }) => {
      this.model = model;
    });
  }

  previousState() {
    window.history.back();
  }
}
