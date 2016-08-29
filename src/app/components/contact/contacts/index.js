import angular from 'angular';
import uiRouter from 'angular-ui-router';
import ContactsComponent from './contacts.component';
import contactsFilter from './contacts.filter';

const contacts = angular
  .module('components.contact.contacts', [
    uiRouter
  ])
  .component('contacts', ContactsComponent)
  .filter('contactsFilter', contactsFilter)
  .config(function ($stateProvider) {
    $stateProvider
      .state('contacts', {
        parent: 'app',
        url: '/contacts?filter',
        component: 'contacts',
        params: {
          filter: {
            value: 'none'
          }
        },
        resolve: {
          contacts: function (ContactService) {
            return ContactService.getContactList().$loaded();
          },
          filter: function ($transition$) {
            return $transition$.params();
          }
        }
      });
  })
  .name;

export default contacts;
