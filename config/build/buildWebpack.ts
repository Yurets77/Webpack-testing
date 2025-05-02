import webpack from "webpack";
import { buildDevServer } from './buildDevServer';
import { buildPlugins } from "./buildPlugins";
import { buildLoaders } from "./buildLoaders";
import { buildResolvers } from "./buildResolvers";
import { BuildOptions } from "./types/types";


export function buildWebpack(options: BuildOptions) : webpack.Configuration {
    const {mode, paths} = options
    const isDev = mode === 'development';

    return {
        // entry: {
        //     counter: path.resolve(__dirname, 'src', 'index.js'), // точек может быть много, можно указать как ключ-значение, где ключ - название entry point'a
        //     helloWorld: path.resolve(__dirname, 'src', 'index2.js'), // но обычно один entry поинт, поэтому оставить один вход
        // }
        //если не указано, в качестве дефолта девелопмент
            mode: mode ?? "development", // добавляется код для оптимизации разработки конкретно(к проду не подготовлен), а на продакшн меняется код на сжатый, оптимизированный, лишние пробелы и тд
            entry: paths.entry,
            output: {  // куда и как с каким названием файл будет сохраняться
                path: paths.output, //здесь можем переназвать, чтобы был не dist, а build
                filename: '[name].[contenthash].js', // имя файла на выходе, хеш меняется на основе содержимого, если поменяли внутри файла, он тоже меняется
                clean: true //при каждой сборке перед новым файлом старые очистит, чтобы не происходило кеширование старых файлов, всегда были новые, то бишь свежая версия приложения
            },
            plugins: buildPlugins(options), // чтобы не выпадало для плагинов ошибка при false от devServer
            module: {
                rules: buildLoaders(options),
              },
              resolve: buildResolvers(options),
              devtool: isDev && 'inline-source-map', //запуск по заданному порту                    //это вариант длиннее     ?      : false
              devServer: isDev ? buildDevServer(options) : undefined
        }
}