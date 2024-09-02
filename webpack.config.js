const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const autoprefixer = require('autoprefixer')

module.exports = {
    entry: './src/app.ts', mode: 'production', devtool: 'source-map', module: {
        rules: [
            {
                test: /\.tsx?$/, use: 'ts-loader', exclude: /node_modules/,
            },

            {
                test: /\.(scss)$/, use: [
                    {
                        // Adds CSS to the DOM by injecting a `<style>` tag
                        loader: 'style-loader',
                    }, {
                        // Interprets `@import` and `url()` like `import/require()` and will resolve them
                        loader: 'css-loader',
                    }, {
                        // Loader for webpack to process CSS with PostCSS
                        loader: 'postcss-loader', options: {
                            postcssOptions: {
                                plugins: [
                                    autoprefixer],
                            },
                        },
                    }, {
                        // Loads a SASS/SCSS file and compiles it to CSS
                        loader: 'sass-loader',
                    }],
            }],
    }, resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    }, output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'public/dist'),
        clean: true,
    }, optimization: {
        minimize: true, splitChunks: {
            chunks: 'all',
        },
    }, plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html', filename: '../index.html',
        })],
}