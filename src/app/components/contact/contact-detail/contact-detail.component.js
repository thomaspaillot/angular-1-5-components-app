import controller from './contact-detail.controller';

const ContactDetailComponent = {
  bindings: {
    contact: '<',
    onSave: '&',
    onUpdate: '&',
    onDelete: '&'
  },
  controller,
  templateUrl: 'app/components/contact/contact-detail/contact-detail.html'
};

export default ContactDetailComponent;
