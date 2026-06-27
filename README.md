# google-translate-api-x-lite

A lightweight Google Translate wrapper for Node.js. It uses native fetch and works with async/await.

GitHub: https://github.com/zendtay-studio/google-translate-api-x-lite

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

- `txt`: string, required
- `from`: string, default `auto`
- `to`: string, required
- Returns: `Promise<Object>`

Example:

```javascript
const result = await translate('Hola mundo', 'auto', 'en');
console.log(result);
```

Example output:

```json
{
  "text": "Hello world",
  "code": "es",
  "from": "es",
  "detect": "es",
  "to": "en"
}
```

`detect` is just the detected language code returned as an extra field.

### detect(txt)

Detects the language of a text string.

- `txt`: string, required
- Returns: `Promise<Object>`

Example:

```javascript
const result = await detect('Hello world');
console.log(result);
```

Example output:

```json
{
  "code": "en"
}
```

## CLI

Run it with npx:

```bash
npx google-translate-api-x-lite -d "Hello world"
```

```bash
npx google-translate-api-x-lite -t auto en "Hola mundo"
```

Available commands:

- `-h, --help`
- `-v, --version`
- `-d, --detect <text>`
- `-t, --translate <from> <to> <text>`

## Notes

- Both functions are async, so use `await` or `.then()`.
- Node 18+ is recommended.
- The package uses the native `fetch` API and has no external dependencies.
