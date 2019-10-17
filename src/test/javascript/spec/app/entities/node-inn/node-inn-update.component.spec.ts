import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { ProvisionerCloudTestModule } from '../../../test.module';
import { NodeInnUpdateComponent } from 'app/entities/node-inn/node-inn-update.component';
import { NodeInnService } from 'app/entities/node-inn/node-inn.service';
import { NodeInn } from 'app/shared/model/node-inn.model';

describe('Component Tests', () => {
  describe('NodeInn Management Update Component', () => {
    let comp: NodeInnUpdateComponent;
    let fixture: ComponentFixture<NodeInnUpdateComponent>;
    let service: NodeInnService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ProvisionerCloudTestModule],
        declarations: [NodeInnUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(NodeInnUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(NodeInnUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(NodeInnService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new NodeInn(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new NodeInn();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
