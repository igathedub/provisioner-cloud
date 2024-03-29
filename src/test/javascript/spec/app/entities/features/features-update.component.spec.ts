import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { ProvisionerCloudTestModule } from '../../../test.module';
import { FeaturesUpdateComponent } from 'app/entities/features/features-update.component';
import { FeaturesService } from 'app/entities/features/features.service';
import { Features } from 'app/shared/model/features.model';

describe('Component Tests', () => {
  describe('Features Management Update Component', () => {
    let comp: FeaturesUpdateComponent;
    let fixture: ComponentFixture<FeaturesUpdateComponent>;
    let service: FeaturesService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ProvisionerCloudTestModule],
        declarations: [FeaturesUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(FeaturesUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(FeaturesUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(FeaturesService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Features(123);
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
        const entity = new Features();
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
