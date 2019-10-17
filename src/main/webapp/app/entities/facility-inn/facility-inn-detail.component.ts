import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IFacilityInn } from 'app/shared/model/facility-inn.model';

@Component({
  selector: 'jhi-facility-inn-detail',
  templateUrl: './facility-inn-detail.component.html'
})
export class FacilityInnDetailComponent implements OnInit {
  facility: IFacilityInn;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ facility }) => {
      this.facility = facility;
    });
  }

  previousState() {
    window.history.back();
  }
}
