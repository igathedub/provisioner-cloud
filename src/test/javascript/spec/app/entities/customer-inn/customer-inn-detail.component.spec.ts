import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ProvisionerCloudTestModule } from '../../../test.module';
import { CustomerInnDetailComponent } from 'app/entities/customer-inn/customer-inn-detail.component';
import { CustomerInn } from 'app/shared/model/customer-inn.model';

describe('Component Tests', () => {
  describe('CustomerInn Management Detail Component', () => {
    let comp: CustomerInnDetailComponent;
    let fixture: ComponentFixture<CustomerInnDetailComponent>;
    const route = ({ data: of({ customer: new CustomerInn(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ProvisionerCloudTestModule],
        declarations: [CustomerInnDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(CustomerInnDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CustomerInnDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.customer).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
