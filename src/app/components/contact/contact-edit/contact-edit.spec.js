import authModule from '../../auth';
import contactModule from '../../contact';

describe('Contact', () => {
  beforeEach(window.module(authModule));

  beforeEach(window.module(contactModule, $provide => {
    $provide.value('ContactService', {
      updateContact: angular.noop,
      deleteContact: angular.noop,
      getContactById: function() {
        return {
          $loaded: angular.noop
        };
      }
    });

    $provide.value('cfpLoadingBar', {
      start: angular.noop,
      complete: angular.noop
    });

    $provide.value('$window', {
      confirm: function() { return true; }
    });
  }));

  beforeEach(window.module($stateProvider => {
    $stateProvider.state('app', {
      redirectTo: 'contacts',
      url: '/app',
      data: {
        requiredAuth: true
      }
    });
  }));

  describe('Routes', () => {
    let $state, $location, $rootScope, AuthService;

    function goTo(url) {
      $location.url(url);
      $rootScope.$digest();
    }

    beforeEach(inject($injector => {
      $state = $injector.get('$state');
      $location = $injector.get('$location');
      $rootScope = $injector.get('$rootScope');
      AuthService = $injector.get('AuthService');
    }));

    it('should go to the contact state', () => {
      spyOn(AuthService, 'isAuthenticated').and.returnValue(true);

      goTo('/app/contact/1');

      expect($state.current.name).toEqual('contact');
    });
  });

  describe('ContactDetailController', () => {
    let $componentController,
      controller,
      $state,
      ContactService,
      cfpLoadingBar,
      $rootScope,
      $q,
      mockContact = { $id: 1 };

    beforeEach(inject($injector => {
      $componentController = $injector.get('$componentController');
      $state = $injector.get('$state');
      ContactService = $injector.get('ContactService');
      cfpLoadingBar = $injector.get('cfpLoadingBar');
      //$window = $injector.get('$window');
      $rootScope = $injector.get('$rootScope');
      $q = $injector.get('$q');

      controller = $componentController('contactEdit',
        { $scope: {}, $state: $state, ContactService: ContactService, cfpLoadingBar: cfpLoadingBar },
        { contact: mockContact }
      );
    }));

    it('should update contact', () => {
      const event = { contact: { $id: 1 }};
      spyOn(cfpLoadingBar, 'start');
      spyOn(cfpLoadingBar, 'complete');
      spyOn(ContactService, 'updateContact').and.callFake(() => $q.when({}));

      const promise = controller.updateContact(event);

      expect(cfpLoadingBar.start).toHaveBeenCalled();

      promise.then(() => {
        expect(ContactService.updateContact).toHaveBeenCalled();
        expect(cfpLoadingBar.complete).toHaveBeenCalled();
      });

      $rootScope.$digest();
    });

    it('should delete contact', () => {
      const event = { contact: { $id: 1, name: 'John Smith' }};
      spyOn($state, 'go');

      spyOn(ContactService, 'deleteContact').and.callFake(() =>$q.when({}));

      const promise = controller.deleteContact(event);

      promise.then(() => expect($state.go).toHaveBeenCalledWith('contacts'));

      $rootScope.$digest();
    });
  });
});
