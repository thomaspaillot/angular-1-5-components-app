import authModule from '../../auth';

describe('Auth', () => {
  beforeEach(window.module(authModule));

  beforeEach(window.module($stateProvider => {
    $stateProvider.state('app', { url: '/' });
  }));

  describe('Routes', () => {
    let $q, $state, $location, $rootScope, AuthService;

    function goTo(url) {
      $location.url(url);
      $rootScope.$digest();
    }

    beforeEach(inject($injector => {
      $q = $injector.get('$q');
      $state = $injector.get('$state');
      $location = $injector.get('$location');
      $rootScope = $injector.get('$rootScope');
      AuthService = $injector.get('AuthService');
    }));

    it('should go to auth.register state', () => {
      spyOn(AuthService, 'requireAuthentication').and.callFake(() => $q.when('is authenticated'));
      goTo('/auth/register');
      expect($state.current.name).toEqual('auth.register');
    });

    it('should redirect to app state', () => {
      spyOn(AuthService, 'isAuthenticated').and.returnValue(true);
      goTo('/auth/register');
      expect($state.current.name).toEqual('app');
    });
  });

  describe('RegisterController', () => {
    let $componentController,
      controller,
      AuthService,
      $state,
      $rootScope,
      $q;

    beforeEach(inject($injector => {
      $componentController = $injector.get('$componentController');
      AuthService = $injector.get('AuthService');
      $state = $injector.get('$state');
      $rootScope = $injector.get('$rootScope');
      $q = $injector.get('$q');

      controller = $componentController('register',
        { $scope: {}, AuthService: AuthService, $state: $state }
      );
    }));

    it('should initialize with correct properties', () => {
      controller.$onInit();

      expect(controller.error).toBeNull();
      expect(controller.user.email).toEqual('');
      expect(controller.user.password).toEqual('');
    });

    it('should redirect on successful registration ', () => {
      const mockUser = { email: 'test@test.com', password: 'insecure' },
        mockEvent = { $event: { user: mockUser } };

      spyOn(AuthService, 'register').and.callFake(() => $q.when({$id: 1}));

      spyOn($state, 'go');

      const promise = controller.createUser(mockEvent);

      promise.then(() => {
        expect(AuthService.register).toHaveBeenCalledWith(mockEvent.user);
        expect($state.go).toHaveBeenCalledWith('app');
      });

      $rootScope.$digest();
    });

    it('should set error on failed login ', () => {
      let mockUser = { email: 'test@test.com', password: 'insecure' },
        mockEvent = { $event: { user: mockUser } },
        mockMessage = 'Oh bollocks!';

      spyOn(AuthService, 'register').and.callFake(() => $q.reject({ message: mockMessage}));

      spyOn($state, 'go');

      const promise = controller.createUser({});

      promise.then(() => {
        expect(AuthService.register).toHaveBeenCalledWith(mockEvent.user);
        expect(controller.error).toEqual(mockMessage);
        expect($state.go).not.toHaveBeenCalled();
      });

      $rootScope.$digest();
    });
  });
});
