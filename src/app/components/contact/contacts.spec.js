import authModule from '../auth';
import contactModule from '../contact';
import firebaseMock from '../../../../mocks/firebase.mock';

describe('Contact', () => {
  beforeEach(window.module(authModule, $provide => {
    $provide.value('AuthService', {
      getUser: function() {
        return { uid: 1 };
      },
      isAuthenticated: function() {
        return true;
      }
    });

    $provide.service('firebase', firebaseMock);

    let child = function() {
      return { child: child };
    };

    $provide.value('$firebaseRef', {
      contacts: {
        child: child
      }
    });
  }));

  beforeEach(window.module($stateProvider => {
    $stateProvider.state('app', { url: '/' });
  }));

  beforeEach(window.module(contactModule));

  describe('ContactService', () => {
    var ContactService, $rootScope;

    beforeEach(inject(function ($injector) {
      ContactService = $injector.get('ContactService');
      $rootScope = $injector.get('$rootScope');
    }));

    it('should get contacts', () => {
      // Pending
    });

    it('should get a contact', () => {
      const id = 1,
        promise = ContactService.getContactById(id);

      promise.then(ref => expect(ref.key).toEqual(id));
      $rootScope.$digest();
    });

    it('should create a contact', () => {
      const contact = { email: 'test@test.com', password: 'insecure' },
        promise = ContactService.createNewContact(contact);

      promise.then(ref => expect(ref.key).toEqual(1));
      $rootScope.$digest();
    });

    it('should update a contact', () => {
      const contact = { $save: angular.noop };

      spyOn(contact, '$save');
      ContactService.updateContact(contact);
      expect(contact.$save).toHaveBeenCalled();
    });

    it('should delete a contact', () => {
      const contact = { $remove: angular.noop };

      spyOn(contact, '$remove');
      ContactService.deleteContact(contact);
      expect(contact.$remove).toHaveBeenCalled();
    });
  });
});
