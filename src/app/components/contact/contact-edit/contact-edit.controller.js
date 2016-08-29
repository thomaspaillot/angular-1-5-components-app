class ContactEditController {
  /*@ngInject*/
  constructor($state, ContactService, cfpLoadingBar, $window) {
    this.$state = $state;
    this.contactService = ContactService;
    this.cfpLoadingBar = cfpLoadingBar;
    this.$window = $window;
  }

  updateContact(event) {
    this.cfpLoadingBar.start();
    return this.contactService
      .updateContact(event.contact)
      .then(() => this.cfpLoadingBar.complete());
  }

  deleteContact(event) {
    var message = 'Delete ' + event.contact.name + ' from contacts?';
    if (this.$window.confirm(message)) {
      return this.contactService
        .deleteContact(event.contact)
        .then(() => this.$state.go('contacts'));
    }
  }
}

export default ContactEditController;
