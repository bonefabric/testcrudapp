const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
	entry: path.resolve(__dirname, './templates/js/app.js'),
	mode: "development",
	devtool: 'source-map',
	module: {
		rules: [
			{test: /\.js$/, use: 'babel-loader'},
			{test: /\.vue$/, loader: 'vue-loader'},
			{test: /\.scss$/, use: ['vue-style-loader', 'css-loader', 'sass-loader']},
			{test: /\.css$/i, use: ["style-loader", "css-loader", "postcss-loader"]},
		]
	},
	output: {
		path: path.resolve(__dirname, './templates/bundle'),
		filename: 'bundle.js',
	},
	plugins: [
		new VueLoaderPlugin()
	],
	resolve: {
		extensions: [".vue", ".js", ".scss", ".css"]
	}
}