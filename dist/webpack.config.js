var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack'); // для прогресс плагина
module.exports = function (env) {
    var _a;
    return {
        // entry: {
        //     counter: path.resolve(__dirname, 'src', 'index.js'), // точек может быть много, можно указать как ключ-значение, где ключ - название entry point'a
        //     helloWorld: path.resolve(__dirname, 'src', 'index2.js'), // но обычно один entry поинт, поэтому оставить один вход
        // }
        //если не указано, в качестве дефолта девелопмент
        mode: (_a = env.mode) !== null && _a !== void 0 ? _a : "development", // добавляется код для оптимизации разработки конкретно(к проду не подготовлен), а на продакшн меняется код на сжатый, оптимизированный, лишние пробелы и тд
        entry: path.resolve(__dirname, 'src', 'index.ts'),
        output: {
            path: path.resolve(__dirname, 'build'), //здесь можем переназвать, чтобы был не dist, а build
            filename: '[name].[contenthash].js', // имя файла на выходе, хеш меняется на основе содержимого, если поменяли внутри файла, он тоже меняется
            clean: true //при каждой сборке перед новым файлом старые очистит, чтобы не происходило кеширование старых файлов, всегда были новые, то бишь свежая версия приложения
        },
        plugins: [
            new HtmlWebpackPlugin({ template: path.resolve(__dirname, 'public', 'index.html') }), // для автоматич замены нашего скрипта сбилженного уже на html-ке, за это отвечает опция template
            new webpack.ProgressPlugin(),
        ],
        module: {
            rules: [
                {
                    test: /\.tsx?$/, // указывается регулярка, то что хотим обрабатывать, можно даже через regex101 глянуть, что попадет в обработчик,а что нет
                    use: 'ts-loader', //указывается название лоадера
                    exclude: /node_modules/,
                },
            ],
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js'], //расширения указываем, которые обычно необходимо обработать.
        },
    };
};
//npm run build:dev - код неоптимизированный, а если build:prod - он оптимизирован - роль грубо говоря "девОпс", создание лаконичного файла для продакшана без всякой ненужной дичи,
//чтобы памяти меньше кушало и так далее
