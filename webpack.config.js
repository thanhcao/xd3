const path = require('path');
module.exports = {
    devtool: "source-map",
	entry: './src/index.js',
	output: {
    	path: path.resolve(__dirname, "dist"),
	    filename: 'xd3.js',
    	publicPath: '/',
	},
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loader:'babel-loader',
                query: {
                    presets: [
                        'es2015',
                        'react'
                    ],
                    plugins: [
                        ["transform-decorators-legacy"],
                        ["transform-class-properties"],
                        ["transform-es2015-destructuring"],
                        ["transform-object-rest-spread"]
                    ]
                }
			}
		]
	},
    resolve: {
        root: [
            path.resolve('./src')
        ]
    }
}