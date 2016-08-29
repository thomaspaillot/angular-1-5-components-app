import authModule from '../../auth';
import contactModule from '../../contact';

describe('Contact', () => {
  beforeEach(window.module(contactModule, $provide => {
    $provide.value('ContactService', {
      getContactList: function() {
        return {
          $loaded: angular.noop
        };
      }
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

    it('should go to the contact state', () => {
      spyOn(AuthService, 'isAuthenticated').and.returnValue(true);

      goTo('/app/contacts?friends');

      expect($state.current.name).toEqual('contacts');
    });
  });

  describe('ContactController', () => {
    let $componentController,
      controller,
      $filter,
      $state,
      mockFilter = { filter: 'friends'},
      mockContacts = [
        {
          name: 'John Doe',
          tag: 'friends'
        },
        {
          name: 'Jane Smith',
          tag: 'family'
        }
      ];

    beforeEach(inject($injector => {
      $componentController = $injector.get('$componentController');
      $filter = $injector.get('$filter');
      $state = $injector.get('$state');
      controller = $componentController('contacts',
        { $scope: {}, $filter: $filter, $state: $state },
        { filter: mockFilter, contacts: mockContacts }
      );
    }));

    it('should filter contacts',() => {
      expect(controller.filteredContacts).toEqual([{
        name: 'John Doe',
        tag: 'friends'
      }]);
    });

    it('should route on goToContact call', () => {
      const event = { contactId: 1 };

      spyOn($state, 'go');
      controller.goToContact(event);
      expect($state.go).toHaveBeenCalledWith('contact', { id: event.contactId });
    });
  });
});
