import angular from 'angular';
import uiRouter from 'angular-ui-router';
import LoginComponent from './login.component';

const login = angular
  .module('components.auth.login', [
    uiRouter
  ])
  .component('login', LoginComponent)
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('auth', {
        redirectTo: 'auth.login',
        url: '/auth',
        template: '<div ui-view></div>'
      })
      .state('auth.login', {
        url: '/login',
        component: 'login'
      });
    $urlRouterProvider.otherwise('/auth/login');
  })
  .name;

export default login;
