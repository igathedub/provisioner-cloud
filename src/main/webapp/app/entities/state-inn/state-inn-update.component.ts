import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IStateInn, StateInn } from 'app/shared/model/state-inn.model';
import { StateInnService } from './state-inn.service';
import { IModelInn } from 'app/shared/model/model-inn.model';
import { ModelInnService } from 'app/entities/model-inn/model-inn.service';

@Component({
  selector: 'jhi-state-inn-update',
  templateUrl: './state-inn-update.component.html'
})
export class StateInnUpdateComponent implements OnInit {
  isSaving: boolean;

  models: IModelInn[];

  editForm = this.fb.group({
    id: [],
    name: [],
    value: [],
    uuid: [],
    model: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected stateService: StateInnService,
    protected modelService: ModelInnService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ state }) => {
      this.updateForm(state);
    });
    this.modelService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IModelInn[]>) => mayBeOk.ok),
        map((response: HttpResponse<IModelInn[]>) => response.body)
      )
      .subscribe((res: IModelInn[]) => (this.models = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(state: IStateInn) {
    this.editForm.patchValue({
      id: state.id,
      name: state.name,
      value: state.value,
      uuid: state.uuid,
      model: state.model
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const state = this.createFromForm();
    if (state.id !== undefined) {
      this.subscribeToSaveResponse(this.stateService.update(state));
    } else {
      this.subscribeToSaveResponse(this.stateService.create(state));
    }
  }

  private createFromForm(): IStateInn {
    return {
      ...new StateInn(),
      id: this.editForm.get(['id']).value,
      name: this.editForm.get(['name']).value,
      value: this.editForm.get(['value']).value,
      uuid: this.editForm.get(['uuid']).value,
      model: this.editForm.get(['model']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IStateInn>>) {
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

  trackModelById(index: number, item: IModelInn) {
    return item.id;
  }
}
