import controller from './contact-edit.controller';

const ContactEditComponent = {
  bindings: {
    contact: '<'
  },
  controller,
  templateUrl: 'app/components/contact/contact-edit/contact-edit.html'
};

export default ContactEditComponent;
