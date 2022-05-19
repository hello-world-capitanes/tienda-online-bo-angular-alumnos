// Plugins enable you to tap into, modify, or extend the internal behavior of Cypress
// For more info, visit https://on.cypress.io/plugins-api
// plugins/index.js
// promisified fs module
import { promises as fs } from 'fs';
import * as path from 'path';

function getConfigurationByFile(environment: string) {
  if (!environment || environment.length <= 0) {
    return;
  }

  const pathToConfigFile = path.resolve('cypress', 'config', 'environments', `cypress.${environment}.json`);
  return fs.readFile(pathToConfigFile);
}

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars
module.exports = async (on: any, config: any) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config

  const environment = config.env.environment || 'local';
  console.log(`Cypress using environment: ${environment}`)
  
  const envConfigBuffer = await getConfigurationByFile(environment);
  if (!!envConfigBuffer) {
    return JSON.parse(envConfigBuffer.toString());
  }
}
