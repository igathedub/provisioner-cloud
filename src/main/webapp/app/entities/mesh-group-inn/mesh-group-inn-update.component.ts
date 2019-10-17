import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IMeshGroupInn, MeshGroupInn } from 'app/shared/model/mesh-group-inn.model';
import { MeshGroupInnService } from './mesh-group-inn.service';
import { INetworkInn } from 'app/shared/model/network-inn.model';
import { NetworkInnService } from 'app/entities/network-inn/network-inn.service';

@Component({
  selector: 'jhi-mesh-group-inn-update',
  templateUrl: './mesh-group-inn-update.component.html'
})
export class MeshGroupInnUpdateComponent implements OnInit {
  isSaving: boolean;

  networks: INetworkInn[];

  editForm = this.fb.group({
    id: [],
    name: [],
    virtual: [],
    network: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected meshGroupService: MeshGroupInnService,
    protected networkService: NetworkInnService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ meshGroup }) => {
      this.updateForm(meshGroup);
    });
    this.networkService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<INetworkInn[]>) => mayBeOk.ok),
        map((response: HttpResponse<INetworkInn[]>) => response.body)
      )
      .subscribe((res: INetworkInn[]) => (this.networks = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(meshGroup: IMeshGroupInn) {
    this.editForm.patchValue({
      id: meshGroup.id,
      name: meshGroup.name,
      virtual: meshGroup.virtual,
      network: meshGroup.network
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const meshGroup = this.createFromForm();
    if (meshGroup.id !== undefined) {
      this.subscribeToSaveResponse(this.meshGroupService.update(meshGroup));
    } else {
      this.subscribeToSaveResponse(this.meshGroupService.create(meshGroup));
    }
  }

  private createFromForm(): IMeshGroupInn {
    return {
      ...new MeshGroupInn(),
      id: this.editForm.get(['id']).value,
      name: this.editForm.get(['name']).value,
      virtual: this.editForm.get(['virtual']).value,
      network: this.editForm.get(['network']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IMeshGroupInn>>) {
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

  trackNetworkById(index: number, item: INetworkInn) {
    return item.id;
  }
}
