import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { INodeInn, NodeInn } from 'app/shared/model/node-inn.model';
import { NodeInnService } from './node-inn.service';
import { IMeshGroupInn } from 'app/shared/model/mesh-group-inn.model';
import { MeshGroupInnService } from 'app/entities/mesh-group-inn/mesh-group-inn.service';

@Component({
  selector: 'jhi-node-inn-update',
  templateUrl: './node-inn-update.component.html'
})
export class NodeInnUpdateComponent implements OnInit {
  isSaving: boolean;

  meshgroups: IMeshGroupInn[];

  editForm = this.fb.group({
    id: [],
    name: [],
    provisionTime: [],
    nodeIdentifier: [],
    unicastAdress: [],
    features: [],
    appKey: [],
    meshGroup: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected nodeService: NodeInnService,
    protected meshGroupService: MeshGroupInnService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ node }) => {
      this.updateForm(node);
    });
    this.meshGroupService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IMeshGroupInn[]>) => mayBeOk.ok),
        map((response: HttpResponse<IMeshGroupInn[]>) => response.body)
      )
      .subscribe((res: IMeshGroupInn[]) => (this.meshgroups = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(node: INodeInn) {
    this.editForm.patchValue({
      id: node.id,
      name: node.name,
      provisionTime: node.provisionTime != null ? node.provisionTime.format(DATE_TIME_FORMAT) : null,
      nodeIdentifier: node.nodeIdentifier,
      unicastAdress: node.unicastAdress,
      features: node.features,
      appKey: node.appKey,
      meshGroup: node.meshGroup
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const node = this.createFromForm();
    if (node.id !== undefined) {
      this.subscribeToSaveResponse(this.nodeService.update(node));
    } else {
      this.subscribeToSaveResponse(this.nodeService.create(node));
    }
  }

  private createFromForm(): INodeInn {
    return {
      ...new NodeInn(),
      id: this.editForm.get(['id']).value,
      name: this.editForm.get(['name']).value,
      provisionTime:
        this.editForm.get(['provisionTime']).value != null
          ? moment(this.editForm.get(['provisionTime']).value, DATE_TIME_FORMAT)
          : undefined,
      nodeIdentifier: this.editForm.get(['nodeIdentifier']).value,
      unicastAdress: this.editForm.get(['unicastAdress']).value,
      features: this.editForm.get(['features']).value,
      appKey: this.editForm.get(['appKey']).value,
      meshGroup: this.editForm.get(['meshGroup']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<INodeInn>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackMeshGroupById(index: number, item: IMeshGroupInn) {
    return item.id;
  }
}
