import { useState, useEffect, useRef } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL || "https://orxyigdszptjptzenmpd.supabase.co",
  process.env.REACT_APP_SUPABASE_ANON_KEY || "sb_publishable_1dCx6x7gqRJU0vKwZEs6oA_8aK_qB1e"
);

const GOLD = "#C9A84C";
const GOLD_LIGHT = "#E8C96A";
const GOLD_DARK = "#8B6914";
const BG = "#0A0A0A";
const BG2 = "#111111";
const ADMIN_EMAIL = "ltabula@me.com";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,400;1,700&family=Montserrat:wght@300;400;500;600;700;800&display=swap');
  * { margin:0; padding:0; box-sizing:border-box; }
  body { background:#0A0A0A; color:#F5F0E8; font-family:'Montserrat',sans-serif; overflow-x:hidden; }
  .fd { font-family:'Cormorant Garamond',serif; }
  ::-webkit-scrollbar{width:4px} ::-webkit-scrollbar-track{background:#0A0A0A} ::-webkit-scrollbar-thumb{background:#8B6914}
  .gt { background:linear-gradient(135deg,#C9A84C,#E8C96A,#C9A84C); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
  @keyframes fadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
  @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
  @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}}
  @keyframes starPop{0%{opacity:0;transform:scale(0)}60%{opacity:1;transform:scale(1.1)}100%{opacity:0.7;transform:scale(1)}}
  @keyframes scrollX{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
  .nav{position:fixed;top:0;left:0;right:0;z-index:100;display:flex;align-items:center;justify-content:space-between;padding:16px 32px;background:rgba(10,10,10,0.97);border-bottom:1px solid rgba(201,168,76,0.1);backdrop-filter:blur(12px)}
  .nl{font-size:10px;font-weight:600;letter-spacing:2px;text-transform:uppercase;color:#777;cursor:pointer;background:none;border:none;border-bottom:1px solid transparent;font-family:'Montserrat',sans-serif;transition:color 0.2s;padding-bottom:2px}
  .nl:hover{color:#C9A84C} .nl.active{color:#C9A84C;border-bottom-color:#C9A84C}
  .bp{background:linear-gradient(135deg,#8B6914,#C9A84C,#E8C96A);color:#000;border:none;padding:10px 24px;font-family:'Montserrat',sans-serif;font-weight:700;font-size:10px;letter-spacing:2.5px;text-transform:uppercase;cursor:pointer;transition:all 0.3s}
  .bp:hover{transform:translateY(-2px);box-shadow:0 8px 30px rgba(201,168,76,0.35)}
  .bo{background:transparent;color:#C9A84C;border:1px solid rgba(201,168,76,0.5);padding:10px 24px;font-family:'Montserrat',sans-serif;font-weight:600;font-size:10px;letter-spacing:2.5px;text-transform:uppercase;cursor:pointer;transition:all 0.3s}
  .bo:hover{border-color:#C9A84C;background:rgba(201,168,76,0.07)}
  .gd{height:1px;background:linear-gradient(to right,transparent,#C9A84C,transparent);opacity:0.25}
  .sl{font-size:10px;font-weight:700;letter-spacing:4px;text-transform:uppercase;color:#C9A84C}
  .tag{display:inline-block;padding:4px 12px;border:1px solid rgba(201,168,76,0.3);font-size:9px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#C9A84C}
  .cc{background:#111;border:1px solid rgba(201,168,76,0.1);cursor:pointer;transition:all 0.3s;overflow:hidden}
  .cc:hover{border-color:rgba(201,168,76,0.35);transform:translateY(-4px);box-shadow:0 20px 60px rgba(0,0,0,0.5)}
  .pc{background:#111;border:1px solid rgba(255,255,255,0.06);overflow:hidden;transition:all 0.3s;cursor:pointer}
  .pc:hover{border-color:rgba(201,168,76,0.2)}
  .qb{padding:20px 24px;background:rgba(201,168,76,0.04);border-left:2px solid #C9A84C}
  .tb{display:inline-flex;align-items:center;gap:8px;padding:8px 18px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.1);color:#ccc;font-size:10px;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;cursor:pointer;transition:all 0.2s;font-family:'Montserrat',sans-serif;text-decoration:none}
  .tb:hover{background:rgba(255,255,255,0.08);color:#fff}
  .ja{width:40px;height:40px;border-radius:50%;border:1px solid rgba(201,168,76,0.4);display:flex;align-items:center;justify-content:center;font-size:18px;background:rgba(201,168,76,0.08);flex-shrink:0}
  .ifield{width:100%;background:rgba(255,255,255,0.04);border:1px solid rgba(201,168,76,0.2);color:#F5F0E8;padding:14px 18px;font-family:'Montserrat',sans-serif;font-size:13px;outline:none;transition:border-color 0.2s}
  .ifield:focus{border-color:#C9A84C} .ifield::placeholder{color:#555}
  .crow{display:flex;align-items:center;gap:12px;padding:14px 0;border-bottom:1px solid rgba(255,255,255,0.04)}
  .at{width:100%;border-collapse:collapse;font-size:12px}
  .at th{text-align:left;padding:12px 16px;font-size:9px;letter-spacing:2px;text-transform:uppercase;color:#C9A84C;border-bottom:1px solid rgba(201,168,76,0.15);font-weight:600}
  .at td{padding:14px 16px;border-bottom:1px solid rgba(255,255,255,0.04);color:#ccc}
  .at tr:hover td{background:rgba(201,168,76,0.02)}
  .mnav{position:fixed;bottom:0;left:0;right:0;background:rgba(10,10,10,0.98);border-top:1px solid rgba(201,168,76,0.12);display:flex;justify-content:space-around;padding:12px 0 20px;z-index:100}
  .mni{display:flex;flex-direction:column;align-items:center;gap:4px;font-size:9px;letter-spacing:1.5px;text-transform:uppercase;color:#555;cursor:pointer;transition:color 0.2s;background:none;border:none;font-family:'Montserrat',sans-serif;font-weight:600}
  .mni.active{color:#C9A84C}
  .ub{display:inline-flex;align-items:center;gap:6px;padding:4px 12px;background:rgba(201,168,76,0.1);border:1px solid rgba(201,168,76,0.3);font-size:9px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#C9A84C}
  .ld{width:6px;height:6px;border-radius:50%;background:#C9A84C;animation:pulse 1.5s infinite;display:inline-block}
  .toast{position:fixed;bottom:90px;left:50%;transform:translateX(-50%);background:rgba(201,168,76,0.12);border:1px solid #C9A84C;color:#C9A84C;padding:12px 24px;font-size:11px;letter-spacing:2px;text-transform:uppercase;font-weight:600;z-index:200;animation:fadeUp 0.3s ease}
  .jury-type-card{background:#111;border:1px solid rgba(201,168,76,0.12);padding:22px 20px;transition:all 0.3s}
  .jury-type-card:hover{border-color:rgba(201,168,76,0.35);transform:translateY(-3px)}
  .criteria-pill{display:flex;align-items:center;gap:10px;padding:14px 18px;background:rgba(201,168,76,0.04);border:1px solid rgba(201,168,76,0.12);margin-bottom:8px}
  .genre-strip{overflow:hidden;padding:0;position:relative}
  .genre-strip::before{content:'';position:absolute;left:0;top:0;bottom:0;width:60px;background:linear-gradient(to right,#0A0A0A,transparent);z-index:2;pointer-events:none}
  .genre-strip::after{content:'';position:absolute;right:0;top:0;bottom:0;width:60px;background:linear-gradient(to left,#0A0A0A,transparent);z-index:2;pointer-events:none}
  .genre-track{display:flex;gap:12px;animation:scrollX 28s linear infinite;width:max-content}
  .genre-track:hover{animation-play-state:paused}
  .genre-pill{display:flex;align-items:center;gap:10px;padding:12px 20px;background:#111;border:1px solid rgba(201,168,76,0.15);cursor:pointer;transition:all 0.2s;white-space:nowrap;flex-shrink:0}
  .genre-pill:hover{border-color:rgba(201,168,76,0.5);background:rgba(201,168,76,0.07)}
  .genre-filter{display:flex;gap:8px;overflow-x:auto;padding-bottom:4px;scrollbar-width:none}
  .genre-filter::-webkit-scrollbar{display:none}
  .gf-btn{padding:7px 16px;background:transparent;border:1px solid rgba(255,255,255,0.1);color:#888;font-family:'Montserrat',sans-serif;font-size:9px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;cursor:pointer;transition:all 0.2s;white-space:nowrap;flex-shrink:0}
  .gf-btn:hover{border-color:rgba(201,168,76,0.4);color:#C9A84C}
  .gf-btn.active{border-color:#C9A84C;background:rgba(201,168,76,0.1);color:#C9A84C}
  /* ─── RESPONSIVE DESKTOP ─────────────────────────────────────────────────── */
  /* Capacitor / App mobile — forcer le mode mobile */
  .capacitor-app .nav-desktop-links { display: none !important; }
  .capacitor-app .mnav { display: flex !important; }
  .capacitor-app .hero-grid { grid-template-columns: 1fr !important; }
  .capacitor-app .hero-right { display: none !important; }
  .capacitor-app .concerts-grid { grid-template-columns: 1fr !important; }
  .capacitor-app .desktop-sidebar { display: none !important; }
  .capacitor-app .desktop-two-col { grid-template-columns: 1fr !important; }
  .capacitor-app .detail-grid { grid-template-columns: 1fr !important; }
  .capacitor-app .nav { padding: 14px 16px; padding-top: calc(14px + env(safe-area-inset-top)); }
  .capacitor-app .mnav { padding-bottom: calc(10px + env(safe-area-inset-bottom)); }
  .capacitor-app { padding-top: env(safe-area-inset-top); }
  @media (max-width: 768px) {
    .nav { padding: 14px 16px; }
    .nav-desktop-links { display: none !important; }
    .mnav { display: flex !important; }
    .hero-grid { grid-template-columns: 1fr !important; }
    .hero-right { display: none !important; }
    .concerts-grid { grid-template-columns: 1fr !important; }
    .desktop-sidebar { display: none !important; }
    .desktop-two-col { grid-template-columns: 1fr !important; }
    .detail-grid { grid-template-columns: 1fr !important; }
  }
  @media (min-width: 769px) {
    .mnav { display: none !important; }
    .nav-desktop-links { display: flex !important; }
    .hero-grid { grid-template-columns: 1fr 1fr !important; min-height: 100vh; }
    .concerts-grid { grid-template-columns: repeat(3, 1fr) !important; }
    .desktop-two-col { grid-template-columns: 240px 1fr !important; }
    .detail-grid { grid-template-columns: 1fr 1fr !important; }
  }
  @media (min-width: 1200px) {
    .concerts-grid { grid-template-columns: repeat(4, 1fr) !important; }
  }
`;

const GENRES = [
  {name:"Hip-Hop"},{name:"Pop"},{name:"Rock"},
  {name:"R&B"},{name:"Électro"},{name:"Jazz"},
  {name:"Metal"},{name:"Classique"},{name:"Reggae"},
  {name:"Soul"},{name:"Folk"},{name:"Afrobeats"},
  {name:"Flamenco"},{name:"Punk"},{name:"Latin"},{name:"Blues"},
];

function GenreIcon({name,size=20}) {
  const s=size,G="#C9A84C",GL="#E8C96A";
  const icons={
    "Hip-Hop":<svg width={s} height={s} viewBox="0 0 44 44" fill="none"><circle cx="22" cy="13" r="8" stroke={G} strokeWidth="1.2" fill={G} fillOpacity="0.08"/><line x1="22" y1="21" x2="22" y2="40" stroke={G} strokeWidth="1.2"/><line x1="11" y1="40" x2="33" y2="40" stroke={G} strokeWidth="2.5" strokeLinecap="round"/><path d="M17,6 L15,2 L29,2 L27,6" stroke={G} strokeWidth="1" fill="none"/></svg>,
    "Pop":<svg width={s} height={s} viewBox="0 0 44 44" fill="none"><polygon points="22,3 27,16 40,17 30,26 33,40 22,31 11,40 14,26 4,17 17,16" stroke={G} strokeWidth="1.3" fill={G} fillOpacity="0.1" strokeLinejoin="round"/><circle cx="22" cy="24" r="5" fill={G} opacity="0.25"/></svg>,
    "Rock":<svg width={s} height={s} viewBox="0 0 44 44" fill="none"><line x1="22" y1="3" x2="22" y2="29" stroke={G} strokeWidth="1.5"/><ellipse cx="15" cy="36" rx="8" ry="5" stroke={G} strokeWidth="1.2" fill={G} fillOpacity="0.1"/><path d="M30,3 L22,3 L22,9" stroke={G} strokeWidth="2" strokeLinecap="round"/>{[18,20,22,24,26].map(x=><line key={x} x1={x} y1="11" x2={x} y2="24" stroke={G} strokeWidth="0.6" opacity="0.4"/>)}</svg>,
    "R&B":<svg width={s} height={s} viewBox="0 0 44 44" fill="none"><circle cx="22" cy="22" r="17" stroke={G} strokeWidth="1.2" fill={G} fillOpacity="0.05"/><circle cx="22" cy="22" r="11" stroke={G} strokeWidth="0.8" fill="none" opacity="0.4"/><circle cx="22" cy="22" r="5" stroke={G} strokeWidth="0.6" fill="none" opacity="0.3"/><circle cx="22" cy="22" r="2" fill={G} opacity="0.7"/><line x1="22" y1="5" x2="22" y2="2" stroke={G} strokeWidth="1"/><circle cx="24" cy="2" r="1.5" fill={G} opacity="0.5"/></svg>,
    "Électro":<svg width={s} height={s} viewBox="0 0 44 44" fill="none"><path d="M24,2 L12,22 L22,22 L17,42" stroke={GL} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/><circle cx="24" cy="2" r="1.5" fill={GL}/></svg>,
    "Jazz":<svg width={s} height={s} viewBox="0 0 44 44" fill="none"><ellipse cx="17" cy="37" rx="9" ry="5" stroke={G} strokeWidth="1.2" fill={G} fillOpacity="0.1"/><line x1="26" y1="37" x2="26" y2="11" stroke={G} strokeWidth="1.2"/><path d="M26,11 Q26,5 32,5 Q38,5 38,10 Q38,14 32,15 Q26,17 26,20" stroke={G} strokeWidth="1.2" fill="none"/></svg>,
    "Metal":<svg width={s} height={s} viewBox="0 0 44 44" fill="none"><circle cx="22" cy="15" r="11" stroke={G} strokeWidth="1.2" fill={G} fillOpacity="0.06"/><circle cx="17" cy="13" r="2" fill={G} opacity="0.15"/><circle cx="27" cy="13" r="2" fill={G} opacity="0.15"/><path d="M15,26 L13,34 L9,42" stroke={G} strokeWidth="1.2" strokeLinecap="round"/><path d="M29,26 L31,34 L35,42" stroke={G} strokeWidth="1.2" strokeLinecap="round"/><path d="M9,42 L5,36" stroke={G} strokeWidth="1.2" strokeLinecap="round"/><path d="M9,42 L12,44" stroke={G} strokeWidth="1.2" strokeLinecap="round"/><path d="M35,42 L39,36" stroke={G} strokeWidth="1.2" strokeLinecap="round"/><path d="M35,42 L32,44" stroke={G} strokeWidth="1.2" strokeLinecap="round"/></svg>,
    "Classique":<svg width={s} height={s} viewBox="0 0 44 44" fill="none"><path d="M22,2 Q29,9 26,18 Q24,24 22,22 Q20,20 18,13 Q16,7 22,2Z" stroke={G} strokeWidth="1" fill={G} fillOpacity="0.12"/><line x1="22" y1="22" x2="22" y2="40" stroke={G} strokeWidth="1.5"/><path d="M22,24 Q31,26 30,32 Q29,36 22,34" stroke={G} strokeWidth="1.2" fill={G} fillOpacity="0.08"/><circle cx="22" cy="40" r="3" fill={G} opacity="0.4"/></svg>,
    "Reggae":<svg width={s} height={s} viewBox="0 0 44 44" fill="none"><circle cx="22" cy="24" r="10" stroke={G} strokeWidth="1.2" fill={G} fillOpacity="0.08"/><path d="M22,7 L19,11 L15,7 L18,12" stroke={G} strokeWidth="1" fill="none" opacity="0.5"/><path d="M22,7 L25,11 L29,7 L26,12" stroke={G} strokeWidth="1" fill="none" opacity="0.5"/><path d="M16,22 Q22,18 28,22" stroke={G} strokeWidth="1" fill="none"/><circle cx="19" cy="27" r="1" fill={G} opacity="0.5"/><circle cx="25" cy="27" r="1" fill={G} opacity="0.5"/></svg>,
    "Soul":<svg width={s} height={s} viewBox="0 0 44 44" fill="none"><path d="M22,40 L18,22 Q13,2 22,9 Q31,2 26,22Z" stroke={G} strokeWidth="1.2" fill={G} fillOpacity="0.08"/><path d="M17,17 Q22,12 27,17" stroke={G} strokeWidth="0.8" fill="none" opacity="0.4"/></svg>,
    "Folk":<svg width={s} height={s} viewBox="0 0 44 44" fill="none"><line x1="22" y1="4" x2="22" y2="42" stroke={G} strokeWidth="1.2"/><ellipse cx="22" cy="34" rx="10" ry="7" stroke={G} strokeWidth="1.2" fill={G} fillOpacity="0.08"/><line x1="12" y1="34" x2="32" y2="34" stroke={G} strokeWidth="0.6" opacity="0.3"/><path d="M27,4 L22,4" stroke={G} strokeWidth="1.5" strokeLinecap="round"/><circle cx="27" cy="4" r="1" fill={G}/><circle cx="25" cy="4" r="1" fill={G} opacity="0.5"/></svg>,
    "Afrobeats":<svg width={s} height={s} viewBox="0 0 44 44" fill="none"><path d="M23,11 Q27,10 31,12 Q34,14 33,18 L36,19 L34,21 Q35,25 32,30 Q27,35 24,36 L23,40 Q21,39 18,38 Q14,36 13,32 Q12,27 14,24 Q11,22 12,18 Q13,15 16,13 Q18,11 23,11Z" stroke={G} strokeWidth="1.3" fill={G} fillOpacity="0.12"/><path d="M17,7 L19,4 L21,5 L22,2 L23,5 L25,4 L27,7" stroke={GL} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" fill="none"/><line x1="18" y1="8" x2="26" y2="8" stroke={GL} strokeWidth="1" opacity="0.5"/></svg>,
    "Flamenco":<svg width={s} height={s} viewBox="0 0 44 44" fill="none"><path d="M31,7 Q13,2 9,15 Q5,29 20,24" stroke={G} strokeWidth="1.2" fill={G} fillOpacity="0.08"/><path d="M31,7 Q37,20 24,24" stroke={G} strokeWidth="1.2" fill={G} fillOpacity="0.06"/><path d="M20,24 Q15,29 17,34 Q19,40 24,40 Q30,40 29,34 Q27,29 24,24" stroke={G} strokeWidth="1.2" fill={G} fillOpacity="0.1"/></svg>,
    "Punk":<svg width={s} height={s} viewBox="0 0 44 44" fill="none"><path d="M9,24 Q9,7 22,7 Q35,7 35,24" stroke={G} strokeWidth="1.2" fill={G} fillOpacity="0.06"/><line x1="22" y1="7" x2="22" y2="1" stroke={G} strokeWidth="1.5" strokeLinecap="round"/><line x1="16" y1="8" x2="14" y2="2" stroke={G} strokeWidth="1.2" strokeLinecap="round"/><line x1="28" y1="8" x2="30" y2="2" stroke={G} strokeWidth="1.2" strokeLinecap="round"/><line x1="9" y1="24" x2="35" y2="24" stroke={G} strokeWidth="0.8" opacity="0.3"/><line x1="14" y1="29" x2="12" y2="42" stroke={G} strokeWidth="1.2" strokeLinecap="round"/><line x1="30" y1="29" x2="32" y2="42" stroke={G} strokeWidth="1.2" strokeLinecap="round"/><circle cx="12" cy="42" r="2" fill={G} opacity="0.3"/><circle cx="32" cy="42" r="2" fill={G} opacity="0.3"/></svg>,
    "Latin":<svg width={s} height={s} viewBox="0 0 44 44" fill="none"><ellipse cx="15" cy="22" rx="8" ry="15" stroke={G} strokeWidth="1.2" fill={G} fillOpacity="0.08" transform="rotate(-10,15,22)"/><ellipse cx="29" cy="22" rx="8" ry="15" stroke={G} strokeWidth="1.2" fill={G} fillOpacity="0.08" transform="rotate(10,29,22)"/><line x1="15" y1="7" x2="15" y2="2" stroke={G} strokeWidth="1.2" strokeLinecap="round"/><line x1="29" y1="7" x2="29" y2="2" stroke={G} strokeWidth="1.2" strokeLinecap="round"/><circle cx="15" cy="22" r="1.5" fill={G} opacity="0.4"/><circle cx="29" cy="22" r="1.5" fill={G} opacity="0.4"/></svg>,
    "Blues":<svg width={s} height={s} viewBox="0 0 44 44" fill="none"><rect x="13" y="9" width="18" height="26" rx="3" stroke={G} strokeWidth="1.2" fill={G} fillOpacity="0.06"/>{[17,20,23,26,29].map(x=><line key={x} x1={x} y1="14" x2={x} y2="30" stroke={G} strokeWidth="0.8" opacity="0.5"/>)}<rect x="15" y="17" width="3" height="4" fill={G} opacity="0.3"/><rect x="21" y="20" width="3" height="4" fill={G} opacity="0.3"/><rect x="27" y="17" width="3" height="4" fill={G} opacity="0.3"/></svg>,
  };
  return icons[name]||<span style={{color:G,fontSize:size*0.7}}>♫</span>;
}

function daysUntil(dateStr) {
  const parts = dateStr.split(" ");
  const months = {"Jan":0,"Fév":1,"Mar":2,"Avr":3,"Mai":4,"Juin":5,"Juil":6,"Août":7,"Sep":8,"Oct":9,"Nov":10,"Déc":11};
  const d = new Date(parseInt(parts[2]), months[parts[1]], parseInt(parts[0]));
  const diff = Math.ceil((d - new Date()) / (1000*60*60*24));
  return diff > 0 ? diff : 0;
}

function getTicketUrl(artist, venue, city) {
  const slug = artist.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9]+/g,"-").replace(/-+$/,"").replace(/^-+/,"");
  return `https://www.fnacspectacles.com/artist/${slug}/`;
}

function TicketButton({artist,venue,city,ticketUrl,size="normal"}) {
  const sm=size==="small";
  const url=ticketUrl||getTicketUrl(artist,venue,city);
  return (
    <a href={url} target="_blank" rel="noreferrer" onClick={e=>e.stopPropagation()} style={{display:"inline-flex",alignItems:"center",gap:sm?4:6,padding:sm?"4px 10px":"8px 18px",background:"linear-gradient(135deg,#8B6914,#C9A84C)",color:"#000",fontSize:sm?8:10,fontWeight:700,letterSpacing:sm?1:2,textTransform:"uppercase",textDecoration:"none",fontFamily:"'Montserrat',sans-serif",cursor:"pointer"}}>🎫 Réserver</a>
  );
}

function ShareButton({artist,date,venue,city,size="normal"}) {
  const sm=size==="small";
  const text=`${artist} — ${date} à ${venue}, ${city} 🎤 Découvre sur CROWDN`;
  const url="https://crowdn.fr";
  const handleShare=async(e)=>{
    e.stopPropagation();
    if(navigator.share){
      try{await navigator.share({title:`${artist} sur CROWDN`,text,url});}catch(e){}
    }else{
      try{await navigator.clipboard.writeText(`${text}\n${url}`);alert("Lien copié !");}catch(e){prompt("Copie ce lien :",`${text} ${url}`);}
    }
  };
  return (
    <button onClick={handleShare} style={{display:"inline-flex",alignItems:"center",gap:sm?4:6,padding:sm?"4px 10px":"8px 18px",background:"transparent",border:"1px solid rgba(255,255,255,0.15)",color:"#aaa",fontSize:sm?8:10,fontWeight:700,letterSpacing:sm?1:2,textTransform:"uppercase",fontFamily:"'Montserrat',sans-serif",cursor:"pointer"}}>↗ Partager</button>
  );
}

const ARTISTS = {
  "Indochine":{bio:"Groupe de rock new wave français fondé en 1981.",spotify:"https://open.spotify.com/artist/4YzZZvLCNm7FpGbQmEUxlR",instagram:"https://instagram.com/indochine_official",tiktok:"https://tiktok.com/@indochine_officiel"},
  "Imagine Dragons":{bio:"Groupe de rock américain, l'un des plus streamés au monde.",spotify:"https://open.spotify.com/artist/53XhwfbYqKCa1cC15pYq2q",instagram:"https://instagram.com/imaginedragons",tiktok:"https://tiktok.com/@imaginedragons"},
  "Linkin Park":{bio:"Légende du rock mondial. De retour avec une nouvelle formation.",spotify:"https://open.spotify.com/artist/6XyY86QOPPrYVGvF9ch6wz",instagram:"https://instagram.com/linkinpark",tiktok:"https://tiktok.com/@linkinpark"},
  "Iron Maiden":{bio:"Pilier du heavy metal mondial depuis 1975.",spotify:"https://open.spotify.com/artist/6mdiAmATAx73kdxrNrnlao",instagram:"https://instagram.com/ironmaiden",tiktok:"https://tiktok.com/@ironmaiden"},
  "Bob Dylan":{bio:"Prix Nobel de littérature et légende vivante du folk.",spotify:"https://open.spotify.com/artist/74ASZWbe4lXaubB36ztrGX",instagram:"https://instagram.com/bobdylan",tiktok:"https://tiktok.com/@bobdylan"},
  "Damso":{bio:"Rappeur belge, l'un des artistes francophones les plus écoutés.",spotify:"https://open.spotify.com/artist/5z6A4MFnRqFgDOFHSiGNzp",instagram:"https://instagram.com/damso",tiktok:"https://tiktok.com/@damso"},
  "The Weeknd":{bio:"Superstar canadienne de la R&B et pop.",spotify:"https://open.spotify.com/artist/1Xyo4u8uXC1ZmMpatF05PJ",instagram:"https://instagram.com/theweeknd",tiktok:"https://tiktok.com/@theweeknd"},
  "Bigflo & Oli":{bio:"Duo de rap toulousain, symbole du rap conscient français.",spotify:"https://open.spotify.com/artist/5oGiMRm6s68zCJd0dQnUQG",instagram:"https://instagram.com/bigfloetoli",tiktok:"https://tiktok.com/@bigfloetoli"},
  "Billie Eilish":{bio:"Phénomène de la pop mondiale. Voix unique, univers sombre.",spotify:"https://open.spotify.com/artist/6qqNVTkY8uBg9cP3Jd7DAH",instagram:"https://instagram.com/billieeilish",tiktok:"https://tiktok.com/@billieeilish"},
  "Ninho":{bio:"Rappeur français, l'un des artistes les plus streamés de France.",spotify:"https://open.spotify.com/artist/1vyhD5VmyZ7KMfW5gqLgo5",instagram:"https://instagram.com/ninho",tiktok:"https://tiktok.com/@ninho"},
  "DJ Snake":{bio:"DJ et producteur français mondialement reconnu.",spotify:"https://open.spotify.com/artist/540vIaP2JwjQb9dm3aArA4",instagram:"https://instagram.com/djsnake",tiktok:"https://tiktok.com/@djsnake"},
  "Slimane":{bio:"Chanteur franco-algérien révélé par The Voice.",spotify:"https://open.spotify.com/artist/0EmeFodog0BfCgMzAIvKQp",instagram:"https://instagram.com/slimane",tiktok:"https://tiktok.com/@slimane"},
};

const UPCOMING_DEFAULT = [
  {id:1,artist:"Indochine",date:"17 Juin 2025",city:"Paris",venue:"Accor Arena",category:"Arena Class",genre:"Rock",img:"🎸"},
  {id:2,artist:"Imagine Dragons",date:"5 Juil 2025",city:"Paris",venue:"Stade de France",category:"Stadium Class",genre:"Rock",img:"🌩️"},
  {id:3,artist:"Linkin Park",date:"11 Juil 2025",city:"Paris",venue:"Stade de France",category:"Stadium Class",genre:"Rock",img:"🤘"},
  {id:4,artist:"Iron Maiden",date:"19 Juil 2025",city:"Paris",venue:"Paris La Défense Arena",category:"Arena Class",genre:"Metal",img:"💀"},
  {id:5,artist:"Bob Dylan",date:"30 Oct 2025",city:"Paris",venue:"Palais des Congrès",category:"Olympia Class",genre:"Folk",img:"🎵"},
  {id:6,artist:"Damso",date:"28 Mai 2026",city:"Paris",venue:"Paris La Défense Arena",category:"Arena Class",genre:"Hip-Hop",img:"👑"},
  {id:7,artist:"The Weeknd",date:"8 Juil 2026",city:"Paris",venue:"Stade de France",category:"Stadium Class",genre:"R&B",img:"🌙"},
  {id:8,artist:"Bigflo & Oli",date:"15 Oct 2026",city:"Paris",venue:"Accor Arena",category:"Arena Class",genre:"Hip-Hop",img:"🎤"},
].map(c=>({...c,daysLeft:daysUntil(c.date)}));

const PAST_DEFAULT = [
  {id:10,artist:"Billie Eilish",date:"10 Juin 2025",city:"Paris",venue:"Accor Arena",category:"Arena Class",genre:"Pop",img:"🖤",juryQuote:"",juryName:"",juryAvatar:"",juryHandle:"",tiktokUrl:"",photos:[]},
  {id:11,artist:"Ninho",date:"2 Mai 2025",city:"Paris",venue:"Stade de France",category:"Stadium Class",genre:"Hip-Hop",img:"🏆",juryQuote:"",juryName:"",juryAvatar:"",juryHandle:"",tiktokUrl:"",photos:[]},
  {id:12,artist:"DJ Snake",date:"10 Mai 2025",city:"Paris",venue:"Stade de France",category:"Stadium Class",genre:"Électro",img:"🐍",juryQuote:"",juryName:"",juryAvatar:"",juryHandle:"",tiktokUrl:"",photos:[]},
  {id:13,artist:"Slimane",date:"8 Avr 2025",city:"Paris",venue:"Accor Arena",category:"Arena Class",genre:"Pop",img:"🎶",juryQuote:"",juryName:"",juryAvatar:"",juryHandle:"",tiktokUrl:"",photos:[]},
];

const JURY_TYPES = [
  {icon:"📰",type:"Journaliste",tag:"Officiel",desc:"Critique musical ou journaliste culturel avec expérience live reconnue.",color:"#E8C96A"},
  {icon:"🎶",type:"Acteur de la musique",tag:"Officiel",desc:"Professionnel de l'industrie : manager, tourneur, directeur artistique, booker.",color:"#E8C96A"},
  {icon:"🎤",type:"Fan de musique live",tag:"Communauté",desc:"Fan passionné du live. Tu déclares tes 5 genres préférés — CROWDN détermine si tu es Fan ou Non-fan selon chaque concert assigné.",color:"#C9A84C"},
];

const CRITERIA = [
  {icon:"🎤",name:"Performance scénique",desc:"Voix, énergie, présence, technique et maîtrise de l'espace."},
  {icon:"💡",name:"Scénographie",desc:"Décors, lumières, vidéos, costumes — l'univers visuel du show."},
  {icon:"🔥",name:"Interaction foule",desc:"Comment l'artiste crée la connexion et fait vivre le public."},
  {icon:"🌊",name:"Atmosphère",desc:"L'émotion globale — tension, euphorie, magie du moment."},
  {icon:"🎬",name:"Direction artistique",desc:"La cohérence et l'originalité de la vision du show."},
  {icon:"🎵",name:"Qualité de la setlist",desc:"Le choix et l'ordre des titres — la narration du concert."},
];

function Crown({size=40}) {
  return (
    <svg width={size} height={size*0.72} viewBox="0 0 100 72" fill="none" style={{animation:"float 4s ease-in-out infinite"}}>
      <defs><radialGradient id="cg" cx="50%" cy="50%" r="60%"><stop offset="0%" stopColor="#E8C96A"/><stop offset="60%" stopColor="#C9A84C"/><stop offset="100%" stopColor="#8B6914"/></radialGradient></defs>
      {[[50,5],[38,18],[26,30],[15,42],[8,55],[92,55],[85,42],[74,30],[62,18],[20,62],[35,62],[50,62],[65,62],[80,62],[50,20],[30,35],[70,35]].map(([x,y],i)=>(
        <circle key={i} cx={x} cy={y} r={2.5} fill="url(#cg)" style={{animation:`starPop 0.8s ${i*0.05}s ease both`,opacity:0}}/>
      ))}
      <path d="M8 55 L20 30 L35 48 L50 8 L65 48 L80 30 L92 55 L80 62 L20 62 Z" stroke="url(#cg)" strokeWidth="1.5" fill="none" opacity="0.35"/>
    </svg>
  );
}

function ArtistImg({name,fallback,size=44,images={}}) {
  const url=images[name];
  if(url) return <img src={url} alt={name} style={{width:size,height:size,objectFit:"cover",borderRadius:size>60?"0":"50%",border:"1px solid rgba(201,168,76,0.2)"}}/>;
  return <span style={{fontSize:size*0.6,display:"flex",alignItems:"center",justifyContent:"center",width:size,height:size}}>{fallback||"🎵"}</span>;
}

function CrownBadge({size=16}) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="11" fill="url(#crownGrad)" />
    <path d="M6 16L8 9L12 13L16 9L18 16Z" fill="#000" opacity="0.8"/>
    <path d="M6.5 16.5L8.5 9.5L12 13L15.5 9.5L17.5 16.5" stroke="#000" strokeWidth="0.5" fill="none"/>
    <rect x="7" y="16" width="10" height="1.5" rx="0.5" fill="#000" opacity="0.6"/>
    <defs><linearGradient id="crownGrad" x1="0" y1="0" x2="24" y2="24"><stop offset="0%" stopColor="#8B6914"/><stop offset="50%" stopColor="#C9A84C"/><stop offset="100%" stopColor="#E8C96A"/></linearGradient></defs>
  </svg>;
}

function RoleBadge({role,size="normal"}) {
  const sm=size==="small";
  const config={
    journalist:{label:"Journaliste",bg:"rgba(76,200,100,0.1)",border:"rgba(76,200,100,0.3)",color:"#4CC864"},
    music_pro:{label:"Pro musique",bg:"rgba(76,200,100,0.1)",border:"rgba(76,200,100,0.3)",color:"#4CC864"},
    jury:{label:"Juré",bg:"rgba(201,168,76,0.1)",border:"rgba(201,168,76,0.3)",color:GOLD},
    artist:{label:"Artiste",bg:"rgba(201,168,76,0.1)",border:"rgba(201,168,76,0.3)",color:GOLD},
    admin:{label:"Admin",bg:"rgba(255,80,80,0.1)",border:"rgba(255,80,80,0.3)",color:"#FF5050"},
    user:{label:"Membre",bg:"rgba(255,255,255,0.05)",border:"rgba(255,255,255,0.1)",color:"#888"}
  };
  const c=config[role]||config.user;
  const icon=role==="jury"?"⭐":role==="journalist"||role==="music_pro"?"🟢":role==="artist"?"👑":role==="admin"?"🔑":"";
  return <span style={{display:"inline-flex",alignItems:"center",gap:sm?3:5,padding:sm?"2px 6px":"4px 10px",background:c.bg,border:`1px solid ${c.border}`,fontSize:sm?7:9,fontWeight:700,letterSpacing:sm?1:1.5,textTransform:"uppercase",color:c.color}}>{icon} {c.label}</span>;
}

function useSocial(user) {
  const [follows,setFollows]=useState([]);
  const [attending,setAttending]=useState([]);
  const [certified,setCertified]=useState([]);

  useEffect(()=>{
    async function load(){
      const{data:cert}=await supabase.from("certified_artists").select("artist_name");
      if(cert)setCertified(cert.map(c=>c.artist_name));
      if(!user)return;
      const{data:f}=await supabase.from("user_follows").select("artist_name").eq("user_id",user.id);
      if(f)setFollows(f.map(x=>x.artist_name));
      const{data:a}=await supabase.from("user_attending").select("concert_id").eq("user_id",user.id);
      if(a)setAttending(a.map(x=>x.concert_id));
    }
    load();
  },[user]);

  const toggleFollow=async(artistName)=>{
    if(!user)return;
    if(follows.includes(artistName)){
      await supabase.from("user_follows").delete().eq("user_id",user.id).eq("artist_name",artistName);
      setFollows(f=>f.filter(n=>n!==artistName));
    }else{
      await supabase.from("user_follows").insert({user_id:user.id,artist_name:artistName});
      setFollows(f=>[...f,artistName]);
    }
  };

  const toggleAttending=async(concertId)=>{
    if(!user)return;
    if(attending.includes(concertId)){
      await supabase.from("user_attending").delete().eq("user_id",user.id).eq("concert_id",concertId);
      setAttending(a=>a.filter(id=>id!==concertId));
    }else{
      await supabase.from("user_attending").insert({user_id:user.id,concert_id:concertId});
      setAttending(a=>[...a,concertId]);
    }
  };

  const isCertified=(name)=>certified.includes(name);
  const isFollowing=(name)=>follows.includes(name);
  const isAttending=(id)=>attending.includes(id);

  return {follows,attending,certified,toggleFollow,toggleAttending,isCertified,isFollowing,isAttending};
}

function GenreStrip({onGenreClick}) {
  const doubled = [...GENRES,...GENRES];
  return (
    <div style={{padding:"40px 0",borderTop:"1px solid rgba(201,168,76,0.08)",borderBottom:"1px solid rgba(201,168,76,0.08)"}}>
      <div style={{textAlign:"center",marginBottom:24}}>
        <p className="sl" style={{marginBottom:8}}>Tous les genres</p>
        <p className="fd" style={{fontSize:"clamp(18px,4vw,26px)",fontWeight:400,letterSpacing:2,color:"rgba(245,240,232,0.8)"}}>
          Hip-Hop, Rock, Jazz, Électro et bien d'autres —{" "}
          <span style={{fontStyle:"italic",color:GOLD}}>tous les concerts ont leur place.</span>
        </p>
      </div>
      <div className="genre-strip">
        <div className="genre-track">
          {doubled.map((g,i)=>(
            <button key={i} className="genre-pill" onClick={()=>onGenreClick&&onGenreClick(g.name)}>
              <GenreIcon name={g.name} size={20}/>
              <span style={{fontSize:11,fontWeight:600,letterSpacing:1.5,textTransform:"uppercase",color:"#ccc"}}>{g.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function PastCard({c,idx,onClick,artistImages={}}) {
  return (
    <div className="pc" style={{animation:`fadeUp 0.5s ${idx*0.12}s ease both`,opacity:0}} onClick={onClick}>
      <div style={{display:"flex",alignItems:"stretch"}}>
        <div style={{width:4,background:`linear-gradient(to bottom,#8B6914,transparent)`,flexShrink:0}}/>
        <div style={{flex:1,padding:"18px 20px"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:14}}>
            <div style={{display:"flex",alignItems:"center",gap:12}}>
              <ArtistImg name={c.artist} fallback={c.img} size={36} images={artistImages}/>
              <div>
                <h3 style={{fontSize:15,fontWeight:700,letterSpacing:0.5}}>{c.artist}</h3>
                <p style={{fontSize:11,color:"#888",marginTop:2}}>{c.date} · {c.city}</p>
              </div>
            </div>
            <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:4}}>
              <span className="tag" style={{fontSize:8,padding:"2px 8px"}}>{c.category.split(" ")[0]}</span>
              <span style={{fontSize:10,color:"#666",display:"flex",alignItems:"center",gap:4}}><GenreIcon name={c.genre} size={14}/>{c.genre}</span>
            </div>
          </div>
          {c.juryQuote&&(
          <div className="qb">
            <p className="fd" style={{fontSize:15,fontStyle:"italic",color:"rgba(245,240,232,0.85)",lineHeight:1.6,marginBottom:12}}>« {c.juryQuote} »</p>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
              <div style={{display:"flex",alignItems:"center",gap:10}}>
                <div className="ja">{c.juryAvatar}</div>
                <div>
                  <p style={{fontSize:11,fontWeight:700,color:GOLD}}>{c.juryName}</p>
                  <p style={{fontSize:10,color:"#666"}}>Juré CROWDN</p>
                </div>
              </div>
              {c.tiktokUrl&&<a href={c.tiktokUrl} className="tb" onClick={e=>e.stopPropagation()}><span style={{fontSize:14}}>▶</span>TikTok</a>}
            </div>
          </div>
          )}
        </div>
      </div>
    </div>
  );
}

function HomePage({nav,upcoming,past,artistImages={},social,user}) {
  const U = upcoming||UPCOMING_DEFAULT;
  const P = past||PAST_DEFAULT;
  const follows=social?.follows||[];
  const followedConcerts=follows.length>0?U.filter(c=>follows.includes(c.artist)):[];

  // Algorithme : genres des artistes suivis
  const followedGenres=[];
  followedConcerts.forEach(c=>{if(c.genre&&!followedGenres.includes(c.genre))followedGenres.push(c.genre);});

  // Artistes similaires (même genres, pas suivis)
  const similarConcerts=U.filter(c=>followedGenres.includes(c.genre)&&!follows.includes(c.artist));
  const similarUnique=[];const seenSimilar=new Set();
  similarConcerts.forEach(c=>{if(!seenSimilar.has(c.artist)){seenSimilar.add(c.artist);similarUnique.push(c);}});

  // Découverte (autres genres, pas suivis)
  const discoverConcerts=U.filter(c=>!followedGenres.includes(c.genre)&&!follows.includes(c.artist));
  const discoverUnique=[];const seenDiscover=new Set();
  discoverConcerts.forEach(c=>{if(!seenDiscover.has(c.artist)){seenDiscover.add(c.artist);discoverUnique.push(c);}});
  return (
    <div style={{paddingBottom:80}}>

      {/* ═══ LOGGED IN → Feed personnalisé ═══ */}
      {user?(
        <div style={{paddingTop:80}}>
          <div style={{padding:"20px 32px 0",maxWidth:1200,margin:"0 auto"}}>
            {/* Header feed */}
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:24}}>
              <div>
                <p style={{fontSize:9,color:GOLD,letterSpacing:4,textTransform:"uppercase",fontWeight:700,marginBottom:4}}>Mon feed</p>
                <h1 className="fd" style={{fontSize:"clamp(22px,4vw,32px)",fontWeight:400,letterSpacing:2}}>Bienvenue{user?.email?`, ${user.email.split("@")[0]}`:""}</h1>
              </div>
              <button onClick={()=>nav("profile")} style={{background:"none",border:"none",cursor:"pointer"}}>
                <div style={{width:36,height:36,borderRadius:"50%",background:"rgba(201,168,76,0.15)",border:"1px solid rgba(201,168,76,0.3)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,color:GOLD,fontWeight:700}}>{(user?.email?.split("@")[0]||"U").slice(0,2).toUpperCase()}</div>
              </button>
            </div>

            {/* Stories artistes suivis */}
            {follows.length>0&&(
              <div style={{marginBottom:28}}>
                <div style={{display:"flex",gap:14,overflowX:"auto",paddingBottom:8,scrollbarWidth:"none"}}>
                  {follows.map(name=>(
                    <div key={name} onClick={()=>nav("artist",{artistName:name})} style={{flexShrink:0,textAlign:"center",cursor:"pointer"}}>
                      <div style={{width:60,height:60,borderRadius:"50%",padding:2,background:"linear-gradient(135deg,#8B6914,#C9A84C,#E8C96A)",marginBottom:4}}>
                        <div style={{width:"100%",height:"100%",borderRadius:"50%",overflow:"hidden",border:"2px solid #0A0A0A"}}><ArtistImg name={name} size={56} images={artistImages}/></div>
                      </div>
                      <p style={{fontSize:9,fontWeight:600,color:"#aaa",width:64,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{name.split(" ")[0]}</p>
                    </div>
                  ))}
                  <div onClick={()=>nav("upcoming")} style={{flexShrink:0,textAlign:"center",cursor:"pointer"}}>
                    <div style={{width:60,height:60,borderRadius:"50%",border:"2px dashed rgba(201,168,76,0.3)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,background:"rgba(201,168,76,0.03)",marginBottom:4,color:GOLD}}>+</div>
                    <p style={{fontSize:9,color:"#555",width:64}}>Découvrir</p>
                  </div>
                </div>
              </div>
            )}

            {/* ─── SECTION 1 : Concerts des artistes suivis ─── */}
            {followedConcerts.length>0&&(
              <div style={{marginBottom:32}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
                  <div>
                    <p style={{fontSize:9,color:GOLD,letterSpacing:3,textTransform:"uppercase",fontWeight:700,marginBottom:4}}>Tes artistes</p>
                    <p style={{fontSize:13,fontWeight:600}}>Prochains concerts</p>
                  </div>
                  <button className="bo" style={{fontSize:8,padding:"6px 12px"}} onClick={()=>nav("upcoming")}>Voir tout</button>
                </div>
                <div style={{display:"flex",flexDirection:"column",gap:8}}>
                  {followedConcerts.slice(0,6).map(c=>(
                    <div key={c.id} style={{display:"flex",alignItems:"center",gap:14,padding:"12px 16px",background:BG2,border:"1px solid rgba(201,168,76,0.08)",cursor:"pointer",transition:"all 0.2s"}} onClick={()=>nav("upcoming-detail",c)}
                      onMouseOver={e=>e.currentTarget.style.borderColor="rgba(201,168,76,0.3)"}
                      onMouseOut={e=>e.currentTarget.style.borderColor="rgba(201,168,76,0.08)"}>
                      <ArtistImg name={c.artist} fallback={c.img} size={44} images={artistImages}/>
                      <div style={{flex:1}}>
                        <div style={{display:"flex",alignItems:"center",gap:6}}><p style={{fontWeight:700,fontSize:13}}>{c.artist}</p>{social.isCertified&&social.isCertified(c.artist)&&<CrownBadge size={14}/>}</div>
                        <p style={{fontSize:11,color:"#888",marginTop:2}}>{c.date} · {c.venue} · {c.city}</p>
                      </div>
                      <div style={{display:"flex",alignItems:"center",gap:8}}>
                        <TicketButton artist={c.artist} venue={c.venue} city={c.city} ticketUrl={c.ticket_url} size="small"/>
                        <div style={{textAlign:"right"}}><span className="tag" style={{fontSize:7}}>{c.category}</span><div style={{fontSize:10,color:GOLD,marginTop:3}}>{c.daysLeft}j</div></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ─── SECTION 2 : Artistes similaires (même genres, pas suivis) ─── */}
            {similarUnique.length>0&&(
              <div style={{marginBottom:32}}>
                <div style={{marginBottom:14}}>
                  <p style={{fontSize:9,color:GOLD,letterSpacing:3,textTransform:"uppercase",fontWeight:700,marginBottom:4}}>Tu pourrais aimer</p>
                  <p style={{fontSize:13,fontWeight:600}}>Artistes {followedGenres.slice(0,2).join(" · ")} que tu ne suis pas</p>
                </div>
                <div className="concerts-grid" style={{display:"grid",gap:12}}>
                  {similarUnique.slice(0,4).map((c,i)=>(
                    <div key={c.id} className="cc" style={{animation:`fadeUp 0.4s ${i*0.08}s ease both`,opacity:0}} onClick={()=>nav("upcoming-detail",c)}>
                      <div style={{height:100,background:"linear-gradient(135deg,rgba(201,168,76,0.07),rgba(201,168,76,0.02))",display:"flex",alignItems:"center",justifyContent:"center",position:"relative",overflow:"hidden"}}>
                        <ArtistImg name={c.artist} fallback={c.img} size={70} images={artistImages}/>
                        <div style={{position:"absolute",top:8,right:8}}><GenreIcon name={c.genre} size={14}/></div>
                      </div>
                      <div style={{padding:"12px 16px"}}>
                        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                          <div><h3 style={{fontSize:14,fontWeight:700,letterSpacing:1,marginBottom:2}}>{c.artist}</h3><p style={{fontSize:10,color:"#888"}}>{c.date} · {c.city}</p></div>
                          <TicketButton artist={c.artist} venue={c.venue} city={c.city} ticketUrl={c.ticket_url} size="small"/>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ─── SECTION 3 : Mis en avant (artistes émergents, Olympia Class) ─── */}
            {U.length>0&&(
              <div style={{marginBottom:32}}>
                <div style={{marginBottom:14}}>
                  <p style={{fontSize:9,color:GOLD,letterSpacing:3,textTransform:"uppercase",fontWeight:700,marginBottom:4}}>Mis en avant</p>
                  <p style={{fontSize:13,fontWeight:600}}>Artistes à découvrir</p>
                  <p style={{fontSize:10,color:"#666",marginTop:2}}>CROWDN met en lumière les talents émergents</p>
                </div>
                <div style={{display:"flex",gap:12,overflowX:"auto",paddingBottom:8,scrollbarWidth:"none"}}>
                  {U.filter(c=>c.category==="Olympia Class"&&!follows.includes(c.artist)).reduce((acc,c)=>{if(!acc.find(x=>x.artist===c.artist))acc.push(c);return acc;},[]).slice(0,6).map(c=>(
                    <div key={c.id} style={{flexShrink:0,width:200,background:BG2,border:"1px solid rgba(201,168,76,0.1)",cursor:"pointer",transition:"all 0.2s"}} onClick={()=>nav("upcoming-detail",c)}
                      onMouseOver={e=>e.currentTarget.style.borderColor="rgba(201,168,76,0.35)"}
                      onMouseOut={e=>e.currentTarget.style.borderColor="rgba(201,168,76,0.1)"}>
                      <div style={{height:80,background:"linear-gradient(135deg,rgba(201,168,76,0.08),rgba(201,168,76,0.02))",display:"flex",alignItems:"center",justifyContent:"center",overflow:"hidden"}}>
                        <ArtistImg name={c.artist} fallback={c.img} size={60} images={artistImages}/>
                      </div>
                      <div style={{padding:"10px 14px"}}>
                        <h4 style={{fontSize:13,fontWeight:700,marginBottom:2}}>{c.artist}</h4>
                        <p style={{fontSize:10,color:"#888"}}>{c.date}</p>
                        <p style={{fontSize:9,color:"#666"}}>{c.venue} · {c.city}</p>
                        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:8}}>
                          <span className="tag" style={{fontSize:7}}>{c.genre}</span>
                          <TicketButton artist={c.artist} venue={c.venue} city={c.city} ticketUrl={c.ticket_url} size="small"/>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Pas encore de follows → onboarding */}
            {follows.length===0&&(
              <div style={{textAlign:"center",padding:"40px 20px",background:"rgba(201,168,76,0.03)",border:"1px solid rgba(201,168,76,0.1)",marginBottom:32}}>
                <Crown size={36}/>
                <h3 className="fd" style={{fontSize:20,fontWeight:400,letterSpacing:2,marginTop:12,marginBottom:8}}>Commence par suivre des artistes</h3>
                <p style={{fontSize:12,color:"#888",marginBottom:16}}>Ton feed se personnalisera en fonction des artistes que tu suis</p>
                <button className="bp" style={{fontSize:10,padding:"10px 24px",letterSpacing:2}} onClick={()=>nav("upcoming")}>Explorer les concerts</button>
              </div>
            )}

            <div style={{textAlign:"center",marginTop:8,marginBottom:24}}>
              <button className="bo" style={{fontSize:9,padding:"10px 20px"}} onClick={()=>nav("upcoming")}>Voir tous les concerts →</button>
            </div>
          </div>
        </div>
      ):(
      <>
      {/* ═══ NOT LOGGED IN → Landing page ═══ */}
      <div className="hero-grid" style={{display:"grid",background:`radial-gradient(ellipse at 40% 55%,rgba(201,168,76,0.07) 0%,transparent 60%),#0A0A0A`,paddingTop:64,overflow:"hidden",position:"relative"}}>
        <div style={{position:"absolute",inset:0,backgroundImage:"repeating-linear-gradient(0deg,transparent,transparent 60px,rgba(201,168,76,0.015) 60px,rgba(201,168,76,0.015) 61px),repeating-linear-gradient(90deg,transparent,transparent 60px,rgba(201,168,76,0.015) 60px,rgba(201,168,76,0.015) 61px)",pointerEvents:"none"}}/>

        {/* Left — texte */}
        <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"80px 40px 80px 60px",position:"relative",zIndex:1}}>
          <div style={{textAlign:"center",maxWidth:480}}>
            <div style={{marginBottom:24}}><Crown size={64}/></div>
            <div style={{marginBottom:10,animation:"fadeUp 0.8s 0.3s ease both",opacity:0}}>
              <span style={{fontWeight:800,fontSize:"clamp(34px,5vw,56px)",letterSpacing:"10px",background:"linear-gradient(135deg,#8B6914,#C9A84C,#E8C96A,#C9A84C)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>CROWD</span>
              <span className="fd" style={{fontSize:"clamp(34px,5vw,56px)",fontWeight:700,color:GOLD}}>N</span>
            </div>
            <p style={{fontSize:10,fontWeight:400,letterSpacing:"5px",color:"#888",textTransform:"uppercase",marginBottom:20,animation:"fadeUp 0.8s 0.5s ease both",opacity:0}}>Couronné par la Foule</p>
            <div className="gd" style={{width:100,margin:"0 auto 28px"}}/>
            <div style={{display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap",animation:"fadeUp 0.8s 0.7s ease both",opacity:0}}>
              <button className="bp" onClick={()=>nav("login")}>Rejoindre CROWDN</button>
              <button className="bo" onClick={()=>nav("upcoming")}>Concerts à venir</button>
            </div>
            <div style={{display:"flex",gap:36,justifyContent:"center",marginTop:48,animation:"fadeUp 0.8s 0.9s ease both",opacity:0}}>
              {[[String(U.length),"Concerts à venir"]].map(([n,l])=>(
                <div key={l} style={{textAlign:"center"}}>
                  <div className="fd gt" style={{fontSize:28,fontWeight:700}}>{n}</div>
                  <div style={{fontSize:9,letterSpacing:2,color:"#666",textTransform:"uppercase",marginTop:4}}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right — top concerts (desktop only) */}
        <div className="hero-right" style={{borderLeft:"1px solid rgba(201,168,76,0.08)",background:"rgba(255,255,255,0.01)",padding:"80px 40px",display:"flex",flexDirection:"column",justifyContent:"center",overflowY:"auto"}}>
          <p className="sl" style={{marginBottom:8}}>À venir</p>
          <h2 className="fd" style={{fontSize:28,fontWeight:400,letterSpacing:2,marginBottom:28}}>Prochains concerts</h2>
          <div style={{display:"flex",flexDirection:"column",gap:12}}>
            {U.slice(0,5).map((c,i)=>(
              <div key={c.id} style={{display:"flex",alignItems:"center",gap:14,padding:"14px 16px",background:"rgba(201,168,76,0.04)",border:"1px solid rgba(201,168,76,0.1)",cursor:"pointer",transition:"all 0.2s",animation:`fadeUp 0.5s ${i*0.1}s ease both`,opacity:0}} onClick={()=>nav("upcoming-detail",c)}
                onMouseOver={e=>e.currentTarget.style.borderColor="rgba(201,168,76,0.35)"}
                onMouseOut={e=>e.currentTarget.style.borderColor="rgba(201,168,76,0.1)"}>
                <ArtistImg name={c.artist} fallback={c.img} size={36} images={artistImages}/>
                <div style={{flex:1,minWidth:0}}>
                  <p style={{fontWeight:700,fontSize:14,marginBottom:2}}>{c.artist}</p>
                  <p style={{fontSize:11,color:"#888",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{c.date} · {c.venue}</p>
                </div>
                <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:4,flexShrink:0}}>
                  <span className="ub" style={{fontSize:8}}><span className="ld"/>{c.daysLeft}j</span>
                  <span className="tag" style={{fontSize:7,padding:"2px 6px"}}>{c.category.split(" ")[0]}</span>
                </div>
              </div>
            ))}
          </div>
          <button className="bo" style={{marginTop:20,fontSize:9,padding:"10px 20px",width:"100%"}} onClick={()=>nav("upcoming")}>Voir tous les concerts →</button>
        </div>
      </div>

      <GenreStrip onGenreClick={g=>nav("upcoming",{filterGenre:g})}/>

      {/* Mon actualité — artistes suivis */}
      {user&&follows.length>0&&(
        <div style={{padding:"40px 32px 0",maxWidth:1400,margin:"0 auto"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
            <div><p className="sl" style={{marginBottom:6}}>Mon actualité</p><h2 className="fd" style={{fontSize:"clamp(18px,3vw,26px)",fontWeight:400,letterSpacing:2}}>Artistes que tu suis</h2></div>
            <button className="bo" style={{fontSize:9,padding:"8px 16px"}} onClick={()=>nav("profile")}>Mon profil</button>
          </div>
          <div style={{display:"flex",gap:14,overflowX:"auto",paddingBottom:12,scrollbarWidth:"none"}}>
            {follows.map(name=>(
              <div key={name} onClick={()=>nav("artist",{artistName:name})} style={{flexShrink:0,textAlign:"center",cursor:"pointer"}}>
                <div style={{width:56,height:56,borderRadius:"50%",padding:2,background:"linear-gradient(135deg,#8B6914,#C9A84C,#E8C96A)",marginBottom:4}}>
                  <div style={{width:"100%",height:"100%",borderRadius:"50%",overflow:"hidden",border:"2px solid #0A0A0A"}}><ArtistImg name={name} size={52} images={artistImages}/></div>
                </div>
                <p style={{fontSize:9,fontWeight:600,color:"#aaa",width:60,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{name.split(" ")[0]}</p>
              </div>
            ))}
          </div>
          {followedConcerts.length>0&&(
            <div style={{marginTop:16}}>
              <p style={{fontSize:9,color:GOLD,letterSpacing:3,textTransform:"uppercase",fontWeight:700,marginBottom:10}}>Leurs prochains concerts</p>
              <div style={{display:"flex",flexDirection:"column",gap:6}}>
                {followedConcerts.slice(0,5).map(c=>(
                  <div key={c.id} style={{display:"flex",alignItems:"center",gap:12,padding:"10px 14px",background:BG2,border:"1px solid rgba(201,168,76,0.08)",cursor:"pointer"}} onClick={()=>nav("upcoming-detail",c)}>
                    <ArtistImg name={c.artist} fallback={c.img} size={32} images={artistImages}/>
                    <div style={{flex:1}}><span style={{fontWeight:600,fontSize:12}}>{c.artist}</span><span style={{fontSize:10,color:"#888",marginLeft:8}}>{c.date} · {c.venue}</span></div>
                    <span className="tag" style={{fontSize:7}}>{c.category}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          <div style={{height:1,background:"linear-gradient(to right,transparent,rgba(201,168,76,0.1),transparent)",marginTop:24}}/>
        </div>
      )}

      {/* Concerts grid — responsive */}
      <div style={{padding:"60px 32px 0",maxWidth:1400,margin:"0 auto"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:28}}>
          <div><p className="sl" style={{marginBottom:8}}>Prochainement</p><h2 className="fd" style={{fontSize:"clamp(22px,4vw,34px)",fontWeight:400,letterSpacing:2}}>Concerts à venir</h2></div>
          <button className="bo" style={{fontSize:9,padding:"8px 16px"}} onClick={()=>nav("upcoming")}>Voir tout</button>
        </div>
        <div className="concerts-grid" style={{display:"grid",gap:14}}>
          {U.slice(0,4).map((c,i)=>(
            <div key={c.id} className="cc" style={{animation:`fadeUp 0.5s ${i*0.1}s ease both`,opacity:0}} onClick={()=>nav("upcoming-detail",c)}>
              <div style={{height:100,background:"linear-gradient(135deg,rgba(201,168,76,0.07),rgba(201,168,76,0.02))",display:"flex",alignItems:"center",justifyContent:"center",position:"relative",overflow:"hidden"}}>
                <ArtistImg name={c.artist} fallback={c.img} size={80} images={artistImages}/>
                <div style={{position:"absolute",top:10,left:12}}><span className="ub"><span className="ld"/>{c.daysLeft}j</span></div>
                <div style={{position:"absolute",top:10,right:12}}><GenreIcon name={c.genre} size={16}/></div>
              </div>
              <div style={{padding:"14px 18px 18px"}}>
                <h3 style={{fontSize:15,fontWeight:700,letterSpacing:1,marginBottom:3}}>{c.artist}</h3>
                <p style={{fontSize:11,color:"#888",marginBottom:10}}>{c.genre}</p>
                <div className="gd" style={{marginBottom:10}}/>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <div><p style={{fontSize:11,color:"#aaa"}}>{c.date}</p><p style={{fontSize:11,color:"#777"}}>{c.city}</p></div>
                  <span className="tag" style={{fontSize:8,padding:"2px 8px"}}>{c.category.split(" ")[0]}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Previous concerts */}
      <div style={{padding:"50px 32px 80px",maxWidth:1400,margin:"0 auto"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:28}}>
          <div><p className="sl" style={{marginBottom:8}}>Archives</p><h2 className="fd" style={{fontSize:"clamp(22px,4vw,34px)",fontWeight:400,letterSpacing:2}}>Previous Concerts</h2></div>
          <button className="bo" style={{fontSize:9,padding:"8px 16px"}} onClick={()=>nav("past")}>Voir tout</button>
        </div>
        {/* Desktop: 2 colonnes / Mobile: 1 colonne */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:14}}>
          {P.slice(0,2).map((c,i)=><PastCard key={c.id} c={c} idx={i} onClick={()=>nav("past-detail",c)} artistImages={artistImages}/>)}
        </div>
      </div>
      </>
      )}
    </div>
  );
}

function UpcomingPage({nav,initialGenre,concerts,artistImages={}}) {
  const [activeGenre,setActiveGenre]=useState(initialGenre||"Tous");
  const [activeCat,setActiveCat]=useState("Toutes");
  const [activeCity,setActiveCity]=useState("Toutes");
  const U=concerts||UPCOMING_DEFAULT;
  const allGenres=["Tous",...Array.from(new Set(U.map(c=>c.genre)))];
  const categories=["Toutes","Olympia Class","Zenith Class","Arena Class","Stadium Class"];
  const allCities=["Toutes",...Array.from(new Set(U.map(c=>c.city))).sort()];
  const filtered=U.filter(c=>(activeGenre==="Tous"||c.genre===activeGenre)&&(activeCat==="Toutes"||c.category===activeCat)&&(activeCity==="Toutes"||c.city===activeCity));
  return (
    <div style={{padding:"80px 0 80px",maxWidth:1400,margin:"0 auto"}}>
      <div style={{padding:"20px 32px 32px"}}>
        <p className="sl" style={{marginBottom:8}}>Programme</p>
        <h1 className="fd" style={{fontSize:"clamp(28px,5vw,44px)",fontWeight:400,letterSpacing:2}}>Concerts à venir</h1>
        <p style={{fontSize:12,color:"#888",marginTop:8}}>{filtered.length} concert{filtered.length>1?"s":""}{activeGenre!=="Tous"?` · ${activeGenre}`:""}{activeCat!=="Toutes"?` · ${activeCat}`:""}{activeCity!=="Toutes"?` · ${activeCity}`:""}</p>
      </div>
      <div className="desktop-two-col" style={{display:"grid",gap:0,alignItems:"start"}}>
        <div className="desktop-sidebar" style={{padding:"0 24px 0 32px",position:"sticky",top:80}}>
          <p className="sl" style={{marginBottom:12,fontSize:9}}>Genres</p>
          <div style={{display:"flex",flexDirection:"column",gap:4,marginBottom:20}}>
            {allGenres.map(g=>(
              <button key={g} onClick={()=>setActiveGenre(g)}
                style={{display:"flex",alignItems:"center",gap:10,padding:"8px 14px",background:activeGenre===g?"rgba(201,168,76,0.1)":"transparent",border:`1px solid ${activeGenre===g?"rgba(201,168,76,0.4)":"rgba(255,255,255,0.06)"}`,color:activeGenre===g?GOLD:"#888",cursor:"pointer",fontFamily:"'Montserrat',sans-serif",fontSize:10,fontWeight:700,letterSpacing:1.5,textTransform:"uppercase",transition:"all 0.2s",textAlign:"left"}}>
                {g!=="Tous"&&<GenreIcon name={g} size={16}/>}
                {g}
              </button>
            ))}
          </div>
          <p className="sl" style={{marginBottom:12,fontSize:9}}>Taille de salle</p>
          <div style={{display:"flex",flexDirection:"column",gap:4}}>
            {categories.map(c=>{
              const labels={"Olympia Class":"O","Zenith Class":"Z","Arena Class":"A","Stadium Class":"S"};
              const sizes={"Olympia Class":"800 — 3 000","Zenith Class":"3 000 — 15 000","Arena Class":"15 000 — 40 000","Stadium Class":"40 000+"};
              return (
              <button key={c} onClick={()=>setActiveCat(c)}
                style={{display:"flex",alignItems:"center",gap:10,padding:"8px 14px",background:activeCat===c?"rgba(201,168,76,0.1)":"transparent",border:`1px solid ${activeCat===c?"rgba(201,168,76,0.4)":"rgba(255,255,255,0.06)"}`,color:activeCat===c?GOLD:"#888",cursor:"pointer",fontFamily:"'Montserrat',sans-serif",fontSize:10,fontWeight:700,letterSpacing:1.5,textTransform:"uppercase",transition:"all 0.2s",textAlign:"left"}}>
                {labels[c]?<span style={{width:22,height:22,border:`1px solid ${activeCat===c?GOLD:"rgba(255,255,255,0.15)"}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:800,fontFamily:"'Cormorant Garamond',serif"}}>{labels[c]}</span>:"🎵"}
                <div><span style={{display:"block"}}>{c==="Toutes"?c:c.replace(" Class","")}</span>{sizes[c]&&<span style={{fontSize:7,color:"#555",fontWeight:400,letterSpacing:0,textTransform:"none"}}>{sizes[c]} places</span>}</div>
              </button>
            );})}
          </div>
          <p className="sl" style={{marginBottom:12,marginTop:20,fontSize:9}}>Ville</p>
          <div style={{display:"flex",flexDirection:"column",gap:4}}>
            {allCities.map(c=>(
              <button key={c} onClick={()=>setActiveCity(c)}
                style={{padding:"8px 14px",background:activeCity===c?"rgba(201,168,76,0.1)":"transparent",border:`1px solid ${activeCity===c?"rgba(201,168,76,0.4)":"rgba(255,255,255,0.06)"}`,color:activeCity===c?GOLD:"#888",cursor:"pointer",fontFamily:"'Montserrat',sans-serif",fontSize:10,fontWeight:700,letterSpacing:1.5,textTransform:"uppercase",transition:"all 0.2s",textAlign:"left"}}>{c}</button>
            ))}
          </div>
        </div>

        <div style={{padding:"0 32px"}}>
          {/* Filtres mobile — genres + villes dropdown + catégories */}
          <div style={{display:"flex",gap:8,marginBottom:8,alignItems:"center"}}>
            <select value={activeGenre} onChange={e=>setActiveGenre(e.target.value)} style={{flex:1,padding:"10px 14px",background:"#111",border:`1px solid ${activeGenre!=="Tous"?GOLD:"rgba(255,255,255,0.1)"}`,color:activeGenre!=="Tous"?GOLD:"#888",fontFamily:"'Montserrat',sans-serif",fontSize:10,fontWeight:700,letterSpacing:1.5,textTransform:"uppercase",cursor:"pointer",appearance:"none",backgroundImage:`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath d='M3 5L6 8L9 5' stroke='%23C9A84C' fill='none'/%3E%3C/svg%3E")`,backgroundRepeat:"no-repeat",backgroundPosition:"right 12px center"}}>
              {allGenres.map(g=><option key={g} value={g} style={{background:"#111",color:"#ccc"}}>{g}</option>)}
            </select>
            <select value={activeCity} onChange={e=>setActiveCity(e.target.value)} style={{flex:1,padding:"10px 14px",background:"#111",border:`1px solid ${activeCity!=="Toutes"?GOLD:"rgba(255,255,255,0.1)"}`,color:activeCity!=="Toutes"?GOLD:"#888",fontFamily:"'Montserrat',sans-serif",fontSize:10,fontWeight:700,letterSpacing:1.5,textTransform:"uppercase",cursor:"pointer",appearance:"none",backgroundImage:`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath d='M3 5L6 8L9 5' stroke='%23C9A84C' fill='none'/%3E%3C/svg%3E")`,backgroundRepeat:"no-repeat",backgroundPosition:"right 12px center"}}>
              {allCities.map(c=><option key={c} value={c} style={{background:"#111",color:"#ccc"}}>{c}</option>)}
            </select>
          </div>
          {/* Filtres mobile — catégories */}
          <div style={{display:"flex",gap:6,marginBottom:24}}>
            {categories.map(c=>{
              const labels={"Olympia Class":"O","Zenith Class":"Z","Arena Class":"A","Stadium Class":"S"};
              return <button key={c} onClick={()=>setActiveCat(c)} style={{flex:1,padding:"8px 0",background:activeCat===c?"rgba(201,168,76,0.1)":"transparent",border:`1px solid ${activeCat===c?"rgba(201,168,76,0.4)":"rgba(255,255,255,0.08)"}`,color:activeCat===c?GOLD:"#888",cursor:"pointer",fontFamily:"'Montserrat',sans-serif",fontSize:10,fontWeight:700,letterSpacing:1.5,textAlign:"center"}}>{labels[c]||"Toutes"}</button>;
            })}
          </div>
          <div className="concerts-grid" style={{display:"grid",gap:16}}>
            {filtered.map((c,i)=>(
              <div key={c.id} className="cc" style={{animation:`fadeUp 0.4s ${i*0.06}s ease both`,opacity:0}} onClick={()=>nav("upcoming-detail",c)}>
                <div style={{height:110,background:"linear-gradient(135deg,rgba(201,168,76,0.08),rgba(201,168,76,0.02))",display:"flex",alignItems:"center",justifyContent:"center",position:"relative",overflow:"hidden"}}>
                  <ArtistImg name={c.artist} fallback={c.img} size={80} images={artistImages}/>
                  <div style={{position:"absolute",top:10,left:12}}><span className="ub"><span className="ld"/>{c.daysLeft}j</span></div>
                  <div style={{position:"absolute",top:10,right:12}}><GenreIcon name={c.genre} size={16}/></div>
                </div>
                <div style={{padding:"14px 18px 18px"}}>
                  <h3 style={{fontSize:15,fontWeight:700,letterSpacing:1,marginBottom:3}}>{c.artist}</h3>
                  <p style={{fontSize:11,color:"#888",marginBottom:10}}>{c.genre}</p>
                  <div className="gd" style={{marginBottom:10}}/>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                    <div><p style={{fontSize:11,color:"#aaa"}}>{c.date}</p><p style={{fontSize:11,color:"#777"}}>{c.city} · {c.venue}</p></div>
                    <div style={{display:"flex",alignItems:"center",gap:6}}>
                      <TicketButton artist={c.artist} venue={c.venue} city={c.city} ticketUrl={c.ticket_url} size="small"/>
                      <span className="tag" style={{fontSize:8}}>{c.category}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {filtered.length===0&&<div style={{textAlign:"center",padding:"60px 20px",color:"#555",gridColumn:"1/-1"}}><div style={{marginBottom:12}}><GenreIcon name={activeGenre} size={32}/></div><p style={{fontSize:13}}>Aucun concert {activeGenre} pour le moment.</p></div>}
          </div>
        </div>
      </div>
    </div>
  );
}

function UpcomingDetail({c,nav,artistImages={},social={},user}) {
  if(!c) return null;
  const isFollowing=social.isFollowing?.(c.artist);
  const isAtt=social.isAttending?.(c.id);
  const isCert=social.isCertified?.(c.artist);
  return (
    <div style={{paddingBottom:80,paddingTop:72}}>
      <div className="detail-grid" style={{display:"grid",maxWidth:1200,margin:"0 auto",padding:"40px 32px",gap:48,alignItems:"start"}}>
        {/* Left */}
        <div style={{textAlign:"center"}}>
          <span className="ub" style={{marginBottom:20,display:"inline-flex"}}><span className="ld"/>{c.daysLeft} jours restants</span>
          <div style={{margin:"24px 0 20px"}}><ArtistImg name={c.artist} fallback={c.img} size={120} images={artistImages}/></div>
          <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:8,marginBottom:8}}>
            <h1 className="fd" style={{fontSize:"clamp(30px,5vw,52px)",fontWeight:400,letterSpacing:3,cursor:"pointer",textDecoration:"underline",textDecorationColor:"rgba(201,168,76,0.3)"}} onClick={()=>nav("artist",{artistName:c.artist})}>{c.artist}</h1>
            {isCert&&<CrownBadge size={22}/>}
          </div>
          <p style={{fontSize:13,color:"#888",marginBottom:12}}>{c.date} · {c.city} · {c.venue}</p>
          <div style={{display:"flex",gap:8,justifyContent:"center",flexWrap:"wrap",alignItems:"center",marginBottom:16}}>
            <span className="tag">{c.category}</span>
            <span style={{padding:"4px 12px",background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.1)",fontSize:11,color:"#aaa",display:"flex",alignItems:"center",gap:6}}><GenreIcon name={c.genre} size={14}/>{c.genre}</span>
          </div>
          {user&&<div style={{display:"flex",gap:10,justifyContent:"center",flexWrap:"wrap"}}>
            <button onClick={()=>social.toggleAttending?.(c.id)} style={{padding:"10px 24px",background:isAtt?"rgba(76,200,100,0.1)":"linear-gradient(135deg,#8B6914,#C9A84C)",border:isAtt?"1px solid rgba(76,200,100,0.4)":"none",color:isAtt?"#4CC864":"#000",fontSize:10,fontWeight:700,letterSpacing:2,textTransform:"uppercase",cursor:"pointer",fontFamily:"'Montserrat',sans-serif"}}>{isAtt?"✓ J'y vais":"J'y vais"}</button>
            <TicketButton artist={c.artist} venue={c.venue} city={c.city} ticketUrl={c.ticket_url}/>
            <button onClick={()=>social.toggleFollow?.(c.artist)} style={{padding:"10px 24px",background:"transparent",border:`1px solid ${isFollowing?"rgba(201,168,76,0.4)":"rgba(255,255,255,0.15)"}`,color:isFollowing?GOLD:"#aaa",fontSize:10,fontWeight:700,letterSpacing:2,textTransform:"uppercase",cursor:"pointer",fontFamily:"'Montserrat',sans-serif"}}>{isFollowing?"Suivi ✓":"Suivre"}</button>
            <ShareButton artist={c.artist} date={c.date} venue={c.venue} city={c.city}/>
          </div>}
          {!user&&<div style={{display:"flex",gap:10,justifyContent:"center",flexWrap:"wrap"}}>
            <TicketButton artist={c.artist} venue={c.venue} city={c.city} ticketUrl={c.ticket_url}/>
            <ShareButton artist={c.artist} date={c.date} venue={c.venue} city={c.city}/>
            <button onClick={()=>nav("login")} className="bo" style={{padding:"10px 24px",fontSize:10,letterSpacing:2}}>Se connecter</button>
          </div>}
        </div>
        {/* Right */}
        <div>
          <div style={{background:"rgba(201,168,76,0.05)",border:"1px solid rgba(201,168,76,0.2)",padding:"28px 24px",marginBottom:24,textAlign:"center"}}>
            <Crown size={28}/>
            <h3 className="fd" style={{fontSize:20,fontWeight:600,letterSpacing:2,marginBottom:8,marginTop:12}}>Devenir Juré CROWDN</h3>
            <p style={{fontSize:12,color:"#888",lineHeight:1.7,marginBottom:4}}>Ce concert sera évalué par un panel de jurés certifiés.</p>
            <button style={{background:"transparent",border:"1px solid rgba(201,168,76,0.6)",color:GOLD,padding:"12px 28px",fontFamily:"'Montserrat',sans-serif",fontWeight:700,fontSize:10,letterSpacing:3,textTransform:"uppercase",cursor:"pointer",transition:"all 0.3s",width:"100%",marginTop:12}} onClick={()=>nav("become-jury")}>★ Become a Jury Member</button>
          </div>
          {user&&(
          <div style={{background:"rgba(201,168,76,0.04)",border:"1px solid rgba(201,168,76,0.15)",padding:"20px 24px",marginBottom:24}}>
            <p className="sl" style={{marginBottom:10}}>Tu y étais ?</p>
            <p style={{fontSize:11,color:"#888",marginBottom:12,lineHeight:1.7}}>Partage ton Moment live — extrait filmé, ambiance, fan-cam</p>
            <label style={{display:"flex",alignItems:"center",gap:10,padding:"14px",border:"2px dashed rgba(201,168,76,0.3)",background:"rgba(201,168,76,0.02)",cursor:"pointer",marginBottom:10}}>
              <input type="file" accept="video/*" style={{display:"none"}} onChange={async e=>{
                const file=e.target.files[0];if(!file)return;
                const ext=file.name.split(".").pop();
                const path=`${user.id}/${Date.now()}.${ext}`;
                const{error:upErr}=await supabase.storage.from("moments").upload(path,file);
                if(upErr){alert("Erreur upload");return;}
                const{data:urlData}=supabase.storage.from("moments").getPublicUrl(path);
                const caption=prompt("Caption pour ton Moment (optionnel):")||"";
                await supabase.from("moments").insert({artist_name:c.artist,user_id:user.id,video_url:urlData.publicUrl,caption,concert_tag:`${c.venue} — ${c.date}`});
                alert("Moment publié ✓");
              }}/>
              <span style={{fontSize:22}}>🎬</span>
              <div><p style={{fontSize:11,fontWeight:600,color:GOLD}}>Uploader une vidéo</p><p style={{fontSize:9,color:"#666"}}>MP4, MOV — max 100MB</p></div>
            </label>
          </div>
          )}
          <div style={{background:BG2,border:"1px solid rgba(201,168,76,0.08)",padding:24}}>
            <p className="sl" style={{marginBottom:16}}>Informations</p>
            {[["Artiste",c.artist],["Date",c.date],["Ville",c.city],["Salle",c.venue],["Catégorie",c.category]].map(([k,v])=>(
              <div key={k} style={{display:"flex",justifyContent:"space-between",padding:"10px 0",borderBottom:"1px solid rgba(255,255,255,0.04)",fontSize:12}}>
                <span style={{color:"#666"}}>{k}</span><span style={{color:"#eee"}}>{v}</span>
              </div>
            ))}
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 0",fontSize:12}}>
              <span style={{color:"#666"}}>Genre</span><span style={{color:"#eee",display:"flex",alignItems:"center",gap:6}}><GenreIcon name={c.genre} size={14}/>{c.genre}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── MOMENTS ─────────────────────────────────────────────────────────────────
const MOMENTS_DATA = [
  {id:1,artist:"Billie Eilish",concert:"Accor Arena · Paris",date:"10 Juin 2025",caption:"Ce soir Paris m'appartient 🖤",video:"https://videos.pexels.com/video-files/3015510/3015510-hd_1920_1080_24fps.mp4",tag:"Artist",views:"124K",likes:"8.2K"},
  {id:2,artist:"Ninho",concert:"Stade de France · Paris",date:"2 Mai 2025",caption:"Premier rappeur français solo au Stade de France 🏆",video:"https://videos.pexels.com/video-files/3015488/3015488-hd_1920_1080_24fps.mp4",tag:"Jury",views:"89K",likes:"12.4K"},
  {id:3,artist:"DJ Snake",concert:"Stade de France · Paris",date:"10 Mai 2025",caption:"Le feu d'artifice final... frissons 🐍🔥",video:"https://videos.pexels.com/video-files/2022395/2022395-hd_1920_1080_30fps.mp4",tag:"Fan",views:"45K",likes:"3.1K"},
  {id:4,artist:"Slimane",concert:"Accor Arena · Paris",date:"8 Avr 2025",caption:"Chaque note, chaque silence 🎶",video:"https://videos.pexels.com/video-files/2959990/2959990-hd_1920_1080_24fps.mp4",tag:"Artist",views:"67K",likes:"9.8K"},
];

function MomentThumb({m,onClick,artistImages}) {
  const vRef=useRef(null);
  useEffect(()=>{if(vRef.current)vRef.current.currentTime=2;},[]);
  return (
    <div style={{flexShrink:0,cursor:"pointer",textAlign:"center"}} onClick={onClick}>
      <div style={{width:68,height:68,borderRadius:"50%",padding:2,background:"linear-gradient(135deg,#8B6914,#C9A84C,#E8C96A)",marginBottom:5}}>
        <div style={{width:"100%",height:"100%",borderRadius:"50%",overflow:"hidden",border:"2px solid #0A0A0A",position:"relative",background:"#111"}}>
          <video ref={vRef} src={m.video} style={{width:"100%",height:"100%",objectFit:"cover"}} muted playsInline preload="metadata"/>
          <div style={{position:"absolute",bottom:0,right:0,width:16,height:16,borderRadius:"50%",background:"#0A0A0A",display:"flex",alignItems:"center",justifyContent:"center",fontSize:8}}>
            {m.tag==="Artist"?"🎤":m.tag==="Jury"?"⭐":"🔥"}
          </div>
        </div>
      </div>
      <p style={{fontSize:8,fontWeight:600,color:"#aaa",width:68,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{m.artist.split(" ")[0]}</p>
    </div>
  );
}

function MomentPlayer({m,onClose,onPrev,onNext,hasPrev,hasNext}) {
  const vRef=useRef(null);
  const [playing,setPlaying]=useState(true);
  const [progress,setProgress]=useState(0);
  const [liked,setLiked]=useState(false);
  const [muted,setMuted]=useState(false);

  useEffect(()=>{
    const v=vRef.current;if(!v)return;
    v.currentTime=0;v.play().catch(()=>{});setPlaying(true);setProgress(0);
    const onTime=()=>setProgress((v.currentTime/v.duration)*100||0);
    v.addEventListener("timeupdate",onTime);
    return()=>v.removeEventListener("timeupdate",onTime);
  },[m]);

  return (
    <div style={{position:"fixed",inset:0,zIndex:500,background:"#000",display:"flex",justifyContent:"center"}} onClick={()=>{const v=vRef.current;if(!v)return;if(playing)v.pause();else v.play();setPlaying(!playing);}}>
      <div style={{position:"relative",height:"100vh",maxWidth:400,width:"100%",overflow:"hidden"}}>
        <video ref={vRef} src={m.video} style={{position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover"}} loop playsInline muted={muted} autoPlay/>
        <div style={{position:"absolute",top:0,left:0,right:0,height:"25%",background:"linear-gradient(to bottom,rgba(0,0,0,0.7),transparent)",pointerEvents:"none"}}/>
        <div style={{position:"absolute",bottom:0,left:0,right:0,height:"60%",background:"linear-gradient(to top,rgba(0,0,0,0.95),transparent)",pointerEvents:"none"}}/>

        {/* Top bar */}
        <div style={{position:"absolute",top:16,left:16,right:16,display:"flex",justifyContent:"space-between",alignItems:"center",zIndex:10}} onClick={e=>e.stopPropagation()}>
          <button onClick={onClose} style={{background:"rgba(0,0,0,0.5)",border:"1px solid rgba(255,255,255,0.2)",color:"#eee",width:36,height:36,borderRadius:"50%",cursor:"pointer",fontSize:16,display:"flex",alignItems:"center",justifyContent:"center"}}>←</button>
          <span style={{padding:"3px 9px",background:"linear-gradient(135deg,#8B6914,#C9A84C)",color:"#000",fontSize:7,fontWeight:800,letterSpacing:2,textTransform:"uppercase"}}>♛ CROWDN Exclusive</span>
          <button onClick={()=>setMuted(!muted)} style={{background:"rgba(0,0,0,0.5)",border:"1px solid rgba(255,255,255,0.2)",color:"#eee",width:36,height:36,borderRadius:"50%",cursor:"pointer",fontSize:14,display:"flex",alignItems:"center",justifyContent:"center"}}>{muted?"🔇":"🔊"}</button>
        </div>

        {/* Side actions */}
        <div style={{position:"absolute",right:16,bottom:140,display:"flex",flexDirection:"column",gap:20,alignItems:"center",zIndex:10}} onClick={e=>e.stopPropagation()}>
          <button onClick={()=>setLiked(!liked)} style={{background:"none",border:"none",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:4}}>
            <div style={{width:44,height:44,borderRadius:"50%",border:`1.5px solid ${liked?"#C9A84C":"rgba(255,255,255,0.3)"}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,background:liked?"rgba(201,168,76,0.2)":"rgba(0,0,0,0.3)",color:liked?"#E8C96A":"#fff"}}>{liked?"♥":"♡"}</div>
            <span style={{fontSize:10,color:"rgba(255,255,255,0.8)",fontWeight:600,fontFamily:"'Montserrat',sans-serif"}}>{m.likes}</span>
          </button>
          <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:4}}>
            <div style={{width:44,height:44,borderRadius:"50%",border:"1.5px solid rgba(255,255,255,0.3)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,background:"rgba(0,0,0,0.3)"}}>💬</div>
            <span style={{fontSize:10,color:"rgba(255,255,255,0.8)",fontWeight:600,fontFamily:"'Montserrat',sans-serif"}}>124</span>
          </div>
        </div>

        {/* Bottom info */}
        <div style={{position:"absolute",bottom:80,left:16,right:72,zIndex:10}} onClick={e=>e.stopPropagation()}>
          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}>
            <p style={{fontSize:15,fontWeight:700,color:"#fff"}}>{m.artist}</p>
            <div style={{width:16,height:16,borderRadius:"50%",background:"linear-gradient(135deg,#8B6914,#C9A84C)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:9,color:"#000",fontWeight:900}}>✓</div>
          </div>
          <p style={{fontSize:11,color:"rgba(255,255,255,0.7)",marginBottom:6}}>📍 {m.concert} · {m.date}</p>
          <p style={{fontSize:12,color:"rgba(255,255,255,0.9)",lineHeight:1.6,marginBottom:8}}>{m.caption}</p>
          <div style={{display:"flex",gap:6}}>
            <span style={{padding:"3px 9px",border:"1px solid rgba(201,168,76,0.35)",color:GOLD,fontSize:7,fontWeight:700,letterSpacing:2,textTransform:"uppercase"}}>{m.tag} Moment</span>
            <span style={{padding:"3px 9px",border:"1px solid rgba(201,168,76,0.35)",color:GOLD,fontSize:7,fontWeight:700,letterSpacing:2,textTransform:"uppercase"}}>{m.views} vues</span>
          </div>
        </div>

        {/* Progress */}
        <div style={{position:"absolute",bottom:68,left:16,right:16,height:2,background:"rgba(255,255,255,0.2)",cursor:"pointer",zIndex:10}} onClick={e=>{e.stopPropagation();const v=vRef.current;if(!v)return;const r=e.currentTarget.getBoundingClientRect();v.currentTime=((e.clientX-r.left)/r.width)*v.duration;}}>
          <div style={{height:"100%",width:`${progress}%`,background:"linear-gradient(to right,#8B6914,#E8C96A)",transition:"width 0.1s"}}/>
        </div>

        {/* Nav */}
        <div style={{position:"absolute",bottom:16,left:16,right:16,display:"flex",justifyContent:"space-between",alignItems:"center",zIndex:10}} onClick={e=>e.stopPropagation()}>
          <button onClick={onPrev} disabled={!hasPrev} style={{background:"rgba(0,0,0,0.5)",border:"1px solid rgba(255,255,255,0.15)",color:hasPrev?"#eee":"#444",padding:"8px 16px",fontFamily:"'Montserrat',sans-serif",fontSize:10,fontWeight:700,letterSpacing:2,textTransform:"uppercase",cursor:hasPrev?"pointer":"default"}}>← Préc</button>
          <div style={{display:"flex",gap:4}}>
            {MOMENTS_DATA.map((_,i)=>(<div key={i} style={{width:i===MOMENTS_DATA.indexOf(m)?16:5,height:5,borderRadius:3,background:i===MOMENTS_DATA.indexOf(m)?GOLD:"rgba(255,255,255,0.3)",transition:"all 0.3s"}}/>))}
          </div>
          <button onClick={onNext} disabled={!hasNext} style={{background:"rgba(0,0,0,0.5)",border:"1px solid rgba(255,255,255,0.15)",color:hasNext?"#eee":"#444",padding:"8px 16px",fontFamily:"'Montserrat',sans-serif",fontSize:10,fontWeight:700,letterSpacing:2,textTransform:"uppercase",cursor:hasNext?"pointer":"default"}}>Suiv →</button>
        </div>
      </div>
    </div>
  );
}

function PastPage({nav,concerts,artistImages={}}) {
  const [activeGenre,setActiveGenre]=useState("Tous");
  const [momentIdx,setMomentIdx]=useState(null);
  const P=concerts||PAST_DEFAULT;
  const allGenres=["Tous",...Array.from(new Set(P.map(c=>c.genre)))];
  const filtered=activeGenre==="Tous"?P:P.filter(c=>c.genre===activeGenre);
  return (
    <div style={{padding:"80px 0 80px",maxWidth:1400,margin:"0 auto"}}>
      <div style={{padding:"20px 32px 32px"}}>
        <p className="sl" style={{marginBottom:8}}>Archives</p>
        <h1 className="fd" style={{fontSize:"clamp(28px,5vw,44px)",fontWeight:400,letterSpacing:2,marginBottom:8}}>Previous Concerts</h1>
        <p style={{fontSize:12,color:"#777"}}>Les concerts qui ont fait vibrer la scène</p>
      </div>
      <div className="desktop-two-col" style={{display:"grid",gap:0,alignItems:"start"}}>
        <div className="desktop-sidebar" style={{padding:"0 24px 0 32px",position:"sticky",top:80}}>
          <p className="sl" style={{marginBottom:16,fontSize:9}}>Genres</p>
          <div style={{display:"flex",flexDirection:"column",gap:6}}>
            {allGenres.map(g=>(
              <button key={g} onClick={()=>setActiveGenre(g)}
                style={{display:"flex",alignItems:"center",gap:10,padding:"10px 14px",background:activeGenre===g?"rgba(201,168,76,0.1)":"transparent",border:`1px solid ${activeGenre===g?"rgba(201,168,76,0.4)":"rgba(255,255,255,0.06)"}`,color:activeGenre===g?GOLD:"#888",cursor:"pointer",fontFamily:"'Montserrat',sans-serif",fontSize:10,fontWeight:700,letterSpacing:1.5,textTransform:"uppercase",transition:"all 0.2s",textAlign:"left"}}>
                {g!=="Tous"&&<GenreIcon name={g} size={16}/>}
                {g}
              </button>
            ))}
          </div>
        </div>
        <div style={{padding:"0 32px"}}>
          <div className="genre-filter" style={{marginBottom:24,display:"flex"}}>
            {allGenres.map(g=>(
              <button key={g} className={`gf-btn ${activeGenre===g?"active":""}`} onClick={()=>setActiveGenre(g)}>
                {g!=="Tous"&&<span style={{marginRight:6}}><GenreIcon name={g} size={14}/></span>}{g}
              </button>
            ))}
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:16}}>
            {filtered.map((c,i)=><PastCard key={c.id} c={c} idx={i} onClick={()=>nav("past-detail",c)} artistImages={artistImages}/>)}
          </div>

          {/* ─── MOMENTS SECTION ─── */}
          <div style={{padding:"32px 0",borderTop:"1px solid rgba(201,168,76,0.08)",borderBottom:"1px solid rgba(201,168,76,0.08)",marginTop:32}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
              <div>
                <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}>
                  <div style={{width:6,height:6,borderRadius:"50%",background:GOLD,animation:"pulse 2s infinite"}}/>
                  <p style={{fontSize:9,color:GOLD,letterSpacing:4,textTransform:"uppercase",fontWeight:700}}>Moments</p>
                </div>
                <h3 className="fd" style={{fontSize:"clamp(16px,3vw,22px)",fontWeight:400,letterSpacing:2}}>Moments exclusifs</h3>
                <p style={{fontSize:10,color:"#666",marginTop:3}}>Vidéos live · Uniquement sur CROWDN</p>
              </div>
              <span style={{padding:"4px 12px",background:"rgba(201,168,76,0.08)",border:"1px solid rgba(201,168,76,0.2)",fontSize:8,color:GOLD,fontWeight:700,letterSpacing:2,textTransform:"uppercase"}}>🔒 Exclusif</span>
            </div>
            <div style={{display:"flex",gap:14,overflowX:"auto",paddingBottom:8,scrollbarWidth:"none"}}>
              {MOMENTS_DATA.map((m,i)=>(
                <MomentThumb key={m.id} m={m} artistImages={artistImages} onClick={()=>setMomentIdx(i)}/>
              ))}
              <div style={{flexShrink:0,textAlign:"center",cursor:"pointer",opacity:0.5}}>
                <div style={{width:68,height:68,borderRadius:"50%",border:"2px dashed rgba(201,168,76,0.3)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,background:"rgba(201,168,76,0.03)",marginBottom:5}}>＋</div>
                <p style={{fontSize:8,color:"#555",width:68}}>Partager</p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Fullscreen Moment Player */}
      {momentIdx!==null&&(
        <MomentPlayer
          m={MOMENTS_DATA[momentIdx]}
          onClose={()=>setMomentIdx(null)}
          onPrev={()=>setMomentIdx(i=>Math.max(0,i-1))}
          onNext={()=>setMomentIdx(i=>Math.min(MOMENTS_DATA.length-1,i+1))}
          hasPrev={momentIdx>0}
          hasNext={momentIdx<MOMENTS_DATA.length-1}
        />
      )}
    </div>
  );
}

function PastDetail({c,nav,artistImages={}}) {
  if(!c) return null;
  return (
    <div style={{paddingBottom:80}}>
      <div style={{padding:"100px 20px 40px",textAlign:"center",background:"linear-gradient(to bottom,rgba(201,168,76,0.04),transparent)"}}>
        <div style={{marginBottom:16}}><ArtistImg name={c.artist} fallback={c.img} size={100} images={artistImages}/></div>
        <p className="sl" style={{marginBottom:8,display:"flex",alignItems:"center",justifyContent:"center",gap:8}}><GenreIcon name={c.genre} size={16}/>{c.genre}</p>
        <h1 className="fd" style={{fontSize:"clamp(28px,6vw,48px)",fontWeight:400,letterSpacing:3,marginBottom:8,cursor:"pointer",textDecoration:"underline",textDecorationColor:"rgba(201,168,76,0.3)"}} onClick={()=>nav("artist",{artistName:c.artist})}>{c.artist}</h1>
        <p style={{fontSize:13,color:"#888",marginBottom:16}}>{c.date} · {c.city} · {c.venue}</p>
        <span className="tag">{c.category}</span>
      </div>
      <div style={{maxWidth:620,margin:"0 auto",padding:"20px 20px 0"}}>
        {c.juryQuote&&(
        <div style={{marginBottom:24}}>
          <p className="sl" style={{marginBottom:16}}>Le mot du jury</p>
          <div style={{background:"rgba(201,168,76,0.04)",border:"1px solid rgba(201,168,76,0.15)",padding:"28px 24px"}}>
            <div style={{fontSize:40,color:GOLD,opacity:0.4,fontFamily:"serif",lineHeight:1,marginBottom:8}}>"</div>
            <p className="fd" style={{fontSize:"clamp(17px,3.5vw,22px)",fontStyle:"italic",color:"rgba(245,240,232,0.9)",lineHeight:1.7,marginBottom:24}}>{c.juryQuote}</p>
            <div style={{display:"flex",alignItems:"center",gap:12}}>
              <div className="ja" style={{width:48,height:48,fontSize:22}}>{c.juryAvatar}</div>
              <div>
                <p style={{fontWeight:700,color:GOLD,fontSize:13}}>{c.juryName}</p>
                <p style={{fontSize:10,color:"#666",marginTop:2}}>Juré certifié CROWDN</p>
              </div>
            </div>
          </div>
        </div>
        )}
        <div style={{marginBottom:24}}>
          <p className="sl" style={{marginBottom:14}}>Moments du concert</p>
          <div style={{display:"flex",gap:10}}>
            {(c.photos||["📸","🎬"]).map((p,i)=>(
              <div key={i} style={{flex:1,aspectRatio:"1",background:"rgba(201,168,76,0.05)",border:"1px solid rgba(201,168,76,0.1)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,cursor:"pointer"}}>{p}</div>
            ))}
          </div>
        </div>
        <div style={{background:BG2,border:"1px solid rgba(201,168,76,0.08)",padding:24}}>
          <p className="sl" style={{marginBottom:16}}>Informations</p>
          {[["Artiste",c.artist],["Date",c.date],["Ville",c.city],["Salle",c.venue],["Catégorie",c.category]].map(([k,v])=>(
            <div key={k} style={{display:"flex",justifyContent:"space-between",padding:"10px 0",borderBottom:"1px solid rgba(255,255,255,0.04)",fontSize:12}}>
              <span style={{color:"#666"}}>{k}</span><span style={{color:"#eee"}}>{v}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ArtistPage({artistName,nav,social,user,artistImages={},upcomingData=[]}) {
  if(!artistName) return null;
  const artist=ARTISTS[artistName];
  const upcoming=(upcomingData||[]).filter(c=>c.artist===artistName);
  const past=(PAST_DEFAULT||[]).filter(c=>c.artist===artistName);
  const isFollowing=social&&social.isFollowing?social.isFollowing(artistName):false;
  const isCert=social&&social.isCertified?social.isCertified(artistName):false;

  return (
    <div style={{padding:"100px 20px 80px",maxWidth:680,margin:"0 auto"}}>
      <div style={{textAlign:"center",marginBottom:32}}>
        <div style={{margin:"0 auto 12px"}}><ArtistImg name={artistName} size={88} images={artistImages}/></div>
        <p className="sl" style={{marginBottom:6}}>Artiste CROWDN</p>
        <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:8,marginBottom:8}}>
          <h1 className="fd" style={{fontSize:"clamp(28px,6vw,44px)",fontWeight:400,letterSpacing:3}}>{artistName}</h1>
          {isCert&&<CrownBadge size={22}/>}
        </div>
        {artist&&<p style={{fontSize:12,color:"#888",lineHeight:1.8,maxWidth:480,margin:"0 auto 16px"}}>{artist.bio}</p>}
        {!artist&&<p style={{fontSize:12,color:"#888",marginBottom:16}}>Artiste présent sur CROWDN</p>}
        {user&&social&&social.toggleFollow?
          <button onClick={()=>social.toggleFollow(artistName)} style={{padding:"10px 28px",background:isFollowing?"transparent":"linear-gradient(135deg,#8B6914,#C9A84C)",border:isFollowing?"1px solid rgba(201,168,76,0.4)":"none",color:isFollowing?GOLD:"#000",fontSize:10,fontWeight:700,letterSpacing:2,textTransform:"uppercase",cursor:"pointer",fontFamily:"'Montserrat',sans-serif",marginBottom:16}}>{isFollowing?"Suivi ✓":"Suivre"}</button>
          :<button onClick={()=>nav("login")} className="bp" style={{padding:"10px 28px",fontSize:10,letterSpacing:2,marginBottom:16}}>Se connecter pour suivre</button>
        }
      </div>
      {artist&&<div style={{display:"flex",gap:10,justifyContent:"center",flexWrap:"wrap",marginBottom:32}}>
        <a href={artist.spotify} target="_blank" rel="noreferrer" style={{display:"inline-flex",alignItems:"center",gap:8,padding:"10px 20px",background:"rgba(29,185,84,0.1)",border:"1px solid rgba(29,185,84,0.3)",color:"#1DB954",fontSize:10,fontWeight:700,letterSpacing:2,textTransform:"uppercase",textDecoration:"none",fontFamily:"'Montserrat',sans-serif"}}>♫ Spotify</a>
        <a href={artist.instagram} target="_blank" rel="noreferrer" style={{display:"inline-flex",alignItems:"center",gap:8,padding:"10px 20px",background:"rgba(225,48,108,0.08)",border:"1px solid rgba(225,48,108,0.25)",color:"#E1306C",fontSize:10,fontWeight:700,letterSpacing:2,textTransform:"uppercase",textDecoration:"none",fontFamily:"'Montserrat',sans-serif"}}>◎ Instagram</a>
      </div>}
      <div className="gd" style={{marginBottom:32}}/>
      {upcoming.length>0&&(
        <div style={{marginBottom:32}}>
          <p className="sl" style={{marginBottom:16}}>Concerts à venir</p>
          {upcoming.map(c=>(
            <div key={c.id} className="cc" style={{marginBottom:10,cursor:"pointer"}} onClick={()=>nav("upcoming-detail",c)}>
              <div style={{display:"flex",alignItems:"center",gap:16,padding:"16px 20px"}}>
                <div style={{flex:1}}><p style={{fontWeight:700,fontSize:13}}>{c.date} · {c.city}</p><p style={{fontSize:11,color:"#888",marginTop:2}}>{c.venue}</p></div>
                <TicketButton artist={c.artist} venue={c.venue} city={c.city} ticketUrl={c.ticket_url} size="small"/>
                <span className="tag" style={{fontSize:8}}>{c.category}</span>
              </div>
            </div>
          ))}
        </div>
      )}
      {past.length>0&&(
        <div>
          <p className="sl" style={{marginBottom:16}}>Concerts évalués</p>
          {past.map(c=>(
            <div key={c.id} className="pc" style={{marginBottom:10,cursor:"pointer"}} onClick={()=>nav("past-detail",c)}>
              <div style={{display:"flex",alignItems:"center",gap:16,padding:"16px 20px"}}>
                <div style={{flex:1}}><p style={{fontWeight:700,fontSize:13}}>{c.date} · {c.city}</p><p style={{fontSize:11,color:"#888",marginTop:2}}>{c.venue}</p></div>
                <span className="tag" style={{fontSize:8}}>{c.category.split(" ")[0]}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function BecomeJury({nav,user,role}) {
  const [juryType,setJuryType]=useState("");
  const [loading,setLoading]=useState(false);
  const [success,setSuccess]=useState("");
  const [error,setError]=useState("");

  const handleJurySubmit=async()=>{
    if(!juryType){setError("Choisis un type de participation");return;}
    setLoading(true);setError("");
    try{
      const userName=user?.user_metadata?.name||user?.email?.split("@")[0]||"";
      await supabase.from("jury_applications").insert({name:userName,email:user.email,profile_type:role||"user",genre:juryType,motivation:"Candidature jury — "+juryType,status:"pending"});
      setSuccess("Candidature envoyée ! Tu seras contacté si tu es sélectionné pour un concert.");
    }catch(e){setError("Erreur lors de l'envoi");}
    finally{setLoading(false);}
  };

  return (
    <div style={{padding:"100px 20px 80px",maxWidth:720,margin:"0 auto"}}>
      <div style={{textAlign:"center",marginBottom:48}}>
        <Crown size={44}/>
        <p className="sl" style={{marginTop:20,marginBottom:8}}>Rejoindre l'élite</p>
        <h1 className="fd" style={{fontSize:"clamp(28px,6vw,44px)",fontWeight:400,letterSpacing:2,marginBottom:16}}>Become a Jury Member</h1>
        <div style={{background:"rgba(76,200,100,0.06)",border:"1px solid rgba(76,200,100,0.25)",padding:"16px 20px",maxWidth:540,margin:"0 auto 20px",display:"flex",alignItems:"center",gap:12}}>
          <span style={{fontSize:24,flexShrink:0}}>🎫</span>
          <p style={{fontSize:12,color:"#4CC864",lineHeight:1.7,textAlign:"left",fontWeight:600}}>Si tu es sélectionné comme juré, <strong style={{color:"#fff"}}>ta place de concert est offerte par CROWDN</strong>. Tu assistes au show gratuitement.</p>
        </div>
        <div style={{background:"rgba(201,168,76,0.06)",border:"1px solid rgba(201,168,76,0.2)",padding:"16px 20px",maxWidth:540,margin:"0 auto",display:"flex",alignItems:"center",gap:12}}>
          <span style={{fontSize:20,flexShrink:0}}>⚖️</span>
          <p style={{fontSize:12,color:"rgba(245,240,232,0.75)",lineHeight:1.7,textAlign:"left"}}>Chaque concert est évalué par un panel de jurés. <strong style={{color:GOLD}}>Les votes individuels restent privés.</strong> Seul le résultat collectif est publié.</p>
        </div>
      </div>
      <div className="gd" style={{marginBottom:40}}/>
      <p className="sl" style={{marginBottom:8}}>Les 4 profils de jurés</p>
      <p style={{fontSize:12,color:"#777",marginBottom:24,lineHeight:1.7}}>Un panel équilibré pour un regard complet sur chaque performance.</p>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:48}}>
        {JURY_TYPES.map((j,i)=>(
          <div key={j.type} className="jury-type-card" style={{animation:`fadeUp 0.4s ${i*0.1}s ease both`,opacity:0}}>
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}>
              <span style={{fontSize:24}}>{j.icon}</span>
              <div><p style={{fontWeight:700,fontSize:13,color:j.color}}>{j.type}</p><span style={{display:"inline-block",padding:"2px 8px",background:"rgba(201,168,76,0.08)",border:"1px solid rgba(201,168,76,0.2)",fontSize:8,letterSpacing:1.5,color:"#888",textTransform:"uppercase",fontWeight:600,marginTop:3}}>{j.tag}</span></div>
            </div>
            <p style={{fontSize:11,color:"#888",lineHeight:1.7}}>{j.desc}</p>
          </div>
        ))}
      </div>
      <div className="gd" style={{marginBottom:40}}/>
      <p className="sl" style={{marginBottom:8}}>Sur quoi le jury note</p>
      <p style={{fontSize:12,color:"#777",marginBottom:24}}>6 critères publics et transparents. Chaque juré note de 1 à 10.</p>
      <div style={{marginBottom:48}}>
        {CRITERIA.map((c,i)=>(
          <div key={c.name} className="criteria-pill" style={{animation:`fadeUp 0.4s ${i*0.07}s ease both`,opacity:0}}>
            <span style={{fontSize:20,flexShrink:0}}>{c.icon}</span>
            <div style={{flex:1}}><p style={{fontWeight:700,fontSize:12,color:GOLD,marginBottom:2}}>{c.name}</p><p style={{fontSize:11,color:"#888"}}>{c.desc}</p></div>
            <span style={{fontSize:11,color:"#555",fontWeight:600,letterSpacing:1}}>/ 10</span>
          </div>
        ))}
      </div>
      <div className="gd" style={{marginBottom:40}}/>
      {success&&<div style={{background:"rgba(76,200,100,0.1)",border:"1px solid rgba(76,200,100,0.3)",padding:16,textAlign:"center",marginBottom:24}}><p style={{color:"#4CC864",fontSize:13,fontWeight:600}}>{success}</p></div>}
      {user&&!success?(
        <div>
          {(role==="journalist"||role==="music_pro")?(
            <div style={{textAlign:"center"}}>
              <div style={{marginBottom:16}}><RoleBadge role={role}/></div>
              <p style={{fontSize:12,color:"#888",marginBottom:8,lineHeight:1.8}}>Ton profil est déjà vérifié. Tu peux candidater directement.</p>
              <p style={{fontSize:11,color:"#4CC864",marginBottom:20}}>🎫 Place de concert offerte si sélectionné</p>
              {error&&<p style={{color:"#FF5050",fontSize:11,marginBottom:12}}>{error}</p>}
              <button className="bp" style={{padding:"16px 40px",fontSize:11,letterSpacing:3,opacity:loading?0.6:1}} onClick={async()=>{
                setLoading(true);
                const un=user?.user_metadata?.name||user?.email?.split("@")[0]||"";
                await supabase.from("jury_applications").insert({name:un,email:user.email,profile_type:role,genre:"Tous",motivation:"Profil vérifié",status:"pending"});
                setSuccess("Candidature envoyée ! Tu seras contacté si tu es sélectionné.");
                setLoading(false);
              }} disabled={loading}>{loading?"...":"Participer en tant que juré 👑"}</button>
            </div>
          ):(
            <div style={{textAlign:"center"}}>
              <p style={{fontSize:12,color:"#888",marginBottom:16,lineHeight:1.8}}>Connecté en tant que <strong style={{color:GOLD}}>{user.email}</strong></p>
              <p style={{fontSize:11,color:"#4CC864",marginBottom:20}}>🎫 Place de concert offerte si sélectionné</p>
              <p className="sl" style={{marginBottom:16}}>Comment veux-tu participer ?</p>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:24,maxWidth:400,margin:"0 auto 24px"}}>
                <button onClick={()=>setJuryType("fan")} style={{padding:"20px 16px",background:juryType==="fan"?"rgba(201,168,76,0.12)":"rgba(255,255,255,0.03)",border:`1px solid ${juryType==="fan"?"rgba(201,168,76,0.5)":"rgba(255,255,255,0.08)"}`,cursor:"pointer",textAlign:"center"}}>
                  <span style={{fontSize:28,display:"block",marginBottom:8}}>🎤</span>
                  <span style={{fontSize:11,fontWeight:700,color:juryType==="fan"?GOLD:"#888",fontFamily:"'Montserrat',sans-serif",letterSpacing:1,display:"block"}}>JURÉ FAN</span>
                  <p style={{fontSize:9,color:"#666",marginTop:6}}>Évalue un concert dans un genre de ton top 5</p>
                </button>
                <button onClick={()=>setJuryType("non-fan")} style={{padding:"20px 16px",background:juryType==="non-fan"?"rgba(201,168,76,0.12)":"rgba(255,255,255,0.03)",border:`1px solid ${juryType==="non-fan"?"rgba(201,168,76,0.5)":"rgba(255,255,255,0.08)"}`,cursor:"pointer",textAlign:"center"}}>
                  <span style={{fontSize:28,display:"block",marginBottom:8}}>👀</span>
                  <span style={{fontSize:11,fontWeight:700,color:juryType==="non-fan"?GOLD:"#888",fontFamily:"'Montserrat',sans-serif",letterSpacing:1,display:"block"}}>JURÉ NON-FAN</span>
                  <p style={{fontSize:9,color:"#666",marginTop:6}}>Évalue un concert dans un genre hors de ton top 5</p>
                </button>
              </div>
              {error&&<p style={{color:"#FF5050",fontSize:11,marginBottom:12}}>{error}</p>}
              <button className="bp" style={{padding:"16px 40px",fontSize:11,letterSpacing:3,opacity:(!juryType||loading)?0.5:1}} onClick={handleJurySubmit} disabled={!juryType||loading}>{loading?"...":"Envoyer ma candidature 👑"}</button>
            </div>
          )}
        </div>
      ):(
        !success&&<div style={{textAlign:"center"}}>
          <p style={{fontSize:12,color:"#888",marginBottom:8,lineHeight:1.8}}>Connecte-toi d'abord pour candidater au jury.</p>
          <p style={{fontSize:11,color:"#4CC864",marginBottom:20}}>🎫 Place de concert offerte si sélectionné</p>
          <button className="bp" style={{padding:"16px 40px",fontSize:11,letterSpacing:3}} onClick={()=>nav("login")}>Se connecter</button>
        </div>
      )}
    </div>
  );
}
function HowItWorks({nav}) {
  const steps=[
    {num:"01",icon:"🎵",title:"Concert annoncé",desc:"CROWDN référence le concert et constitue un panel de 4 jurés : journaliste, acteur de la musique, fan du genre, non-fan du genre."},
    {num:"02",icon:"⭐",title:"Le jury évalue",desc:"Après le concert, chaque juré note en privé sur 6 critères. Aucun juré ne voit la note des autres."},
    {num:"03",icon:"👑",title:"Le verdict est publié",desc:"Le score collectif et la citation d'un juré sont publiés. Les notes individuelles restent confidentielles pour toujours."},
  ];
  return (
    <div style={{padding:"100px 20px 80px",maxWidth:680,margin:"0 auto"}}>
      <div style={{textAlign:"center",marginBottom:52}}>
        <p className="sl" style={{marginBottom:8}}>Transparence</p>
        <h1 className="fd" style={{fontSize:"clamp(28px,6vw,44px)",fontWeight:400,letterSpacing:2,marginBottom:12}}>Comment ça marche</h1>
        <p style={{fontSize:12,color:"#888",lineHeight:1.8}}>Un système simple, transparent, et indépendant.</p>
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:0}}>
        {steps.map((s,i)=>(
          <div key={s.num} style={{display:"flex",gap:24,paddingBottom:40,position:"relative",animation:`fadeUp 0.5s ${i*0.15}s ease both`,opacity:0}}>
            {i<steps.length-1&&<div style={{position:"absolute",left:22,top:48,bottom:0,width:1,background:"linear-gradient(to bottom,rgba(201,168,76,0.3),transparent)"}}/>}
            <div style={{width:44,height:44,border:`1px solid ${GOLD}`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,background:"rgba(201,168,76,0.06)"}}>
              <span style={{fontFamily:"'Cormorant Garamond',serif",fontSize:18,fontWeight:700,color:GOLD}}>{s.num}</span>
            </div>
            <div style={{flex:1,paddingTop:8}}>
              <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:8}}><span style={{fontSize:20}}>{s.icon}</span><h3 style={{fontWeight:700,fontSize:15,letterSpacing:0.5}}>{s.title}</h3></div>
              <p style={{fontSize:12,color:"#999",lineHeight:1.8}}>{s.desc}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="gd" style={{marginBottom:36}}/>
      <p className="sl" style={{marginBottom:20}}>Les 6 critères d'évaluation</p>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:40}}>
        {CRITERIA.map((c,i)=>(
          <div key={c.name} style={{display:"flex",alignItems:"center",gap:10,padding:"12px 14px",background:"rgba(201,168,76,0.04)",border:"1px solid rgba(201,168,76,0.1)",animation:`fadeUp 0.4s ${i*0.06}s ease both`,opacity:0}}>
            <span style={{fontSize:16}}>{c.icon}</span><span style={{fontSize:11,fontWeight:600,color:"#ccc"}}>{c.name}</span>
          </div>
        ))}
      </div>
      <div style={{textAlign:"center"}}>
        <button className="bp" style={{padding:"14px 32px",fontSize:11,letterSpacing:3}} onClick={()=>nav("become-jury")}>Devenir juré →</button>
      </div>
    </div>
  );
}

function Login({nav,onLogin,wantsJury:initWantsJury=false}) {
  const [mode,setMode]=useState(initWantsJury?"signup":"login");
  const [step,setStep]=useState("auth");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [name,setName]=useState("");
  const [loading,setLoading]=useState(false);
  const [error,setError]=useState("");
  const [success,setSuccess]=useState("");
  const [newUser,setNewUser]=useState(null);
  const [profileType,setProfileType]=useState("");
  const [artistNameInput,setArtistNameInput]=useState("");
  const [artistProof,setArtistProof]=useState(null);
  const [pressCard,setPressCard]=useState("");
  const [media,setMedia]=useState("");
  const [pressDoc,setPressDoc]=useState(null);
  const [proRole,setProRole]=useState("");
  const [company,setCompany]=useState("");
  const [proDoc,setProDoc]=useState(null);
  const [genres,setGenres]=useState(["","","","",""]);
  const [motivation,setMotivation]=useState("");
  const [honeypot,setHoneypot]=useState("");
  const [formLoadTime]=useState(Date.now());
  const [loginAttempts,setLoginAttempts]=useState(()=>{
    const s=localStorage.getItem("crowdn_la");
    if(s){const d=JSON.parse(s);if(d.lu&&Date.now()<d.lu)return d;return{c:0,lu:null};}
    return{c:0,lu:null};
  });
  const allGenres=GENRES.map(g=>g.name);
  const isLocked=loginAttempts.lu&&Date.now()<loginAttempts.lu;
  const lockMin=isLocked?Math.ceil((loginAttempts.lu-Date.now())/60000):0;

  const validatePassword=(pwd)=>{
    if(pwd.length<8) return "8 caractères minimum";
    if(!/[A-Z]/.test(pwd)) return "Au moins une majuscule";
    if(!/[0-9]/.test(pwd)) return "Au moins un chiffre";
    return null;
  };

  const isBot=()=>honeypot||Date.now()-formLoadTime<2000;

  const handleLogin=async()=>{
    if(isLocked){setError(`Trop de tentatives. Réessaie dans ${lockMin} min.`);return;}
    if(!email||!password){setError("Email et mot de passe requis");return;}
    if(isBot()){setError("Vérification échouée");return;}
    setLoading(true);setError("");
    try{
      const{data,error}=await supabase.auth.signInWithPassword({email,password});
      if(error){
        const nc=loginAttempts.c+1;
        const nla=nc>=5?{c:nc,lu:Date.now()+5*60*1000}:{c:nc,lu:null};
        setLoginAttempts(nla);localStorage.setItem("crowdn_la",JSON.stringify(nla));
        if(nc>=5)setError("Trop de tentatives. Verrouillé 5 minutes.");
        else setError(`Email ou mot de passe incorrect (${5-nc} essai(s) restant(s))`);
        return;
      }
      localStorage.removeItem("crowdn_la");
      setLoginAttempts({c:0,lu:null});
      if(!data.user.email_confirmed_at){
        setError("Vérifie ton email avant de te connecter. Un lien de confirmation t'a été envoyé.");
        await supabase.auth.signOut();
        return;
      }
      const{data:profile}=await supabase.from("profiles").select("role,name,artist_name").eq("id",data.user.id).single();
      let finalRole=profile?.role||"user";
      if(data.user.email===ADMIN_EMAIL&&finalRole!=="admin"){
        await supabase.from("profiles").update({role:"admin"}).eq("id",data.user.id);
        finalRole="admin";
      }
      onLogin(finalRole,data.user,profile?.artist_name||null);
    }catch(e){setError("Erreur de connexion");}
    finally{setLoading(false);}
  };

  const handleSignup=async()=>{
    if(!email||!password||!name){setError("Tous les champs sont requis");return;}
    if(isBot()){setError("Vérification échouée");return;}
    const pwdErr=validatePassword(password);
    if(pwdErr){setError("Mot de passe : "+pwdErr);return;}
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){setError("Email invalide");return;}
    setLoading(true);setError("");
    try{
      const{data,error}=await supabase.auth.signUp({email,password});
      if(error){setError(error.message);return;}
      if(data.user){
        await supabase.from("profiles").upsert({id:data.user.id,name,email,role:"user"});
        setNewUser(data.user);
        setStep("profile");
      }
    }catch(e){setError("Erreur lors de la création du compte");}
    finally{setLoading(false);}
  };

  const sendEmail=async(to,subject,html)=>{
    try{await fetch("/api/send-email",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({to,subject,html})});}catch(e){}
  };

  const handleProfileComplete=async()=>{
    if(!profileType){setError("Choisis un profil");return;}
    if(profileType==="artist"&&!artistNameInput){setError("Ton nom d'artiste est requis");return;}
    setLoading(true);setError("");
    try{
      let docUrl="";
      const docFile=artistProof||pressDoc||proDoc;
      if(docFile&&newUser){
        const ext=docFile.name.split(".").pop();
        const path=`${newUser.id}/${Date.now()}.${ext}`;
        const{error:upErr}=await supabase.storage.from("jury-documents").upload(path,docFile);
        if(!upErr)docUrl=path;
      }

      if(profileType==="fan"){
        await supabase.auth.signOut();
        setSuccess("Compte créé ! Vérifie ton email pour activer ton compte. Ensuite connecte-toi.");
        setTimeout(()=>{setStep("auth");setMode("login");setSuccess("Email vérifié ? Connecte-toi !");},4000);
      } else {
        const profileLabels={artist:"Artiste",journalist:"Journaliste",music_pro:"Acteur de la musique"};
        await supabase.from("jury_applications").insert({
          name,email,
          profile_type:profileType,
          genre:profileType==="artist"?artistNameInput:genres.filter(g=>g).join(", "),
          motivation:profileType==="artist"?`Artiste: ${artistNameInput}`:motivation,
          status:"pending",
          document_url:docUrl||null
        });
        await sendEmail(email,"👑 Demande reçue — CROWDN",
          `<div style="font-family:sans-serif;max-width:500px;margin:0 auto;padding:32px;background:#0A0A0A;color:#F5F0E8;border:1px solid #C9A84C">
            <h1 style="color:#C9A84C;font-size:22px">CROWDN</h1>
            <p>Bonjour ${name},</p>
            <p>Ta demande de profil <strong>${profileLabels[profileType]}</strong> a bien été reçue.</p>
            <p>Notre équipe va vérifier tes informations. Tu recevras un email dès que ton profil sera validé.</p>
            <p>En attendant, tu peux déjà utiliser CROWDN avec un accès standard.</p>
            <p style="color:#C9A84C;margin-top:24px">— L'équipe CROWDN</p>
          </div>`
        );
        await sendEmail("contact@crowdn.fr","🔔 Nouvelle demande profil — CROWDN",
          `<div style="font-family:sans-serif;padding:20px">
            <h2>Nouvelle demande : ${profileLabels[profileType]}</h2>
            <p><strong>Nom :</strong> ${name}</p>
            <p><strong>Email :</strong> ${email}</p>
            <p><strong>Type :</strong> ${profileType}</p>
            ${profileType==="artist"?`<p><strong>Nom d'artiste :</strong> ${artistNameInput}</p>`:""}
            <p><strong>Document :</strong> ${docUrl?"Oui":"Non"}</p>
            <p><a href="https://crowdn.fr">Voir dans l'admin →</a></p>
          </div>`
        );
        await supabase.auth.signOut();
        setSuccess("Demande envoyée ! Vérifie ton email pour activer ton compte, puis connecte-toi.");
        setTimeout(()=>{setStep("auth");setMode("login");setSuccess("Email vérifié ? Connecte-toi !");},4000);
      }
    }catch(e){setError("Erreur");}
    finally{setLoading(false);}
  };

  if(step==="auth") return (
    <div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",padding:"100px 20px 80px",background:`radial-gradient(ellipse at 50% 50%,rgba(201,168,76,0.05) 0%,transparent 60%),#0A0A0A`}}>
      <div style={{width:"100%",maxWidth:400}}>
        <div style={{textAlign:"center",marginBottom:36}}>
          <Crown size={36}/>
          <div style={{marginTop:14,marginBottom:4}}><span style={{fontWeight:800,fontSize:18,letterSpacing:6,color:GOLD}}>CROWD</span><span className="fd" style={{fontSize:18,fontWeight:700,color:GOLD}}>N</span></div>
          <p style={{fontSize:9,letterSpacing:3,color:"#666",textTransform:"uppercase"}}>Couronné par la Foule</p>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:0,marginBottom:28,border:"1px solid rgba(201,168,76,0.2)"}}>
          {[["login","Connexion"],["signup","Créer un compte"]].map(([m,l])=>(
            <button key={m} onClick={()=>{setMode(m);setError("");setSuccess("");}}
              style={{padding:"12px",background:mode===m?"rgba(201,168,76,0.12)":"transparent",border:"none",color:mode===m?GOLD:"#888",cursor:"pointer",fontFamily:"'Montserrat',sans-serif",fontSize:10,fontWeight:700,letterSpacing:1.5,textTransform:"uppercase",transition:"all 0.2s"}}>{l}</button>
          ))}
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:12,marginBottom:20}}>
          {mode==="signup"&&<input className="ifield" placeholder="Ton nom complet" value={name} onChange={e=>setName(e.target.value)}/>}
          <input className="ifield" placeholder="ton@email.com" type="email" value={email} onChange={e=>setEmail(e.target.value)}/>
          <input className="ifield" type="password" placeholder={mode==="signup"?"Mot de passe (8 car. + majuscule + chiffre)":"Mot de passe"} value={password} onChange={e=>setPassword(e.target.value)}/>
          {/* Honeypot — invisible, seuls les bots le remplissent */}
          <input type="text" value={honeypot} onChange={e=>setHoneypot(e.target.value)} style={{position:"absolute",left:"-9999px",opacity:0,height:0}} tabIndex={-1} autoComplete="off" aria-hidden="true"/>
          {mode==="signup"&&password.length>0&&(
            <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
              <span style={{fontSize:9,padding:"2px 8px",background:password.length>=8?"rgba(76,200,100,0.1)":"rgba(255,50,50,0.1)",border:`1px solid ${password.length>=8?"rgba(76,200,100,0.3)":"rgba(255,50,50,0.3)"}`,color:password.length>=8?"#4CC864":"#FF5050"}}>{password.length>=8?"✓":"✗"} 8+ caractères</span>
              <span style={{fontSize:9,padding:"2px 8px",background:/[A-Z]/.test(password)?"rgba(76,200,100,0.1)":"rgba(255,50,50,0.1)",border:`1px solid ${/[A-Z]/.test(password)?"rgba(76,200,100,0.3)":"rgba(255,50,50,0.3)"}`,color:/[A-Z]/.test(password)?"#4CC864":"#FF5050"}}>{/[A-Z]/.test(password)?"✓":"✗"} Majuscule</span>
              <span style={{fontSize:9,padding:"2px 8px",background:/[0-9]/.test(password)?"rgba(76,200,100,0.1)":"rgba(255,50,50,0.1)",border:`1px solid ${/[0-9]/.test(password)?"rgba(76,200,100,0.3)":"rgba(255,50,50,0.3)"}`,color:/[0-9]/.test(password)?"#4CC864":"#FF5050"}}>{/[0-9]/.test(password)?"✓":"✗"} Chiffre</span>
            </div>
          )}
        </div>
        {isLocked&&<div style={{padding:"12px 14px",background:"rgba(255,50,50,0.08)",border:"1px solid rgba(255,50,50,0.25)",color:"#FF6060",fontSize:11,marginBottom:16,textAlign:"center"}}>🔒 Compte verrouillé — réessaie dans {lockMin} minute(s)</div>}
        {error&&<div style={{padding:"10px 14px",background:"rgba(255,50,50,0.08)",border:"1px solid rgba(255,50,50,0.25)",color:"#FF6060",fontSize:11,marginBottom:16}}>⚠️ {error}</div>}
        {success&&<div style={{padding:"10px 14px",background:"rgba(76,200,100,0.08)",border:"1px solid rgba(76,200,100,0.25)",color:"#4CC864",fontSize:11,marginBottom:16}}>✅ {success}</div>}
        <button className="bp" style={{width:"100%",padding:16,fontSize:11,letterSpacing:3,opacity:loading||isLocked?0.6:1}} onClick={mode==="login"?handleLogin:handleSignup} disabled={loading||isLocked}>
          {loading?"...":mode==="login"?"Connexion":"Créer mon compte →"}
        </button>
        {mode==="login"&&(
          <p style={{textAlign:"center",marginTop:16,fontSize:11,color:"#555"}}>
            Mot de passe oublié ?{" "}
            <span style={{color:GOLD,cursor:"pointer",fontWeight:600}} onClick={async()=>{
              if(!email){setError("Entre ton email d'abord");return;}
              await supabase.auth.resetPasswordForEmail(email,{redirectTo:"https://crowdn.fr"});
              setSuccess("Email de réinitialisation envoyé !");
            }}>Réinitialiser</span>
          </p>
        )}
      </div>
    </div>
  );

  return (
    <div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",padding:"100px 20px 80px",background:`radial-gradient(ellipse at 50% 50%,rgba(201,168,76,0.05) 0%,transparent 60%),#0A0A0A`}}>
      <div style={{width:"100%",maxWidth:500}}>
        <div style={{textAlign:"center",marginBottom:36}}>
          <Crown size={36}/>
          <p className="sl" style={{marginTop:16,marginBottom:8}}>Bienvenue, {name} 👑</p>
          <h2 className="fd" style={{fontSize:28,fontWeight:400,letterSpacing:2,marginBottom:8}}>Qui es-tu ?</h2>
          <p style={{fontSize:12,color:"#888",lineHeight:1.7}}>Ton expérience CROWDN sera adaptée à ton profil.</p>
        </div>
        <div className="gd" style={{marginBottom:28}}/>

        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:24}}>
          {[["fan","🎤","Fan","Je suis fan de concerts"],["artist","👑","Artiste","Je suis artiste / groupe"],["journalist","📰","Journaliste","Presse musicale"],["music_pro","🎶","Acteur musique","Manager, tourneur, label..."]].map(([val,ic,label,desc])=>(
            <button key={val} onClick={()=>setProfileType(val)} style={{padding:"16px",background:profileType===val?"rgba(201,168,76,0.12)":"rgba(255,255,255,0.03)",border:`1px solid ${profileType===val?"rgba(201,168,76,0.5)":"rgba(255,255,255,0.08)"}`,cursor:"pointer",textAlign:"center",transition:"all 0.2s"}}>
              <span style={{fontSize:24,display:"block",marginBottom:6}}>{ic}</span>
              <span style={{fontSize:10,fontWeight:700,letterSpacing:1.5,color:profileType===val?GOLD:"#888",fontFamily:"'Montserrat',sans-serif",textTransform:"uppercase",display:"block"}}>{label}</span>
              <p style={{fontSize:9,color:"#555",marginTop:4,fontWeight:400}}>{desc}</p>
            </button>
          ))}
        </div>

        {profileType==="artist"&&(
          <div style={{display:"flex",flexDirection:"column",gap:10,padding:"16px",background:"rgba(201,168,76,0.04)",border:"1px solid rgba(201,168,76,0.15)",marginBottom:20}}>
            <p style={{fontSize:11,color:GOLD,fontWeight:700}}>👑 Profil artiste</p>
            <input className="ifield" placeholder="Ton nom d'artiste / groupe *" value={artistNameInput} onChange={e=>setArtistNameInput(e.target.value)}/>
            <label style={{display:"flex",alignItems:"center",gap:10,padding:"12px",border:`2px dashed ${artistProof?"rgba(76,200,100,0.5)":"rgba(201,168,76,0.3)"}`,background:artistProof?"rgba(76,200,100,0.05)":"rgba(201,168,76,0.02)",cursor:"pointer"}}>
              <input type="file" accept="image/*,.pdf" style={{display:"none"}} onChange={e=>setArtistProof(e.target.files[0]||null)}/>
              <span style={{fontSize:18}}>{artistProof?"✅":"📎"}</span>
              <div><p style={{fontSize:11,fontWeight:600,color:artistProof?"#4CC864":GOLD}}>{artistProof?.name||"Preuve d'identité artiste"}</p><p style={{fontSize:9,color:"#666"}}>Screenshot DM Instagram vérifié, email label, photo avec papier CROWDN...</p></div>
            </label>
            <p style={{fontSize:9,color:"#555",lineHeight:1.6}}>Notre équipe vérifiera ton identité. En attendant, tu auras un accès standard.</p>
          </div>
        )}

        {profileType==="journalist"&&(
          <div style={{display:"flex",flexDirection:"column",gap:10,padding:"16px",background:"rgba(201,168,76,0.04)",border:"1px solid rgba(201,168,76,0.15)",marginBottom:20}}>
            <p style={{fontSize:11,color:GOLD,fontWeight:700}}>📰 Profil journaliste</p>
            <input className="ifield" placeholder="N° carte CCIJP (optionnel)" value={pressCard} onChange={e=>setPressCard(e.target.value)}/>
            <input className="ifield" placeholder="Média / Rédaction *" value={media} onChange={e=>setMedia(e.target.value)}/>
            <label style={{display:"flex",alignItems:"center",gap:10,padding:"12px",border:`2px dashed ${pressDoc?"rgba(76,200,100,0.5)":"rgba(201,168,76,0.3)"}`,background:pressDoc?"rgba(76,200,100,0.05)":"rgba(201,168,76,0.02)",cursor:"pointer"}}>
              <input type="file" accept="image/*,.pdf" style={{display:"none"}} onChange={e=>setPressDoc(e.target.files[0]||null)}/>
              <span style={{fontSize:18}}>{pressDoc?"✅":"📎"}</span>
              <div><p style={{fontSize:11,fontWeight:600,color:pressDoc?"#4CC864":GOLD}}>{pressDoc?.name||"Carte de presse ou justificatif"}</p><p style={{fontSize:9,color:"#666"}}>JPG, PNG ou PDF — supprimé après vérification (RGPD)</p></div>
            </label>
          </div>
        )}

        {profileType==="music_pro"&&(
          <div style={{display:"flex",flexDirection:"column",gap:10,padding:"16px",background:"rgba(201,168,76,0.04)",border:"1px solid rgba(201,168,76,0.15)",marginBottom:20}}>
            <p style={{fontSize:11,color:GOLD,fontWeight:700}}>🎶 Profil acteur de la musique</p>
            <select className="ifield" style={{cursor:"pointer"}} value={proRole} onChange={e=>setProRole(e.target.value)}>
              <option value="">Ton rôle *</option>
              <option>Manager / Agent artistique</option>
              <option>Tourneur / Promoteur</option>
              <option>Directeur artistique / Label</option>
              <option>Booker / Programmateur</option>
              <option>Ingénieur son / Technicien</option>
              <option>Intermittent du spectacle</option>
              <option>Autre professionnel</option>
            </select>
            <input className="ifield" placeholder="Structure / Entreprise *" value={company} onChange={e=>setCompany(e.target.value)}/>
            <label style={{display:"flex",alignItems:"center",gap:10,padding:"12px",border:`2px dashed ${proDoc?"rgba(76,200,100,0.5)":"rgba(201,168,76,0.3)"}`,background:proDoc?"rgba(76,200,100,0.05)":"rgba(201,168,76,0.02)",cursor:"pointer"}}>
              <input type="file" accept="image/*,.pdf" style={{display:"none"}} onChange={e=>setProDoc(e.target.files[0]||null)}/>
              <span style={{fontSize:18}}>{proDoc?"✅":"📎"}</span>
              <div><p style={{fontSize:11,fontWeight:600,color:proDoc?"#4CC864":GOLD}}>{proDoc?.name||"Justificatif professionnel"}</p><p style={{fontSize:9,color:"#666"}}>Contrat, fiche de paie, carte intermittent...</p></div>
            </label>
          </div>
        )}

        {profileType==="fan"&&(
          <div style={{display:"flex",flexDirection:"column",gap:10,padding:"16px",background:"rgba(201,168,76,0.04)",border:"1px solid rgba(201,168,76,0.15)",marginBottom:20}}>
            <p style={{fontSize:11,color:GOLD,fontWeight:700}}>🎵 Tes genres préférés</p>
            <p style={{fontSize:10,color:"#888"}}>Ça nous aide à personnaliser ton feed.</p>
            {[0,1,2,3,4].map(i=>(
              <select key={i} className="ifield" style={{cursor:"pointer"}} value={genres[i]||""} onChange={e=>{const g=[...genres];g[i]=e.target.value;setGenres(g);}}>
                <option value="">{i===0?"Genre favori":`Genre ${i+1}`}</option>
                {allGenres.filter(x=>x===genres[i]||!genres.includes(x)).map(x=><option key={x}>{x}</option>)}
              </select>
            ))}
          </div>
        )}

        {error&&<div style={{padding:"10px 14px",background:"rgba(255,50,50,0.08)",border:"1px solid rgba(255,50,50,0.25)",color:"#FF6060",fontSize:11,marginBottom:16}}>⚠️ {error}</div>}
        {success&&<div style={{padding:"10px 14px",background:"rgba(76,200,100,0.08)",border:"1px solid rgba(76,200,100,0.25)",color:"#4CC864",fontSize:11,marginBottom:16}}>✅ {success}</div>}
        <button className="bp" style={{width:"100%",padding:16,fontSize:11,letterSpacing:3,opacity:loading?0.6:1}} onClick={handleProfileComplete} disabled={loading}>
          {loading?"...":"Rejoindre CROWDN 👑"}
        </button>
      </div>
    </div>
  );
}

// ─── COOKIE BANNER ───────────────────────────────────────────────────────────
function CookieBanner({onAccept,onRefuse}) {
  return (
    <div style={{position:"fixed",bottom:0,left:0,right:0,zIndex:999,background:"rgba(10,10,10,0.98)",borderTop:"1px solid rgba(201,168,76,0.2)",padding:"20px 32px",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:16,backdropFilter:"blur(12px)"}}>
      <div style={{flex:1,minWidth:280}}>
        <p style={{fontSize:12,fontWeight:700,color:GOLD,marginBottom:6,letterSpacing:1}}>🍪 Cookies & Données</p>
        <p style={{fontSize:11,color:"#aaa",lineHeight:1.7}}>
          CROWDN utilise des cookies essentiels pour l'authentification et le fonctionnement de l'app. Aucune donnée n'est vendue à des tiers.{" "}
          <span style={{color:GOLD,cursor:"pointer",textDecoration:"underline"}} onClick={()=>{}}>En savoir plus</span>
        </p>
      </div>
      <div style={{display:"flex",gap:10,flexShrink:0}}>
        <button className="bo" style={{fontSize:10,padding:"10px 20px"}} onClick={onRefuse}>Refuser</button>
        <button className="bp" style={{fontSize:10,padding:"10px 20px"}} onClick={onAccept}>Accepter</button>
      </div>
    </div>
  );
}

// ─── MENTIONS LÉGALES ─────────────────────────────────────────────────────────
function MentionsLegales({nav}) {
  return (
    <div style={{padding:"100px 20px 80px",maxWidth:800,margin:"0 auto"}}>
      <p className="sl" style={{marginBottom:8}}>Légal</p>
      <h1 className="fd" style={{fontSize:"clamp(28px,5vw,40px)",fontWeight:400,letterSpacing:2,marginBottom:40}}>Mentions légales</h1>

      {[
        {title:"Éditeur du site",content:[
          "Nom de la plateforme : CROWDN",
          "Site web : www.crowdn.fr",
          "Statut : Projet en cours de création (MVP)",
          "Contact : contact@crowdn.fr",
        ]},
        {title:"Hébergement",content:[
          "Vercel Inc.",
          "340 Pine Street, Suite 900",
          "San Francisco, CA 94104, États-Unis",
          "https://vercel.com",
        ]},
        {title:"Base de données",content:[
          "Supabase Inc.",
          "970 Toa Payoh North, Singapour",
          "https://supabase.com",
          "Données hébergées en Europe (région West EU — Ireland)",
        ]},
        {title:"Propriété intellectuelle",content:[
          "L'ensemble du contenu de ce site (textes, visuels, logo, concept) est la propriété exclusive de CROWDN.",
          "Toute reproduction, même partielle, est interdite sans autorisation préalable.",
        ]},
        {title:"Responsabilité",content:[
          "CROWDN s'efforce d'assurer l'exactitude des informations publiées. Toutefois, la plateforme ne peut garantir l'exhaustivité des informations.",
          "CROWDN ne saurait être tenu responsable des dommages directs ou indirects résultant de l'utilisation du site.",
        ]},
        {title:"Droit applicable",content:[
          "Le présent site est soumis au droit français.",
          "En cas de litige, les tribunaux français seront seuls compétents.",
        ]},
      ].map((s,i)=>(
        <div key={i} style={{marginBottom:36}}>
          <h2 style={{fontSize:14,fontWeight:700,color:GOLD,letterSpacing:2,textTransform:"uppercase",marginBottom:14}}>{s.title}</h2>
          <div style={{background:"rgba(201,168,76,0.03)",border:"1px solid rgba(201,168,76,0.1)",padding:"18px 20px"}}>
            {s.content.map((line,j)=>(
              <p key={j} style={{fontSize:12,color:"#ccc",lineHeight:1.9,borderBottom:j<s.content.length-1?"1px solid rgba(255,255,255,0.04)":"none",paddingBottom:j<s.content.length-1?8:0,marginBottom:j<s.content.length-1?8:0}}>{line}</p>
            ))}
          </div>
        </div>
      ))}

      <button className="bo" style={{fontSize:10,padding:"10px 20px"}} onClick={()=>nav("home")}>← Retour</button>
    </div>
  );
}

// ─── POLITIQUE DE CONFIDENTIALITÉ ────────────────────────────────────────────
function PolitiqueConfidentialite({nav}) {
  return (
    <div style={{padding:"100px 20px 80px",maxWidth:800,margin:"0 auto"}}>
      <p className="sl" style={{marginBottom:8}}>RGPD</p>
      <h1 className="fd" style={{fontSize:"clamp(28px,5vw,40px)",fontWeight:400,letterSpacing:2,marginBottom:8}}>Politique de confidentialité</h1>
      <p style={{fontSize:12,color:"#777",marginBottom:40}}>Dernière mise à jour : {new Date().toLocaleDateString("fr-FR")}</p>

      {[
        {title:"1. Qui sommes-nous ?",content:"CROWDN est une plateforme d'évaluation de concerts live. Nous collectons et traitons des données personnelles dans le cadre de la création de comptes utilisateurs et de candidatures jury."},
        {title:"2. Données collectées",content:`Nous collectons les données suivantes :
• Données d'identification : nom, adresse email, mot de passe (chiffré)
• Données de profil : rôle (utilisateur / candidat jury), genres musicaux préférés
• Données professionnelles (jurés) : numéro de carte de presse, justificatifs professionnels
• Données de navigation : cookies essentiels pour l'authentification`},
        {title:"3. Finalité du traitement",content:`Vos données sont utilisées pour :
• Créer et gérer votre compte CROWDN
• Traiter votre candidature jury
• Vous envoyer des notifications liées à votre activité sur la plateforme
• Assurer la sécurité de la plateforme`},
        {title:"4. Base légale",content:`Le traitement de vos données repose sur :
• Votre consentement explicite lors de l'inscription
• L'exécution du contrat (utilisation de la plateforme)
• Le respect d'obligations légales`},
        {title:"5. Conservation des données",content:`• Données de compte : conservées tant que le compte est actif
• Documents de vérification jury (carte de presse, justificatifs) : supprimés immédiatement après vérification
• Données de candidature : conservées 1 an après la décision
• Logs de connexion : conservés 6 mois`},
        {title:"6. Partage des données",content:`Vos données ne sont jamais vendues à des tiers. Elles peuvent être partagées avec :
• Supabase (hébergement base de données — Europe)
• Vercel (hébergement application)
• Resend (envoi d'emails transactionnels)
Ces prestataires sont soumis à des engagements de confidentialité stricts.`},
        {title:"7. Vos droits",content:`Conformément au RGPD, vous disposez des droits suivants :
• Droit d'accès : obtenir une copie de vos données
• Droit de rectification : corriger vos données
• Droit à l'effacement : supprimer votre compte et vos données
• Droit à la portabilité : recevoir vos données dans un format lisible
• Droit d'opposition : vous opposer au traitement de vos données

Pour exercer ces droits : contact@crowdn.fr
Réponse garantie sous 30 jours.`},
        {title:"8. Cookies",content:`CROWDN utilise uniquement des cookies essentiels au fonctionnement :
• Cookie de session Supabase (authentification)
• Aucun cookie publicitaire
• Aucun cookie de tracking tiers
Vous pouvez refuser ces cookies mais certaines fonctionnalités ne seront plus disponibles.`},
        {title:"9. Sécurité",content:`Nous mettons en œuvre les mesures techniques suivantes :
• Chiffrement des mots de passe (bcrypt via Supabase Auth)
• Connexions HTTPS uniquement
• Row Level Security sur la base de données
• Variables d'environnement pour les clés sensibles`},
        {title:"10. Contact & réclamations",content:`Pour toute question relative à vos données personnelles :
Email : contact@crowdn.fr

Vous pouvez également déposer une réclamation auprès de la CNIL :
Commission Nationale de l'Informatique et des Libertés
3 Place de Fontenoy, 75007 Paris
www.cnil.fr`},
      ].map((s,i)=>(
        <div key={i} style={{marginBottom:32}}>
          <h2 style={{fontSize:13,fontWeight:700,color:GOLD,letterSpacing:1.5,textTransform:"uppercase",marginBottom:12}}>{s.title}</h2>
          <div style={{background:"rgba(201,168,76,0.03)",border:"1px solid rgba(201,168,76,0.1)",padding:"18px 20px"}}>
            <p style={{fontSize:12,color:"#ccc",lineHeight:1.9,whiteSpace:"pre-line"}}>{s.content}</p>
          </div>
        </div>
      ))}

      <button className="bo" style={{fontSize:10,padding:"10px 20px"}} onClick={()=>nav("home")}>← Retour</button>
    </div>
  );
}

// ─── CONDITIONS GÉNÉRALES D'UTILISATION ──────────────────────────────────────
function CGU({nav}) {
  return (
    <div style={{padding:"100px 20px 80px",maxWidth:800,margin:"0 auto"}}>
      <p className="sl" style={{marginBottom:8}}>Légal</p>
      <h1 className="fd" style={{fontSize:"clamp(28px,5vw,40px)",fontWeight:400,letterSpacing:2,marginBottom:8}}>Conditions générales d'utilisation</h1>
      <p style={{fontSize:12,color:"#777",marginBottom:40}}>Dernière mise à jour : {new Date().toLocaleDateString("fr-FR")}</p>

      {[
        {title:"1. Objet",content:"Les présentes Conditions Générales d'Utilisation (CGU) ont pour objet de définir les modalités d'accès et d'utilisation de la plateforme CROWDN accessible à l'adresse www.crowdn.fr. En accédant au site, l'utilisateur accepte sans réserve les présentes CGU."},
        {title:"2. Description du service",content:"CROWDN est une plateforme dédiée au live musical. Elle permet de consulter des concerts à venir, suivre des artistes, découvrir du contenu live exclusif, et participer à un système d'évaluation transparent des performances live. L'application est en cours de développement."},
        {title:"3. Inscription et comptes",content:"L'inscription est gratuite et ouverte à toute personne physique majeure. L'utilisateur s'engage à fournir des informations exactes. Quatre profils sont proposés : Fan, Artiste, Journaliste, Acteur de la musique. Les profils Artiste, Journaliste et Acteur de la musique sont soumis à vérification par l'équipe CROWDN."},
        {title:"4. Contenus utilisateurs",content:"Les artistes certifiés peuvent publier du contenu vidéo exclusivement live (extraits de concerts, backstage, tournée). Tout contenu publié doit respecter la législation en vigueur. CROWDN se réserve le droit de supprimer tout contenu inapproprié, illicite ou ne correspondant pas à la charte de la plateforme."},
        {title:"5. Système d'évaluation",content:"CROWDN met en place un système d'évaluation des concerts par un jury. Les critères d'évaluation sont publics et transparents. Les évaluations individuelles des jurés restent confidentielles. Seuls les résultats collectifs sont publiés. Les évaluations donnent lieu à une cérémonie annuelle de récompenses organisée par genre musical et catégorie de salle."},
        {title:"6. Billetterie",content:"CROWDN propose des liens de redirection vers des plateformes de billetterie tierces (Fnac Spectacles, Ticketmaster, etc.). CROWDN n'est pas vendeur de billets et ne peut être tenu responsable des transactions effectuées sur ces plateformes."},
        {title:"7. Propriété intellectuelle",content:"L'ensemble des éléments du site CROWDN (logo, design, textes, code, concept) est protégé par le droit de la propriété intellectuelle. Toute reproduction est interdite sans autorisation préalable. Les contenus publiés par les artistes restent leur propriété. En les publiant sur CROWDN, ils accordent une licence non-exclusive de diffusion sur la plateforme."},
        {title:"8. Données personnelles",content:"Le traitement des données personnelles est détaillé dans notre Politique de confidentialité. CROWDN s'engage à respecter le Règlement Général sur la Protection des Données (RGPD)."},
        {title:"9. Responsabilité",content:"CROWDN ne garantit pas la disponibilité permanente du service. CROWDN ne saurait être tenu responsable des informations inexactes concernant les concerts (dates, lieux, prix) qui relèvent de la responsabilité des organisateurs. L'utilisateur est seul responsable de l'utilisation qu'il fait de la plateforme."},
        {title:"10. Modification des CGU",content:"CROWDN se réserve le droit de modifier les présentes CGU à tout moment. Les utilisateurs seront informés de toute modification substantielle. La poursuite de l'utilisation du site vaut acceptation des CGU modifiées."},
        {title:"11. Droit applicable",content:"Les présentes CGU sont soumises au droit français. En cas de litige, et après tentative de résolution amiable, les tribunaux français seront seuls compétents."},
        {title:"12. Contact",content:"Pour toute question relative aux présentes CGU : contact@crowdn.fr"},
      ].map((s,i)=>(
        <div key={i} style={{marginBottom:28}}>
          <h2 style={{fontSize:13,fontWeight:700,color:GOLD,letterSpacing:1.5,marginBottom:10}}>{s.title}</h2>
          <p style={{fontSize:12,color:"#ccc",lineHeight:1.9}}>{s.content}</p>
        </div>
      ))}
      <button className="bo" style={{fontSize:10,padding:"10px 20px"}} onClick={()=>nav("home")}>← Retour</button>
    </div>
  );
}

function PublishMoment({user,nav,upcomingData=[]}) {
  const [artist,setArtist]=useState("");
  const [caption,setCaption]=useState("");
  const [concertTag,setConcertTag]=useState("");
  const [videoFile,setVideoFile]=useState(null);
  const [uploading,setUploading]=useState(false);
  const [success,setSuccess]=useState(false);
  const allArtists=[...new Set((upcomingData||[]).map(c=>c.artist))].sort();

  const handlePublish=async()=>{
    if(!videoFile||!artist)return;
    setUploading(true);
    try{
      const ext=videoFile.name.split(".").pop();
      const path=user.id+"/"+Date.now()+"."+ext;
      const{error}=await supabase.storage.from("moments").upload(path,videoFile);
      if(error){alert("Erreur upload");setUploading(false);return;}
      const{data:urlData}=supabase.storage.from("moments").getPublicUrl(path);
      await supabase.from("moments").insert({artist_name:artist,user_id:user.id,video_url:urlData.publicUrl,caption,concert_tag:concertTag||null});
      setSuccess(true);
      setTimeout(()=>nav("home"),2000);
    }catch(e){alert("Erreur");}
    finally{setUploading(false);}
  };

  if(success) return (
    <div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",padding:"100px 20px",textAlign:"center"}}>
      <div>
        <div style={{fontSize:48,marginBottom:16}}>👑</div>
        <h2 className="fd" style={{fontSize:24,fontWeight:400,letterSpacing:2,marginBottom:8}}>Moment publié !</h2>
        <p style={{fontSize:12,color:"#888"}}>Ton contenu live est en ligne</p>
      </div>
    </div>
  );

  return (
    <div style={{padding:"100px 20px 100px",maxWidth:500,margin:"0 auto"}}>
      <div style={{textAlign:"center",marginBottom:28}}>
        <Crown size={32}/>
        <h1 className="fd" style={{fontSize:24,fontWeight:400,letterSpacing:2,marginTop:12,marginBottom:6}}>Publier un Moment</h1>
        <p style={{fontSize:11,color:"#888"}}>Partage un contenu 100% live</p>
      </div>

      <div style={{display:"flex",flexDirection:"column",gap:14}}>
        {/* Artiste obligatoire */}
        <div>
          <p style={{fontSize:9,color:GOLD,letterSpacing:2,fontWeight:700,textTransform:"uppercase",marginBottom:6}}>Artiste *</p>
          <select className="ifield" value={artist} onChange={e=>{setArtist(e.target.value);setConcertTag("");}} style={{cursor:"pointer"}}>
            <option value="">Choisis l'artiste</option>
            {allArtists.map(a=><option key={a} value={a}>{a}</option>)}
          </select>
        </div>

        {/* Vidéo — 2 modes */}
        <div>
          <p style={{fontSize:9,color:GOLD,letterSpacing:2,fontWeight:700,textTransform:"uppercase",marginBottom:6}}>Vidéo *</p>
          {!videoFile?(
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
              {/* Mode Snapchat — caméra arrière */}
              <label style={{display:"flex",flexDirection:"column",alignItems:"center",gap:8,padding:"24px 12px",border:"2px dashed rgba(201,168,76,0.3)",background:"rgba(201,168,76,0.02)",cursor:"pointer",textAlign:"center"}}>
                <input type="file" accept="video/*" capture="environment" style={{display:"none"}} onChange={e=>setVideoFile(e.target.files[0]||null)}/>
                <span style={{fontSize:32}}>📹</span>
                <span style={{fontSize:11,fontWeight:700,color:GOLD}}>Filmer</span>
                <span style={{fontSize:8,color:"#666"}}>Ouvre ta caméra</span>
              </label>
              {/* Mode selfie — caméra avant */}
              <label style={{display:"flex",flexDirection:"column",alignItems:"center",gap:8,padding:"24px 12px",border:"2px dashed rgba(201,168,76,0.3)",background:"rgba(201,168,76,0.02)",cursor:"pointer",textAlign:"center"}}>
                <input type="file" accept="video/*" capture="user" style={{display:"none"}} onChange={e=>setVideoFile(e.target.files[0]||null)}/>
                <span style={{fontSize:32}}>🤳</span>
                <span style={{fontSize:11,fontWeight:700,color:GOLD}}>Réaction</span>
                <span style={{fontSize:8,color:"#666"}}>Caméra selfie</span>
              </label>
            </div>
          ):(
            <div style={{display:"flex",alignItems:"center",gap:12,padding:"14px",border:"2px solid rgba(76,200,100,0.4)",background:"rgba(76,200,100,0.03)"}}>
              <span style={{fontSize:24}}>✅</span>
              <div style={{flex:1}}>
                <p style={{fontSize:11,fontWeight:600,color:"#4CC864"}}>{videoFile.name}</p>
                <p style={{fontSize:9,color:"#666"}}>{(videoFile.size/1024/1024).toFixed(1)} MB</p>
              </div>
              <button onClick={()=>setVideoFile(null)} style={{background:"none",border:"1px solid rgba(255,50,50,0.3)",color:"#FF5050",fontSize:9,padding:"4px 10px",cursor:"pointer",fontFamily:"'Montserrat',sans-serif",fontWeight:700}}>Changer</button>
            </div>
          )}
          {/* Importer depuis galerie */}
          {!videoFile&&(
            <label style={{display:"flex",alignItems:"center",gap:10,padding:"12px",border:"1px solid rgba(255,255,255,0.08)",background:"rgba(255,255,255,0.02)",cursor:"pointer",marginTop:8}}>
              <input type="file" accept="video/*" style={{display:"none"}} onChange={e=>setVideoFile(e.target.files[0]||null)}/>
              <span style={{fontSize:18}}>📁</span>
              <div><p style={{fontSize:10,color:"#888"}}>Importer depuis ta galerie</p><p style={{fontSize:8,color:"#555"}}>MP4, MOV — max 100MB</p></div>
            </label>
          )}
        </div>

        {/* Caption */}
        <div>
          <p style={{fontSize:9,color:GOLD,letterSpacing:2,fontWeight:700,textTransform:"uppercase",marginBottom:6}}>Caption</p>
          <input className="ifield" placeholder="Ex: Ambiance de fou à l'Accor Arena 🔥" value={caption} onChange={e=>setCaption(e.target.value)}/>
        </div>

        {/* Lier à un concert */}
        {artist&&(
        <div>
          <p style={{fontSize:9,color:GOLD,letterSpacing:2,fontWeight:700,textTransform:"uppercase",marginBottom:6}}>Concert (optionnel)</p>
          <select className="ifield" value={concertTag} onChange={e=>setConcertTag(e.target.value)} style={{cursor:"pointer"}}>
            <option value="">Aucun concert spécifique</option>
            {(upcomingData||[]).filter(c=>c.artist===artist).map(c=><option key={c.id} value={c.venue+" — "+c.date}>{c.venue} — {c.date}</option>)}
          </select>
        </div>
        )}

        <button className="bp" style={{width:"100%",padding:16,fontSize:11,letterSpacing:3,marginTop:8,opacity:(!videoFile||!artist||uploading)?0.5:1}} onClick={handlePublish} disabled={!videoFile||!artist||uploading}>
          {uploading?"Upload en cours...":"Publier mon Moment 👑"}
        </button>
        <button className="bo" style={{width:"100%",padding:12,fontSize:10,letterSpacing:2}} onClick={()=>nav("home")}>Annuler</button>
      </div>
    </div>
  );
}

function ArtistDash({user,artistName,artistImages={},upcomingData=[]}) {
  const [moments,setMoments]=useState([]);
  const [showUpload,setShowUpload]=useState(false);
  const [caption,setCaption]=useState("");
  const [concertTag,setConcertTag]=useState("");
  const [videoFile,setVideoFile]=useState(null);
  const [uploading,setUploading]=useState(false);
  const [toast,setToast]=useState("");
  const [followersCount,setFollowersCount]=useState(0);
  const [showSuggest,setShowSuggest]=useState(false);
  const [sugDate,setSugDate]=useState("");
  const [sugCity,setSugCity]=useState("");
  const [sugVenue,setSugVenue]=useState("");
  const [sugCat,setSugCat]=useState("Olympia Class");
  const show=msg=>{setToast(msg);setTimeout(()=>setToast(""),2500);};

  const myConcerts=upcomingData.filter(c=>c.artist===artistName);

  useEffect(()=>{
    async function load(){
      const{data:m}=await supabase.from("moments").select("*").eq("artist_name",artistName).order("created_at",{ascending:false});
      if(m)setMoments(m);
      const{data:f}=await supabase.from("user_follows").select("id").eq("artist_name",artistName);
      if(f)setFollowersCount(f.length);
    }
    if(artistName)load();
  },[artistName]);

  const uploadMoment=async()=>{
    if(!videoFile){show("Sélectionne une vidéo");return;}
    setUploading(true);
    try{
      const ext=videoFile.name.split(".").pop();
      const path=`${artistName.replace(/\s/g,"_")}/${Date.now()}.${ext}`;
      const{error:upErr}=await supabase.storage.from("moments").upload(path,videoFile);
      if(upErr){show("Erreur upload");setUploading(false);return;}
      const{data:urlData}=supabase.storage.from("moments").getPublicUrl(path);
      await supabase.from("moments").insert({
        artist_name:artistName,
        user_id:user.id,
        video_url:urlData.publicUrl,
        caption,
        concert_tag:concertTag||null
      });
      show("Moment publié ✓");
      setCaption("");setConcertTag("");setVideoFile(null);setShowUpload(false);
      const{data:m}=await supabase.from("moments").select("*").eq("artist_name",artistName).order("created_at",{ascending:false});
      if(m)setMoments(m);
    }catch(e){show("Erreur");}
    finally{setUploading(false);}
  };

  return (
    <div style={{padding:"100px 20px 80px",maxWidth:700,margin:"0 auto"}}>
      <div style={{textAlign:"center",marginBottom:32}}>
        <div style={{margin:"0 auto 12px"}}><ArtistImg name={artistName} size={72} images={artistImages}/></div>
        <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:8,marginBottom:4}}>
          <h1 className="fd" style={{fontSize:"clamp(24px,5vw,36px)",fontWeight:400,letterSpacing:2}}>{artistName}</h1>
          <CrownBadge size={22}/>
        </div>
        <p style={{fontSize:9,color:GOLD,letterSpacing:3,textTransform:"uppercase",fontWeight:700}}>Artiste certifié CROWDN</p>
        <div style={{display:"flex",gap:24,justifyContent:"center",margin:"16px 0"}}>
          <div style={{textAlign:"center"}}><div className="fd gt" style={{fontSize:22,fontWeight:700}}>{followersCount}</div><div style={{fontSize:9,color:"#666",letterSpacing:2,textTransform:"uppercase"}}>Followers</div></div>
          <div style={{textAlign:"center"}}><div className="fd gt" style={{fontSize:22,fontWeight:700}}>{moments.length}</div><div style={{fontSize:9,color:"#666",letterSpacing:2,textTransform:"uppercase"}}>Moments</div></div>
          <div style={{textAlign:"center"}}><div className="fd gt" style={{fontSize:22,fontWeight:700}}>{myConcerts.length}</div><div style={{fontSize:9,color:"#666",letterSpacing:2,textTransform:"uppercase"}}>Concerts</div></div>
        </div>
      </div>

      <div style={{height:1,background:"linear-gradient(to right,transparent,rgba(201,168,76,0.2),transparent)",margin:"20px 0"}}/>

      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
        <p style={{fontSize:9,color:GOLD,letterSpacing:3,textTransform:"uppercase",fontWeight:700}}>Mes Moments</p>
        <button className="bp" style={{fontSize:9,padding:"8px 16px"}} onClick={()=>setShowUpload(!showUpload)}>+ Publier un Moment</button>
      </div>

      {showUpload&&(
        <div style={{background:"rgba(201,168,76,0.04)",border:"1px solid rgba(201,168,76,0.2)",padding:20,marginBottom:16}}>
          <p className="sl" style={{marginBottom:12}}>Nouveau Moment live</p>
          <label onClick={()=>document.getElementById("moment-video").click()} style={{display:"flex",alignItems:"center",gap:12,padding:"14px 18px",background:"rgba(201,168,76,0.06)",border:"1px dashed rgba(201,168,76,0.3)",cursor:"pointer",marginBottom:10}}>
            <input id="moment-video" type="file" accept="video/*" style={{display:"none"}} onChange={e=>setVideoFile(e.target.files[0]||null)}/>
            <span style={{fontSize:22}}>{videoFile?"✅":"🎬"}</span>
            <div><p style={{fontSize:11,fontWeight:600,color:videoFile?"#4CC864":GOLD}}>{videoFile?.name||"Sélectionner une vidéo"}</p><p style={{fontSize:9,color:"#666"}}>MP4, MOV — max 100MB</p></div>
          </label>
          <input className="ifield" placeholder="Caption (ex: Backstage Accor Arena 🔥)" value={caption} onChange={e=>setCaption(e.target.value)} style={{marginBottom:8}}/>
          <select className="ifield" style={{cursor:"pointer",marginBottom:12}} value={concertTag} onChange={e=>setConcertTag(e.target.value)}>
            <option value="">Lier à un concert (optionnel)</option>
            {myConcerts.map(c=><option key={c.id} value={`${c.venue} - ${c.date}`}>{c.venue} — {c.date}</option>)}
          </select>
          <div style={{display:"flex",gap:10}}>
            <button className="bp" style={{fontSize:10,padding:"10px 20px",opacity:uploading?0.6:1}} onClick={uploadMoment} disabled={uploading}>{uploading?"Upload en cours...":"Publier ✓"}</button>
            <button className="bo" style={{fontSize:10,padding:"10px 20px"}} onClick={()=>setShowUpload(false)}>Annuler</button>
          </div>
        </div>
      )}

      {moments.length===0&&!showUpload&&<p style={{textAlign:"center",color:"#555",padding:32,fontSize:12}}>Aucun Moment publié. Partage ton premier contenu live !</p>}
      {moments.map(m=>(
        <div key={m.id} style={{background:BG2,border:"1px solid rgba(201,168,76,0.08)",padding:14,marginBottom:8}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
            <div>
              <p style={{fontWeight:600,fontSize:12}}>{m.caption||"Moment live"}</p>
              {m.concert_tag&&<p style={{fontSize:10,color:"#888"}}>📍 {m.concert_tag}</p>}
            </div>
            <div style={{textAlign:"right"}}>
              <p style={{fontSize:10,color:GOLD}}>{m.views} vues · {m.likes} likes</p>
              <p style={{fontSize:9,color:"#555"}}>{new Date(m.created_at).toLocaleDateString("fr-FR")}</p>
            </div>
          </div>
          <video src={m.video_url} style={{width:"100%",maxHeight:200,objectFit:"cover",background:"#111"}} controls preload="metadata"/>
        </div>
      ))}

      <div style={{height:1,background:"linear-gradient(to right,transparent,rgba(201,168,76,0.2),transparent)",margin:"20px 0"}}/>

      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
        <p style={{fontSize:9,color:GOLD,letterSpacing:3,textTransform:"uppercase",fontWeight:700}}>Mes concerts à venir</p>
        <button className="bo" style={{fontSize:8,padding:"6px 12px"}} onClick={()=>{const f=document.getElementById("suggest-form");if(f)f.style.display=f.style.display==="none"?"block":"block";setShowSuggest&&setShowSuggest(true);}}>+ Ajouter une date</button>
      </div>
      {showSuggest&&(
        <div id="suggest-form" style={{background:"rgba(201,168,76,0.04)",border:"1px solid rgba(201,168,76,0.2)",padding:20,marginBottom:16}}>
          <p className="sl" style={{marginBottom:12}}>Suggérer un concert</p>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:12}}>
            <input className="ifield" type="date" value={sugDate} onChange={e=>setSugDate(e.target.value)}/>
            <input className="ifield" placeholder="Ville" value={sugCity} onChange={e=>setSugCity(e.target.value)}/>
            <input className="ifield" placeholder="Salle" value={sugVenue} onChange={e=>setSugVenue(e.target.value)}/>
            <select className="ifield" value={sugCat} onChange={e=>setSugCat(e.target.value)} style={{cursor:"pointer"}}>
              <option>Olympia Class</option><option>Zenith Class</option><option>Arena Class</option><option>Stadium Class</option>
            </select>
          </div>
          <div style={{display:"flex",gap:10}}>
            <button className="bp" style={{fontSize:10,padding:"10px 20px"}} onClick={async()=>{
              if(!sugDate||!sugCity||!sugVenue){show("Remplis tous les champs");return;}
              const months={"01":"Jan","02":"Fév","03":"Mar","04":"Avr","05":"Mai","06":"Juin","07":"Juil","08":"Août","09":"Sep","10":"Oct","11":"Nov","12":"Déc"};
              const d=sugDate.split("-");
              const dateFr=`${parseInt(d[2])} ${months[d[1]]} ${d[0]}`;
              const genre=myConcerts[0]?.genre||"Pop";
              await supabase.from("concert_suggestions").insert({artist_name:artistName,user_id:user.id,date:dateFr,city:sugCity,venue:sugVenue,category:sugCat,genre});
              show("Concert suggéré — en attente de validation ✓");
              setSugDate("");setSugCity("");setSugVenue("");setShowSuggest(false);
            }}>Envoyer</button>
            <button className="bo" style={{fontSize:10,padding:"10px 20px"}} onClick={()=>setShowSuggest(false)}>Annuler</button>
          </div>
        </div>
      )}
      {myConcerts.length===0?<p style={{textAlign:"center",color:"#555",padding:20,fontSize:12}}>Aucun concert programmé</p>:
      myConcerts.map(c=>(
        <div key={c.id} style={{display:"flex",alignItems:"center",gap:12,padding:"12px 14px",background:BG2,border:"1px solid rgba(201,168,76,0.08)",marginBottom:6}}>
          <div style={{flex:1}}>
            <p style={{fontWeight:600,fontSize:13}}>{c.venue}</p>
            <p style={{fontSize:10,color:"#888"}}>{c.date} · {c.city}</p>
          </div>
          <span className="tag" style={{fontSize:8}}>{c.category}</span>
        </div>
      ))}

      {toast&&<div className="toast">{toast}</div>}
    </div>
  );
}

function JuryDash({user}) {
  const [scores,setScores]=useState([7,8,7,9,8,8]);
  const [comment,setComment]=useState("");
  const [submitted,setSubmitted]=useState(false);
  const [saving,setSaving]=useState(false);
  const avg=(scores.reduce((a,b)=>a+b,0)/scores.length).toFixed(1);

  const handleSubmitRating=async(concertId)=>{
    setSaving(true);
    try{
      await supabase.from("jury_ratings").insert({
        concert_id:concertId||1,
        jury_id:user?.id,
        performance:scores[0],
        scenographie:scores[1],
        interaction:scores[2],
        atmosphere:scores[3],
        direction:scores[4],
        setlist:scores[5],
        comment
      });
      setSubmitted(true);
    }catch(e){console.error(e);}
    finally{setSaving(false);}
  };
  return (
    <div style={{padding:"100px 20px 80px",maxWidth:680,margin:"0 auto"}}>
      <span style={{padding:"4px 12px",background:"rgba(201,168,76,0.1)",border:"1px solid rgba(201,168,76,0.3)",fontSize:9,letterSpacing:2,color:GOLD,textTransform:"uppercase",fontWeight:600}}>⭐ Accès Juré</span>
      <h1 className="fd" style={{fontSize:"clamp(24px,5vw,36px)",fontWeight:400,letterSpacing:2,marginBottom:32,marginTop:8}}>Tableau de Bord</h1>
      <p className="sl" style={{marginBottom:12}}>Concerts assignés</p>
      {UPCOMING_DEFAULT.slice(0,3).map(c=>(
        <div key={c.id} style={{background:BG2,border:"1px solid rgba(201,168,76,0.1)",padding:"14px 18px",marginBottom:8,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <div style={{display:"flex",alignItems:"center",gap:12}}><ArtistImg name={c.artist} fallback={c.img} size={28} images={{}}/><div><p style={{fontWeight:700,fontSize:13}}>{c.artist}</p><p style={{fontSize:11,color:"#888",display:"flex",alignItems:"center",gap:4}}>{c.date} · {c.city} · <GenreIcon name={c.genre} size={12}/>{c.genre}</p></div></div>
          <span className="ub" style={{fontSize:8}}><span className="ld"/>{c.daysLeft}j</span>
        </div>
      ))}
      <div style={{marginTop:32}}>
        {!submitted?(
          <div style={{background:BG2,border:"1px solid rgba(201,168,76,0.12)",padding:24}}>
            <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:4}}><span style={{fontSize:24}}>👑</span><div><p style={{fontWeight:700,fontSize:14}}>Kendrick Lamar</p><p style={{fontSize:11,color:"#888"}}>4 Juil 2025 · Bordeaux</p></div></div>
            <p style={{fontSize:11,color:"#666",marginBottom:20,paddingLeft:36}}>Zenith Class</p>
            <p className="sl" style={{marginBottom:16}}>Notation privée</p>
            {CRITERIA.map((c,i)=>(
              <div key={c.name} className="crow">
                <div style={{display:"flex",alignItems:"center",gap:8,flex:1,minWidth:0}}><span style={{fontSize:14,flexShrink:0}}>{c.icon}</span><span style={{fontSize:11,color:"#ccc",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{c.name}</span></div>
                <div style={{display:"flex",gap:3,flexShrink:0}}>
                  {[1,2,3,4,5,6,7,8,9,10].map(n=>(
                    <button key={n} style={{width:22,height:22,background:scores[i]>=n?"rgba(201,168,76,0.3)":"rgba(255,255,255,0.04)",border:`1px solid ${scores[i]>=n?GOLD:"rgba(255,255,255,0.08)"}`,cursor:"pointer",fontSize:9,color:scores[i]>=n?GOLD:"#555",fontFamily:"'Montserrat',sans-serif",fontWeight:700,transition:"all 0.1s"}} onClick={()=>{const ns=[...scores];ns[i]=n;setScores(ns);}}>{n}</button>
                  ))}
                </div>
              </div>
            ))}
            <div style={{margin:"20px 0 0"}}>
              <label className="sl" style={{display:"block",marginBottom:10}}>Commentaire privé</label>
              <textarea className="ifield" rows={3} placeholder="Vos observations (confidentielles)..." value={comment} onChange={e=>setComment(e.target.value)} style={{resize:"vertical"}}/>
            </div>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:20}}>
              <div><p style={{fontSize:11,color:"#888"}}>Moyenne</p><p className="fd gt" style={{fontSize:28,fontWeight:700}}>{avg}</p></div>
              <button className="bp" style={{padding:"14px 28px",fontSize:11,letterSpacing:2,opacity:saving?0.6:1}} onClick={()=>handleSubmitRating(1)} disabled={saving}>{saving?"...":"Soumettre"}</button>
            </div>
          </div>
        ):(
          <div style={{background:"rgba(201,168,76,0.05)",border:"1px solid rgba(201,168,76,0.25)",padding:"40px 24px",textAlign:"center",animation:"fadeUp 0.5s ease"}}>
            <Crown size={32}/>
            <p className="fd" style={{fontSize:22,marginTop:20,marginBottom:8,letterSpacing:2}}>Note soumise</p>
            <p style={{fontSize:12,color:"#888"}}>Score confidentiel · Résultat collectif publié après clôture</p>
            <button className="bo" style={{marginTop:24,fontSize:10,padding:"10px 24px"}} onClick={()=>setSubmitted(false)}>Nouvelle notation</button>
          </div>
        )}
      </div>
    </div>
  );
}

function AdminDash({upcomingData,pastData,onRefresh}) {
  const [tab,setTab]=useState("upcoming");
  const [toast,setToast]=useState("");
  const [applications,setApplications]=useState([]);
  const [loading,setLoading]=useState(true);
  const [showAddForm,setShowAddForm]=useState(false);
  const [newConcert,setNewConcert]=useState({artist:"",date:"",city:"",venue:"",category:"Olympia Class",genre:"Hip-Hop",img:"🎤"});
  const [saving,setSaving]=useState(false);
  const [suggestions,setSuggestions]=useState([]);
  const [users,setUsers]=useState([]);
  const [certifiedList,setCertifiedList]=useState([]);
  const show=msg=>{setToast(msg);setTimeout(()=>setToast(""),2500);};

  useEffect(()=>{
    async function fetchApps(){
      const{data}=await supabase.from("jury_applications").select("*").order("created_at",{ascending:false});
      if(data)setApplications(data);
      const{data:sug}=await supabase.from("concert_suggestions").select("*").eq("status","pending").order("created_at",{ascending:false});
      if(sug)setSuggestions(sug);
      const{data:usrs}=await supabase.from("profiles").select("*").order("name");
      if(usrs)setUsers(usrs);
      const{data:cert}=await supabase.from("certified_artists").select("*");
      if(cert)setCertifiedList(cert);
      setLoading(false);
    }
    fetchApps();
  },[]);

  const approveSuggestion=async(s)=>{
    await supabase.from("upcoming_concerts").insert({artist:s.artist_name,date:s.date,city:s.city,venue:s.venue,category:s.category,genre:s.genre,img:"🎵"});
    await supabase.from("concert_suggestions").update({status:"approved"}).eq("id",s.id);
    setSuggestions(prev=>prev.filter(x=>x.id!==s.id));
    show("Concert approuvé ✓");
    if(onRefresh)onRefresh();
  };

  const rejectSuggestion=async(id)=>{
    await supabase.from("concert_suggestions").update({status:"rejected"}).eq("id",id);
    setSuggestions(prev=>prev.filter(x=>x.id!==id));
    show("Suggestion refusée");
  };

  const changeRole=async(userId,newRole,artistName)=>{
    const update={role:newRole};
    if(newRole==="artist"&&artistName)update.artist_name=artistName;
    if(newRole!=="artist")update.artist_name=null;
    await supabase.from("profiles").update(update).eq("id",userId);
    if(newRole==="artist"&&artistName){
      await supabase.from("certified_artists").upsert({artist_name:artistName,certification_proof:"admin_certified",notes:"Certifié via admin"},{onConflict:"artist_name"});
      const{data:cert}=await supabase.from("certified_artists").select("*");
      if(cert)setCertifiedList(cert);
    }
    setUsers(prev=>prev.map(u=>u.id===userId?{...u,role:newRole,artist_name:newRole==="artist"?artistName:null}:u));
    show(`Rôle changé → ${newRole} ✓`);
  };

  const removeCertification=async(artistName)=>{
    await supabase.from("certified_artists").delete().eq("artist_name",artistName);
    setCertifiedList(prev=>prev.filter(c=>c.artist_name!==artistName));
    show("Certification retirée ✓");
  };

  const updateStatus=async(id,status)=>{
    await supabase.from("jury_applications").update({status}).eq("id",id);
    const app=applications.find(a=>a.id===id);
    setApplications(prev=>prev.map(a=>a.id===id?{...a,status}:a));
    if(app){
      const sendEmail=async(to,subject,html)=>{
        try{await fetch("/api/send-email",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({to,subject,html})});}catch(e){}
      };
      if(status==="validated"){
        await sendEmail(app.email,"🎉 Candidature validée — CROWDN",
          `<div style="font-family:sans-serif;max-width:500px;margin:0 auto;padding:32px;background:#0A0A0A;color:#F5F0E8;border:1px solid #C9A84C">
            <h1 style="color:#C9A84C;font-size:22px;margin-bottom:16px">CROWDN</h1>
            <p>Bonjour ${app.name},</p>
            <p>Félicitations ! Votre candidature jury a été <strong style="color:#4CC864">validée</strong>.</p>
            <p>Vous faites désormais partie du panel de jurés certifiés CROWDN.</p>
            <p>Connectez-vous sur <a href="https://crowdn.fr" style="color:#C9A84C">crowdn.fr</a> pour accéder à votre espace juré.</p>
            <p style="color:#C9A84C;margin-top:24px">— L'équipe CROWDN</p>
            <p style="font-size:11px;color:#666;margin-top:16px">Couronné par la Foule · crowdn.fr</p>
          </div>`
        );
      } else {
        await sendEmail(app.email,"Candidature CROWDN — Mise à jour",
          `<div style="font-family:sans-serif;max-width:500px;margin:0 auto;padding:32px;background:#0A0A0A;color:#F5F0E8;border:1px solid #C9A84C">
            <h1 style="color:#C9A84C;font-size:22px;margin-bottom:16px">CROWDN</h1>
            <p>Bonjour ${app.name},</p>
            <p>Nous vous remercions pour votre candidature au jury CROWDN.</p>
            <p>Après examen, nous ne sommes pas en mesure de retenir votre profil pour cette session.</p>
            <p>Vous pouvez candidater à nouveau lors de la prochaine session d'ouverture.</p>
            <p style="color:#C9A84C;margin-top:24px">— L'équipe CROWDN</p>
            <p style="font-size:11px;color:#666;margin-top:16px">Couronné par la Foule · crowdn.fr</p>
          </div>`
        );
      }
    }
    show(status==="validated"?"Juré validé ✓ — Email envoyé":"Candidature refusée — Email envoyé");
  };

  const viewDocument=async(docUrl)=>{
    if(!docUrl){show("Pas de document");return;}
    const{data}=await supabase.storage.from("jury-documents").createSignedUrl(docUrl,60);
    if(data?.signedUrl)window.open(data.signedUrl,"_blank");
    else show("Erreur d'accès au document");
  };

  const deleteDocument=async(id,docUrl)=>{
    if(!docUrl)return;
    await supabase.storage.from("jury-documents").remove([docUrl]);
    await supabase.from("jury_applications").update({document_url:null}).eq("id",id);
    setApplications(prev=>prev.map(a=>a.id===id?{...a,document_url:null}:a));
    show("Document supprimé — RGPD ✓");
  };

  const addConcert=async()=>{
    if(!newConcert.artist||!newConcert.date||!newConcert.city||!newConcert.venue){show("Remplis tous les champs");return;}
    setSaving(true);
    try{
      const months={"01":"Jan","02":"Fév","03":"Mar","04":"Avr","05":"Mai","06":"Juin","07":"Juil","08":"Août","09":"Sep","10":"Oct","11":"Nov","12":"Déc"};
      const d=newConcert.date.split("-");
      const dateFr=`${parseInt(d[2])} ${months[d[1]]} ${d[0]}`;
      await supabase.from("upcoming_concerts").insert({artist:newConcert.artist,date:dateFr,city:newConcert.city,venue:newConcert.venue,category:newConcert.category,genre:newConcert.genre,img:newConcert.img||"🎵"});
      show("Concert ajouté ✓");
      setNewConcert({artist:"",date:"",city:"",venue:"",category:"Olympia Class",genre:"Hip-Hop",img:"🎤"});
      setShowAddForm(false);
      if(onRefresh)onRefresh();
    }catch(e){show("Erreur");}
    finally{setSaving(false);}
  };

  const deleteConcert=async(id)=>{
    if(!window.confirm("Supprimer ce concert ?"))return;
    await supabase.from("upcoming_concerts").delete().eq("id",id);
    show("Concert supprimé ✓");
    if(onRefresh)onRefresh();
  };

  const U=upcomingData||UPCOMING_DEFAULT;
  const P=pastData||PAST_DEFAULT;

  return (
    <div style={{padding:"100px 20px 80px",maxWidth:960,margin:"0 auto"}}>
      <span style={{padding:"4px 12px",background:"rgba(201,168,76,0.1)",border:"1px solid rgba(201,168,76,0.3)",fontSize:9,letterSpacing:2,color:GOLD,textTransform:"uppercase",fontWeight:600}}>🔑 Administration</span>
      <h1 className="fd" style={{fontSize:"clamp(24px,5vw,36px)",fontWeight:400,letterSpacing:2,marginBottom:32,marginTop:8}}>Back Office CROWDN</h1>
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:10,marginBottom:32}}>
        {[[String(U.length),"À venir","🎵"],[String(P.length),"Passés","🎭"],[String(applications.length),"Candidats","⭐"],[String(applications.filter(a=>a.status==="validated").length),"Jurés","👥"]].map(([n,l,ic])=>(
          <div key={l} style={{background:BG2,border:"1px solid rgba(201,168,76,0.08)",padding:"16px",textAlign:"center"}}>
            <div style={{fontSize:20,marginBottom:6}}>{ic}</div>
            <div className="fd gt" style={{fontSize:22,fontWeight:700}}>{n}</div>
            <div style={{fontSize:9,color:"#666",letterSpacing:1.5,textTransform:"uppercase",marginTop:4}}>{l}</div>
          </div>
        ))}
      </div>
      <div style={{display:"flex",borderBottom:"1px solid rgba(201,168,76,0.12)",marginBottom:24}}>
        {["upcoming","passés","jurés","suggestions","utilisateurs"].map(t=>(
          <button key={t} style={{padding:"12px 22px",fontFamily:"'Montserrat',sans-serif",fontWeight:600,fontSize:10,letterSpacing:2,textTransform:"uppercase",background:"none",border:"none",borderBottom:tab===t?`2px solid ${GOLD}`:"2px solid transparent",color:tab===t?GOLD:"#666",cursor:"pointer",transition:"all 0.2s",marginBottom:-1}} onClick={()=>setTab(t)}>{t}{t==="suggestions"&&suggestions.length>0?` (${suggestions.length})`:""}{t==="utilisateurs"?` (${users.length})`:""}</button>
        ))}
      </div>
      {tab==="upcoming"&&(
        <div>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:14}}>
            <p style={{fontSize:11,color:"#888"}}>{U.length} concerts à venir</p>
            <button className="bp" style={{fontSize:9,padding:"8px 16px"}} onClick={()=>setShowAddForm(!showAddForm)}>+ Ajouter un concert</button>
          </div>
          {showAddForm&&(
            <div style={{background:"rgba(201,168,76,0.04)",border:"1px solid rgba(201,168,76,0.2)",padding:20,marginBottom:16}}>
              <p className="sl" style={{marginBottom:14}}>Nouveau concert</p>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:12}}>
                <input className="ifield" placeholder="Artiste *" value={newConcert.artist} onChange={e=>setNewConcert({...newConcert,artist:e.target.value})}/>
                <input className="ifield" type="date" value={newConcert.date} onChange={e=>setNewConcert({...newConcert,date:e.target.value})}/>
                <input className="ifield" placeholder="Ville *" value={newConcert.city} onChange={e=>setNewConcert({...newConcert,city:e.target.value})}/>
                <input className="ifield" placeholder="Salle *" value={newConcert.venue} onChange={e=>setNewConcert({...newConcert,venue:e.target.value})}/>
                <select className="ifield" style={{cursor:"pointer"}} value={newConcert.category} onChange={e=>setNewConcert({...newConcert,category:e.target.value})}>
                  <option>Olympia Class</option><option>Zenith Class</option><option>Arena Class</option><option>Stadium Class</option>
                </select>
                <select className="ifield" style={{cursor:"pointer"}} value={newConcert.genre} onChange={e=>setNewConcert({...newConcert,genre:e.target.value})}>
                  {["Hip-Hop","Pop","Rock","R&B","Électro","Jazz","Metal","Classique","Reggae","Soul","Folk","Afrobeats","Flamenco","Punk","Latin","Blues"].map(g=><option key={g}>{g}</option>)}
                </select>
              </div>
              <div style={{display:"flex",gap:10}}>
                <button className="bp" style={{fontSize:10,padding:"10px 20px",opacity:saving?0.6:1}} onClick={addConcert} disabled={saving}>{saving?"...":"Ajouter ✓"}</button>
                <button className="bo" style={{fontSize:10,padding:"10px 20px"}} onClick={()=>setShowAddForm(false)}>Annuler</button>
              </div>
            </div>
          )}
          <div style={{background:BG2,border:"1px solid rgba(201,168,76,0.08)",overflow:"auto"}}>
            <table className="at"><thead><tr><th>Artiste</th><th>Genre</th><th>Date</th><th>Ville</th><th>Catégorie</th><th>Actions</th></tr></thead>
              <tbody>{U.slice(0,30).map((c,i)=>(<tr key={i}><td style={{fontWeight:600,color:"#eee"}}>{c.artist}</td><td>{c.genre}</td><td>{c.date}</td><td>{c.city}</td><td><span className="tag" style={{fontSize:8}}>{c.category}</span></td><td><button style={{background:"rgba(255,50,50,0.08)",border:"1px solid rgba(255,50,50,0.25)",color:"#FF5050",fontSize:8,padding:"3px 8px",cursor:"pointer",fontFamily:"'Montserrat',sans-serif",fontWeight:700}} onClick={()=>deleteConcert(c.id)}>✗</button></td></tr>))}</tbody>
            </table>
          </div>
          {U.length>30&&<p style={{fontSize:10,color:"#666",marginTop:8,textAlign:"center"}}>+ {U.length-30} concerts supplémentaires</p>}
        </div>
      )}
      {tab==="passés"&&(
        <div style={{background:BG2,border:"1px solid rgba(201,168,76,0.08)",overflow:"auto"}}>
          <table className="at"><thead><tr><th>Artiste</th><th>Genre</th><th>Date</th><th>Citation</th></tr></thead>
            <tbody>{P.map((c,i)=>(<tr key={i}><td style={{fontWeight:600,color:"#eee"}}>{c.artist}</td><td>{c.genre}</td><td>{c.date}</td><td><span style={{color:"#4CC864"}}>✓ Publiée</span></td></tr>))}</tbody>
          </table>
        </div>
      )}
      {tab==="jurés"&&(
        <div>
          <p style={{fontSize:11,color:"#888",marginBottom:14}}>{applications.length} candidatures — validation manuelle</p>
          {loading?<p style={{color:"#555",fontSize:12}}>Chargement...</p>:(
          <div style={{background:BG2,border:"1px solid rgba(201,168,76,0.08)",overflow:"auto"}}>
            <table className="at">
              <thead><tr><th>Nom</th><th>Email</th><th>Profil</th><th>Genres</th><th>Document</th><th>Statut</th><th>Actions</th></tr></thead>
              <tbody>
                {applications.map(a=>(
                  <tr key={a.id}>
                    <td style={{fontWeight:600,color:"#eee"}}>{a.name}</td>
                    <td style={{fontSize:10,color:"#888"}}>{a.email}</td>
                    <td style={{fontSize:11}}>{a.profile_type==="journalist"?"📰 Journaliste":a.profile_type==="music_pro"?"🎶 Acteur musique":"🎤 Fan"}</td>
                    <td style={{fontSize:10,color:"#888"}}>{a.genre||"—"}</td>
                    <td>{a.document_url?(<div style={{display:"flex",gap:4}}><button className="bo" style={{fontSize:8,padding:"3px 8px"}} onClick={()=>viewDocument(a.document_url)}>📎 Voir</button><button style={{background:"rgba(255,50,50,0.1)",border:"1px solid rgba(255,50,50,0.3)",color:"#FF5050",fontSize:8,padding:"3px 8px",cursor:"pointer",fontFamily:"'Montserrat',sans-serif",fontWeight:700}} onClick={()=>deleteDocument(a.id,a.document_url)}>🗑️</button></div>):(<span style={{fontSize:10,color:"#555"}}>—</span>)}</td>
                    <td><span style={{padding:"3px 10px",background:a.status==="validated"?"rgba(76,200,100,0.1)":a.status==="pending"?"rgba(201,168,76,0.1)":"rgba(255,50,50,0.1)",border:`1px solid ${a.status==="validated"?"rgba(76,200,100,0.3)":a.status==="pending"?"rgba(201,168,76,0.3)":"rgba(255,50,50,0.3)"}`,color:a.status==="validated"?"#4CC864":a.status==="pending"?GOLD:"#FF5050",fontSize:9,letterSpacing:1.5,fontWeight:600,textTransform:"uppercase",display:"inline-block"}}>{a.status==="validated"?"Validé":a.status==="pending"?"En attente":"Refusé"}</span></td>
                    <td><div style={{display:"flex",gap:6}}>{a.status==="pending"&&<><button className="bp" style={{fontSize:8,padding:"4px 10px"}} onClick={()=>updateStatus(a.id,"validated")}>✓ Valider</button><button className="bo" style={{fontSize:8,padding:"4px 10px"}} onClick={()=>updateStatus(a.id,"refused")}>✗ Refuser</button></>}</div></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          )}
          {applications.length===0&&!loading&&<p style={{textAlign:"center",color:"#555",padding:40,fontSize:12}}>Aucune candidature pour le moment</p>}
        </div>
      )}
      {tab==="suggestions"&&(
        <div>
          <p style={{fontSize:11,color:"#888",marginBottom:14}}>{suggestions.length} suggestion(s) en attente</p>
          {suggestions.length===0?<p style={{textAlign:"center",color:"#555",padding:40,fontSize:12}}>Aucune suggestion pour le moment</p>:
          <div style={{display:"flex",flexDirection:"column",gap:8}}>
            {suggestions.map(s=>(
              <div key={s.id} style={{display:"flex",alignItems:"center",gap:14,padding:"14px 18px",background:BG2,border:"1px solid rgba(201,168,76,0.08)"}}>
                <div style={{flex:1}}>
                  <p style={{fontWeight:700,fontSize:13}}>{s.artist_name}</p>
                  <p style={{fontSize:11,color:"#888",marginTop:2}}>{s.date} · {s.city} · {s.venue}</p>
                  <div style={{display:"flex",gap:6,marginTop:6}}>
                    <span className="tag" style={{fontSize:8}}>{s.category}</span>
                    <span style={{fontSize:9,color:"#666"}}>{s.genre}</span>
                  </div>
                </div>
                <div style={{display:"flex",gap:6}}>
                  <button className="bp" style={{fontSize:8,padding:"6px 12px"}} onClick={()=>approveSuggestion(s)}>✓ Approuver</button>
                  <button style={{background:"rgba(255,50,50,0.08)",border:"1px solid rgba(255,50,50,0.25)",color:"#FF5050",fontSize:8,padding:"6px 12px",cursor:"pointer",fontFamily:"'Montserrat',sans-serif",fontWeight:700}} onClick={()=>rejectSuggestion(s.id)}>✗ Refuser</button>
                </div>
              </div>
            ))}
          </div>}
        </div>
      )}
      {tab==="utilisateurs"&&(
        <div>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
            <p style={{fontSize:11,color:"#888"}}>{users.length} utilisateur(s)</p>
            <div style={{display:"flex",gap:8}}>
              {["tous","user","jury","artist","admin"].map(f=>(
                <button key={f} style={{padding:"4px 10px",fontSize:8,fontWeight:700,letterSpacing:1,fontFamily:"'Montserrat',sans-serif",textTransform:"uppercase",background:"none",border:`1px solid ${tab===f?"rgba(201,168,76,0.4)":"rgba(255,255,255,0.08)"}`,color:"#888",cursor:"pointer"}} onClick={()=>{}}>{f}</button>
              ))}
            </div>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:6}}>
            {users.map(u=>{
              const isCert=certifiedList.some(c=>c.artist_name===u.artist_name);
              const roleColors={user:"#888",jury:"#4CC864",artist:GOLD,admin:"#FF5050"};
              return (
              <div key={u.id} style={{display:"flex",alignItems:"center",gap:12,padding:"12px 16px",background:BG2,border:"1px solid rgba(201,168,76,0.06)"}}>
                <div style={{width:32,height:32,borderRadius:"50%",background:"rgba(201,168,76,0.1)",border:"1px solid rgba(201,168,76,0.2)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,color:GOLD,fontWeight:700}}>{(u.name||u.email||"?").slice(0,2).toUpperCase()}</div>
                <div style={{flex:1}}>
                  <div style={{display:"flex",alignItems:"center",gap:6}}>
                    <span style={{fontWeight:600,fontSize:12}}>{u.name||"—"}</span>
                    {u.role==="artist"&&isCert&&<CrownBadge size={12}/>}
                    <span style={{padding:"2px 8px",fontSize:7,fontWeight:700,letterSpacing:1.5,textTransform:"uppercase",border:`1px solid ${roleColors[u.role]||"#888"}`,color:roleColors[u.role]||"#888"}}>{u.role}</span>
                  </div>
                  <p style={{fontSize:10,color:"#666"}}>{u.email}{u.artist_name?` · Artiste : ${u.artist_name}`:""}</p>
                </div>
                <div style={{display:"flex",gap:4,flexWrap:"wrap"}}>
                  {u.role!=="admin"&&<select style={{padding:"4px 8px",fontSize:8,fontWeight:700,fontFamily:"'Montserrat',sans-serif",background:"#0A0A0A",border:"1px solid rgba(201,168,76,0.3)",color:GOLD,cursor:"pointer"}} value={u.role} onChange={e=>{
                    const newRole=e.target.value;
                    if(newRole==="artist"){
                      const an=prompt("Nom d'artiste :");
                      if(an)changeRole(u.id,newRole,an);
                    }else{changeRole(u.id,newRole);}
                  }}>
                    <option value="user">User</option>
                    <option value="jury">Jury</option>
                    <option value="artist">Artiste</option>
                  </select>}
                  {u.role==="artist"&&isCert&&<button style={{padding:"4px 8px",fontSize:7,fontWeight:700,fontFamily:"'Montserrat',sans-serif",background:"rgba(255,50,50,0.08)",border:"1px solid rgba(255,50,50,0.25)",color:"#FF5050",cursor:"pointer"}} onClick={()=>removeCertification(u.artist_name)}>✗ Décertifier</button>}
                </div>
              </div>
            );})}
          </div>
        </div>
      )}
      {toast&&<div className="toast">{toast}</div>}
    </div>
  );
}

function UserProfile({user,social,nav,upcomingData,artistImages,role,userArtistName}) {
  const {follows,attending,toggleFollow,isCertified}=social||{follows:[],attending:[]};
  const attendingConcerts=(upcomingData||[]).filter(c=>attending.includes(c.id));
  const genreCounts={};
  (upcomingData||[]).forEach(c=>{if(follows.includes(c.artist))genreCounts[c.genre]=(genreCounts[c.genre]||0)+1;});
  const topGenres=Object.entries(genreCounts).sort((a,b)=>b[1]-a[1]).slice(0,4).map(([g])=>g);
  const userName=user?.user_metadata?.name||user?.email?.split("@")[0]||"Utilisateur";
  const [isPublic,setIsPublic]=useState(true);
  const [toast,setToast]=useState("");

  useEffect(()=>{
    supabase.from("profiles").select("is_public").eq("id",user?.id).single().then(({data})=>{
      if(data)setIsPublic(data.is_public!==false);
    });
  },[user]);

  const togglePublic=async()=>{
    const newVal=!isPublic;
    setIsPublic(newVal);
    await supabase.from("profiles").update({is_public:newVal}).eq("id",user?.id);
    setToast(newVal?"Profil public ✓":"Profil privé ✓");
    setTimeout(()=>setToast(""),2000);
  };

  return (
    <div style={{padding:"100px 20px 80px",maxWidth:600,margin:"0 auto"}}>
      <div style={{textAlign:"center",marginBottom:24}}>
        <div style={{width:72,height:72,borderRadius:"50%",background:"rgba(201,168,76,0.1)",border:"2px solid rgba(201,168,76,0.3)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 12px",fontSize:22,color:GOLD,fontWeight:700}}>{userName.slice(0,2).toUpperCase()}</div>
        <h1 className="fd" style={{fontSize:24,fontWeight:400,letterSpacing:2}}>{userName}</h1>
        <p style={{fontSize:11,color:"#888",marginTop:4}}>{user?.email}</p>
        <div style={{marginTop:10}}><RoleBadge role={role}/></div>
        {role==="artist"&&userArtistName&&<p style={{fontSize:12,color:GOLD,marginTop:8}}>Page artiste : {userArtistName}</p>}
        <div style={{display:"flex",gap:24,justifyContent:"center",margin:"16px 0"}}>
          <div style={{textAlign:"center"}}><div className="fd gt" style={{fontSize:20,fontWeight:700}}>{follows.length}</div><div style={{fontSize:9,color:"#666",letterSpacing:2,textTransform:"uppercase"}}>Suivis</div></div>
          <div style={{textAlign:"center"}}><div className="fd gt" style={{fontSize:20,fontWeight:700}}>{attending.length}</div><div style={{fontSize:9,color:"#666",letterSpacing:2,textTransform:"uppercase"}}>J'y vais</div></div>
        </div>
        {topGenres.length>0&&<div style={{display:"flex",gap:6,justifyContent:"center",flexWrap:"wrap"}}>{topGenres.map(g=><span key={g} style={{padding:"3px 10px",background:"rgba(201,168,76,0.06)",border:"1px solid rgba(201,168,76,0.15)",fontSize:9,color:"#aaa",letterSpacing:1,display:"flex",alignItems:"center",gap:4}}><GenreIcon name={g} size={12}/> {g}</span>)}</div>}

        {/* Toggle public/privé */}
        <div style={{marginTop:16,display:"flex",alignItems:"center",justifyContent:"center",gap:10}}>
          <span style={{fontSize:10,color:"#888"}}>Profil {isPublic?"public":"privé"}</span>
          <button onClick={togglePublic} style={{width:44,height:24,borderRadius:12,background:isPublic?"rgba(201,168,76,0.3)":"rgba(255,255,255,0.1)",border:"none",cursor:"pointer",position:"relative",transition:"all 0.2s"}}>
            <div style={{width:18,height:18,borderRadius:"50%",background:isPublic?GOLD:"#555",position:"absolute",top:3,left:isPublic?23:3,transition:"all 0.2s"}}/>
          </button>
          <span style={{fontSize:9,color:"#555"}}>{isPublic?"Tout le monde peut voir ton activité":"Seul toi vois ton profil"}</span>
        </div>
      </div>

      <div style={{height:1,background:"linear-gradient(to right,transparent,rgba(201,168,76,0.15),transparent)",margin:"20px 0"}}/>

      <p style={{fontSize:9,color:GOLD,letterSpacing:3,textTransform:"uppercase",fontWeight:700,marginBottom:12}}>Artistes suivis</p>
      {follows.length===0?<p style={{fontSize:12,color:"#555",textAlign:"center",padding:20}}>Tu ne suis aucun artiste encore</p>:
      <div style={{display:"flex",flexDirection:"column",gap:8}}>
        {follows.map(name=>(
          <div key={name} style={{display:"flex",alignItems:"center",gap:12,padding:"10px 14px",background:BG2,border:"1px solid rgba(201,168,76,0.08)",cursor:"pointer"}} onClick={()=>nav("artist",{artistName:name})}>
            <ArtistImg name={name} size={36} images={artistImages}/>
            <div style={{flex:1}}>
              <div style={{display:"flex",alignItems:"center",gap:6}}>
                <span style={{fontWeight:600,fontSize:13}}>{name}</span>
                {isCertified(name)&&<CrownBadge size={14}/>}
              </div>
            </div>
            <button className="bo" style={{fontSize:8,padding:"4px 10px"}} onClick={e=>{e.stopPropagation();toggleFollow(name);}}>Ne plus suivre</button>
          </div>
        ))}
      </div>}

      <div style={{height:1,background:"linear-gradient(to right,transparent,rgba(201,168,76,0.15),transparent)",margin:"20px 0"}}/>

      <p style={{fontSize:9,color:GOLD,letterSpacing:3,textTransform:"uppercase",fontWeight:700,marginBottom:12}}>Mes concerts</p>
      {attendingConcerts.length===0?<p style={{fontSize:12,color:"#555",textAlign:"center",padding:20}}>Aucun concert marqué "J'y vais"</p>:
      <div style={{display:"flex",flexDirection:"column",gap:8}}>
        {attendingConcerts.map(c=>(
          <div key={c.id} style={{display:"flex",alignItems:"center",gap:12,padding:"10px 14px",background:BG2,border:"1px solid rgba(201,168,76,0.08)",cursor:"pointer"}} onClick={()=>nav("upcoming-detail",c)}>
            <ArtistImg name={c.artist} fallback={c.img} size={36} images={artistImages}/>
            <div style={{flex:1}}>
              <span style={{fontWeight:600,fontSize:13}}>{c.artist}</span>
              <div style={{fontSize:10,color:"#888"}}>{c.date} · {c.venue}</div>
            </div>
            <span style={{padding:"3px 8px",border:"1px solid rgba(201,168,76,0.3)",fontSize:8,color:GOLD,letterSpacing:1,fontWeight:700}}>J'Y VAIS</span>
          </div>
        ))}
      </div>}

      <div style={{height:1,background:"linear-gradient(to right,transparent,rgba(201,168,76,0.15),transparent)",margin:"20px 0"}}/>

      <div style={{display:"flex",gap:10,justifyContent:"center",flexWrap:"wrap"}}>
        {role==="artist"&&<button className="bp" style={{padding:"10px 20px",fontSize:10,letterSpacing:2}} onClick={()=>nav("artist-dash")}>👑 Mon espace artiste</button>}
        {role==="admin"&&<button className="bp" style={{padding:"10px 20px",fontSize:10,letterSpacing:2}} onClick={()=>nav("admin")}>🔑 Administration</button>}
        <button className="bo" style={{padding:"10px 20px",fontSize:10,letterSpacing:2}} onClick={async()=>{await supabase.auth.signOut();nav("home");window.location.reload();}}>🚪 Déconnexion</button>
      </div>
    </div>
  );
}

export default function App() {
  const [page,setPage]=useState("home");
  const [sel,setSel]=useState(null);
  const [role,setRole]=useState(null);
  const [user,setUser]=useState(null);
  const [userArtistName,setUserArtistName]=useState(null);
  const [genreFilter,setGenreFilter]=useState(null);
  const [artistName,setArtistName]=useState(null);
  const [upcomingData,setUpcomingData]=useState(UPCOMING_DEFAULT);
  const [pastData,setPastData]=useState(PAST_DEFAULT);
  const [wantsJuryLogin,setWantsJuryLogin]=useState(false);
  const [cookieConsent,setCookieConsent]=useState(()=>localStorage.getItem("crowdn_cookies")||null);
  const [artistImages,setArtistImages]=useState({});
  const social=useSocial(user);
  const [showResetPwd,setShowResetPwd]=useState(false);
  const [newPwd,setNewPwd]=useState("");
  const [resetMsg,setResetMsg]=useState("");

  // Détection Capacitor (app mobile)
  useEffect(()=>{
    const isCapacitor=window.Capacitor&&window.Capacitor.isNativePlatform&&window.Capacitor.isNativePlatform();
    if(isCapacitor||window.navigator.standalone||window.matchMedia('(display-mode:standalone)').matches){
      document.body.classList.add("capacitor-app");
    }
  },[]);

  // Auto-déconnexion après 30 min d'inactivité (sauf admin)
  useEffect(()=>{
    if(!user||role==="admin") return;
    let timer;
    const TIMEOUT=30*60*1000;
    const resetTimer=()=>{
      clearTimeout(timer);
      timer=setTimeout(async()=>{
        await supabase.auth.signOut();
        setRole(null);setUser(null);setPage("home");
      },TIMEOUT);
    };
    const events=["mousedown","touchstart","keydown","scroll"];
    events.forEach(e=>window.addEventListener(e,resetTimer,{passive:true}));
    resetTimer();
    return()=>{clearTimeout(timer);events.forEach(e=>window.removeEventListener(e,resetTimer));};
  },[user,role]);

  useEffect(()=>{
    supabase.auth.getSession().then(({data:{session}})=>{
      if(session){
        supabase.from("profiles").select("role,name,artist_name").eq("id",session.user.id).single()
          .then(async({data:profile})=>{
            setUser(session.user);
            let r=profile?.role||"user";
            if(session.user.email===ADMIN_EMAIL&&r!=="admin"){
              await supabase.from("profiles").update({role:"admin"}).eq("id",session.user.id);
              r="admin";
            }
            setRole(r);setUserArtistName(profile?.artist_name||null);
          });
      }
    });
    const{data:{subscription}}=supabase.auth.onAuthStateChange((event,session)=>{
      if(event==="PASSWORD_RECOVERY"){setShowResetPwd(true);}
      if(!session){setUser(null);setRole(null);}
    });
    return()=>subscription.unsubscribe();
  },[]);

  useEffect(()=>{
    async function fetchData(){
      try{
        const{data:upcoming}=await supabase.from("upcoming_concerts").select("*").order("id");
        const{data:past}=await supabase.from("past_concerts").select("*").order("id");
        if(upcoming&&upcoming.length>0){setUpcomingData(upcoming.map(c=>({...c,daysLeft:daysUntil(c.date)})));}
        if(past&&past.length>0){setPastData(past.map(c=>({...c,juryQuote:c.jury_quote,juryName:c.jury_name,juryAvatar:c.jury_avatar,juryHandle:c.jury_handle,tiktokUrl:c.tiktok_url,photos:["📸","🎬","🌟"]})));}
      }catch(e){console.log("Données locales utilisées");}
    }
    fetchData();
  },[]);

  useEffect(()=>{
    async function fetchArtistImages(){
      const allArtists=[...new Set([...upcomingData,...pastData].map(c=>c.artist))];
      const cached=JSON.parse(localStorage.getItem("crowdn_artist_images")||"{}");
      const toFetch=allArtists.filter(a=>!cached[a]);
      if(Object.keys(cached).length>0)setArtistImages(cached);
      for(let i=0;i<toFetch.length;i++){
        try{
          const res=await fetch("/api/spotify?artist="+encodeURIComponent(toFetch[i]));
          if(res.ok){
            const data=await res.json();
            if(data.image){cached[toFetch[i]]=data.image;setArtistImages({...cached});}
          }
        }catch(e){}
        if(i%5===4)await new Promise(r=>setTimeout(r,500));
      }
      localStorage.setItem("crowdn_artist_images",JSON.stringify(cached));
    }
    if(upcomingData.length>0||pastData.length>0)fetchArtistImages();
  },[upcomingData,pastData]);

  const nav=(p,d)=>{
    if(d&&d.wantsJury){setWantsJuryLogin(true);setPage("login");window.scrollTo({top:0,behavior:"smooth"});return;}
    setPage(p);
    if(d&&d.filterGenre){setGenreFilter(d.filterGenre);}
    else if(d&&d.artistName){setArtistName(d.artistName);}
    else if(d){setSel(d);}
    window.scrollTo({top:0,behavior:"smooth"});
  };

  const navItems=[
    {key:"home",label:"Accueil",icon:"🏠"},
    {key:"upcoming",label:"À venir",icon:"🎵"},
    {key:"past",label:"Passés",icon:"🎭"},
    {key:"become-jury",label:"Be a Jury",icon:"👑"},
    ...(!role?[{key:"become-jury",label:"Jury",icon:"👑"}]:[]),
    ...(role==="artist"?[{key:"artist-dash",label:"Mon espace",icon:"👑"}]:[]),
    ...(role==="admin"?[{key:"admin",label:"Admin",icon:"🔑"}]:[]),
  ];

  return (
    <div style={{overflowX:"hidden",maxWidth:"100vw"}}>
      <style>{styles}</style>
      <nav className="nav">
        <button style={{background:"none",border:"none",cursor:"pointer"}} onClick={()=>nav("home")}>
          <span style={{fontWeight:800,fontSize:14,letterSpacing:4,color:GOLD}}>CROWDN</span>
        </button>
        <div className="nav-desktop-links" style={{display:"flex",gap:20,alignItems:"center"}}>
          {navItems.map(item=>(<button key={item.key} className={`nl ${page===item.key?"active":""}`} onClick={()=>nav(item.key)}>{item.label}</button>))}
          {role?(
            <div style={{display:"flex",alignItems:"center",gap:10}}>
              <button onClick={()=>nav("profile")} style={{background:"none",border:"none",cursor:"pointer",display:"flex",alignItems:"center",gap:6}}>
                <div style={{width:28,height:28,borderRadius:"50%",background:"rgba(201,168,76,0.15)",border:"1px solid rgba(201,168,76,0.3)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,color:GOLD,fontWeight:700}}>{(user?.email?.split("@")[0]||"U").slice(0,2).toUpperCase()}</div>
                <span style={{fontSize:11,color:GOLD,fontWeight:600,letterSpacing:1,fontFamily:"'Montserrat',sans-serif"}}>{user?.email?.split("@")[0]}</span>
              </button>
              <button className="bo" style={{fontSize:9,padding:"8px 16px"}} onClick={async()=>{await supabase.auth.signOut();setRole(null);setUser(null);nav("home");}}>Déconnexion</button>
            </div>
          ):(
            <button className="bp" onClick={()=>nav("login")}>Connexion</button>
          )}
        </div>
      </nav>

      {page==="home"&&<HomePage nav={nav} upcoming={upcomingData} past={pastData} artistImages={artistImages} social={social} user={user}/>}
      {page==="login"&&<Login nav={nav} onLogin={(r,u,an)=>{setRole(r);setUser(u);setUserArtistName(an);setWantsJuryLogin(false);if(r==="artist")nav("artist-dash");else if(r==="admin")nav("admin");else nav("home");}} wantsJury={wantsJuryLogin}/>}
      {page==="upcoming"&&<UpcomingPage nav={nav} initialGenre={genreFilter} concerts={upcomingData} artistImages={artistImages}/>}
      {page==="upcoming-detail"&&<UpcomingDetail c={sel} nav={nav} artistImages={artistImages} social={social} user={user}/>}
      {page==="past"&&<PastPage nav={nav} concerts={pastData} artistImages={artistImages}/>}
      {page==="past-detail"&&<PastDetail c={sel} nav={nav} artistImages={artistImages}/>}
      {page==="become-jury"&&<BecomeJury nav={nav} user={user} role={role}/>}
      {page==="how-it-works"&&<HowItWorks nav={nav}/>}
      {page==="artist"&&<ArtistPage artistName={artistName} nav={nav} social={social} user={user} artistImages={artistImages} upcomingData={upcomingData}/>}
      {page==="profile"&&user&&<UserProfile user={user} social={social} nav={nav} upcomingData={upcomingData} artistImages={artistImages} role={role} userArtistName={userArtistName}/>}
      {page==="jury-dash"&&role==="jury"&&<JuryDash user={user}/>}
      {page==="artist-dash"&&role==="artist"&&<ArtistDash user={user} artistName={userArtistName} artistImages={artistImages} upcomingData={upcomingData}/>}
      {page==="publish-moment"&&user&&<PublishMoment user={user} nav={nav} upcomingData={upcomingData}/>}
      {page==="admin"&&role==="admin"&&<AdminDash upcomingData={upcomingData} pastData={pastData} onRefresh={async()=>{
        const{data:upcoming}=await supabase.from("upcoming_concerts").select("*").order("id");
        if(upcoming&&upcoming.length>0)setUpcomingData(upcoming.map(c=>({...c,daysLeft:daysUntil(c.date)})));
      }}/>}
      {page==="mentions-legales"&&<MentionsLegales nav={nav}/>}
      {page==="politique-confidentialite"&&<PolitiqueConfidentialite nav={nav}/>}
      {page==="cgu"&&<CGU nav={nav}/>}

      {/* Footer */}
      <div style={{background:"#080808",borderTop:"1px solid rgba(201,168,76,0.08)",padding:"28px 32px",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:12,marginBottom:role||!cookieConsent?60:0}}>
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          <span style={{fontWeight:800,fontSize:14,letterSpacing:4,color:GOLD}}>CROWDN</span>
          <span style={{fontSize:10,color:"#555"}}>© {new Date().getFullYear()}</span>
        </div>
        <div style={{display:"flex",gap:20,flexWrap:"wrap"}}>
          {[["mentions-legales","Mentions légales"],["politique-confidentialite","Politique de confidentialité"],["cgu","CGU"]].map(([p,l])=>(
            <button key={p} onClick={()=>nav(p)} style={{background:"none",border:"none",color:"#666",fontSize:10,cursor:"pointer",fontFamily:"'Montserrat',sans-serif",letterSpacing:1,textTransform:"uppercase",transition:"color 0.2s"}}
              onMouseOver={e=>e.currentTarget.style.color=GOLD}
              onMouseOut={e=>e.currentTarget.style.color="#666"}>
              {l}
            </button>
          ))}
          <a href="mailto:contact@crowdn.fr" style={{color:"#666",fontSize:10,textDecoration:"none",letterSpacing:1,textTransform:"uppercase",fontFamily:"'Montserrat',sans-serif"}}>contact@crowdn.fr</a>
        </div>
      </div>

      {/* Reset password modal */}
      {showResetPwd&&(
        <div style={{position:"fixed",inset:0,zIndex:600,background:"rgba(0,0,0,0.85)",display:"flex",alignItems:"center",justifyContent:"center",padding:20}}>
          <div style={{background:"#111",border:"1px solid rgba(201,168,76,0.3)",padding:32,maxWidth:400,width:"100%",textAlign:"center"}}>
            <Crown size={32}/>
            <h2 className="fd" style={{fontSize:22,fontWeight:400,letterSpacing:2,margin:"12px 0 8px"}}>Nouveau mot de passe</h2>
            <p style={{fontSize:12,color:"#888",marginBottom:16}}>8 caractères minimum + 1 majuscule + 1 chiffre</p>
            <input className="ifield" type="password" placeholder="Nouveau mot de passe" value={newPwd} onChange={e=>setNewPwd(e.target.value)} style={{marginBottom:10}}/>
            {newPwd.length>0&&(
              <div style={{display:"flex",gap:8,flexWrap:"wrap",justifyContent:"center",marginBottom:12}}>
                <span style={{fontSize:9,padding:"2px 8px",background:newPwd.length>=8?"rgba(76,200,100,0.1)":"rgba(255,50,50,0.1)",border:`1px solid ${newPwd.length>=8?"rgba(76,200,100,0.3)":"rgba(255,50,50,0.3)"}`,color:newPwd.length>=8?"#4CC864":"#FF5050"}}>{newPwd.length>=8?"✓":"✗"} 8+ caractères</span>
                <span style={{fontSize:9,padding:"2px 8px",background:/[A-Z]/.test(newPwd)?"rgba(76,200,100,0.1)":"rgba(255,50,50,0.1)",border:`1px solid ${/[A-Z]/.test(newPwd)?"rgba(76,200,100,0.3)":"rgba(255,50,50,0.3)"}`,color:/[A-Z]/.test(newPwd)?"#4CC864":"#FF5050"}}>{/[A-Z]/.test(newPwd)?"✓":"✗"} Majuscule</span>
                <span style={{fontSize:9,padding:"2px 8px",background:/[0-9]/.test(newPwd)?"rgba(76,200,100,0.1)":"rgba(255,50,50,0.1)",border:`1px solid ${/[0-9]/.test(newPwd)?"rgba(76,200,100,0.3)":"rgba(255,50,50,0.3)"}`,color:/[0-9]/.test(newPwd)?"#4CC864":"#FF5050"}}>{/[0-9]/.test(newPwd)?"✓":"✗"} Chiffre</span>
              </div>
            )}
            {resetMsg&&<p style={{fontSize:11,color:resetMsg.includes("✓")?"#4CC864":"#FF5050",marginBottom:12}}>{resetMsg}</p>}
            <button className="bp" style={{width:"100%",padding:"12px",fontSize:11,letterSpacing:2,opacity:(newPwd.length<8||!/[A-Z]/.test(newPwd)||!/[0-9]/.test(newPwd))?0.5:1}} onClick={async()=>{
              if(newPwd.length<8){setResetMsg("8 caractères minimum");return;}
              if(!/[A-Z]/.test(newPwd)){setResetMsg("Au moins une majuscule");return;}
              if(!/[0-9]/.test(newPwd)){setResetMsg("Au moins un chiffre");return;}
              const{error}=await supabase.auth.updateUser({password:newPwd});
              if(error){setResetMsg("Erreur : "+error.message);}
              else{setResetMsg("Mot de passe modifié ✓");setTimeout(()=>{setShowResetPwd(false);setNewPwd("");setResetMsg("");nav("home");},2000);}
            }} disabled={newPwd.length<8||!/[A-Z]/.test(newPwd)||!/[0-9]/.test(newPwd)}>Confirmer</button>
          </div>
        </div>
      )}

      {/* Cookie banner */}
      {!cookieConsent&&(
        <CookieBanner
          onAccept={()=>{localStorage.setItem("crowdn_cookies","accepted");setCookieConsent("accepted");}}
          onRefuse={()=>{localStorage.setItem("crowdn_cookies","refused");setCookieConsent("refused");}}
        />
      )}

      <div className="mnav">
        <button className={`mni ${page==="home"?"active":""}`} onClick={()=>nav("home")}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 12L12 4L21 12"/><path d="M5 10V20H19V10"/></svg>
          Accueil
        </button>
        <button className={`mni ${page==="upcoming"||page==="past"?"active":""}`} onClick={()=>nav("upcoming")}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2V6M8 2V6M3 10H21"/><circle cx="12" cy="16" r="2"/></svg>
          Concerts
        </button>
        {user?(
          <button className="mni" onClick={()=>nav("publish-moment")} style={{marginTop:-12}}>
            <div style={{width:44,height:44,borderRadius:"50%",background:"linear-gradient(135deg,#8B6914,#C9A84C)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto",boxShadow:"0 2px 12px rgba(201,168,76,0.3)"}}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M6 16L8 9L12 13L16 9L18 16Z" fill="#000" opacity="0.8"/><rect x="7" y="16" width="10" height="1.5" rx="0.5" fill="#000" opacity="0.6"/></svg>
            </div>
            <span style={{fontSize:7,marginTop:2,display:"block"}}>Moment</span>
          </button>
        ):(
          <button className={`mni`} onClick={()=>nav("login")} style={{marginTop:-12}}>
            <div style={{width:44,height:44,borderRadius:"50%",background:"linear-gradient(135deg,#8B6914,#C9A84C)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto",boxShadow:"0 2px 12px rgba(201,168,76,0.3)"}}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M6 16L8 9L12 13L16 9L18 16Z" fill="#000" opacity="0.8"/><rect x="7" y="16" width="10" height="1.5" rx="0.5" fill="#000" opacity="0.6"/></svg>
            </div>
            <span style={{fontSize:7,marginTop:2,display:"block"}}>Moment</span>
          </button>
        )}
        <button className={`mni ${page==="become-jury"&&user?"active":""}`} onClick={()=>nav("become-jury")}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2L15 9H22L16 14L18 21L12 17L6 21L8 14L2 9H9Z"/></svg>
          Jury
        </button>
        {!role&&<button className={`mni ${page==="login"?"active":""}`} onClick={()=>nav("login")}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="5" y="11" width="14" height="10" rx="2"/><circle cx="12" cy="16" r="1.5"/><path d="M8 11V7A4 4 0 0116 7V11"/></svg>
          Login
        </button>}
        {role&&<button className={`mni ${page==="profile"||page==="artist-dash"||page==="admin"?"active":""}`} onClick={()=>role==="artist"?nav("artist-dash"):role==="admin"?nav("admin"):nav("profile")}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="8" r="4"/><path d="M4 20C4 16 8 14 12 14C16 14 20 16 20 20"/></svg>
          {role==="artist"?"Espace":role==="admin"?"Admin":"Profil"}
        </button>}
      </div>
    </div>
  );
}
