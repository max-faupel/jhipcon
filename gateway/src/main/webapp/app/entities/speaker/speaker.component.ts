import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';

import { ISpeaker } from 'app/shared/model/speaker.model';
import { AccountService } from 'app/core/auth/account.service';
import { SpeakerService } from './speaker.service';

@Component({
  selector: 'jhi-speaker',
  templateUrl: './speaker.component.html'
})
export class SpeakerComponent implements OnInit, OnDestroy {
  speakers: ISpeaker[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected speakerService: SpeakerService,
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.speakerService
      .query()
      .pipe(
        filter((res: HttpResponse<ISpeaker[]>) => res.ok),
        map((res: HttpResponse<ISpeaker[]>) => res.body)
      )
      .subscribe((res: ISpeaker[]) => {
        this.speakers = res;
      });
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().subscribe(account => {
      this.currentAccount = account;
    });
    this.registerChangeInSpeakers();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ISpeaker) {
    return item.id;
  }

  byteSize(field) {
    return this.dataUtils.byteSize(field);
  }

  openFile(contentType, field) {
    return this.dataUtils.openFile(contentType, field);
  }

  registerChangeInSpeakers() {
    this.eventSubscriber = this.eventManager.subscribe('speakerListModification', response => this.loadAll());
  }
}
