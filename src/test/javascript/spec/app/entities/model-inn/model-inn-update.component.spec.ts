import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { ProvisionerCloudTestModule } from '../../../test.module';
import { ModelInnUpdateComponent } from 'app/entities/model-inn/model-inn-update.component';
import { ModelInnService } from 'app/entities/model-inn/model-inn.service';
import { ModelInn } from 'app/shared/model/model-inn.model';

describe('Component Tests', () => {
  describe('ModelInn Management Update Component', () => {
    let comp: ModelInnUpdateComponent;
    let fixture: ComponentFixture<ModelInnUpdateComponent>;
    let service: ModelInnService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ProvisionerCloudTestModule],
        declarations: [ModelInnUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(ModelInnUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ModelInnUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ModelInnService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new ModelInn(123);
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
        const entity = new ModelInn();
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
