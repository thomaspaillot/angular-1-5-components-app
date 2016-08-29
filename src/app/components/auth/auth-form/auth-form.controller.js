import angular from 'angular';

class AuthFormController {
  $onChanges(changes) {
    if (changes.user) {
      this.user = angular.copy(this.user);
    }
  }

  submitForm() {
    this.onSubmit({
      $event: {
        user: this.user
      }
    });
  }
}

export default AuthFormController;
