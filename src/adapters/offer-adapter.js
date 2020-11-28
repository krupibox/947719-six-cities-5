class OfferAdapter {
  constructor(data) {
    this.isFavorite = data.is_favorite;
    this.isPremium = data.is_premium;
    data.previewImage = data.preview_image;
    data.host.isPro = data.host.is_pro;
    data.host.avatarUrl = data.host.avatar_url;

    Object.assign(this, data);
  }

  static parseOffer(data) {
    return new ModelOffer(data);
  }

  static parseOffers(data) {
    return data.map(this.parseOffer);
  }
}

export default OfferAdapter;
