import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { INodeInn } from 'app/shared/model/node-inn.model';

@Component({
  selector: 'jhi-node-inn-detail',
  templateUrl: './node-inn-detail.component.html'
})
export class NodeInnDetailComponent implements OnInit {
  node: INodeInn;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ node }) => {
      this.node = node;
    });
  }

  previousState() {
    window.history.back();
  }
}
