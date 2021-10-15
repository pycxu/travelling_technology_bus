// @ts-nocheck
import React from 'react';
import { ApplyPluginsType } from '/Users/xyc/Desktop/code/travelling_technology_bus/node_modules/@umijs/runtime';
import * as umiExports from './umiExports';
import { plugin } from './plugin';

export function getRoutes() {
  const routes = [
  {
    "path": "/",
    "component": require('/Users/xyc/Desktop/code/travelling_technology_bus/src/layout/index').default,
    "routes": [
      {
        "path": "/",
        "component": require('/Users/xyc/Desktop/code/travelling_technology_bus/src/pages/home').default,
        "exact": true
      },
      {
        "path": "/register",
        "component": require('/Users/xyc/Desktop/code/travelling_technology_bus/src/pages/register').default,
        "exact": true
      },
      {
        "path": "/login",
        "component": require('/Users/xyc/Desktop/code/travelling_technology_bus/src/pages/login').default,
        "exact": true
      },
      {
        "path": "/admin",
        "component": require('/Users/xyc/Desktop/code/travelling_technology_bus/src/pages/admin').default,
        "exact": true
      },
      {
        "path": "/user",
        "component": require('/Users/xyc/Desktop/code/travelling_technology_bus/src/pages/user').default,
        "exact": true
      },
      {
        "path": "/interests",
        "component": require('/Users/xyc/Desktop/code/travelling_technology_bus/src/pages/interests').default,
        "exact": true
      },
      {
        "path": "/test",
        "component": require('/Users/xyc/Desktop/code/travelling_technology_bus/src/pages/test').default,
        "exact": true
      },
      {
        "path": "/rostering",
        "component": require('/Users/xyc/Desktop/code/travelling_technology_bus/src/pages/rostering').default,
        "exact": true
      }
    ]
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
