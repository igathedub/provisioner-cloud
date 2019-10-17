import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ProvisionerCloudTestModule } from '../../../test.module';
import { NodeInnDetailComponent } from 'app/entities/node-inn/node-inn-detail.component';
import { NodeInn } from 'app/shared/model/node-inn.model';

describe('Component Tests', () => {
  describe('NodeInn Management Detail Component', () => {
    let comp: NodeInnDetailComponent;
    let fixture: ComponentFixture<NodeInnDetailComponent>;
    const route = ({ data: of({ node: new NodeInn(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ProvisionerCloudTestModule],
        declarations: [NodeInnDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(NodeInnDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(NodeInnDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.node).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
