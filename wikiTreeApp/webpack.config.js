module.exports = {
    mode: 'development', // or 'production'
    entry: {
        commandPalette: './public/js/commandPalette.js',
        cytoscapeSetup: './public/js/cytoscapeSetup.js'
    },
    output: {
        path: __dirname + '/public/dist',
        filename: '[name].bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    }
};