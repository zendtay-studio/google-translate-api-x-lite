# google-translate-api-x-lite

A lightweight Google Translate API wrapper with ISO language mapping. Zero dependencies, uses native fetch.

**GitHub:** [https://github.com/zendtay-studio/google-translate-api-x-lite](https://github.com/zendtay-studio/google-translate-api-x-lite)

## Features

- Zero dependencies - uses native fetch only
- Language detection
- Text translation with auto-detection
- ISO 639-1 to ISO 639-2 mapping
- CLI support
- Lightweight and fast

## Installation

```bash
npm install google-translate-api-x-lite
```

## Usage as a module

### Translate text

```javascript
const Translator = require('google-translate-api-x-lite');

const translator = new Translator();

// Basic translation with auto-detection
const result = await translator.translate('Hola mundo', 'auto', 'en');
console.log(result.text); // Hello world
console.log(result.code); // es
console.log(result.name); // Spanish

// Specify source language
const result2 = await translator.translate('Bonjour', 'fr', 'en');
console.log(result2.text); // Hello
```

### Detect language

```javascript
const Translator = require('google-translate-api-x-lite');

const translator = new Translator();
const result = await translator.detect('This is an English sentence');

console.log(result.code); // en
console.log(result.name); // English
console.log(result.code2); // eng
```

### ISO language mapping

```javascript
const ISO = require('google-translate-api-x-lite/iso');
console.log(ISO.es); // { code2: 'spa', name: 'Spanish' }
console.log(ISO.en); // { code2: 'eng', name: 'English' }
```

## Command Line Interface (CLI)

### Global installation

```bash
npm install -g google-translate-api-x-lite
```

### Local usage

```bash
npx google-translate-api-x-lite [options]
```

### Available commands

| Command | Description |
|---------|-------------|
| `-h, --help` | Display help information |
| `-v, --version` | Display version number |
| `-l, --list` | List all supported languages |
| `-d, --detect <text>` | Detect language of the text |
| `-t, --translate <from> <to> <text>` | Translate text |

### CLI examples

**Detect language:**
```bash
google-translate-api-x-lite -d "This is a test"
# Language: English (en)
```

**Translate with auto-detection:**
```bash
google-translate-api-x-lite -t auto en "Hola mundo"
# Hello world [Detected: Spanish]
```

**Translate with specified source language:**
```bash
google-translate-api-x-lite -t es en "¿Cómo estás?"
# How are you?
```

**List supported languages:**
```bash
google-translate-api-x-lite -l
# aa: Afar
# ab: Abkhazian
# ...
```

## API Reference

### Class `Translator`

#### `translate(txt, f = 'auto', t)`

Translates text from one language to another.

**Parameters:**
- `txt` (string): Text to translate
- `f` (string): Source language code (default: `'auto'`)
- `t` (string): Target language code (required)

**Returns:** `Promise<Object>`
```javascript
{
  text: string,        // Translated text
  code: string,        // Detected ISO 639-1 code (if f='auto')
  name: string,        // Language name
  code2: string        // ISO 639-2 code
}
```

**Throws:** `Error` if target language is not provided

#### `detect(txt)`

Detects the language of a text.

**Parameters:**
- `txt` (string): Text to analyze (required)

**Returns:** `Promise<Object>`
```javascript
{
  code: string,        // ISO 639-1 code
  name: string,        // Language name
  code2: string        // ISO 639-2 code
}
```

**Throws:** `Error` if text is not provided

### Module `iso`

Exports an object with ISO 639-1 to ISO 639-2 mapping for 130+ languages.

```javascript
const ISO = require('google-translate-api-x-lite/iso');
// ISO is an object where keys are ISO 639-1 codes
// Values contain: { code2: string, name: string }
```

## Technical details

- **API endpoint:** translate.googleapis.com
- **Method:** GET with query parameters
- **Response format:** JSON
- **Language support:** 130+ languages with ISO mapping
- **User-Agent:** Mozilla/5.0 (required for API access)

## Requirements

- Node.js >= 18.0.0 (requires native `fetch` support)

## Repository

- **GitHub:** [https://github.com/zendtay-studio/google-translate-api-x-lite](https://github.com/zendtay-studio/google-translate-api-x-lite)
- **Issues:** [https://github.com/zendtay-studio/google-translate-api-x-lite/issues](https://github.com/zendtay-studio/google-translate-api-x-lite/issues)
- **Homepage:** [https://github.com/zendtay-studio/google-translate-api-x-lite#readme](https://github.com/zendtay-studio/google-translate-api-x-lite#readme)

## License

MIT © [ZendTay Studio](mailto:zendtaystudio@gmail.com)
