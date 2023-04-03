import { X4ShipClassEnum } from '../../redux/x4/fitting';

export const maps: {
  race: { label: string; value: string }[];
  reverseRace: { [key: string]: string };
  shipClass: { [key in X4ShipClassEnum]: string };
  variations: { [key: string]: string };
  factions: { [key: string]: string };
  colors: { [key: string]: { color: string; border: string } };
  resourceColors: { [key: string]: string };
} = {
  race: [
    { label: 'Argon', value: 'arg' },
    { label: 'ATF', value: 'atf' },
    { label: "Kha'ak", value: 'kha' },
    { label: 'Paranid', value: 'par' },
    { label: 'Split', value: 'spl' },
    { label: 'Teladi', value: 'tel' },
    { label: 'Terran', value: 'ter' },
    { label: 'Yaki', value: 'yak' },
    { label: 'Xenon', value: 'xen' },
    { label: 'Pirate', value: 'pir' },
  ],
  reverseRace: {
    atf: 'ATF',
    arg: 'Argon',
    kha: "Kha'ak",
    par: 'Paranid',
    spl: 'Split',
    tel: 'Teladi',
    ter: 'Terran',
    yak: 'Yaki',
    xen: 'Xenon',
    pir: 'Pirate',
  },
  shipClass: {
    ship_xl: 'extralarge',
    ship_l: 'large',
    ship_m: 'medium',
    ship_s: 'small',
  },
  variations: {
    BV: 'Base',
    VA: 'Vangaurd',
    ST: 'Sentinel',
    RD: 'Raider',
  },
  factions: {
    argon: 'Argon Federation',
    antigone: 'Antigone Republic',
    alliance: 'Alliance of the Word',
    holyorder: 'Holy Order',
    paranid: 'Paranid Godrealm',
    freesplit: 'Free Families',
    teladi: 'Teladi Company',
    ministry: 'Ministry of Finance',
    xenon: 'Xenon',
    scaleplate: 'Scale Plate Pact',
    split: 'Zyarth Patriarcy',
    pioneers: 'Segaris Pioneers',
    scavenger: 'Riptide Rakers',
    loanshark: 'Vigor Syndicate',
    yaki: 'Yaki',
    terran: 'Terran Protectorate',
  },
  colors: {
    xenon: { color: '#880000', border: '#c90000' },
    paranid: { color: '#2d0050', border: '#8000ff' },
    alliance: { color: '#b03cca', border: '#b03cca' },
    split: { color: '#5e2204', border: '#ff691e' },
    argon: { color: '#00256e', border: '#0055ff' },
    antigone: { color: '#4023ae', border: '#5033de' },
    hatikvah: { color: '#147a70', border: '#20f6e1' },
    teladi: { color: '#6e7c2a', border: '#a9c22e' },
    ministry: { color: '#94bc92', border: '#94bc92' },
    holyorder: { color: '#b45694', border: '#ff72ad' },
    freesplit: { color: '#a45525', border: '#ff8000' },
    pioneers: { color: '#41aa9a', border: '#66aa9a' },
    yaki: { color: '#fe8dfa', border: '#ffadfa' },
    terran: { color: '#bcd0fb', border: '#bcd0fb' },
    none: { color: '#666', border: '#aaa' },
    scavenger: { color: '#5480a0', border: '#7480a0' },
    loanshark: { color: '#978296', border: '#aa8296' },
  },
  resourceColors: {
    ore: '#ff8c00',
    silicon: '#d4d3cf',
    nividium: '#Ab20B1',
    ice: '#ffffff',
    hydrogen: '#c5ffff',
    helium: '#ffeec1',
    methane: '#367ca2',
  },
};

export const separateWords = (arg: string) =>
  arg
    .replace('large', 'large ')
    .replace('heavy', 'heavy ')
    .replace('energy', 'energy ')
    .replace('computronic', 'computronic ')
    .replace('advanced', 'advanced ')
    .replace('medical', 'medical ')
    .replace('metallic', 'metallic ')
    .replace('drone', 'drone ')
    .replace('shield', 'shield ')
    .replace('silicon', 'silicon ')
    .replace('smart', 'smart ')
    .replace('antimatter', 'antimatter ')
    .replace('scanning', 'scanning ')
    .replace('hullparts', 'hull parts');

export const translateRace = (arg: string) => (maps.reverseRace[arg] ? maps.reverseRace[arg] : arg);
export const getFaction = (arg: string) => (maps.factions[arg] ? maps.factions[arg] : arg);

export const formatNumber = (arg: string | number) => {
  return arg
    ? arg.toLocaleString('de-DE', { style: 'decimal', maximumFractionDigits: 0, minimumFractionDigits: 0 })
    : '0';
};
export const formatDecimal = (arg: string | number) =>
  arg
    ? arg.toLocaleString('de-DE', {
        style: 'decimal',
        maximumFractionDigits: 2,
        minimumFractionDigits: 2,
      })
    : '0.00';

export const getHexagonPointsV2 = (props: { x: number; y: number }, divider: number = 1) => {
  const { x, y } = props;
  const hx = 62 / divider;
  const hy = 108 / divider;
  return `${x - hx},${y - hy} ${x + hx},${y - hy} ${x + hx * 2},${y} ${x + hx},${y + hy} ${x - hx},${y + hy} ${
    x - hx * 2
  },${y} ${x - hx},${y - hy}`;
};

export const backgroundLabelRectWidth = (label: string) => {
  let numberOfShortLetters = 0;
  const i = label.toLowerCase().match(/i/g);
  const l = label.toLowerCase().match(/l/g);
  const apo = label.toLowerCase().match(/'/g);

  if (i) numberOfShortLetters += i.length;
  if (l) numberOfShortLetters += l.length;
  if (apo) numberOfShortLetters += apo.length;

  return numberOfShortLetters;
};
