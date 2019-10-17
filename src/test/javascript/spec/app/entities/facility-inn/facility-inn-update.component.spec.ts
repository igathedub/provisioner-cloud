import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { ProvisionerCloudTestModule } from '../../../test.module';
import { FacilityInnUpdateComponent } from 'app/entities/facility-inn/facility-inn-update.component';
import { FacilityInnService } from 'app/entities/facility-inn/facility-inn.service';
import { FacilityInn } from 'app/shared/model/facility-inn.model';

describe('Component Tests', () => {
  describe('FacilityInn Management Update Component', () => {
    let comp: FacilityInnUpdateComponent;
    let fixture: ComponentFixture<FacilityInnUpdateComponent>;
    let service: FacilityInnService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ProvisionerCloudTestModule],
        declarations: [FacilityInnUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(FacilityInnUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(FacilityInnUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(FacilityInnService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new FacilityInn(123);
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
        const entity = new FacilityInn();
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
