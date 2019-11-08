import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';

import { ISession } from 'app/shared/model/session.model';
import { AccountService } from 'app/core/auth/account.service';
import { SessionService } from './session.service';

@Component({
  selector: 'jhi-session',
  templateUrl: './session.component.html'
})
export class SessionComponent implements OnInit, OnDestroy {
  sessions: ISession[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected sessionService: SessionService,
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.sessionService
      .query()
      .pipe(
        filter((res: HttpResponse<ISession[]>) => res.ok),
        map((res: HttpResponse<ISession[]>) => res.body)
      )
      .subscribe((res: ISession[]) => {
        this.sessions = res;
      });
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().subscribe(account => {
      this.currentAccount = account;
    });
    this.registerChangeInSessions();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ISession) {
    return item.id;
  }

  byteSize(field) {
    return this.dataUtils.byteSize(field);
  }

  openFile(contentType, field) {
    return this.dataUtils.openFile(contentType, field);
  }

  registerChangeInSessions() {
    this.eventSubscriber = this.eventManager.subscribe('sessionListModification', response => this.loadAll());
  }
}
