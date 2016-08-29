import angular from 'angular';
import uiRouter from 'angular-ui-router';
import ContactNewComponent from './contact-new.component';

const contactNew = angular
  .module('components.contact.new', [
    uiRouter
  ])
  .component('contactNew', ContactNewComponent)
  .config(function ($stateProvider) {
    $stateProvider
      .state('new', {
        parent: 'app',
        url: '/new',
        component: 'contactNew'
      });
  })
  .name;

export default contactNew;
