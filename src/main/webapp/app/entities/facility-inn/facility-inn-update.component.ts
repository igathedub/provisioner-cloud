import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IFacilityInn, FacilityInn } from 'app/shared/model/facility-inn.model';
import { FacilityInnService } from './facility-inn.service';
import { ICustomerInn } from 'app/shared/model/customer-inn.model';
import { CustomerInnService } from 'app/entities/customer-inn/customer-inn.service';

@Component({
  selector: 'jhi-facility-inn-update',
  templateUrl: './facility-inn-update.component.html'
})
export class FacilityInnUpdateComponent implements OnInit {
  isSaving: boolean;

  customers: ICustomerInn[];

  editForm = this.fb.group({
    id: [],
    name: [],
    streetAddress: [],
    postalCode: [],
    city: [],
    country: [],
    customer: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected facilityService: FacilityInnService,
    protected customerService: CustomerInnService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ facility }) => {
      this.updateForm(facility);
    });
    this.customerService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ICustomerInn[]>) => mayBeOk.ok),
        map((response: HttpResponse<ICustomerInn[]>) => response.body)
      )
      .subscribe((res: ICustomerInn[]) => (this.customers = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(facility: IFacilityInn) {
    this.editForm.patchValue({
      id: facility.id,
      name: facility.name,
      streetAddress: facility.streetAddress,
      postalCode: facility.postalCode,
      city: facility.city,
      country: facility.country,
      customer: facility.customer
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const facility = this.createFromForm();
    if (facility.id !== undefined) {
      this.subscribeToSaveResponse(this.facilityService.update(facility));
    } else {
      this.subscribeToSaveResponse(this.facilityService.create(facility));
    }
  }

  private createFromForm(): IFacilityInn {
    return {
      ...new FacilityInn(),
      id: this.editForm.get(['id']).value,
      name: this.editForm.get(['name']).value,
      streetAddress: this.editForm.get(['streetAddress']).value,
      postalCode: this.editForm.get(['postalCode']).value,
      city: this.editForm.get(['city']).value,
      country: this.editForm.get(['country']).value,
      customer: this.editForm.get(['customer']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IFacilityInn>>) {
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
