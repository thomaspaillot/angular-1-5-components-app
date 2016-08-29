class ContactService {
  /*@ngInject*/
  constructor(AuthService, $firebaseRef, $firebaseArray, $firebaseObject) {
    this.authService = AuthService;
    this.$firebaseRef = $firebaseRef;
    this.$firebaseArray = $firebaseArray;
    this.$firebaseObject = $firebaseObject;
    this.ref = $firebaseRef.contacts;
    this.uid = AuthService.getUser().uid;
  }

  createNewContact(contact) {
    return this.$firebaseArray(this.ref.child(this.uid)).$add(contact);
  }

  getContactById(id) {
    return this.$firebaseObject(this.ref.child(this.uid).child(id));
  }

  getContactList() {
    return this.$firebaseArray(this.ref.child(this.uid));
  }

  updateContact(contact) {
    return contact.$save();
  }

  deleteContact(contact) {
    return contact.$remove();
  }
}

export default ContactService;
