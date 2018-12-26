export function seo(data = {}) {
  data.title           = data.title || 'Quantum Anomaly';
  data.metaDescription = data.metaDescription || 'Quantum Anomaly websites contains useful information and resources about online games such as EVE Online and WarFrame';

  if (data.title.indexOf('Quantum Anomaly') === -1) data.title += ' - Quantum Anomaly';

  document.title = data.title;
  document.querySelector('meta[name="description"]').setAttribute('content', data.metaDescription);
}

export function updateTitle(value, seperator) {
  console.log(document.title);
}
