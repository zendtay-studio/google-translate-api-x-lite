#!/usr/bin/env node

const { translate, detect } = require('./index');
const { version: v, name: package } = require('./package.json');

const args = process.argv.slice(2);
const find = (s, l) => Math.max(args.indexOf(s), args.indexOf(l));

const help = () => console.log(`
📚 ${package} v${v}

Commands:
  -h, --help              Show this help
  -v, --version           Show version
  -d, --detect <text>     Detect language of text
  -t, --translate <from> <to> <text>  Translate text

Examples:
  -d "Hello world"
  -t auto en "Hola mundo"
  -t es en "¿Cómo estás?"
`);

if (find('-h', '--help') > -1 || !args.length) { help(); process.exit(0); }
if (find('-v', '--version') > -1) { console.log(v); process.exit(0); }

(async () => {
  try {
    if (find('-d', '--detect') > -1) {
      const txt = args.slice(find('-d', '--detect') + 1).join(' ');
      if (!txt) throw new Error('Text required');
      console.log((await detect(txt)).code);
    } else if (find('-t', '--translate') > -1) {
      const from = args[find('-t', '--translate') + 1] || 'auto';
      const to = args[find('-t', '--translate') + 2];
      const txt = args.slice(find('-t', '--translate') + 3).join(' ');
      if (!to) throw new Error('Target language required');
      if (!txt) throw new Error('Text required');
      console.log((await translate(txt, from, to)).text);
    } else {
      console.log('Unknown command. Use -h for help.');
    }
  } catch (e) {
    console.error(e.message);
    process.exit(1);
  }
})();