import angular from 'angular';
import uiRouter from 'angular-ui-router';
import RegisterComponent from './register.component';

const register = angular
  .module('components.auth.register', [
    uiRouter
  ])
  .component('register', RegisterComponent)
  .config(function ($stateProvider) {
    $stateProvider
      .state('auth.register', {
        url: '/register',
        component: 'register'
      });
  })
  .name;

export default register;
