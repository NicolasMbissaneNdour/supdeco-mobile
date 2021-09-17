import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { GuardService } from './services/auth/guards/guard.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./screens/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./screens/auth/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./screens/auth/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'profil',
    loadChildren: () => import('./screens/profil/profil.module').then( m => m.ProfilPageModule),
    canActivate: [GuardService]
  },
  {
    path: 'events',
    loadChildren: () => import('./screens/events/events.module').then( m => m.EventsPageModule)
  },
  {
    path: 'notes',
    loadChildren: () => import('./screens/notes/notes.module').then( m => m.NotesPageModule),
    canActivate: [GuardService]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
