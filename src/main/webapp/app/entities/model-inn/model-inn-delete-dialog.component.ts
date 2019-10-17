import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IModelInn } from 'app/shared/model/model-inn.model';
import { ModelInnService } from './model-inn.service';

@Component({
  selector: 'jhi-model-inn-delete-dialog',
  templateUrl: './model-inn-delete-dialog.component.html'
})
export class ModelInnDeleteDialogComponent {
  model: IModelInn;

  constructor(protected modelService: ModelInnService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.modelService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'modelListModification',
        content: 'Deleted an model'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-model-inn-delete-popup',
  template: ''
})
export class ModelInnDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ model }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(ModelInnDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.model = model;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/model-inn', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/model-inn', { outlets: { popup: null } }]);
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
