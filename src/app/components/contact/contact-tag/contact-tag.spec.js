import contactModule from '../../contact';

describe('Contact', () => {
  beforeEach(window.module(contactModule));

  describe('ContactController', () => {
    let $componentController,
      controller,
      mockTag = 'friends',
      mockChange = angular.noop;

    beforeEach(inject($injector => {
      $componentController = $injector.get('$componentController');
      controller = $componentController('contactTag',
        { $scope: {} },
        { tag: mockTag, onChange: mockChange }
      );
    }));

    it('should bind to the correct tag', () => {
      var mockTag = 'football';
      controller.tag = mockTag;
      expect(controller.tag).toEqual(mockTag);
    });

    it('should call onSelect with the correct payload', () => {
      var tag = 'mate',
        payload = { $event: { tag: tag }};

      spyOn(controller, 'onChange');
      controller.updateTag(tag);
      expect(controller.onChange).toHaveBeenCalledWith(payload);
    });
  });
});
