import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { ProvisionerCloudTestModule } from '../../../test.module';
import { StateInnDeleteDialogComponent } from 'app/entities/state-inn/state-inn-delete-dialog.component';
import { StateInnService } from 'app/entities/state-inn/state-inn.service';

describe('Component Tests', () => {
  describe('StateInn Management Delete Component', () => {
    let comp: StateInnDeleteDialogComponent;
    let fixture: ComponentFixture<StateInnDeleteDialogComponent>;
    let service: StateInnService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ProvisionerCloudTestModule],
        declarations: [StateInnDeleteDialogComponent]
      })
        .overrideTemplate(StateInnDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(StateInnDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(StateInnService);
      mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
      mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));
    });
  });
});
