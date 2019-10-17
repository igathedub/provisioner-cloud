import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { ProvisionerCloudTestModule } from '../../../test.module';
import { ElementInnUpdateComponent } from 'app/entities/element-inn/element-inn-update.component';
import { ElementInnService } from 'app/entities/element-inn/element-inn.service';
import { ElementInn } from 'app/shared/model/element-inn.model';

describe('Component Tests', () => {
  describe('ElementInn Management Update Component', () => {
    let comp: ElementInnUpdateComponent;
    let fixture: ComponentFixture<ElementInnUpdateComponent>;
    let service: ElementInnService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ProvisionerCloudTestModule],
        declarations: [ElementInnUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(ElementInnUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ElementInnUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ElementInnService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new ElementInn(123);
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
        const entity = new ElementInn();
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
