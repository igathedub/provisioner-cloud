import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { ProvisionerCloudTestModule } from '../../../test.module';
import { ModelInnDeleteDialogComponent } from 'app/entities/model-inn/model-inn-delete-dialog.component';
import { ModelInnService } from 'app/entities/model-inn/model-inn.service';

describe('Component Tests', () => {
  describe('ModelInn Management Delete Component', () => {
    let comp: ModelInnDeleteDialogComponent;
    let fixture: ComponentFixture<ModelInnDeleteDialogComponent>;
    let service: ModelInnService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ProvisionerCloudTestModule],
        declarations: [ModelInnDeleteDialogComponent]
      })
        .overrideTemplate(ModelInnDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ModelInnDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ModelInnService);
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
