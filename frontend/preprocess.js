const babelOptions = {
    plugins: [
        '@babel/plugin-syntax-object-rest-spread',
        [ '@babel/plugin-proposal-decorators', { legacy: true } ],
        '@babel/plugin-proposal-object-rest-spread',
        '@babel/plugin-proposal-class-properties',
    ],
    presets: [
        [ '@babel/preset-react' ],
        [ '@babel/preset-env' ],
    ],
};

module.exports = require('babel-jest').createTransformer(babelOptions);
