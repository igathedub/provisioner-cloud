import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IMeshGroupInn } from 'app/shared/model/mesh-group-inn.model';

@Component({
  selector: 'jhi-mesh-group-inn-detail',
  templateUrl: './mesh-group-inn-detail.component.html'
})
export class MeshGroupInnDetailComponent implements OnInit {
  meshGroup: IMeshGroupInn;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ meshGroup }) => {
      this.meshGroup = meshGroup;
    });
  }

  previousState() {
    window.history.back();
  }
}
