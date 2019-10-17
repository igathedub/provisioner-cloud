import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IMeshGroupInn } from 'app/shared/model/mesh-group-inn.model';
import { MeshGroupInnService } from './mesh-group-inn.service';

@Component({
  selector: 'jhi-mesh-group-inn-delete-dialog',
  templateUrl: './mesh-group-inn-delete-dialog.component.html'
})
export class MeshGroupInnDeleteDialogComponent {
  meshGroup: IMeshGroupInn;

  constructor(
    protected meshGroupService: MeshGroupInnService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.meshGroupService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'meshGroupListModification',
        content: 'Deleted an meshGroup'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-mesh-group-inn-delete-popup',
  template: ''
})
export class MeshGroupInnDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ meshGroup }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(MeshGroupInnDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.meshGroup = meshGroup;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/mesh-group-inn', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/mesh-group-inn', { outlets: { popup: null } }]);
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
