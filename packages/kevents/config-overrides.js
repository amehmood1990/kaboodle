const { override, addSassLoader } = require('customize-cra');

module.exports = override(
    addSassLoader()
);
