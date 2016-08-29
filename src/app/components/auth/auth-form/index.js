import angular from 'angular';
import AuthFormComponent from './auth-form.component';

const authForm = angular
  .module('components.auth.authForm', [])
  .component('authForm', AuthFormComponent)
  .name;

export default authForm;
