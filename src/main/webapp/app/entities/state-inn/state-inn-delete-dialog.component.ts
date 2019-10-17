import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IStateInn } from 'app/shared/model/state-inn.model';
import { StateInnService } from './state-inn.service';

@Component({
  selector: 'jhi-state-inn-delete-dialog',
  templateUrl: './state-inn-delete-dialog.component.html'
})
export class StateInnDeleteDialogComponent {
  state: IStateInn;

  constructor(protected stateService: StateInnService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.stateService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'stateListModification',
        content: 'Deleted an state'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-state-inn-delete-popup',
  template: ''
})
export class StateInnDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ state }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(StateInnDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.state = state;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/state-inn', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/state-inn', { outlets: { popup: null } }]);
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
