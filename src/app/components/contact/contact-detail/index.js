import angular from 'angular';
import ContactDetailComponent from './contact-detail.component';

const contactDetail = angular
  .module('components.contact.detail', [])
  .component('contactDetail', ContactDetailComponent)
  .name;

export default contactDetail;
