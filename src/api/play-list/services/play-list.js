'use strict';

/**
 * play-list service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::play-list.play-list');
