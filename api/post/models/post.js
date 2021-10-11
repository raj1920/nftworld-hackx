"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#lifecycle-hooks)
 * to customize this model
 */

const index = "nftworld";

module.exports = {
  lifecycles: {
    async beforeCreate(data) {
      await strapi.services.post.mintNFT(data.asset_link);
    },
    async afterCreate(result, data) {
      await strapi.services.algolia.saveObject(result, index);
    },
    async afterUpdate(result, params, data) {
      await strapi.services.algolia.saveObject(result, index);
    },
    async afterDelete(result, params) {
      await strapi.services.algolia.deleteObject(result.id, index);
    },
  },
};
