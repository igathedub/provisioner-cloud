import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ProvisionerCloudTestModule } from '../../../test.module';
import { StateInnDetailComponent } from 'app/entities/state-inn/state-inn-detail.component';
import { StateInn } from 'app/shared/model/state-inn.model';

describe('Component Tests', () => {
  describe('StateInn Management Detail Component', () => {
    let comp: StateInnDetailComponent;
    let fixture: ComponentFixture<StateInnDetailComponent>;
    const route = ({ data: of({ state: new StateInn(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ProvisionerCloudTestModule],
        declarations: [StateInnDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(StateInnDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(StateInnDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.state).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
