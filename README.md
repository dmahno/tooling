## Анализ сайта

Анализ сайта указан в word файле в репо.

# lodash-to-native

Использовались следующие версии:

- eslint - 6.8.0 (последняя версия)
- mocha - 7.1.1 (последняя версия)

Contains Array and Object Helper methods

## Установка

1. Установить [ESLint](http://eslint.org):

```sh
$ npm i eslint --save-dev
```

Далее установить, `lodash-to-native`:

```sh
$ npm install lodash-to-native --save-dev
```

Установка данного плагина с правилом

```sh
npm i -S https://github.com/dmahno/tooling
```

**Примечание:** Если вы установите ESLint глобально (используя `-g` флаг), также вы должны установить `lodash-to-native` глобально.

## Описание

При запуске eslint с флагом `--fix` во время вызова функции `_.map(collection, fn)` происходит следующее:

- если collection это объект - ничего не происходит
- если collection является массивом - происходит замена на `js collection.map(fn)`
- в остальных ситуациях происходит замена на:

```sh
Array.isArray(collection) ? collection.map(fn) : _.map(collection,fn);
```

## Использование

Добавить `lodash-to-native` в раздел плагины вашего файла `.eslintrc`. Вы можете скоммитеть `eslint-plugin-` префикс:

```json
{
  "plugins": ["lodash-to-native"]
}
```

Затем сконфигурировать правила которые вы хотите использовать

```json
{
  "rules": {
    "lodash-to-native/map": "warn"
  }
}
```
