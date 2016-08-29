import controller from './auth-form.controller';

const AuthFormComponent = {
  bindings: {
    user: '<',
    button: '@',
    message: '@',
    onSubmit: '&'
  },
  controller,
  templateUrl: 'app/components/auth/auth-form/auth-form.html'
};

export default AuthFormComponent;
