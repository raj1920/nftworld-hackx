"use strict";
const { parseMultipartData, sanitizeEntity } = require("strapi-utils");

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async create(ctx) {
    const { id } = ctx.state.user;
    let entity;

    // Insert the uploader user id into the post
    if (ctx.is("multipart")) {
      const { data, files } = parseMultipartData(ctx);
      entity = await strapi.services.post.create(
        {
          ...data,
          users_permissions_user: id,
        },
        { files }
      );
    } else {
      entity = await strapi.services.post.create({
        ...ctx.request.body,
        users_permissions_user: id,
      });
    }
    return sanitizeEntity(entity, { model: strapi.models.post });
  },
};
