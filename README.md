# google-translate-api-x-lite

A lightweight Google Translate API wrapper with ISO language mapping. Zero dependencies, uses native fetch.

**GitHub:** [https://github.com/zendtay-studio/google-translate-api-x-lite](https://github.com/zendtay-studio/google-translate-api-x-lite)

---

## Features

- Zero dependencies – uses native `fetch` only
- Language detection
- Text translation with auto‑detection
- ISO 639‑1 to ISO 639‑2 mapping for 330+ languages
- Clean functional API (no class instantiation required)
- CLI support
- Lightweight and fast

---

## Installation

```bash
npm install google-translate-api-x-lite
```

---

## Usage as a Module

The package exports **four functions** and the **ISO map** directly:

```javascript
const { translate, detect, langs, info, ISO } = require('google-translate-api-x-lite');
```

### Translate Text

```javascript
const { translate } = require('google-translate-api-x-lite');

// Auto‑detect source language
const result = await translate('Hola mundo', 'auto', 'en');
console.log(result);
```

**Output:**
```json
{
  "text": "Hello world",
  "code": "es",
  "name": "Spanish",
  "code2": "spa",
  "from": "es",
  "to": "en"
}
```

```javascript
// Specify source language
const result2 = await translate('Bonjour', 'fr', 'en');
console.log(result2.text); // "Hello"
```

### Detect Language

```javascript
const { detect } = require('google-translate-api-x-lite');

const result = await detect('This is an English sentence');
console.log(result);
```

**Output:**
```json
{
  "code": "en",
  "name": "English",
  "code2": "eng"
}
```

### List All Supported Languages

```javascript
const { langs } = require('google-translate-api-x-lite');

const all = langs();
console.log(all.slice(0, 3));
```

**Output:**
```json
[
  { "code": "aa", "code2": "aar", "name": "Afar" },
  { "code": "ab", "code2": "abk", "name": "Abkhazian" },
  { "code": "ace", "code2": "ace", "name": "Achinese" }
]
```

### Get Information About a Specific Language

```javascript
const { info } = require('google-translate-api-x-lite');

const spanish = info('es');
console.log(spanish);
```

**Output:**
```json
{
  "code2": "spa",
  "name": "Spanish"
}
```

If the code is not found, `null` is returned.

### Direct ISO Mapping Access

```javascript
const ISO = require('google-translate-api-x-lite/iso');
console.log(ISO.es);
// { code2: 'spa', name: 'Spanish' }
console.log(ISO.en);
// { code2: 'eng', name: 'English' }
```

---

## API Reference

### `translate(txt, from = 'auto', to)`

Translates text from one language to another.

| Parameter | Type   | Description                               |
|-----------|--------|-------------------------------------------|
| `txt`     | string | Text to translate                         |
| `from`    | string | Source language code (default: `'auto'`)  |
| `to`      | string | **Required.** Target language code        |

**Returns:** `Promise<Object>`

```typescript
{
  text: string;   // Translated text
  code: string;   // Detected ISO 639‑1 code (if from='auto')
  name: string;   // Language name
  code2: string;  // ISO 639‑2 code
  from: string;   // Actual source code used
  to: string;     // Target code
}
```

**Throws:** `Error` if `to` is missing or text is empty.

---

### `detect(txt)`

Detects the language of the given text.

| Parameter | Type   | Description               |
|-----------|--------|---------------------------|
| `txt`     | string | **Required.** Text to analyze |

**Returns:** `Promise<Object>`

```typescript
{
  code: string;   // ISO 639‑1 code
  name: string;   // Language name
  code2: string;  // ISO 639‑2 code
}
```

**Throws:** `Error` if text is empty.

---

### `langs()`

Returns an array of all supported languages.

**Returns:** `Array<Object>`

```typescript
Array<{
  code: string;   // ISO 639‑1 code
  code2: string;  // ISO 639‑2 code
  name: string;   // Language name
}>
```

---

### `info(code)`

Returns information for a specific language code.

| Parameter | Type   | Description                  |
|-----------|--------|------------------------------|
| `code`    | string | ISO 639‑1 code to look up    |

**Returns:** `Object | null`

```typescript
{
  code2: string;  // ISO 639‑2 code
  name: string;   // Language name
}
```

Returns `null` if the code is not found.

---

### Module `iso`

Exports the complete ISO mapping object.

```javascript
const ISO = require('google-translate-api-x-lite/iso');
// ISO is an object keyed by ISO 639‑1 codes.
// Each value: { code2: string, name: string }
```

---

## Command Line Interface (CLI)

### Global Installation

```bash
npm install -g google-translate-api-x-lite
```

### Local Usage (via npx)

```bash
npx google-translate-api-x-lite [command] [options]
```

### Available Commands

| Command                     | Description                                 |
|-----------------------------|---------------------------------------------|
| `-h, --help`                | Show help                                   |
| `-v, --version`             | Show version number                         |
| `-l, --list`                | List all supported languages                |
| `-d, --detect <text>`       | Detect language of the text                 |
| `-t, --translate <from> <to> <text>` | Translate text (from → to)      |
| `-i, --info <code>`         | Show information about a language code      |

### CLI Examples

#### Detect Language

```bash
google-translate-api-x-lite -d "This is a test"
```

**Output:**
```
✅ English (en)
```

#### Translate with Auto‑Detection

```bash
google-translate-api-x-lite -t auto en "Hola mundo"
```

**Output:**
```
✅ Hello world
   [Detected: Spanish]
```

#### Translate with Specified Source

```bash
google-translate-api-x-lite -t es en "¿Cómo estás?"
```

**Output:**
```
✅ How are you?
```

#### List Languages

```bash
google-translate-api-x-lite -l
```

**Output (snippet):**
```
  aa    Afar
  ab    Abkhazian
  ace   Achinese
  ...
```

#### Language Info

```bash
google-translate-api-x-lite -i es
```

**Output:**
```
✅ Spanish (es) → ISO-639-2: spa
```

---

## Technical Details

- **API Endpoint:** `translate.googleapis.com/translate_a/single`
- **Method:** GET with query parameters
- **Response Format:** JSON
- **Language Support:** 330+ languages with ISO mapping
- **User-Agent:** `Mozilla/5.0` (required for API access)

---

## Requirements

- Node.js **>= 18.0.0** (requires native `fetch` support)

---

## Repository & License

- **GitHub:** [https://github.com/zendtay-studio/google-translate-api-x-lite](https://github.com/zendtay-studio/google-translate-api-x-lite)
- **Issues:** [https://github.com/zendtay-studio/google-translate-api-x-lite/issues](https://github.com/zendtay-studio/google-translate-api-x-lite/issues)
- **Homepage:** [https://github.com/zendtay-studio/google-translate-api-x-lite#readme](https://github.com/zendtay-studio/google-translate-api-x-lite#readme)

**License:** MIT © [ZendTay Studio](mailto:zendtaystudio@gmail.com)
