import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ProvisionerCloudTestModule } from '../../../test.module';
import { NetworkInnDetailComponent } from 'app/entities/network-inn/network-inn-detail.component';
import { NetworkInn } from 'app/shared/model/network-inn.model';

describe('Component Tests', () => {
  describe('NetworkInn Management Detail Component', () => {
    let comp: NetworkInnDetailComponent;
    let fixture: ComponentFixture<NetworkInnDetailComponent>;
    const route = ({ data: of({ network: new NetworkInn(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ProvisionerCloudTestModule],
        declarations: [NetworkInnDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(NetworkInnDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(NetworkInnDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.network).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
