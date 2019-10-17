import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IRoleInn, RoleInn } from 'app/shared/model/role-inn.model';
import { RoleInnService } from './role-inn.service';
import { IAppUserInn } from 'app/shared/model/app-user-inn.model';
import { AppUserInnService } from 'app/entities/app-user-inn/app-user-inn.service';

@Component({
  selector: 'jhi-role-inn-update',
  templateUrl: './role-inn-update.component.html'
})
export class RoleInnUpdateComponent implements OnInit {
  isSaving: boolean;

  appusers: IAppUserInn[];

  editForm = this.fb.group({
    id: [],
    name: [],
    description: [],
    appUser: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected roleService: RoleInnService,
    protected appUserService: AppUserInnService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ role }) => {
      this.updateForm(role);
    });
    this.appUserService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IAppUserInn[]>) => mayBeOk.ok),
        map((response: HttpResponse<IAppUserInn[]>) => response.body)
      )
      .subscribe((res: IAppUserInn[]) => (this.appusers = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(role: IRoleInn) {
    this.editForm.patchValue({
      id: role.id,
      name: role.name,
      description: role.description,
      appUser: role.appUser
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const role = this.createFromForm();
    if (role.id !== undefined) {
      this.subscribeToSaveResponse(this.roleService.update(role));
    } else {
      this.subscribeToSaveResponse(this.roleService.create(role));
    }
  }

  private createFromForm(): IRoleInn {
    return {
      ...new RoleInn(),
      id: this.editForm.get(['id']).value,
      name: this.editForm.get(['name']).value,
      description: this.editForm.get(['description']).value,
      appUser: this.editForm.get(['appUser']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IRoleInn>>) {
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

  trackAppUserById(index: number, item: IAppUserInn) {
    return item.id;
  }
}
