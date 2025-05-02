import * as path from 'path';
import * as webpack from 'webpack';
import { buildWebpack } from './config/build/buildWebpack';
import { BuildMode, BuildPaths } from "./config/build/types/types";


interface EnvVariables { // затипизируем переменные окружения
  mode: BuildMode;
  port: number;
}

export default (env: EnvVariables) => { // экспорт не напрямую конфиг, а функция принимающая аргументов env переменные , возвращает конфиг
  const paths: BuildPaths ={
    output: path.resolve(__dirname, 'build'),
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
    html: path.resolve(__dirname, 'public', 'index.html'),
  }
  
  const config: webpack.Configuration = buildWebpack({
    port: env.port ?? 3000,
    mode: env.mode ?? 'development',
    paths
  })
    return config;
}

//npm run build:dev - код неоптимизированный, а если build:prod - он оптимизирован - роль грубо говоря "девОпс", создание лаконичного файла для продакшана без всякой ненужной дичи,
//чтобы памяти меньше кушало и так далее

// npm run start -- --env port=5000    сами задаем порт для запуска