import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { ProvisionerCloudTestModule } from '../../../test.module';
import { RoleInnDeleteDialogComponent } from 'app/entities/role-inn/role-inn-delete-dialog.component';
import { RoleInnService } from 'app/entities/role-inn/role-inn.service';

describe('Component Tests', () => {
  describe('RoleInn Management Delete Component', () => {
    let comp: RoleInnDeleteDialogComponent;
    let fixture: ComponentFixture<RoleInnDeleteDialogComponent>;
    let service: RoleInnService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ProvisionerCloudTestModule],
        declarations: [RoleInnDeleteDialogComponent]
      })
        .overrideTemplate(RoleInnDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(RoleInnDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(RoleInnService);
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
