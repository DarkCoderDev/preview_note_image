const paths = require('./paths')

// Plugins
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const autoprefixer = require('autoprefixer')

module.exports = {
	// Where webpack looks to start building the bundle
	entry: [paths.src + '/main.js'],

	// Where webpack outputs the assets and bundles
	output: {
		path: paths.build,
		filename: '[name].bundle.js',
		publicPath: '/',
	},

	// Customize the webpack build process
	plugins: [
		// Removes/cleans build folders and unused assets when rebuilding
		new CleanWebpackPlugin(),

		new MiniCssExtractPlugin({
			filename: 'styles/[name].[contenthash].css',
			chunkFilename: '[id].[contenthash].css',
		}),

		// Copies files from target to destination folder
		new CopyWebpackPlugin({
			patterns: [
				{
					from: paths.src + '/assets',
					to: 'assets',
					globOptions: {
						ignore: ['*.DS_Store'],
					},
				},
			],
		}),

		// Generates an HTML file from a template
		new HtmlWebpackPlugin({
			favicon: `${paths.src}/assets/favicon.ico`, // favicon for template file
			template: `${paths.public}/index.html`, // template file
			filename: 'index.html' // output file
		}),
	],
	resolve: {
		extensions: ['.js', '.jsx'],
		alias: {
			"@": paths.src,
			"#": `${paths.src}/components`,

		}
	},
	// Determine how modules within the project are treated
	module: {
		rules: [
			// JavaScript: Use Babel to transpile JavaScript files
			{ test: /\.(js|jsx)$/, exclude: /node_modules/, use: ['babel-loader'] },

			// Styles: Inject CSS into the head with source maps
			{
				test: /\.(css|scss|sass)$/,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					'sass-loader',
					{
						loader: 'postcss-loader',
						options: {
							postcssOptions: {
								ident: 'postcss',
								plugins: [autoprefixer],
							},
						},
					},
				],
			},

			{ test: /\.svg$/, use: ['@svgr/webpack'] },

			// Images: Copy image files to build folder
			{ test: /\.(?:ico|gif|png|jpg|jpeg)$/i, type: 'asset/resource' },

			// Fonts and SVGs: Inline files
			{ test: /\.(woff(2)?|eot|ttf|otf|)$/, type: 'asset/inline' },
		],
	},
}