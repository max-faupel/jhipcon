import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager } from 'ng-jhipster';

import { IAuthor } from 'app/shared/model/author.model';
import { AccountService } from 'app/core/auth/account.service';
import { AuthorService } from './author.service';

@Component({
  selector: 'jhi-author',
  templateUrl: './author.component.html'
})
export class AuthorComponent implements OnInit, OnDestroy {
  authors: IAuthor[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(protected authorService: AuthorService, protected eventManager: JhiEventManager, protected accountService: AccountService) {}

  loadAll() {
    this.authorService
      .query()
      .pipe(
        filter((res: HttpResponse<IAuthor[]>) => res.ok),
        map((res: HttpResponse<IAuthor[]>) => res.body)
      )
      .subscribe((res: IAuthor[]) => {
        this.authors = res;
      });
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().subscribe(account => {
      this.currentAccount = account;
    });
    this.registerChangeInAuthors();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IAuthor) {
    return item.id;
  }

  registerChangeInAuthors() {
    this.eventSubscriber = this.eventManager.subscribe('authorListModification', response => this.loadAll());
  }
}
