import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { ProvisionerCloudTestModule } from '../../../test.module';
import { NetworkInnUpdateComponent } from 'app/entities/network-inn/network-inn-update.component';
import { NetworkInnService } from 'app/entities/network-inn/network-inn.service';
import { NetworkInn } from 'app/shared/model/network-inn.model';

describe('Component Tests', () => {
  describe('NetworkInn Management Update Component', () => {
    let comp: NetworkInnUpdateComponent;
    let fixture: ComponentFixture<NetworkInnUpdateComponent>;
    let service: NetworkInnService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ProvisionerCloudTestModule],
        declarations: [NetworkInnUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(NetworkInnUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(NetworkInnUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(NetworkInnService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new NetworkInn(123);
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
        const entity = new NetworkInn();
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
