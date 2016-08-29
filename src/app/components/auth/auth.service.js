class AuthService {
    /*@ngInject*/
  constructor($firebaseAuth) {
    this.$firebaseAuth = $firebaseAuth;
    this.auth = this.$firebaseAuth();
    this.authData = null;
  }

  storeAuthData(response) {
    this.authData = response;
    return this.authData;
  }

  onSignIn(user) {
    this.authData = user;
    return this.auth.$requireSignIn();
  }

  clearAuthData() {
    this.authData = null;
  }

  login(user) {
    return this.auth
      .$signInWithEmailAndPassword(user.email, user.password)
      .then(response => this.storeAuthData(response));
  }

  register(user) {
    return this.auth
      .$createUserWithEmailAndPassword(user.email, user.password)
      .then(response => this.storeAuthData(response));
  }

  logout() {
    return this.auth
      .$signOut()
      .then(() => this.clearAuthData());
  }

  requireAuthentication() {
    return this.auth
      .$waitForSignIn().then(user => this.onSignIn(user));
  }

  isAuthenticated() {
    return !!this.authData;
  }

  getUser() {
    if (this.authData) {
      return this.authData;
    }
  }
}

export default AuthService;
