// @ts-nocheck
import React from 'react';
import { ApplyPluginsType } from '/Users/xyc/Desktop/code/travelling_technology_bus/node_modules/@umijs/runtime';
import * as umiExports from './umiExports';
import { plugin } from './plugin';

export function getRoutes() {
  const routes = [
  {
    "path": "/",
    "component": require('/Users/xyc/Desktop/code/travelling_technology_bus/pages/home').default,
    "exact": true
  }
];

  // allow user to extend routes
  plugin.applyPlugins({
    key: 'patchRoutes',
    type: ApplyPluginsType.event,
    args: { routes },
  });

  return routes;
}
