import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IAppUserInn, AppUserInn } from 'app/shared/model/app-user-inn.model';
import { AppUserInnService } from './app-user-inn.service';
import { ICustomerInn } from 'app/shared/model/customer-inn.model';
import { CustomerInnService } from 'app/entities/customer-inn/customer-inn.service';

@Component({
  selector: 'jhi-app-user-inn-update',
  templateUrl: './app-user-inn-update.component.html'
})
export class AppUserInnUpdateComponent implements OnInit {
  isSaving: boolean;

  customers: ICustomerInn[];

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]],
    password: [null, [Validators.required]],
    email: [],
    domain: [],
    customer: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected appUserService: AppUserInnService,
    protected customerService: CustomerInnService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ appUser }) => {
      this.updateForm(appUser);
    });
    this.customerService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ICustomerInn[]>) => mayBeOk.ok),
        map((response: HttpResponse<ICustomerInn[]>) => response.body)
      )
      .subscribe((res: ICustomerInn[]) => (this.customers = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(appUser: IAppUserInn) {
    this.editForm.patchValue({
      id: appUser.id,
      name: appUser.name,
      password: appUser.password,
      email: appUser.email,
      domain: appUser.domain,
      customer: appUser.customer
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const appUser = this.createFromForm();
    if (appUser.id !== undefined) {
      this.subscribeToSaveResponse(this.appUserService.update(appUser));
    } else {
      this.subscribeToSaveResponse(this.appUserService.create(appUser));
    }
  }

  private createFromForm(): IAppUserInn {
    return {
      ...new AppUserInn(),
      id: this.editForm.get(['id']).value,
      name: this.editForm.get(['name']).value,
      password: this.editForm.get(['password']).value,
      email: this.editForm.get(['email']).value,
      domain: this.editForm.get(['domain']).value,
      customer: this.editForm.get(['customer']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAppUserInn>>) {
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

  trackCustomerById(index: number, item: ICustomerInn) {
    return item.id;
  }
}
