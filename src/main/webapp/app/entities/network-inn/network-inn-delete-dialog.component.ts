import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { INetworkInn } from 'app/shared/model/network-inn.model';
import { NetworkInnService } from './network-inn.service';

@Component({
  selector: 'jhi-network-inn-delete-dialog',
  templateUrl: './network-inn-delete-dialog.component.html'
})
export class NetworkInnDeleteDialogComponent {
  network: INetworkInn;

  constructor(protected networkService: NetworkInnService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.networkService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'networkListModification',
        content: 'Deleted an network'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-network-inn-delete-popup',
  template: ''
})
export class NetworkInnDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ network }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(NetworkInnDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.network = network;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/network-inn', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/network-inn', { outlets: { popup: null } }]);
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
