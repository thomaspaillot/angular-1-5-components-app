import controller from './contact.controller';

const ContactComponent = {
  bindings: {
    contact: '<',
    onSelect: '&'
  },
  controller,
  templateUrl: 'app/components/contact/contact/contact.html'
};

export default ContactComponent;
