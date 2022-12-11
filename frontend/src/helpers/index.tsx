export function friendlyUrl(arg: string) {
  return arg.replace(/ /g, '-').toLowerCase();
}

export function lowercaseComparison(arg: string) {
  return arg.replace(/ /g, '-').toLowerCase();
}

export function seo(data: { keywords?: string[]; title?: string; metaDescription?: string } = {}) {
  let keywords: string = (data.keywords || [])
    .concat(['Quantum Anomaly', 'X4', 'Split Vendetta', 'Cradle of Humanity', 'EVE Online', 'Epic Arcs'])
    .join(',');
  let title = data.title || 'Quantum Anomaly';
  let metaDescription =
    data.metaDescription ||
    'Quantum Anomaly websites contains useful information and resources about online games such as EVE Online, Elite Dangerous, X4 Foundations, X4 Split Vendetta';

  if (title.indexOf('Quantum Anomaly') === -1) title += ' - Quantum Anomaly';

  document.title = title;
  // @ts-ignore
  document.querySelector('meta[name="description"]').setAttribute('content', metaDescription);
  // @ts-ignore
  document.querySelector('meta[name="keywords"]').setAttribute('content', keywords.replace(/,/g, ', '));
}

export function updateCanonical() {
  const link = !!document.querySelector("link[rel='canonical']")
    ? document.querySelector("link[rel='canonical']")
    : document.createElement('link');

  if (!link) return;

  link.setAttribute('rel', 'canonical');
  link.setAttribute('href', window.location.protocol + '//' + window.location.host + window.location.pathname);
  document.head.appendChild(link);
}

export function dynamicSort(property: any, caseInsensitive?: any) {
  let sortOrder = 1;
  if (property[0] === '-') {
    sortOrder = -1;
    property = property.substr(1);
  }
  return (a: any, b: any) => {
    let result;
    if (caseInsensitive) {
      result =
        a[property].toLocaleLowerCase() < b[property].toLocaleLowerCase()
          ? -1
          : a[property].toLocaleLowerCase() > b[property].toLocaleLowerCase()
          ? 1
          : 0;
    } else {
      result = a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
    }
    return result * sortOrder;
  };
}

export function dynamicSortMultiple(...props: string[]) {
  // const props = arguments;
  return (obj1: any, obj2: any) => {
    let index,
      result = 0;
    for (index = 0; result === 0 && index < props.length; index++) {
      result = dynamicSort(props[index])(obj1, obj2);
    }
    return result;
  };
}

export function hashUserId(data: any) {
  const cyrb53 = function (str: string, seed = 0) {
    let h1 = 0xdeadbeef ^ seed,
      h2 = 0x41c6ce57 ^ seed;
    for (let i = 0, ch; i < str.length; i++) {
      ch = str.charCodeAt(i);
      h1 = Math.imul(h1 ^ ch, 2654435761);
      h2 = Math.imul(h2 ^ ch, 1597334677);
    }
    h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
    h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
    return 4294967296 * (2097151 & h2) + (h1 >>> 0);
  };

  const clientIP = data;
  // @ts-ignore
  const validityInterval = Math.round(new Date() / 1000 / 3600 / 24 / 4);
  const clientIDSource =
    clientIP +
    ';' +
    window.location.host +
    ';' +
    navigator.userAgent +
    ';' +
    navigator.language +
    ';' +
    validityInterval;
  return cyrb53(clientIDSource).toString(16);
}
