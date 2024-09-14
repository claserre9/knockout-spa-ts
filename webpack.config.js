const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const autoprefixer = require('autoprefixer')

module.exports = {
	entry: './src/app.ts',
	mode: 'production',
	module: {
		rules: [
			{
				test: /\.tsx?$/, use: 'ts-loader', exclude: /node_modules/,
			},
			{
				test: /\.(scss)$/,
				use: [
					{
						loader: 'style-loader',
					},
					{
						loader: 'css-loader',
					},
					{
						loader: 'postcss-loader', options: {
							postcssOptions: {
								plugins: [autoprefixer],
							},
						},
					},
					{
						loader: 'sass-loader',
					}
				],
			}
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
		minimize: true,
		splitChunks: {
			chunks: 'all',
		},
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.html',
			filename: '../index.html',
		})
	],
}