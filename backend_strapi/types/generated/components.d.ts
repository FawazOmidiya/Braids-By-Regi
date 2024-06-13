import type { Schema, Attribute } from '@strapi/strapi';

export interface AvailabilityAvailability2 extends Schema.Component {
  collectionName: 'components_availability_availability_2s';
  info: {
    displayName: 'Availability 2';
  };
  attributes: {
    Availability: Attribute.JSON & Attribute.Required;
  };
}

export interface AvailabilityAvailabilityOption extends Schema.Component {
  collectionName: 'components_availability_availability_options';
  info: {
    displayName: 'Availability 1';
    icon: 'calendar';
    description: '';
  };
  attributes: {
    Availability1: Attribute.JSON & Attribute.Required;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'availability.availability-2': AvailabilityAvailability2;
      'availability.availability-option': AvailabilityAvailabilityOption;
    }
  }
}
