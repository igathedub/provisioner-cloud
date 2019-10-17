import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ProvisionerCloudTestModule } from '../../../test.module';
import { RoleInnDetailComponent } from 'app/entities/role-inn/role-inn-detail.component';
import { RoleInn } from 'app/shared/model/role-inn.model';

describe('Component Tests', () => {
  describe('RoleInn Management Detail Component', () => {
    let comp: RoleInnDetailComponent;
    let fixture: ComponentFixture<RoleInnDetailComponent>;
    const route = ({ data: of({ role: new RoleInn(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ProvisionerCloudTestModule],
        declarations: [RoleInnDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(RoleInnDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(RoleInnDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.role).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
