import angular from 'angular';

class ContactTagController {
  constructor() {}

  $onInit() {
    this.tags = [
      'friends', 'family', 'acquaintances', 'following'
    ];
  }

  $onChanges(changes) {
    if (changes.tag) {
      this.tag = angular.copy(this.tag);
    }
  }

  updateTag (tag) {
    this.onChange({
      $event: {
        tag: tag
      }
    });
  }
}

export default ContactTagController;
