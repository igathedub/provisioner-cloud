import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { INodeInn } from 'app/shared/model/node-inn.model';
import { NodeInnService } from './node-inn.service';

@Component({
  selector: 'jhi-node-inn-delete-dialog',
  templateUrl: './node-inn-delete-dialog.component.html'
})
export class NodeInnDeleteDialogComponent {
  node: INodeInn;

  constructor(protected nodeService: NodeInnService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.nodeService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'nodeListModification',
        content: 'Deleted an node'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-node-inn-delete-popup',
  template: ''
})
export class NodeInnDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ node }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(NodeInnDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.node = node;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/node-inn', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/node-inn', { outlets: { popup: null } }]);
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
