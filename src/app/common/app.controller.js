class AppController {
  /*@ngInject*/
  constructor(AuthService, $state) {
    this.authService = AuthService;
    this.$state = $state;
    this.user = this.authService.getUser();
  }

  logout() {
    this.authService.logout().then(() => this.$state.go('auth.login'));
  }
}

export default AppController;
