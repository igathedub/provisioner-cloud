import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IElementInn } from 'app/shared/model/element-inn.model';
import { ElementInnService } from './element-inn.service';

@Component({
  selector: 'jhi-element-inn-delete-dialog',
  templateUrl: './element-inn-delete-dialog.component.html'
})
export class ElementInnDeleteDialogComponent {
  element: IElementInn;

  constructor(protected elementService: ElementInnService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.elementService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'elementListModification',
        content: 'Deleted an element'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-element-inn-delete-popup',
  template: ''
})
export class ElementInnDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ element }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(ElementInnDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.element = element;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/element-inn', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/element-inn', { outlets: { popup: null } }]);
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
