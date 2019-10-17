import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { ProvisionerCloudTestModule } from '../../../test.module';
import { AppUserInnUpdateComponent } from 'app/entities/app-user-inn/app-user-inn-update.component';
import { AppUserInnService } from 'app/entities/app-user-inn/app-user-inn.service';
import { AppUserInn } from 'app/shared/model/app-user-inn.model';

describe('Component Tests', () => {
  describe('AppUserInn Management Update Component', () => {
    let comp: AppUserInnUpdateComponent;
    let fixture: ComponentFixture<AppUserInnUpdateComponent>;
    let service: AppUserInnService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ProvisionerCloudTestModule],
        declarations: [AppUserInnUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(AppUserInnUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(AppUserInnUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AppUserInnService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new AppUserInn(123);
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
        const entity = new AppUserInn();
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
