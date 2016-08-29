import angular from 'angular';
import Contact from './contact';
import Auth from './auth';

const components = angular
  .module('components', [
    Contact,
    Auth
  ])
  .name;

export default components;
