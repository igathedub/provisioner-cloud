import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ProvisionerCloudTestModule } from '../../../test.module';
import { AppUserInnDetailComponent } from 'app/entities/app-user-inn/app-user-inn-detail.component';
import { AppUserInn } from 'app/shared/model/app-user-inn.model';

describe('Component Tests', () => {
  describe('AppUserInn Management Detail Component', () => {
    let comp: AppUserInnDetailComponent;
    let fixture: ComponentFixture<AppUserInnDetailComponent>;
    const route = ({ data: of({ appUser: new AppUserInn(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ProvisionerCloudTestModule],
        declarations: [AppUserInnDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(AppUserInnDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(AppUserInnDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.appUser).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
