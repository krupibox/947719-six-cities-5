class UserAdapter {
  constructor(data) {
    this.avatarUrl = data[`avatar_url`];
    this.email = data[`email`];
    this.id = data[`id`];
    this.name = data[`name`];
    this.isPro = data[`is_pro`];
  }

  static parse(data) {
    return new this(data);
  }
}

export default UserAdapter;
