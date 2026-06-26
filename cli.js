const T = require('./translator'), ISO = require('./iso'), { version: v } = require('./package.json');
const args = process.argv.slice(2), i = (s, l) => Math.max(args.indexOf(s), args.indexOf(l));

// Retornos tempranos para comandos de 1 solo paso (mata la ejecución sin process.exit)
if (i('-h', '--help') > -1 || !args.length) return console.log(`v${v}\nUsage: -v, -h, -l, -d <text>, -t <f> <t> <text>`);
if (i('-v', '--version') > -1) return console.log(v);
if (i('-l', '--list') > -1) return Object.entries(ISO).forEach(([c, d]) => console.log(`${c}: ${d.name}`));

(async () => {
  const t = new T(), d = i('-d', '--detect'), tr = i('-t', '--translate');
  try {
    if (d > -1) {
      const txt = args.slice(d + 1).join(' ');
      if (!txt) throw new Error('Falta el texto a detectar');
      const r = await t.detect(txt);
      console.log(`Language: ${r.name} (${r.code})`);
    } else if (tr > -1) {
      const f = args[tr + 1] || 'auto', to = args[tr + 2], txt = args.slice(tr + 3).join(' ');
      if (!to || !txt) throw new Error('Uso: -t <from> <to> "texto"');
      const r = await t.translate(txt, f, to);
      console.log(`${r.text}${f === 'auto' ? ` [Detected: ${r.name}]` : ''}`);
    }
  } catch (e) { console.error(`❌ ${e.message}`); process.exit(1); }
})();
