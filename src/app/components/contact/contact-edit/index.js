import angular from 'angular';
import uiRouter from 'angular-ui-router';
import ContactEditComponent from './contact-edit.component';

const contactEdit = angular
  .module('components.contact.edit', [
    uiRouter
  ])
  .component('contactEdit', ContactEditComponent)
  .config(function ($stateProvider) {
    $stateProvider
      .state('contact', {
        parent: 'app',
        url: '/contact/:id',
        component: 'contactEdit',
        resolve: {
          contact: function ($transition$, ContactService) {
            var key = $transition$.params().id;
            return ContactService.getContactById(key).$loaded();
          }
        }
      });
  })
  .name;

export default contactEdit;
