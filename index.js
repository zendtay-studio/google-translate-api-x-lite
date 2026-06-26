const ISO = require('./iso');

module.exports = class Translator {
  url = 'https://translate.googleapis.com/translate_a/single';

  async req(q, sl = 'auto', tl = 'en') {
    const r = await fetch(`${this.url}?client=gtx&sl=${sl}&tl=${tl}&dt=t&dt=ld&q=${encodeURIComponent(q)}`, { headers: { 'User-Agent': 'Mozilla/5.0' } });
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    return r.json();
  }

  async translate(txt, f = 'auto', t) {
    if (!t) throw new Error('Se requiere idioma destino');
    const d = await this.req(txt, f, t), c = d?.[8]?.[0]?.[0] || '';
    return { text: d[0]?.map(s => s[0] || '').join('') || '', code: c, ...(ISO[c] || { name: 'Unknown', code2: c }) };
  }

  async detect(txt) {
    if (!txt) throw new Error('Se requiere texto');
    const d = await this.req(txt), c = d?.[8]?.[0]?.[0] || '';
    return { code: c, ...(ISO[c] || { name: 'Unknown', code2: c }) };
  }
};
