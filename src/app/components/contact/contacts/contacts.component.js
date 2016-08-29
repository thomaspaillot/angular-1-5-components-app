import controller from './contacts.controller';

const ContactsComponent = {
  bindings: {
    contacts: '<',
    filter: '<'
  },
  controller,
  templateUrl: 'app/components/contact/contacts/contacts.html'
};

export default ContactsComponent;
