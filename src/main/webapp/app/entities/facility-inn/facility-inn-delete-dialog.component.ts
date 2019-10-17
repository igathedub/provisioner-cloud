import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IFacilityInn } from 'app/shared/model/facility-inn.model';
import { FacilityInnService } from './facility-inn.service';

@Component({
  selector: 'jhi-facility-inn-delete-dialog',
  templateUrl: './facility-inn-delete-dialog.component.html'
})
export class FacilityInnDeleteDialogComponent {
  facility: IFacilityInn;

  constructor(protected facilityService: FacilityInnService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.facilityService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'facilityListModification',
        content: 'Deleted an facility'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-facility-inn-delete-popup',
  template: ''
})
export class FacilityInnDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ facility }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(FacilityInnDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.facility = facility;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/facility-inn', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/facility-inn', { outlets: { popup: null } }]);
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
