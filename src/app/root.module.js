import angular from 'angular';
import RootComponent from './root.component';
import Components from './components';
import Common from './common';

const root = angular
  .module('root', [
    Components,
    Common
  ])
  .component('root', RootComponent)
  .name;

export default root;
