import { Configuration } from "webpack";
import HtmlWebpackPlugin from 'html-webpack-plugin';
import {BuildOptions} from './types/types';
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import webpack from "webpack";




export function buildPlugins({mode, paths}: BuildOptions): Configuration['plugins'] {
    const isDev = mode === 'development';
    const isProd= mode === 'production';

    const plugins: Configuration['plugins'] = [
      new HtmlWebpackPlugin({template: paths.html }), // для автоматич замены нашего скрипта сбилженного уже на html-ке, за это отвечает опция template
    ]

    if(isDev) {
      plugins.push(new webpack.ProgressPlugin()) // плагин показывает, на сколько процентов прошла сборка, на больших проектах может замедлять
    }

    if(isProd) {
      plugins.push(new MiniCssExtractPlugin({ //в дев режиме не нужен, поэтому обойдемся style-loader'ом, создавать отдельные файлы не нужно, поэтому в условие RULES пишем проверку
        filename: 'css/[name].[contenthash:8].css', // в билде бандла появляется папка 
        chunkFilename: 'css/[name].[contenthash:8].css',
      }))
    }
    return plugins; // возвращаем массив плагинов
}