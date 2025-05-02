import * as path from 'path';
import * as webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin'; // * as дропнет ошибку, ЭТО дефолтный импорт
import type { Configuration as DevServerConfiguration } from 'webpack-dev-server';
import MiniCssExtractPlugin from "mini-css-extract-plugin";

type Mode = 'production' | 'development';

interface EnvVariables { // затипизируем переменные окружения
  mode: Mode;
  port: number;
}

export default (env: EnvVariables) => { // экспорт не напрямую конфиг, а функция принимающая аргументов env переменные , возвращает конфиг
    
  const isDev = env.mode === 'development'; // передаем булеан флажок на проверку мода, дабы использовать в дальнейшем какие-то опции, какие-то нет
  const isProd= env.mode === 'production';

  const config: webpack.Configuration = {
      // entry: {
      //     counter: path.resolve(__dirname, 'src', 'index.js'), // точек может быть много, можно указать как ключ-значение, где ключ - название entry point'a
      //     helloWorld: path.resolve(__dirname, 'src', 'index2.js'), // но обычно один entry поинт, поэтому оставить один вход
      // }
      //если не указано, в качестве дефолта девелопмент
          mode: env.mode ?? "development", // добавляется код для оптимизации разработки конкретно(к проду не подготовлен), а на продакшн меняется код на сжатый, оптимизированный, лишние пробелы и тд
          entry: path.resolve(__dirname, 'src', 'index.tsx'),
          output: {  // куда и как с каким названием файл будет сохраняться
              path: path.resolve(__dirname, 'build'), //здесь можем переназвать, чтобы был не dist, а build
              filename: '[name].[contenthash].js', // имя файла на выходе, хеш меняется на основе содержимого, если поменяли внутри файла, он тоже меняется
              clean: true //при каждой сборке перед новым файлом старые очистит, чтобы не происходило кеширование старых файлов, всегда были новые, то бишь свежая версия приложения
          },
          plugins: [ // массив плагинов
              new HtmlWebpackPlugin({template: path.resolve(__dirname, 'public', 'index.html') }), // для автоматич замены нашего скрипта сбилженного уже на html-ке, за это отвечает опция template
              isDev && new webpack.ProgressPlugin(), // плагин показывает, на сколько процентов прошла сборка, на больших проектах может замедлять
              isProd &&new MiniCssExtractPlugin({ //в дев режиме не нужен, поэтому обойдемся style-loader'ом, создавать отдельные файлы не нужно, поэтому в условие RULES пишем проверку
                filename: 'css/[name].[contenthash:8].css', // в билде бандла появляется папка 
                chunkFilename: 'css/[name].[contenthash:8].css',
              }) // 
          ].filter(Boolean), // чтобы не выпадало для плагинов ошибка при false от devServer
          module: {
              rules: [
                //порядок имеет значение
                {
                  test: /\.css$/i,
                  use: [
                    isDev ? 'style-loader' : MiniCssExtractPlugin.loader, // если дев - то не используем, если прод - то используем
                    "css-loader"
                  ], // теперь работают стили на реакте, МиниЭкстрактор (вроде бы он это делает) автоматом коннектит css файл при сборке в бандле
                },
                {
                  // ts-loader умеет работать с JSX с коробки
                  // Если бы мы не использовали ts, нужен был бы babel-loader
                  test: /\.tsx?$/, // указывается регулярка, то что хотим обрабатывать, можно даже через regex101 глянуть, что попадет в обработчик,а что нет
                  use: 'ts-loader', //указывается название лоадера
                  exclude: /node_modules/,
                },
              ],
            },
            resolve: {
              extensions: ['.tsx', '.ts', '.js'], //расширения указываем, которые обычно необходимо обработать.
            },
            devtool: isDev && 'inline-source-map', //запуск по заданному порту                    //это вариант длиннее     ?      : false
            devServer: isDev ? { // если он булеан false, передаем undefined или false или другое значение в зависимости от того что настраиваем
              port: env.port ?? 3000,
              open: true
            } : undefined
      }
    return config;
}

//npm run build:dev - код неоптимизированный, а если build:prod - он оптимизирован - роль грубо говоря "девОпс", создание лаконичного файла для продакшана без всякой ненужной дичи,
//чтобы памяти меньше кушало и так далее

// npm run start -- --env port=5000    сами задаем порт для запуска