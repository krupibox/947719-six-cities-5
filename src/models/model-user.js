class ModelUser {
  constructor(data) {
    this.avatarUrl = data[`avatar_url`];
    this.email = data[`email`];
    this.id = data[`id`];
    this.name = data[`name`];
    this.isPro = data[`is_pro`];
  }

  static parseUser(data) {
    return new this(data);
  }
}

export default ModelUser;
