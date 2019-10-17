import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IElementInn } from 'app/shared/model/element-inn.model';

@Component({
  selector: 'jhi-element-inn-detail',
  templateUrl: './element-inn-detail.component.html'
})
export class ElementInnDetailComponent implements OnInit {
  element: IElementInn;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ element }) => {
      this.element = element;
    });
  }

  previousState() {
    window.history.back();
  }
}
