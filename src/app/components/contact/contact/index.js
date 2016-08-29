import angular from 'angular';
import ContactComponent from './contact.component';

const contact = angular
  .module('components.contact.contact', [])
  .component('contact', ContactComponent)
  .name;

export default contact;
