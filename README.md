# Анализ сайта

Анализ сайта указан в word файле в репо.

# lodash-to-native

Contains Array and Object Helper methods

## Установка

1. Установить [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Далее установить, `lodash-to-native`:

```
$ npm install lodash-to-native --save-dev
```

**Примечание:** Если вы установите ESLint глобально (используя `-g` флаг), также вы должны установить `lodash-to-native` глобально.

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
    "lodash-to-native/map": 2
  }
}
```
