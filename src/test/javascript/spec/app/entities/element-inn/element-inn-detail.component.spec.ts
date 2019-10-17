import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ProvisionerCloudTestModule } from '../../../test.module';
import { ElementInnDetailComponent } from 'app/entities/element-inn/element-inn-detail.component';
import { ElementInn } from 'app/shared/model/element-inn.model';

describe('Component Tests', () => {
  describe('ElementInn Management Detail Component', () => {
    let comp: ElementInnDetailComponent;
    let fixture: ComponentFixture<ElementInnDetailComponent>;
    const route = ({ data: of({ element: new ElementInn(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ProvisionerCloudTestModule],
        declarations: [ElementInnDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(ElementInnDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ElementInnDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.element).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
