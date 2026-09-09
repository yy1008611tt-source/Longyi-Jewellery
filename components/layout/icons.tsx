export function Icon({name}:{name:"search"|"bag"|"menu"|"close"}) {
return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{name==="search"?<><circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/></>:name==="bag"?<><path d="M5 8h14l1 13H4L5 8Z"/><path d="M8 8V6a4 4 0 0 1 8 0v2"/></>:name==="menu"?<path d="M3 6h18M3 12h18M3 18h18"/>:<path d="m5 5 14 14M19 5 5 19"/>}</svg>;
}
