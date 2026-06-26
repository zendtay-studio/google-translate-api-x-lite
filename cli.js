#!/usr/bin/env node

const { translate, detect, langs, info, CONFIG } = require('./index');
const { version: v } = require('./package.json');

const args = process.argv.slice(2);
const find = (s, l) => {
  const i = Math.max(args.indexOf(s), args.indexOf(l));
  return i > -1 ? i : -1;
};

const help = () => {
  console.log(`
📚 google-translate-api-x-lite v${v}

Usage:
  $0 [command] [options]

Commands:
  -h, --help              Show this help
  -v, --version           Show version
  -l, --list              List all supported languages
  -d, --detect <text>     Detect language of text
  -t, --translate <from> <to> <text>  Translate text
  -i, --info <code>       Show language info

Examples:
  $0 -d "Hello world"
  $0 -t auto en "Hola mundo"
  $0 -t es en "¿Cómo estás?"
  $0 -l
  $0 -i es
  `);
};

if (find('-h', '--help') > -1 || !args.length) { help(); process.exit(0); }
if (find('-v', '--version') > -1) { console.log(v); process.exit(0); }
if (find('-l', '--list') > -1) {
  langs().forEach(({ code, name }) => console.log(`  ${code.padEnd(5)} ${name}`));
  process.exit(0);
}

const dIdx = find('-d', '--detect');
const tIdx = find('-t', '--translate');
const iIdx = find('-i', '--info');

(async () => {
  try {
    if (dIdx > -1) {
      const txt = args.slice(dIdx + 1).join(' ');
      if (!txt) throw new Error('Text required');
      const r = await detect(txt);
      console.log(`✅ ${r.name} (${r.code})`);
      
    } else if (tIdx > -1) {
      const from = args[tIdx + 1] || 'auto';
      const to = args[tIdx + 2];
      const txt = args.slice(tIdx + 3).join(' ');
      if (!to) throw new Error('Target language required');
      if (!txt) throw new Error('Text required');
      
      const r = await translate(txt, from, to);
      console.log(`✅ ${r.text}`);
      if (r.from && r.from !== from) console.log(`   [Detected: ${r.name}]`);
      
    } else if (iIdx > -1) {
      const code = args[iIdx + 1];
      if (!code) throw new Error('Language code required');
      const r = info(code);
      if (!r) throw new Error(`Language "${code}" not found`);
      console.log(`✅ ${r.name} (${code}) → ISO-639-2: ${r.code2}`);
      
    } else {
      console.log('❌ Unknown command. Use -h for help.');
    }
  } catch (e) {
    console.error(`❌ ${e.message}`);
    process.exit(1);
  }
})();
