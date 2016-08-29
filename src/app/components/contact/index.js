import angular from 'angular';
import contactModule from './contact';
import contactDetailModule from './contact-detail';
import contactEditModule from './contact-edit';
import contactNewModule from './contact-new';
import contactTagModule from './contact-tag';
import contactsModule from './contacts';
import ContactService from './contact.service';
import lengthCheck from './length-check/length-check.directive';

const contact = angular
  .module('components.contact', [
    contactModule,
    contactDetailModule,
    contactEditModule,
    contactNewModule,
    contactTagModule,
    contactsModule
  ])
  .service('ContactService', ContactService)
  .directive('lengthCheck', lengthCheck)
  .name;

export default contact;
