import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { ProvisionerCloudTestModule } from '../../../test.module';
import { RoleInnUpdateComponent } from 'app/entities/role-inn/role-inn-update.component';
import { RoleInnService } from 'app/entities/role-inn/role-inn.service';
import { RoleInn } from 'app/shared/model/role-inn.model';

describe('Component Tests', () => {
  describe('RoleInn Management Update Component', () => {
    let comp: RoleInnUpdateComponent;
    let fixture: ComponentFixture<RoleInnUpdateComponent>;
    let service: RoleInnService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ProvisionerCloudTestModule],
        declarations: [RoleInnUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(RoleInnUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(RoleInnUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(RoleInnService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new RoleInn(123);
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
        const entity = new RoleInn();
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
