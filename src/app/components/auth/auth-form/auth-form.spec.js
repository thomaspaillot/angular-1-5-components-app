import authModule from '../../auth';

describe('Auth', () => {
  beforeEach(window.module(authModule));

  describe('AuthFormController', () => {
    let $componentController,
      controller,
      mockUser = { $id: 1 },
      mockSubmit = angular.noop;

    beforeEach(inject($injector => {
      $componentController = $injector.get('$componentController');

      controller = $componentController('authForm',
        { $scope: {} },
        { user: mockUser, button: '', message: '', onSubmit: mockSubmit }
      );
    }));

    it('should call onSelect with the correct payload', () => {
      const payload = { $event: { user: mockUser } };

      spyOn(controller, 'onSubmit');
      controller.submitForm();
      expect(controller.onSubmit).toHaveBeenCalledWith(payload);
    });
  });
});
