import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IElementInn, ElementInn } from 'app/shared/model/element-inn.model';
import { ElementInnService } from './element-inn.service';
import { INodeInn } from 'app/shared/model/node-inn.model';
import { NodeInnService } from 'app/entities/node-inn/node-inn.service';

@Component({
  selector: 'jhi-element-inn-update',
  templateUrl: './element-inn-update.component.html'
})
export class ElementInnUpdateComponent implements OnInit {
  isSaving: boolean;

  nodes: INodeInn[];

  editForm = this.fb.group({
    id: [],
    index: [],
    location: [],
    name: [],
    node: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected elementService: ElementInnService,
    protected nodeService: NodeInnService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ element }) => {
      this.updateForm(element);
    });
    this.nodeService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<INodeInn[]>) => mayBeOk.ok),
        map((response: HttpResponse<INodeInn[]>) => response.body)
      )
      .subscribe((res: INodeInn[]) => (this.nodes = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(element: IElementInn) {
    this.editForm.patchValue({
      id: element.id,
      index: element.index,
      location: element.location,
      name: element.name,
      node: element.node
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const element = this.createFromForm();
    if (element.id !== undefined) {
      this.subscribeToSaveResponse(this.elementService.update(element));
    } else {
      this.subscribeToSaveResponse(this.elementService.create(element));
    }
  }

  private createFromForm(): IElementInn {
    return {
      ...new ElementInn(),
      id: this.editForm.get(['id']).value,
      index: this.editForm.get(['index']).value,
      location: this.editForm.get(['location']).value,
      name: this.editForm.get(['name']).value,
      node: this.editForm.get(['node']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IElementInn>>) {
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

  trackNodeById(index: number, item: INodeInn) {
    return item.id;
  }
}
