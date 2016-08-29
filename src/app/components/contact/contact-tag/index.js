import angular from 'angular';
import ContactTagComponent from './contact-tag.component';

const contactTag = angular
  .module('components.contact.tag', [])
  .component('contactTag', ContactTagComponent)
  .name;

export default contactTag;
