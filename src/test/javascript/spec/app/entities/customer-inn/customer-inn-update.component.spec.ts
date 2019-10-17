import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { ProvisionerCloudTestModule } from '../../../test.module';
import { CustomerInnUpdateComponent } from 'app/entities/customer-inn/customer-inn-update.component';
import { CustomerInnService } from 'app/entities/customer-inn/customer-inn.service';
import { CustomerInn } from 'app/shared/model/customer-inn.model';

describe('Component Tests', () => {
  describe('CustomerInn Management Update Component', () => {
    let comp: CustomerInnUpdateComponent;
    let fixture: ComponentFixture<CustomerInnUpdateComponent>;
    let service: CustomerInnService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ProvisionerCloudTestModule],
        declarations: [CustomerInnUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(CustomerInnUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CustomerInnUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CustomerInnService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new CustomerInn(123);
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
        const entity = new CustomerInn();
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
