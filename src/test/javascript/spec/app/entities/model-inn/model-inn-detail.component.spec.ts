import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ProvisionerCloudTestModule } from '../../../test.module';
import { ModelInnDetailComponent } from 'app/entities/model-inn/model-inn-detail.component';
import { ModelInn } from 'app/shared/model/model-inn.model';

describe('Component Tests', () => {
  describe('ModelInn Management Detail Component', () => {
    let comp: ModelInnDetailComponent;
    let fixture: ComponentFixture<ModelInnDetailComponent>;
    const route = ({ data: of({ model: new ModelInn(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ProvisionerCloudTestModule],
        declarations: [ModelInnDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(ModelInnDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ModelInnDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.model).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
