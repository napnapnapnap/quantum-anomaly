import clsx from 'clsx';

import './helpers.scss';

export function SortIndicator({ attribute, activeAttribute }: { attribute: string; activeAttribute: string }) {
  const active = attribute === activeAttribute || `-${attribute}` === activeAttribute;

  if (attribute === activeAttribute) return <SortDown active={active} />;
  else if (`-${attribute}` === activeAttribute) return <SortUp active={active} />;
  else return <SortDown active={active} />;
}

export function SortDown({ active = false }: { active?: boolean }) {
  return <span className={clsx('helper__sort helper__sort--down', { 'helper__sort--active': active })}>&#9660;</span>;
}

export function SortUp({ active = false }: { active?: boolean }) {
  return <span className={clsx('helper__sort helper__sort--up', { 'helper__sort--active': active })}>&#9650;</span>;
}
