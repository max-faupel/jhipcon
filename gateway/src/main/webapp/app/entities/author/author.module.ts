import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from 'app/shared/shared.module';
import { AuthorComponent } from './author.component';
import { AuthorDetailComponent } from './author-detail.component';
import { AuthorUpdateComponent } from './author-update.component';
import { AuthorDeletePopupComponent, AuthorDeleteDialogComponent } from './author-delete-dialog.component';
import { authorRoute, authorPopupRoute } from './author.route';

const ENTITY_STATES = [...authorRoute, ...authorPopupRoute];

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [AuthorComponent, AuthorDetailComponent, AuthorUpdateComponent, AuthorDeleteDialogComponent, AuthorDeletePopupComponent],
  entryComponents: [AuthorDeleteDialogComponent]
})
export class GatewayAuthorModule {}
