const HtmlWebPack = require('html-webpack-plugin')
const MiniCssExtract = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const CssMinimizer = require('css-minimizer-webpack-plugin');
const Terser = require('terser-webpack-plugin');

module.exports = {
    mode: 'production',

    output: {
        clean: true, // me limpia todo
        filename: 'main.[contenthash].js'
    },

    module: {
        rules: [
            {// para html
                test: /\.html$/,
                loader: 'html-loader',
                options: {
                    sources: false // hace cosas automaticas
                }
            },
            { // para css
                test: /\.css$/,
                exclude: /styles.css$/, // para q se lo salte
                use: [ 'style-loader', 'css-loader' ]
            },
            {
                test: /styles.css$/,
                use: [ MiniCssExtract.loader, 'css-loader' ]
            },
            {
                test: /\.(png|jpe?g|gif)$/, // evalua cualquier img donde este
                loader: 'file-loader'
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
        ]
    },

    optimization: {
        minimize: true,
        minimizer: [
            new CssMinimizer(),
            new Terser(),
        ]
    },

    plugins: [
        new HtmlWebPack({ // cambiar el archivo html
            title: 'Mi Webpack App',
            // filename: 'index.html',
            template: './src/index.html' // me copia todo el html
        }),
        new MiniCssExtract({
            filename: '[name].[fullhash].css', // .[fullhash].css para q al usuario no se le guarde en el cache los estilos (en produccion)
            ignoreOrder: false
        }),
        new CopyPlugin({ // copiar y pegar recursos estaticos
            patterns: [
                {from: 'src/assets/', to: 'assets/'} 
            ]
        }) 
    ],
}