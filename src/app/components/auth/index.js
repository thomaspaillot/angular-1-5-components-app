import angular from 'angular';
import loginModule from './login';
import authFormModule from './auth-form';
import registerModule from './register';
import AuthService from './auth.service';
import uiRouter from 'angular-ui-router';
import firebaseModule from 'angularfire';
import firebase from 'firebase';

const auth = angular
  .module('components.auth', [
    uiRouter,
    firebaseModule,
    loginModule,
    authFormModule,
    registerModule
  ])
  .service('AuthService', AuthService)
  .config(function ($firebaseRefProvider) {
    var config = {
      apiKey: 'AIzaSyCsNISt3dFx7dy5AImIIk62jDDd0OLvZK0',
      authDomain: 'contacts-manager-e486f.firebaseapp.com',
      databaseURL: 'https://contacts-manager-e486f.firebaseio.com',
      storageBucket: 'contacts-manager-e486f.appspot.com'
    };

    $firebaseRefProvider.registerUrl({
      default: config.databaseURL,
      contacts: config.databaseURL + '/contacts'
    });

    firebase.initializeApp(config);
  })
  .run(function ($transitions, $state, AuthService) {
    $transitions.onStart({
      to: function (state) {
        return !!(state.data && state.data.requiredAuth);
      }
    }, function() {
      return AuthService
        .requireAuthentication()
        .catch(function () {
          return $state.target('auth.login');
        });
    });
    $transitions.onStart({
      to: 'auth.*'
    }, function () {
      if (AuthService.isAuthenticated()) {
        return $state.target('app');
      }
    });
  })
  .name;

export default auth;
