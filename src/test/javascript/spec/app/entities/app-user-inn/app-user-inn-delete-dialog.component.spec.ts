import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { ProvisionerCloudTestModule } from '../../../test.module';
import { AppUserInnDeleteDialogComponent } from 'app/entities/app-user-inn/app-user-inn-delete-dialog.component';
import { AppUserInnService } from 'app/entities/app-user-inn/app-user-inn.service';

describe('Component Tests', () => {
  describe('AppUserInn Management Delete Component', () => {
    let comp: AppUserInnDeleteDialogComponent;
    let fixture: ComponentFixture<AppUserInnDeleteDialogComponent>;
    let service: AppUserInnService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ProvisionerCloudTestModule],
        declarations: [AppUserInnDeleteDialogComponent]
      })
        .overrideTemplate(AppUserInnDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(AppUserInnDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AppUserInnService);
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
