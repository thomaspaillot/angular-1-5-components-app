
class ContactController {
  selectContact() {
    this.onSelect({
      $event: {
        contactId: this.contact.$id
      }
    });
  }
}

export default ContactController;
