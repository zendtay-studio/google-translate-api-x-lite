const req = async (q, s = 'auto', t = 'en') => {
  const r = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=${s}&tl=${t}&dt=t&dt=ld&q=${encodeURIComponent(q)}`, {
    headers: { 'User-Agent': 'Mozilla/5.0' }
  });
  if (!r.ok) throw new Error(`HTTP ${r.status}`);
  return r.json();
};

const translate = async (txt, f = 'auto', t) => {
  if (!t) throw new Error('Target language required');
  const d = await req(txt, f, t);
  return {
    text: d[0]?.map(s => s[0] || '').join('') || '',
    from: f === 'auto' ? d?.[8]?.[0]?.[0] || '' : f,
    fromDetect: d?.[8]?.[0]?.[0] || '',
    to: t
  };
};

const detect = async (txt) => {
  if (!txt) throw new Error('Text required');
  return { code: (await req(txt))?.[8]?.[0]?.[0] || '' };
};

module.exports = { translate, detect };