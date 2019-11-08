import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from 'app/shared/shared.module';
import { SessionComponent } from './session.component';
import { SessionDetailComponent } from './session-detail.component';
import { SessionUpdateComponent } from './session-update.component';
import { SessionDeletePopupComponent, SessionDeleteDialogComponent } from './session-delete-dialog.component';
import { sessionRoute, sessionPopupRoute } from './session.route';

const ENTITY_STATES = [...sessionRoute, ...sessionPopupRoute];

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    SessionComponent,
    SessionDetailComponent,
    SessionUpdateComponent,
    SessionDeleteDialogComponent,
    SessionDeletePopupComponent
  ],
  entryComponents: [SessionDeleteDialogComponent]
})
export class GatewaySessionModule {}
