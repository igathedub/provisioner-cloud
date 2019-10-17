import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IModelInn, ModelInn } from 'app/shared/model/model-inn.model';
import { ModelInnService } from './model-inn.service';
import { IElementInn } from 'app/shared/model/element-inn.model';
import { ElementInnService } from 'app/entities/element-inn/element-inn.service';

@Component({
  selector: 'jhi-model-inn-update',
  templateUrl: './model-inn-update.component.html'
})
export class ModelInnUpdateComponent implements OnInit {
  isSaving: boolean;

  elements: IElementInn[];

  editForm = this.fb.group({
    id: [],
    name: [],
    uuid: [],
    element: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected modelService: ModelInnService,
    protected elementService: ElementInnService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ model }) => {
      this.updateForm(model);
    });
    this.elementService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IElementInn[]>) => mayBeOk.ok),
        map((response: HttpResponse<IElementInn[]>) => response.body)
      )
      .subscribe((res: IElementInn[]) => (this.elements = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(model: IModelInn) {
    this.editForm.patchValue({
      id: model.id,
      name: model.name,
      uuid: model.uuid,
      element: model.element
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const model = this.createFromForm();
    if (model.id !== undefined) {
      this.subscribeToSaveResponse(this.modelService.update(model));
    } else {
      this.subscribeToSaveResponse(this.modelService.create(model));
    }
  }

  private createFromForm(): IModelInn {
    return {
      ...new ModelInn(),
      id: this.editForm.get(['id']).value,
      name: this.editForm.get(['name']).value,
      uuid: this.editForm.get(['uuid']).value,
      element: this.editForm.get(['element']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IModelInn>>) {
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

  trackElementById(index: number, item: IElementInn) {
    return item.id;
  }
}
