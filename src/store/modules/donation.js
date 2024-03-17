import { saveDonationRequest } from "@/action";

export const donationModule = {
  state: () => ({
    donations: [],
  }),
  mutations: {},

  getters: {},

  actions: { saveDonationRequest },
};
