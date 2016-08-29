class LoginController {
  /*@ngInject*/
  constructor(AuthService, $state) {
    this.authService = AuthService;
    this.$state = $state;
  }

  $onInit() {
    this.error = null;
    this.user = {
      email: '',
      password: ''
    };
  }

  loginUser(event) {
    return this.authService
      .login(event.user)
      .then(() => this.$state.go('app'))
      .catch(reason => this.error = reason.message);
  }
}

export default LoginController;
