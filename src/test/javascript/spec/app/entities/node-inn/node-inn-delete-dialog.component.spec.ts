import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { ProvisionerCloudTestModule } from '../../../test.module';
import { NodeInnDeleteDialogComponent } from 'app/entities/node-inn/node-inn-delete-dialog.component';
import { NodeInnService } from 'app/entities/node-inn/node-inn.service';

describe('Component Tests', () => {
  describe('NodeInn Management Delete Component', () => {
    let comp: NodeInnDeleteDialogComponent;
    let fixture: ComponentFixture<NodeInnDeleteDialogComponent>;
    let service: NodeInnService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ProvisionerCloudTestModule],
        declarations: [NodeInnDeleteDialogComponent]
      })
        .overrideTemplate(NodeInnDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(NodeInnDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(NodeInnService);
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
