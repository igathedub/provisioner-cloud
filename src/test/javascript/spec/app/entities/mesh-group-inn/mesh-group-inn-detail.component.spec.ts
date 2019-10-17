import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ProvisionerCloudTestModule } from '../../../test.module';
import { MeshGroupInnDetailComponent } from 'app/entities/mesh-group-inn/mesh-group-inn-detail.component';
import { MeshGroupInn } from 'app/shared/model/mesh-group-inn.model';

describe('Component Tests', () => {
  describe('MeshGroupInn Management Detail Component', () => {
    let comp: MeshGroupInnDetailComponent;
    let fixture: ComponentFixture<MeshGroupInnDetailComponent>;
    const route = ({ data: of({ meshGroup: new MeshGroupInn(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ProvisionerCloudTestModule],
        declarations: [MeshGroupInnDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(MeshGroupInnDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(MeshGroupInnDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.meshGroup).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
