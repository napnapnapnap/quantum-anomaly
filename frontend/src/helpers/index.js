export function friendlyUrl(arg) {
  return arg.replace(/ /g, '-').toLowerCase();
}

export function lowercaseComparison(arg) {
  return arg.replace(/ /g, '-').toLowerCase();
}

export function seo(data = {}) {
  data.title = data.title || 'Quantum Anomaly';
  data.metaDescription = data.metaDescription || 'Quantum Anomaly websites contains useful information and resources about online games such as EVE Online, Elite Dangerous, X4 Foundations, X4 Split Vendetta';

  if (data.title.indexOf('Quantum Anomaly') === -1) data.title += ' - Quantum Anomaly';

  document.title = data.title;
  document.querySelector('meta[name="description"]').setAttribute('content', data.metaDescription);
}

export function updateCanonical() {
  const link = !!document.querySelector('link[rel=\'canonical\']') ? document.querySelector('link[rel=\'canonical\']') : document.createElement('link');
  link.setAttribute('rel', 'canonical');
  link.setAttribute('href', window.location.protocol + '//' + window.location.host + window.location.pathname);
  document.head.appendChild(link);
}
