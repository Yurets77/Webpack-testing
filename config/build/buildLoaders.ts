import {ModuleOptions} from "webpack";
import {BuildOptions} from './types/types';
import MiniCssExtractPlugin from "mini-css-extract-plugin";


export function buildLoaders(options: BuildOptions): ModuleOptions['rules'] {
  const isDev = options.mode === 'development'; // передаем булеан флажок на проверку мода, дабы использовать в дальнейшем какие-то опции, какие-то нет

  const cssLoader = {
    test: /\.css$/i,
    use: [
      isDev ? 'style-loader' : MiniCssExtractPlugin.loader, // если дев - то не используем, если прод - то используем
      "css-loader"
    ], // теперь работают стили на реакте, МиниЭкстрактор (вроде бы он это делает) автоматом коннектит css файл при сборке в бандле
  }

  const tsLoader = {
    // ts-loader умеет работать с JSX с коробки
    // Если бы мы не использовали ts, нужен был бы babel-loader
    test: /\.tsx?$/, // указывается регулярка, то что хотим обрабатывать, можно даже через regex101 глянуть, что попадет в обработчик,а что нет
    use: 'ts-loader', //указывается название лоадера
    exclude: /node_modules/,
  }

    return [
      cssLoader,
      tsLoader
    ]
}