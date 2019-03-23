const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/app.js',
    output: {
        path: `${__dirname}/dist`,
        filename: 'bundle.js'
    },
    plugins: [
        new HtmlWebpackPlugin({
          title: 'Daftacademy FrontEnd LevelUp'
        })
    ],
    watch: true,
    mode: "development",
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [ "@babel/preset-env" ]
                    }
                }
            }
        ]
    }
}