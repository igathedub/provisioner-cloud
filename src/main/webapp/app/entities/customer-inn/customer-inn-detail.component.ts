import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICustomerInn } from 'app/shared/model/customer-inn.model';

@Component({
  selector: 'jhi-customer-inn-detail',
  templateUrl: './customer-inn-detail.component.html'
})
export class CustomerInnDetailComponent implements OnInit {
  customer: ICustomerInn;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ customer }) => {
      this.customer = customer;
    });
  }

  previousState() {
    window.history.back();
  }
}
