import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { ProvisionerCloudTestModule } from '../../../test.module';
import { StateInnUpdateComponent } from 'app/entities/state-inn/state-inn-update.component';
import { StateInnService } from 'app/entities/state-inn/state-inn.service';
import { StateInn } from 'app/shared/model/state-inn.model';

describe('Component Tests', () => {
  describe('StateInn Management Update Component', () => {
    let comp: StateInnUpdateComponent;
    let fixture: ComponentFixture<StateInnUpdateComponent>;
    let service: StateInnService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ProvisionerCloudTestModule],
        declarations: [StateInnUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(StateInnUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(StateInnUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(StateInnService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new StateInn(123);
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
        const entity = new StateInn();
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
