import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { ProvisionerCloudTestModule } from '../../../test.module';
import { MeshGroupInnDeleteDialogComponent } from 'app/entities/mesh-group-inn/mesh-group-inn-delete-dialog.component';
import { MeshGroupInnService } from 'app/entities/mesh-group-inn/mesh-group-inn.service';

describe('Component Tests', () => {
  describe('MeshGroupInn Management Delete Component', () => {
    let comp: MeshGroupInnDeleteDialogComponent;
    let fixture: ComponentFixture<MeshGroupInnDeleteDialogComponent>;
    let service: MeshGroupInnService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ProvisionerCloudTestModule],
        declarations: [MeshGroupInnDeleteDialogComponent]
      })
        .overrideTemplate(MeshGroupInnDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(MeshGroupInnDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(MeshGroupInnService);
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
