import authModule from '../../auth';
import contactModule from '../../contact';

describe('Contact', () => {
  beforeEach(window.module(contactModule, $provide => {
    $provide.value('cfpLoadingBar', {
      start: angular.noop,
      complete: angular.noop
    });

    $provide.value('ContactService', {
      createNewContact: angular.noop
    });
  }));

  beforeEach(window.module(authModule));

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

    it('should go to the contact state',()  => {
      spyOn(AuthService, 'isAuthenticated').and.returnValue(true);

      goTo('/app/new');

      expect($state.current.name).toEqual('new');
    });
  });

  describe('ContactNewController', () => {
    let $componentController,
      controller,
      $state,
      ContactService,
      $rootScope,
      $q;

    beforeEach(inject($injector => {
      $componentController = $injector.get('$componentController');
      $state = $injector.get('$state');
      ContactService = $injector.get('ContactService');
      $rootScope = $injector.get('$rootScope');
      $q = $injector.get('$q');

      controller = $componentController('contactNew',
        { $scope: {}, $state: $state, ContactService: ContactService }
      );
    }));

    it('should create a contact', () => {
      const event = { contact: { email: 'test@test.com', password: 'insecure' } };
      spyOn(ContactService, 'createNewContact').and.callFake(() => $q.when({ key: 1 }));
      spyOn($state, 'go');

      var promise = controller.createNewContact(event);

      promise.then(() => {
        expect(ContactService.createNewContact).toHaveBeenCalled();
        expect($state.go).toHaveBeenCalledWith('contact', {id: 1});
      });

      $rootScope.$digest();
    });
  });
});
