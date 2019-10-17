import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { ProvisionerCloudTestModule } from '../../../test.module';
import { MeshGroupInnUpdateComponent } from 'app/entities/mesh-group-inn/mesh-group-inn-update.component';
import { MeshGroupInnService } from 'app/entities/mesh-group-inn/mesh-group-inn.service';
import { MeshGroupInn } from 'app/shared/model/mesh-group-inn.model';

describe('Component Tests', () => {
  describe('MeshGroupInn Management Update Component', () => {
    let comp: MeshGroupInnUpdateComponent;
    let fixture: ComponentFixture<MeshGroupInnUpdateComponent>;
    let service: MeshGroupInnService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ProvisionerCloudTestModule],
        declarations: [MeshGroupInnUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(MeshGroupInnUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(MeshGroupInnUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(MeshGroupInnService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new MeshGroupInn(123);
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
        const entity = new MeshGroupInn();
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
