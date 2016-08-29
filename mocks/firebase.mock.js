import angular from 'angular';

class MockFirebase {
  initializeApp() {}
}

export default MockFirebase;

const firebase = angular
  .module('firebase', [])
  .provider('$firebaseRef', () => {
    this.registerUrl = function (urls) {
      for (var key in urls) {
        this[key] = urls[key];
      }
    };
    this.$get = function () {
      return angular.noop;
    };
  })
  .factory('$firebaseArray', $q => {
    function FirebaseArray() {}

    FirebaseArray.prototype = {
      constructor: FirebaseArray,
      $add: function() {
        return $q.resolve({ key: 1 });
      }
    };

    return function () {
      return new FirebaseArray();
    };
  })
  .factory('$firebaseObject', $q => {
    function FirebaseObject() {
      return $q.when({ key: 1 });
    }

    return function() {
      return new FirebaseObject();
    };
  })
  .factory('$firebaseAuth', $q => {
    const fakeUser = { $id: 1 };

    function FirebaseAuth() {
      this.auth = null;
    }

    FirebaseAuth.prototype = {
      constructor: FirebaseAuth,
      $requireSignIn: function() {
        this.auth = fakeUser;
        return $q.resolve(this.auth);
      },
      $signInWithEmailAndPassword: function() {
        this.auth = fakeUser;
        return $q.resolve(this.auth);
      },
      $createUserWithEmailAndPassword: function() {
        this.auth = fakeUser;
        return $q.resolve(this.auth);
      },
      $waitForSignIn: function() {
        this.auth = fakeUser;
        return $q.resolve(this.auth);
      },
      $signOut: function() {
        this.auth = null;
        return $q.resolve(this.auth);
      }
    };

    return function () {
      return new FirebaseAuth();
    };
  });
