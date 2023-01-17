# Gulp - сборка

## Запуск:

`gulp` или `npm run dev` - комнда запуска dev-версии.

`gulp build --build` или `npm run build` - команда запуска build-версии

## Структура:
```
|--gulp/      
|  |--configs/              # Папка с общими настройками
|  |  |--pathes.js          # Файл с путями
|  |  |--plugins.js         # Подключение общих для разных тасков плагинов
|  |--tasks/                # Папка с тасками
|--src/                     # Исходники
|  |--css/                  # Стили
|  |  |--css-parts/         # Папка с общими стилями. Там же следует хранить все прочие фрагменты стилей, организация файлов на усмотрение
|  |  |--normalize.css      # Нормалайз
|  |  |--main.css           # Файл страницы с подключенными фрагментами. этих файлов может быть больше в зависимости от количества страниц в проекте
|  |--html/                 # Папка с фрагментами html организация файлов может быть любая, файлы из этой папки подключаются в главном файле
|  |--img/                  # Папка для изображений
|  |--js/                   # Скрипты
|  |--resources/            # Папка для хранения редко изменямеых файлов
|  |  |--fonts/             # Шрифты
|  |  |--libs/              # Локальные версии библиотек и их стили
|  |--spriteicons/          # Иконки для спрайта
|  |--index.html            # Главная страница html
|--gulpfile.js              # Настройки Gulp
|--package.json             # Файл с настройками сборки и установленными пакетами
|--README.MD                # Описание сборки

```

## Примечания:
Для правильной работы путей в редакторе VSCode нужно установить расширение Path Autocomplete и в пользовательских настройках(User Settings(JSON) ) добавить следущую настройку:
```
 "path-autocomplete.pathMappings": {
    "@img": "${folder}/src/img", //alias for images
    "@css": "${folder}/src/css", //alias for css
    "@js": "${folder}/src/js", //alias for js
    "@fonts": "${folder}/src/resources/fonts",
    }
```
При написании путей к картинкам, шрифтам, и файлам стилей и скриптов использовать соответствующие псевдонимы. Например путь к шрифтам выглядит следующим образом: `@fonts/opensans-bold-webfont.woff2`, к картинке`@img/logo.svg`. При сборке с помощью плагина `gulp-replace` псевдоним заменяется правильным путем.

## Работа с HTML
Подключение фрагментов html осуществляется в общий файл, который затем обрабатывается и отправляется в dist. Используется плагин `gulp-file-include`, синтаксис следующий:
`@@include('path', {options})`. В options в переменные записывается информация, которая например будет меняться на каждой странице. В примере ниже в переменной "title" записывается значение тайтла, а в "stylesPath" путь к стилям, т.к. для каждой страницы они свои.

  #### Пример HTML:
  ##### Главный файл
  ```
  <!DOCTYPE html>
  <html lang="en">
    @@include('html/head.html', {
    "title": "Главная",
    "stylesPath": "css/main.css"
    })
    <body>
      @@include('html/header.html', {})
      <main ></main>
      @@include('html/footer.html', {})
    </body>
  </html>
  ```
  ##### head.html
  ```
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/normalize.css">
    <link rel="stylesheet" href="@@stylesPath">
    <title>@@title</title>
  </head>
  ```

## Работа с CSS
Части CSS-файлов хранятся в папке `css-parts`, их необходимо импортировать с помощью диррективы `@import url("path")` в основной файл, расположенный в папке css. Таких файлов может быть несколько для каждой странице свой. В этой же папке находится файл normalize.css, который также минимизируется и переносится в dist/css. Структура `css-parts` может быть любая.
Таблицы стилей плагинов в resources/libs

## Работа со скриптами
В этой версии все файлы в папке js и во вложенных папках склеиваются в один файл `app.js`, который минифицируем и подключаем в html. Локальные версии плагинов находятся в папке resources/libs их подключать отдельно.

## Плагины:
- [del@6.1.1](https://github.com/sindresorhus/del#readme) - удаляет директории и файлы (более поздние версии работают только с модульным типом сбоки);
- [browser-sync](https://browsersync.io/docs/api) - локальный сервер;
- [gulp-file-include](https://www.npmjs.com/package/gulp-file-include) - плагин для вставки файлов;
- [gulp-htmlmin](https://www.npmjs.com/package/gulp-htmlmin) - минифицирует html;
- [gulp-plumber](https://www.npmjs.com/package/gulp-plumber) - отслеживает ошибки и предотвращает аварийное завершение таска;
- [gulp-notify](https://www.npmjs.com/package/gulp-notify) - отправляет уведомления об ошибках или успешном выполнении таска;
- [gulp-if](https://github.com/robrich/gulp-if) - Тернарный плагин gulp: условное управление потоком виниловых объектов;
- [gulp-sourcemaps](https://github.com/gulp-sourcemaps/gulp-sourcemaps) 
- [gulp-autoprefixer](https://www.npmjs.com/package/gulp-autoprefixer) - расставляет вендорные преффиксы в css;
- [gulp-clean-css](https://github.com/scniro/gulp-clean-css) - плагин минифицирует CSS используя [clean-css](https://github.com/clean-css/clean-css);
- [gulp-replace](https://github.com/lazd/gulp-replace) - заменяет строки в галп;
- [gulp-image@5.1.0](https://github.com/1000ch/gulp-image) -оптимизирует изображения (png, jpeg, gif, svg, jpg)(5 версия работает с commonjs);
- [gulp-webp](https://github.com/sindresorhus/gulp-webp) -конвертирует изображения в webp;
- [gulp-svg-sprite](https://www.npmjs.com/package/gulp-svg-sprite) - создает спрайт;
- [gulp-concat](https://github.com/gulp-community/gulp-concat) - склеивает файлы;
- [gulp-terser](https://www.npmjs.com/package/gulp-terser) - минимизирует код, можно настроить обфускацию;
- [gulp-babel](https://www.npmjs.com/package/gulp-babel) - транспиляция js;
- [@babel/core](https://www.npmjs.com/package/@babel/core);
- [@babel/preset-env](https://www.npmjs.com/package/@babel/preset-env);
- [babel-loader](https://www.npmjs.com/package/babel-loader);
