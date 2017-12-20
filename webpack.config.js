const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
	entry: {
		index: './index.js'
	},
	output: {
		filename: 'bundle.js',
		path: path.join(__dirname, '/build')
	},
	module: {
		rules: [{
			test: /\.pug$/,
			loader: 'pug-loader',
			options: {
				pretty: true
			}
		}, {
			test: /\.js$/,
			exclude: /(node_modules|bower_components)/,
			use: {
				loader: 'babel-loader',
				options: {
					presets: ['env']
				}
			}
		}, {
			test: /\.(sass|scss)$/,
			use: ExtractTextPlugin.extract({
				fallback: 'style-loader',
				use: [{
					loader: 'css-loader',
					options: {
						sourceMap: true
					}
				}, {
					loader: 'resolve-url-loader',
					options: {
						// debug: true
					}
				}, {
					loader: 'sass-loader',
					options: {
						sourceMap: true
					}
				}, {
					loader: 'import-glob-loader'
				}]
			})
		}, {
			test: /\.(eot|otf|ttf|woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
			use: [{
				loader: 'file-loader',
				options: {
					name: 'fonts/[name].[ext]'
				}
			}]
		}, {
			test: /\.(jpg|png|svg|gif)?$/,
			use: [{
				loader: 'file-loader',
				options: {
					name: 'images/[name].[ext]'
				}
			}]
		}]
	},
	devtool: 'eval',
	devServer: {
		compress: true,
		hot: true,
		stats: 'errors-only'
	},
	plugins: [
		new HtmlWebpackPlugin({
			filename: 'index.html',
			chunks: ['index'],
			template: path.resolve(__dirname, 'app/pages/index.pug')
		}),
		new HtmlWebpackPlugin({
			filename: 'manager.html',
			chunks: ['index'],
			template: path.resolve(__dirname, 'app/pages/manager.pug')
		}),
		new ExtractTextPlugin({
			filename: 'app.css',
			disable: !isProduction,
			allChunks: true
		}),
		new webpack.HotModuleReplacementPlugin()
	]
};
