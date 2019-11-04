import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IKeyIndex, KeyIndex } from 'app/shared/model/key-index.model';
import { KeyIndexService } from './key-index.service';
import { INodeInn } from 'app/shared/model/node-inn.model';
import { NodeInnService } from 'app/entities/node-inn/node-inn.service';

@Component({
  selector: 'jhi-key-index-update',
  templateUrl: './key-index-update.component.html'
})
export class KeyIndexUpdateComponent implements OnInit {
  isSaving: boolean;

  nodes: INodeInn[];

  editForm = this.fb.group({
    id: [],
    index: [],
    updated: [],
    node: [],
    node: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected keyIndexService: KeyIndexService,
    protected nodeService: NodeInnService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ keyIndex }) => {
      this.updateForm(keyIndex);
    });
    this.nodeService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<INodeInn[]>) => mayBeOk.ok),
        map((response: HttpResponse<INodeInn[]>) => response.body)
      )
      .subscribe((res: INodeInn[]) => (this.nodes = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(keyIndex: IKeyIndex) {
    this.editForm.patchValue({
      id: keyIndex.id,
      index: keyIndex.index,
      updated: keyIndex.updated,
      node: keyIndex.node,
      node: keyIndex.node
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const keyIndex = this.createFromForm();
    if (keyIndex.id !== undefined) {
      this.subscribeToSaveResponse(this.keyIndexService.update(keyIndex));
    } else {
      this.subscribeToSaveResponse(this.keyIndexService.create(keyIndex));
    }
  }

  private createFromForm(): IKeyIndex {
    return {
      ...new KeyIndex(),
      id: this.editForm.get(['id']).value,
      index: this.editForm.get(['index']).value,
      updated: this.editForm.get(['updated']).value,
      node: this.editForm.get(['node']).value,
      node: this.editForm.get(['node']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IKeyIndex>>) {
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
