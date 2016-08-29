import contactModule from '../../contact';

describe('Contact', () => {
  beforeEach(window.module(contactModule));

  describe('Controller', () => {
    let $componentController,
      controller,
      mockContact = { $id: 1 },
      mockSelect = angular.noop;

    beforeEach(inject($injector => {
      $componentController = $injector.get('$componentController');
      controller = $componentController('contact',
        { $scope: {} },
        { contact: mockContact, onSelect: mockSelect }
      );
    }));

    it('should bind to the correct contact', () => {
      expect(controller.contact.$id).toEqual(mockContact.$id);
    });

    it('should call onSelect with the correct payload', () => {
      const payload = { $event: { contactId: mockContact.$id } };

      spyOn(controller, 'onSelect');
      controller.selectContact();
      expect(controller.onSelect).toHaveBeenCalledWith(payload);
    });
  });
});
