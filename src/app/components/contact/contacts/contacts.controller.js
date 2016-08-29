class ContactsController {
  /*@ngInject*/
  constructor($filter, $state) {
    this.$filter = $filter;
    this.$state = $state;
  }

  $onChanges(changes) {
    if(changes.contacts) {
      this.filteredContacts = this.$filter('contactsFilter')(changes.contacts.currentValue, changes.filter.currentValue);
    }
  }

  goToContact(event) {
    this.$state.go('contact', {
      id: event.contactId
    });
  }
}

export default ContactsController;
