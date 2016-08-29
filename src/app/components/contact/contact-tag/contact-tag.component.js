import controller from './contact-tag.controller';

const ContactTagComponent = {
  bindings: {
    tag: '<',
    onChange: '&'
  },
  controller,
  templateUrl: 'app/components/contact/contact-tag/contact-tag.html'
};

export default ContactTagComponent;
