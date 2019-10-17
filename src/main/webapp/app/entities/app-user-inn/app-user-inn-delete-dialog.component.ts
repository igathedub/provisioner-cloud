import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IAppUserInn } from 'app/shared/model/app-user-inn.model';
import { AppUserInnService } from './app-user-inn.service';

@Component({
  selector: 'jhi-app-user-inn-delete-dialog',
  templateUrl: './app-user-inn-delete-dialog.component.html'
})
export class AppUserInnDeleteDialogComponent {
  appUser: IAppUserInn;

  constructor(protected appUserService: AppUserInnService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.appUserService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'appUserListModification',
        content: 'Deleted an appUser'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-app-user-inn-delete-popup',
  template: ''
})
export class AppUserInnDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ appUser }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(AppUserInnDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.appUser = appUser;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/app-user-inn', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/app-user-inn', { outlets: { popup: null } }]);
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
