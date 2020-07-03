import * as fb from 'firebase';

class Ad {
  constructor(title, description, ownerId, imageSrc = '', promo = false, id = null) {
    this.title = title;
    this.description = description;
    this.ownerId = ownerId;
    this.imageSrc = imageSrc;
    this.promo = promo;
    this.id = id;
  }
}

export default {
  state: {
    ads: [],
  },
  mutations: {
    createAd(state, payload) {
      state.ads.push(payload);
    },
    loadAds(state, payload) {
      state.ads = payload;
    },
  },
  getters: {
    ads(state) {
      return state.ads;
    },
    promoAds(state) {
      return state.ads.filter((ad) => ad.promo);
    },
    myAds(state) {
      return state.ads;
    },
    adById(state) {
      return (adId) => state.ads.find((ad) => ad.id === adId);
    },
  },
  actions: {
    async createAd({ commit, getters }, payload) {
      // eslint-disable-next-line no-param-reassign

      commit('clearError');
      commit('setLoading', true);

      try {
        const newAd = new Ad(
          payload.title,
          payload.description,
          getters.user.id,
          payload.imageSrc,
          payload.promo,
        );
        const ad = await fb.database().ref('ads').push(newAd);
        commit('setLoading', false);
        commit('createAd', {
          ...newAd,
          id: ad.key,
        });
      } catch (e) {
        commit('setError', e.message);
        commit('setLoading', false);
        throw e;
      }
    },
    async fetchAds({ commit }) {
      commit('clearError');
      commit('setLoading', true);

      const resultAds = [];
      try {
        const fbval = await fb.database().ref('ads').once('value');
        const ads = fbval.val();
        Object.keys(ads).forEach((key) => {
          const ad = ads[key];
          resultAds.push(new Ad(ad.title, ad.description, ad.ownerId, ad.imageSrc, ad.promo, key));
        });

        commit('loadAds', resultAds);
        commit('setLoading', false);
      } catch (e) {
        commit('setError', e.message());
        commit('setLoading', false);
        throw e;
      }
    },
  },
};
