const ISO = require('./iso');

const U = 'https://translate.googleapis.com/translate_a/single';
const H = { 'User-Agent': 'Mozilla/5.0' };

const req = async (q, s = 'auto', t = 'en') => {
  const r = await fetch(`${U}?client=gtx&sl=${s}&tl=${t}&dt=t&dt=ld&q=${encodeURIComponent(q)}`, { headers: H });
  if (!r.ok) throw new Error(`HTTP ${r.status}`);
  return r.json();
};

const translate = async (txt, f = 'auto', t) => {
  if (!t) throw new Error('Target language required');
  const d = await req(txt, f, t);
  const c = d?.[8]?.[0]?.[0] || '';
  return {
    text: d[0]?.map(s => s[0] || '').join('') || '',
    code: c,
    ...(ISO[c] || { name: 'Unknown', code2: c }),
    from: f === 'auto' ? c : f,
    to: t
  };
};

const detect = async (txt) => {
  if (!txt) throw new Error('Text required');
  const d = await req(txt);
  const c = d?.[8]?.[0]?.[0] || '';
  return { code: c, ...(ISO[c] || { name: 'Unknown', code2: c }) };
};

const langs = () => Object.entries(ISO).map(([k, v]) => ({ code: k, ...v }));

const info = (code) => ISO[code] || null;

module.exports = { translate, detect, langs, info, ISO };
