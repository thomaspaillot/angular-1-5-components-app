class AppSidebarController {
  constructor() {
    this.contactTags = [{
      label: 'All contacts',
      icon: 'star',
      state: 'none'
    }, {
      label: 'Friends',
      icon: 'people',
      state: 'friends'
    }, {
      label: 'Family',
      icon: 'child_care',
      state: 'family'
    }, {
      label: 'Acquaintances',
      icon: 'accessibility',
      state: 'acquaintances'
    }, {
      label: 'Following',
      icon: 'remove_red_eye',
      state: 'following'
    }];
  }
}

export default AppSidebarController;
