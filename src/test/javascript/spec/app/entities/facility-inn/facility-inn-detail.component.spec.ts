import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ProvisionerCloudTestModule } from '../../../test.module';
import { FacilityInnDetailComponent } from 'app/entities/facility-inn/facility-inn-detail.component';
import { FacilityInn } from 'app/shared/model/facility-inn.model';

describe('Component Tests', () => {
  describe('FacilityInn Management Detail Component', () => {
    let comp: FacilityInnDetailComponent;
    let fixture: ComponentFixture<FacilityInnDetailComponent>;
    const route = ({ data: of({ facility: new FacilityInn(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ProvisionerCloudTestModule],
        declarations: [FacilityInnDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(FacilityInnDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(FacilityInnDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.facility).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
