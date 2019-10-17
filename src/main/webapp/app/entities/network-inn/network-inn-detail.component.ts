import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { INetworkInn } from 'app/shared/model/network-inn.model';

@Component({
  selector: 'jhi-network-inn-detail',
  templateUrl: './network-inn-detail.component.html'
})
export class NetworkInnDetailComponent implements OnInit {
  network: INetworkInn;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ network }) => {
      this.network = network;
    });
  }

  previousState() {
    window.history.back();
  }
}
