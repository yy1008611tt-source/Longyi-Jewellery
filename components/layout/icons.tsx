export function Icon({name}:{name:"search"|"bag"|"menu"|"close"|"account"}) {
  return <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {name==="search"?<><circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/></>:
    name==="bag"?<><path d="M5 8h14l1 13H4L5 8Z"/><path d="M8 8V6a4 4 0 0 1 8 0v2"/></>:
    name==="account"?<><circle cx="12" cy="7" r="4"/><path d="M4 21v-2a8 8 0 0 1 16 0v2"/></>:
    name==="menu"?<path d="M3 8h18M3 16h18"/>:<path d="m5 5 14 14M19 5 5 19"/>}
  </svg>;
}
