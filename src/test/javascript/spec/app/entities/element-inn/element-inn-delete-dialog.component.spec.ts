import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { ProvisionerCloudTestModule } from '../../../test.module';
import { ElementInnDeleteDialogComponent } from 'app/entities/element-inn/element-inn-delete-dialog.component';
import { ElementInnService } from 'app/entities/element-inn/element-inn.service';

describe('Component Tests', () => {
  describe('ElementInn Management Delete Component', () => {
    let comp: ElementInnDeleteDialogComponent;
    let fixture: ComponentFixture<ElementInnDeleteDialogComponent>;
    let service: ElementInnService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ProvisionerCloudTestModule],
        declarations: [ElementInnDeleteDialogComponent]
      })
        .overrideTemplate(ElementInnDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ElementInnDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ElementInnService);
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
