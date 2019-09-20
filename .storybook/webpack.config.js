const OskariConfig = require('oskari-frontend/webpack/config');
// Export a function. Accept the base config as the only param.
module.exports = async ({ config, mode }) => {
    // `mode` has a value of 'DEVELOPMENT' or 'PRODUCTION'
    // You can change the configuration based on that.
    // 'PRODUCTION' is used when building the static version of storybook.

    // Make whatever fine-grained changes you need
    config.module.rules.push(OskariConfig.BABEL_LOADER_RULE);
    OskariConfig.getStyleFileRules().forEach(rule => config.module.rules.push(rule));
    config.resolve = OskariConfig.RESOLVE;

    // Return the altered config
    return config;
};