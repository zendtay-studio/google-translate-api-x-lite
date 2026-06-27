# google-translate-api-x-lite

A lightweight async Google Translate wrapper for Node.js. It uses native fetch and has no external dependencies.

[Repository](https://github.com/zendtay-studio/google-translate-api-x-lite)

## Install

```bash
npm install google-translate-api-x-lite
```

## Quick start

```javascript
const { translate, detect } = require('google-translate-api-x-lite');

async function main() {
  const translated = await translate('Hola mundo', 'auto', 'en');
  console.log(translated);

  const detected = await detect('This is an English sentence');
  console.log(detected);
}

main();
```

## API

### translate(txt, from = 'auto', to)

Translates text.

```javascript
const result = await translate('Hola mundo', 'auto', 'en');
console.log(result);
```

Example response:

```json
{
  "text": "Hello world",
  "from": "es",
  "fromDetect": "es",
  "to": "en"
}
```

- `text`: translated text
- `from`: source language provided by the caller
- `fromDetect`: source language detected by Google
- `to`: target language

### detect(txt)

Detects the language of a text string.

```javascript
const result = await detect('Hello world');
console.log(result);
```

Example response:

```json
{
  "code": "en"
}
```

## CLI

```bash
npx google-translate-api-x-lite -d "Hello world"
```

```bash
npx google-translate-api-x-lite -t auto en "Hola mundo"
```

Commands:
- `-h, --help`
- `-v, --version`
- `-d, --detect <text>`
- `-t, --translate <from> <to> <text>`