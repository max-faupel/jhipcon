import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import { ISession, Session } from 'app/shared/model/session.model';
import { SessionService } from './session.service';
import { ISpeaker } from 'app/shared/model/speaker.model';
import { SpeakerService } from 'app/entities/speaker';

@Component({
  selector: 'jhi-session-update',
  templateUrl: './session-update.component.html'
})
export class SessionUpdateComponent implements OnInit {
  isSaving: boolean;

  speakers: ISpeaker[];

  editForm = this.fb.group({
    id: [],
    title: [null, [Validators.required]],
    description: [null, [Validators.required]],
    descriptionContentType: [],
    startDateTime: [null, [Validators.required]],
    endDateTime: [null, [Validators.required]]
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected jhiAlertService: JhiAlertService,
    protected sessionService: SessionService,
    protected speakerService: SpeakerService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ session }) => {
      this.updateForm(session);
    });
    this.speakerService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ISpeaker[]>) => mayBeOk.ok),
        map((response: HttpResponse<ISpeaker[]>) => response.body)
      )
      .subscribe((res: ISpeaker[]) => (this.speakers = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(session: ISession) {
    this.editForm.patchValue({
      id: session.id,
      title: session.title,
      description: session.description,
      descriptionContentType: session.descriptionContentType,
      startDateTime: session.startDateTime != null ? session.startDateTime.format(DATE_TIME_FORMAT) : null,
      endDateTime: session.endDateTime != null ? session.endDateTime.format(DATE_TIME_FORMAT) : null
    });
  }

  byteSize(field) {
    return this.dataUtils.byteSize(field);
  }

  openFile(contentType, field) {
    return this.dataUtils.openFile(contentType, field);
  }

  setFileData(event, field: string, isImage) {
    return new Promise((resolve, reject) => {
      if (event && event.target && event.target.files && event.target.files[0]) {
        const file = event.target.files[0];
        if (isImage && !/^image\//.test(file.type)) {
          reject(`File was expected to be an image but was found to be ${file.type}`);
        } else {
          const filedContentType: string = field + 'ContentType';
          this.dataUtils.toBase64(file, base64Data => {
            this.editForm.patchValue({
              [field]: base64Data,
              [filedContentType]: file.type
            });
          });
        }
      } else {
        reject(`Base64 data was not set as file could not be extracted from passed parameter: ${event}`);
      }
    }).then(
      () => console.log('blob added'), // sucess
      this.onError
    );
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const session = this.createFromForm();
    if (session.id !== undefined) {
      this.subscribeToSaveResponse(this.sessionService.update(session));
    } else {
      this.subscribeToSaveResponse(this.sessionService.create(session));
    }
  }

  private createFromForm(): ISession {
    return {
      ...new Session(),
      id: this.editForm.get(['id']).value,
      title: this.editForm.get(['title']).value,
      descriptionContentType: this.editForm.get(['descriptionContentType']).value,
      description: this.editForm.get(['description']).value,
      startDateTime:
        this.editForm.get(['startDateTime']).value != null
          ? moment(this.editForm.get(['startDateTime']).value, DATE_TIME_FORMAT)
          : undefined,
      endDateTime:
        this.editForm.get(['endDateTime']).value != null ? moment(this.editForm.get(['endDateTime']).value, DATE_TIME_FORMAT) : undefined
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISession>>) {
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

  trackSpeakerById(index: number, item: ISpeaker) {
    return item.id;
  }

  getSelected(selectedVals: Array<any>, option: any) {
    if (selectedVals) {
      for (let i = 0; i < selectedVals.length; i++) {
        if (option.id === selectedVals[i].id) {
          return selectedVals[i];
        }
      }
    }
    return option;
  }
}
