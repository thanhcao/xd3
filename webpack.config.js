const path = require('path');
module.exports = {
    devtool: "source-map",
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname, "build"),
        filename: 'xd3.js',
        publicPath: '/',
    },
    module: {
        loaders: [
            {
                test:/\.jsx?$/, exclude: /node_modules/,
                loader:'babel-loader',
                query: {
                    presets: [
                        'react',
                        'es2015'
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
    }
}