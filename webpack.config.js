var webpack = require('webpack')
var path = require('path');
var MiniCssExtractPlugin = require("mini-css-extract-plugin");
var UglifyJsPlugin = require("uglifyjs-webpack-plugin");
var OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
var WebpackCleanPlugin = require('webpack-clean-plugin');
var inProduction = (process.env.NODE_ENV === 'production');

module.exports = {

	entry: {
		app: [
			'./src/main.js',
			'./src/main.scss'
		]
	},
	
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].js'
	},

	module: {
		rules: [

			// Style
			{
				test: /\.(sa|sc|c)ss$/,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					'sass-loader'
				]
			},

			// JS
			{ 
				test: /\.js$/, 
				exclude: /node_modules/, 
				loader: "babel-loader" 
			},

			// Image
			{ 
				test: /\.(png|jpe?g|gif|svg)$/,
				loader: "file-loader",
				options: {
					name: '[name].[hash].[ext]',
					outputPath: 'images/'
				}
			},

			// Font
			{ 
				test: /\.(eot|ttf|woff|woff2)$/,
				loader: "file-loader",
				options: {
					name: '[name].[hash].[ext]',
					outputPath: 'fonts/'
				}
			}
		]
	},

	plugins: [
		new MiniCssExtractPlugin({
			filename: "[name].css",
      		chunkFilename: "[id].css"
		}),

		new WebpackCleanPlugin({
            on: "emit",
            path: '/dist'
        })
	],

	// Optimizing (Style minimizing for production)
	optimization: {
		minimizer: [
			new UglifyJsPlugin({
				cache: true,
				parallel: true,
				sourceMap: false // set to true if you want JS source maps
			}),
			new OptimizeCSSAssetsPlugin({})
		]
	},

	// Webpack dev server conf.
	devServer: {
	    contentBase: path.resolve(__dirname, ''),
	    host: '0.0.0.0',
	    port: 9900,
	    index: 'index.html',
	    open: true
  }
};

if(inProduction){
	module.exports.plugins.push(
		// plugins for production only!
	);
}