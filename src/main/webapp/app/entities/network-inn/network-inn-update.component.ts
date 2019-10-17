import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { INetworkInn, NetworkInn } from 'app/shared/model/network-inn.model';
import { NetworkInnService } from './network-inn.service';
import { IFacilityInn } from 'app/shared/model/facility-inn.model';
import { FacilityInnService } from 'app/entities/facility-inn/facility-inn.service';

@Component({
  selector: 'jhi-network-inn-update',
  templateUrl: './network-inn-update.component.html'
})
export class NetworkInnUpdateComponent implements OnInit {
  isSaving: boolean;

  facilities: IFacilityInn[];

  editForm = this.fb.group({
    id: [],
    name: [],
    gobalTTL: [],
    unicast: [],
    networkKey: [],
    keyIndex: [],
    flagRefreshPhase: [],
    flagIVUpdate: [],
    ivIndex: [],
    appKey: [],
    facility: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected networkService: NetworkInnService,
    protected facilityService: FacilityInnService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ network }) => {
      this.updateForm(network);
    });
    this.facilityService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IFacilityInn[]>) => mayBeOk.ok),
        map((response: HttpResponse<IFacilityInn[]>) => response.body)
      )
      .subscribe((res: IFacilityInn[]) => (this.facilities = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(network: INetworkInn) {
    this.editForm.patchValue({
      id: network.id,
      name: network.name,
      gobalTTL: network.gobalTTL,
      unicast: network.unicast,
      networkKey: network.networkKey,
      keyIndex: network.keyIndex,
      flagRefreshPhase: network.flagRefreshPhase,
      flagIVUpdate: network.flagIVUpdate,
      ivIndex: network.ivIndex,
      appKey: network.appKey,
      facility: network.facility
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const network = this.createFromForm();
    if (network.id !== undefined) {
      this.subscribeToSaveResponse(this.networkService.update(network));
    } else {
      this.subscribeToSaveResponse(this.networkService.create(network));
    }
  }

  private createFromForm(): INetworkInn {
    return {
      ...new NetworkInn(),
      id: this.editForm.get(['id']).value,
      name: this.editForm.get(['name']).value,
      gobalTTL: this.editForm.get(['gobalTTL']).value,
      unicast: this.editForm.get(['unicast']).value,
      networkKey: this.editForm.get(['networkKey']).value,
      keyIndex: this.editForm.get(['keyIndex']).value,
      flagRefreshPhase: this.editForm.get(['flagRefreshPhase']).value,
      flagIVUpdate: this.editForm.get(['flagIVUpdate']).value,
      ivIndex: this.editForm.get(['ivIndex']).value,
      appKey: this.editForm.get(['appKey']).value,
      facility: this.editForm.get(['facility']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<INetworkInn>>) {
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

  trackFacilityById(index: number, item: IFacilityInn) {
    return item.id;
  }
}
