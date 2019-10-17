import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IRoleInn } from 'app/shared/model/role-inn.model';

@Component({
  selector: 'jhi-role-inn-detail',
  templateUrl: './role-inn-detail.component.html'
})
export class RoleInnDetailComponent implements OnInit {
  role: IRoleInn;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ role }) => {
      this.role = role;
    });
  }

  previousState() {
    window.history.back();
  }
}
