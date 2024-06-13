'use strict';

/**
 * regina service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::regina.regina');
