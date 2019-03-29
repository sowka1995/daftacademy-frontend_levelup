module.exports = {
    output: {
        path: `${__dirname}/dist`,
        filename: 'bundle.css'
    },
    plugins: {
        'postcss-preset-env': {},
    }
}