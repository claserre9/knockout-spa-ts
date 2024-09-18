const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // Ensure clean builds

module.exports = (env, argv) => {
    const isProduction = argv.mode === 'production';

    return {
        entry: {
            app: './src/app.ts',
            style: './src/style.ts',
        },
        mode: isProduction ? 'production' : 'development',
        devtool: !isProduction ? 'cheap-module-source-map' : false, // Best for dev
        cache: !isProduction, // Use cache for faster development builds
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: {
                        loader: 'ts-loader',
                        options: {
                            configFile: !isProduction ? 'tsconfig.dev.json' : 'tsconfig.prod.json'
                        }
                    },
                    exclude: /node_modules/
                },
                {
                    test: /\.(scss|css)$/,
                    use: [
                        isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
                        'css-loader',
                        {
                            loader: 'postcss-loader',
                            options: {
                                postcssOptions: {
                                    plugins: [autoprefixer],
                                },
                            },
                        },
                        'sass-loader',
                    ],
                },
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env'],
                        },
                    },
                },
            ],
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
        },
        output: {
            filename: isProduction ? '[name].[contenthash].bundle.js' : '[name].bundle.js',
            path: path.resolve(__dirname, 'public/dist'),
            clean: true, // Automatically clean the output directory
        },
        optimization: {
            minimize: isProduction,
            minimizer: [
                new CssMinimizerPlugin(),
                new TerserPlugin({
                    minify: TerserPlugin.uglifyJsMinify,
                    terserOptions: {
                        compress: true,
                    },
                    parallel: true,
                }),
            ],
            splitChunks: {
                cacheGroups: {
                    vendor: {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'vendors',
                        chunks: 'all',
                    },
                },
            },
            runtimeChunk: 'single',
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: './src/index.html',
                filename: '../index.html',
                minify: isProduction ? { collapseWhitespace: true, removeComments: true } : false,
            }),
            new MiniCssExtractPlugin({
                filename: isProduction ? '[name].[contenthash].css' : '[name].css',
            }),
            new CleanWebpackPlugin(), // Ensures clean builds
        ],
        stats: {
            warnings: false,
        },
    };
};