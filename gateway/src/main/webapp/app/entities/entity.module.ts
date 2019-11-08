import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'speaker',
        loadChildren: () => import('./speaker/speaker.module').then(m => m.GatewaySpeakerModule)
      },
      {
        path: 'session',
        loadChildren: () => import('./session/session.module').then(m => m.GatewaySessionModule)
      },
      {
        path: 'author',
        loadChildren: () => import('./author/author.module').then(m => m.GatewayAuthorModule)
      },
      {
        path: 'blog',
        loadChildren: () => import('./blog/blog.module').then(m => m.GatewayBlogModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class GatewayEntityModule {}
