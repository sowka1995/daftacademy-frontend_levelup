const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isProduction = true;//process.env.NODE_ENV === 'production';
console.log(isProduction);

module.exports = {
    entry: './src/app.js',
    output: {
        path: `${__dirname}/dist`,
        filename: 'bundle.js'
    },
    plugins: [
        new HtmlWebpackPlugin({
          title: 'Daftacademy FrontEnd LevelUp'
        }),
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
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
            },
            {
                test: /\.s(a|c)ss$/,
                exclude: /node_modules/,
                use: [
                    isProduction
                    ? MiniCssExtractPlugin.loader
                    : { loader: 'style-loader', options: { sourceMap: true } },
                      { loader: 'css-loader', options: { sourceMap: isProduction } },
                      { loader: 'postcss-loader', options: { sourceMap: isProduction } },
                      { loader: 'sass-loader', options: { sourceMap: isProduction } },
                ]
            }
        ]
    }
}