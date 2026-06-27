#!/usr/bin/env node

const { translate, detect } = require('./index');
const { version: v, name: package } = require('./package.json');

const args = process.argv.slice(2);
const find = (s, l) => {
  const i = Math.max(args.indexOf(s), args.indexOf(l));
  return i > -1 ? i : -1;
};

const help = () => {
  console.log(`
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
};

if (find('-h', '--help') > -1 || !args.length) { help(); process.exit(0); }
if (find('-v', '--version') > -1) { console.log(v); process.exit(0); }

const dIdx = find('-d', '--detect');
const tIdx = find('-t', '--translate');

(async () => {
  try {
    if (dIdx > -1) {
      const txt = args.slice(dIdx + 1).join(' ');
      if (!txt) throw new Error('Text required');
      const r = await detect(txt);
      console.log(`${r.code}`);

    } else if (tIdx > -1) {
      const from = args[tIdx + 1] || 'auto';
      const to = args[tIdx + 2];
      const txt = args.slice(tIdx + 3).join(' ');
      if (!to) throw new Error('Target language required');
      if (!txt) throw new Error('Text required');

      const r = await translate(txt, from, to);
      console.log(`${r.text}`);

    } else {
      console.log('Unknown command. Use -h for help.');
    }
  } catch (e) {
    console.error(`${e.message}`);
    process.exit(1);
  }
})();