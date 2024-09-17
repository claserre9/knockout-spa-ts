const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = (env, argv) => {
	const isProduction = argv.mode === 'production';

	return {
		entry: './src/app.ts',
		mode: isProduction ? 'production' : 'development',
		devtool: !isProduction ? 'inline-source-map' : false,
		module: {
			rules: [
				{
					test: /\.tsx?$/,
					use: 'ts-loader',
					exclude: /node_modules/,
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
			filename: '[name].bundle.js',
			path: path.resolve(__dirname, 'public/dist'),
			clean: true,
		},
		optimization: {
			minimize: isProduction,
			minimizer: [
				new CssMinimizerPlugin(),
			],
			splitChunks: {
				chunks: 'all',
			},
		},
		plugins: [
			new HtmlWebpackPlugin({
				template: './src/index.html',
				filename: '../index.html',
			}),
			new MiniCssExtractPlugin({
				filename: '[name].css',
			}),
		],
		devServer: {
			static: './public',
			hot: true,
		},
	};
};
