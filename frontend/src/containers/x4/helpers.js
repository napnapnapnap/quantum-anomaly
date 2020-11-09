export const maps = {
  race: [
    {label: 'Argon', value: 'arg'},
    {label: 'Kha\'ak', value: 'kha'},
    {label: 'Paranid', value: 'par'},
    {label: 'Split', value: 'spl'},
    {label: 'Teladi', value: 'tel'},
    {label: 'Xenon', value: 'xen'}
  ],
  size: {
    ship_xl: 'extralarge',
    ship_l: 'large',
    ship_m: 'medium',
    ship_s: 'small'
  },
  subtype: [
    {label: 'Base variation', value: 'BV'},
    {label: 'Vanguard', value: 'VA'},
    {label: 'Sentinel', value: 'ST'},
    {label: 'Raider', value: 'RD'}
  ],
  reverseRace: {
    arg: 'Argon',
    kha: 'Kha\'ak',
    par: 'Paranid',
    spl: 'Split',
    tel: 'Teladi',
    xen: 'Xenon'
  }
};

export const separateWord = arg => arg.replace('large', 'large ').replace('heavy', 'heavy ');
