export function icon(name, size = 20) {
  const attrs = `width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"`;
  const icons = {
    message: `<svg ${attrs}><path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 8.8 8.8 0 0 1-3.7-.8L3 21l1.8-5a8.3 8.3 0 0 1-1-4.1 8.5 8.5 0 1 1 17.2-.4Z"/><path d="M8 10.5h8"/><path d="M8 14h5"/></svg>`,
    shield: `<svg ${attrs}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/><path d="m9 12 2 2 4-5"/></svg>`,
    headphones: `<svg ${attrs}><path d="M3 14v-2a9 9 0 0 1 18 0v2"/><path d="M21 14v3a2 2 0 0 1-2 2h-1v-7h1a2 2 0 0 1 2 2Z"/><path d="M3 14v3a2 2 0 0 0 2 2h1v-7H5a2 2 0 0 0-2 2Z"/></svg>`,
    users: `<svg ${attrs}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.9"/><path d="M16 3.1a4 4 0 0 1 0 7.8"/></svg>`,
    banknote: `<svg ${attrs}><rect x="3" y="6" width="18" height="12" rx="2"/><circle cx="12" cy="12" r="2"/><path d="M7 12h.01M17 12h.01"/></svg>`,
    percent: `<svg ${attrs}><path d="m19 5-14 14"/><circle cx="7" cy="7" r="2"/><circle cx="17" cy="17" r="2"/></svg>`,
    trending: `<svg ${attrs}><path d="M3 17 9 11l4 4 8-8"/><path d="M14 7h7v7"/></svg>`,
    calendar: `<svg ${attrs}><path d="M8 2v4M16 2v4"/><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M3 10h18"/><path d="M8 14h.01M12 14h.01M16 14h.01"/></svg>`,
    arrow: `<svg ${attrs}><path d="M7 17 17 7"/><path d="M7 7h10v10"/></svg>`,
    play: `<svg ${attrs}><rect x="3" y="5" width="18" height="14" rx="3"/><path d="m10 9 5 3-5 3V9Z" fill="currentColor" stroke="none"/></svg>`,
    clipboard: `<svg ${attrs}><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1"/></svg>`,
    check: `<svg ${attrs}><polyline points="20 6 9 17 4 12"/></svg>`,
    'thumbs-up': `<svg ${attrs}><path d="M7 10v12"/><path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z"/></svg>`,
    x: `<svg ${attrs}><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>`,
    'arrow-left': `<svg ${attrs}><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>`,
    'arrow-right': `<svg ${attrs}><path d="m12 5 7 7-7 7"/><path d="M5 12h14"/></svg>`,
    'external-link': `<svg ${attrs}><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>`,
  };

  return icons[name] ?? '';
}
