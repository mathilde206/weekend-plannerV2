const path = require('path');

const cssnano = require('cssnano');
const autoprefixer = require('autoprefixer');
const postcssURL = require('postcss-url');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ImageMinPlugin = require('imagemin-webpack-plugin').default;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const here = dir => !dir ? __dirname : path.resolve(__dirname, dir);


const dirs = {
    js: './src/js',
    components: './src/js/components',
    SCSS: './src/scss',
    dist: './build',
};

const frontend_weekend_planner = `${dirs.js}/index.js`;

module.exports = (env, argv) => {
    const { mode = 'development' } = argv;
    const isProduction = mode === 'production';

    return {
        mode,
        context: here(),
        entry: {
            frontend_weekend_planner,
        },
        output: {
            path: here(dirs.dist),
            filename: 'js/[name].bundle.js',
            sourceMapFilename: 'js/[file].map',
            publicPath: '/static/',
        },
        resolve: {
            extensions: [ '.js', '.jsx', '.scss', 'css', 'json' ],
            modules: [
                here('./node_modules'),
            ],
        },
        devtool: isProduction ? false : 'inline-cheap-module-source-map',
        module: {
            rules: [
                {
                    test: /\.jsx?$/,
                    exclude: /node_modules/,
                    include: here('./src'),
                    use: [
                        {
                            loader: 'cache-loader',
                            options: {
                                cacheDirectory: here(`./node_modules/.cache/${mode}/js`),
                            }
                        },
                        {
                            loader: 'babel-loader',
                            options: {
                                comments: true,
                                env: {
                                    development: {
                                        'plugins': [
                                            '@babel/plugin-syntax-object-rest-spread',
                                            [ '@babel/plugin-proposal-decorators', { legacy: true } ],
                                            '@babel/plugin-proposal-object-rest-spread',
                                            '@babel/plugin-proposal-class-properties',

                                        ],
                                        'presets': [
                                            [ '@babel/preset-react' ],
                                        ],
                                    },
                                    production: {
                                        'plugins': [
                                            '@babel/plugin-syntax-object-rest-spread',
                                            [ '@babel/plugin-proposal-decorators', { legacy: true } ],
                                            '@babel/plugin-proposal-object-rest-spread',
                                            '@babel/plugin-proposal-class-properties',
                                        ],
                                        'presets': [
                                            [ '@babel/preset-react' ],
                                            [ '@babel/preset-env' ],
                                        ],
                                    }
                                }
                            }
                        }
                    ]
                },
                {
                    test: /\.scss$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        {
                            loader: 'cache-loader',
                            options: {
                                cacheDirectory: here(`./node_modules/.cache/${mode}/scss`),
                            }
                        },
                        {
                            loader: 'css-loader',
                            options: {
                                importLoaders: true,
                                minimize: isProduction,
                                sourceMap: !isProduction,
                                url: false,
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                ident: 'postcss',
                                sourceMap: !isProduction,
                                plugins: [
                                    postcssURL(),
                                    autoprefixer(),
                                ].concat(!isProduction ? [] : [
                                    cssnano(),
                                ]),
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: !isProduction,
                            }
                        },
                    ],
                },
                {
                    test: /\.css$/,
                    use: [
                        {
                            loader: 'cache-loader',
                            options: {
                                cacheDirectory: here(`./node_modules/.cache/${mode}/css`),
                            }
                        },
                        {
                            loader: 'style-loader',
                        },
                        {
                            loader: 'css-loader',
                            options: {
                                importLoaders: true,
                                minimize: isProduction,
                                sourceMap: !isProduction,
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                ident: 'postcss',
                                sourceMap: !isProduction,
                                plugins: [
                                    postcssURL(),
                                    autoprefixer(),
                                ].concat(!isProduction ? [] : [
                                    cssnano(),
                                ]),
                            }
                        },
                    ]
                }
            ]
        },
        plugins: [
            new CleanWebpackPlugin([
                `${dirs.dist}/img`,
                `${dirs.dist}/css`,
                `${dirs.dist}/js/*.bundle.js`,
            ]),
            new CopyWebpackPlugin([
                {
                    from: `${dirs}/img`,
                    to: './img',
                },
            ], {
                ignore: [
                    '.keep',
                    '.DS_Store',
                ],
            }),
            new MiniCssExtractPlugin({
                filename: 'css/[name].min.css',
                sourceMapFilename: 'css/[file].map',
            }),
            new ImageMinPlugin({
                test: /\.(jpe?g|png|gif|svg)$/i,
                cacheFolder: here(`./node_modules/.cache/${mode}/image-min`),
                disable: !isProduction,
            }),
        ],
    };
};