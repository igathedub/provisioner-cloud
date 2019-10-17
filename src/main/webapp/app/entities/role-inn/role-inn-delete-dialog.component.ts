import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IRoleInn } from 'app/shared/model/role-inn.model';
import { RoleInnService } from './role-inn.service';

@Component({
  selector: 'jhi-role-inn-delete-dialog',
  templateUrl: './role-inn-delete-dialog.component.html'
})
export class RoleInnDeleteDialogComponent {
  role: IRoleInn;

  constructor(protected roleService: RoleInnService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.roleService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'roleListModification',
        content: 'Deleted an role'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-role-inn-delete-popup',
  template: ''
})
export class RoleInnDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ role }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(RoleInnDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.role = role;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/role-inn', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/role-inn', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          }
        );
      }, 0);
    });
  }

  ngOnDestroy() {
    this.ngbModalRef = null;
  }
}
