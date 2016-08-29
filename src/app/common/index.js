import angular from 'angular';
import uiRouter from 'angular-ui-router';
import angularLoadingBar from 'angular-loading-bar';
import AppNavComponent from './app-nav.component';
import AppComponent from './app.component';
import AppSidebarComponent from './app-sidebar.component';

const common = angular
  .module('common', [
    uiRouter,
    angularLoadingBar
  ])
  .component('appNav', AppNavComponent)
  .component('app', AppComponent)
  .component('appSidebar', AppSidebarComponent)
  .config(function ($stateProvider) {
    $stateProvider
      .state('app', {
        redirectTo: 'contacts',
        url: '/app',
        data: {
          requiredAuth: true
        },
        component: 'app'
      });
  })
  .run(function ($transitions, cfpLoadingBar) {
    $transitions.onStart({}, cfpLoadingBar.start);
    $transitions.onSuccess({}, cfpLoadingBar.complete);
  })
  .name;

export default common;
