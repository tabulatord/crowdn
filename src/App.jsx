import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL || "https://orxyigdszptjptzenmpd.supabase.co",
  process.env.REACT_APP_SUPABASE_ANON_KEY ||

const GOLD = "#C9A84C";
const GOLD_LIGHT = "#E8C96A";
const GOLD_DARK = "#8B6914";
const BG = "#0A0A0A";
const BG2 = "#111111";

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
  {name:"Hip-Hop",icon:"🎤"},{name:"Pop",icon:"✨"},{name:"Rock",icon:"🎸"},
  {name:"R&B",icon:"🎶"},{name:"Électro",icon:"🎛️"},{name:"Jazz",icon:"🎷"},
  {name:"Metal",icon:"🤘"},{name:"Classique",icon:"🎻"},{name:"Reggae",icon:"🌿"},
  {name:"Soul",icon:"🔥"},{name:"Folk",icon:"🪕"},{name:"Afrobeats",icon:"🥁"},
  {name:"Flamenco",icon:"💃"},{name:"Punk",icon:"⚡"},{name:"Latin",icon:"🌶️"},{name:"Blues",icon:"🎵"},
];

function daysUntil(dateStr) {
  const parts = dateStr.split(" ");
  const months = {"Jan":0,"Fév":1,"Mar":2,"Avr":3,"Mai":4,"Juin":5,"Juil":6,"Août":7,"Sep":8,"Oct":9,"Nov":10,"Déc":11};
  const d = new Date(parseInt(parts[2]), months[parts[1]], parseInt(parts[0]));
  const diff = Math.ceil((d - new Date()) / (1000*60*60*24));
  return diff > 0 ? diff : 0;
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
  {id:10,artist:"Billie Eilish",date:"10 Juin 2025",city:"Paris",venue:"Accor Arena",category:"Arena Class",genre:"Pop",img:"🖤",juryQuote:"Une présence scénique hors du commun. Elle a rendu l'Accor Arena intime — c'est un tour de force.",juryName:"Sophie L.",juryAvatar:"👩‍🎤",juryHandle:"@sophiecrowdn",tiktokUrl:"#",photos:["📸","🎬","🌟"]},
  {id:11,artist:"Ninho",date:"2 Mai 2025",city:"Paris",venue:"Stade de France",category:"Stadium Class",genre:"Hip-Hop",img:"🏆",juryQuote:"Un stade plein à craquer pour un rappeur français. La scène du rap français a changé de dimension ce soir.",juryName:"Marc F.",juryAvatar:"🎧",juryHandle:"@marcjury",tiktokUrl:"#",photos:["📸","🎬","🔥"]},
  {id:12,artist:"DJ Snake",date:"10 Mai 2025",city:"Paris",venue:"Stade de France",category:"Stadium Class",genre:"Électro",img:"🐍",juryQuote:"Un show pyrotechnique à couper le souffle. La foule n'a jamais eu autant l'impression d'être au centre du monde.",juryName:"Elena R.",juryAvatar:"🎭",juryHandle:"@elenarjury",tiktokUrl:"#",photos:["📸","🎬","🌟","🔥"]},
  {id:13,artist:"Slimane",date:"8 Avr 2025",city:"Paris",venue:"Accor Arena",category:"Arena Class",genre:"Pop",img:"🎶",juryQuote:"Une voix qui transperce les murs. Slimane a prouvé qu'il appartient désormais aux plus grandes scènes.",juryName:"Thomas V.",juryAvatar:"🎤",juryHandle:"@thomasvjury",tiktokUrl:"#",photos:["📸","🎬"]},
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
              <span style={{fontSize:20}}>{g.icon}</span>
              <span style={{fontSize:11,fontWeight:600,letterSpacing:1.5,textTransform:"uppercase",color:"#ccc"}}>{g.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function PastCard({c,idx,onClick}) {
  return (
    <div className="pc" style={{animation:`fadeUp 0.5s ${idx*0.12}s ease both`,opacity:0}} onClick={onClick}>
      <div style={{display:"flex",alignItems:"stretch"}}>
        <div style={{width:4,background:`linear-gradient(to bottom,#8B6914,transparent)`,flexShrink:0}}/>
        <div style={{flex:1,padding:"18px 20px"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:14}}>
            <div style={{display:"flex",alignItems:"center",gap:12}}>
              <span style={{fontSize:30}}>{c.img}</span>
              <div>
                <h3 style={{fontSize:15,fontWeight:700,letterSpacing:0.5}}>{c.artist}</h3>
                <p style={{fontSize:11,color:"#888",marginTop:2}}>{c.date} · {c.city}</p>
              </div>
            </div>
            <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:4}}>
              <span className="tag" style={{fontSize:8,padding:"2px 8px"}}>{c.category.split(" ")[0]}</span>
              <span style={{fontSize:10,color:"#666"}}>{GENRES.find(g=>g.name===c.genre)?.icon} {c.genre}</span>
            </div>
          </div>
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
              <a href={c.tiktokUrl} className="tb" onClick={e=>e.stopPropagation()}><span style={{fontSize:14}}>▶</span>TikTok</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function HomePage({nav,upcoming,past}) {
  const U = upcoming||UPCOMING_DEFAULT;
  const P = past||PAST_DEFAULT;
  return (
    <div style={{paddingBottom:80}}>
      {/* Hero — desktop split, mobile centré */}
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
              {[["247","Concerts"],["89","Jurés"],["16","Genres"]].map(([n,l])=>(
                <div key={l} style={{textAlign:"center"}}>
                  <div className="fd gt" style={{fontSize:24,fontWeight:700}}>{n}</div>
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
                <span style={{fontSize:28,flexShrink:0}}>{c.img}</span>
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

      {/* Concerts grid — responsive */}
      <div style={{padding:"60px 32px 0",maxWidth:1400,margin:"0 auto"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:28}}>
          <div><p className="sl" style={{marginBottom:8}}>Prochainement</p><h2 className="fd" style={{fontSize:"clamp(22px,4vw,34px)",fontWeight:400,letterSpacing:2}}>Concerts à venir</h2></div>
          <button className="bo" style={{fontSize:9,padding:"8px 16px"}} onClick={()=>nav("upcoming")}>Voir tout</button>
        </div>
        <div className="concerts-grid" style={{display:"grid",gap:14}}>
          {U.slice(0,4).map((c,i)=>(
            <div key={c.id} className="cc" style={{animation:`fadeUp 0.5s ${i*0.1}s ease both`,opacity:0}} onClick={()=>nav("upcoming-detail",c)}>
              <div style={{height:100,background:"linear-gradient(135deg,rgba(201,168,76,0.07),rgba(201,168,76,0.02))",display:"flex",alignItems:"center",justifyContent:"center",fontSize:44,position:"relative"}}>
                {c.img}
                <div style={{position:"absolute",top:10,left:12}}><span className="ub"><span className="ld"/>{c.daysLeft}j</span></div>
                <div style={{position:"absolute",top:10,right:12,fontSize:16}}>{GENRES.find(g=>g.name===c.genre)?.icon}</div>
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
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(420px,1fr))",gap:14}}>
          {P.slice(0,2).map((c,i)=><PastCard key={c.id} c={c} idx={i} onClick={()=>nav("past-detail",c)}/>)}
        </div>
      </div>
    </div>
  );
}

function UpcomingPage({nav,initialGenre,concerts}) {
  const [activeGenre,setActiveGenre]=useState(initialGenre||"Tous");
  const U=concerts||UPCOMING_DEFAULT;
  const allGenres=["Tous",...Array.from(new Set(U.map(c=>c.genre)))];
  const filtered=activeGenre==="Tous"?U:U.filter(c=>c.genre===activeGenre);
  return (
    <div style={{padding:"80px 0 80px",maxWidth:1400,margin:"0 auto"}}>
      <div style={{padding:"20px 32px 32px"}}>
        <p className="sl" style={{marginBottom:8}}>Programme</p>
        <h1 className="fd" style={{fontSize:"clamp(28px,5vw,44px)",fontWeight:400,letterSpacing:2}}>Concerts à venir</h1>
      </div>
      {/* Desktop: sidebar + contenu / Mobile: filtre en haut */}
      <div className="desktop-two-col" style={{display:"grid",gap:0,alignItems:"start"}}>
        {/* Sidebar genres — desktop */}
        <div className="desktop-sidebar" style={{padding:"0 24px 0 32px",position:"sticky",top:80}}>
          <p className="sl" style={{marginBottom:16,fontSize:9}}>Genres</p>
          <div style={{display:"flex",flexDirection:"column",gap:6}}>
            {allGenres.map(g=>(
              <button key={g} onClick={()=>setActiveGenre(g)}
                style={{display:"flex",alignItems:"center",gap:10,padding:"10px 14px",background:activeGenre===g?"rgba(201,168,76,0.1)":"transparent",border:`1px solid ${activeGenre===g?"rgba(201,168,76,0.4)":"rgba(255,255,255,0.06)"}`,color:activeGenre===g?GOLD:"#888",cursor:"pointer",fontFamily:"'Montserrat',sans-serif",fontSize:10,fontWeight:700,letterSpacing:1.5,textTransform:"uppercase",transition:"all 0.2s",textAlign:"left"}}>
                {g!=="Tous"&&<span style={{fontSize:16}}>{GENRES.find(x=>x.name===g)?.icon}</span>}
                {g}
              </button>
            ))}
          </div>
        </div>

        {/* Contenu */}
        <div style={{padding:"0 32px"}}>
          {/* Filtre mobile */}
          <div className="genre-filter" style={{marginBottom:24,display:"flex"}}>
            {allGenres.map(g=>(
              <button key={g} className={`gf-btn ${activeGenre===g?"active":""}`} onClick={()=>setActiveGenre(g)}>
                {g!=="Tous"&&<span style={{marginRight:6}}>{GENRES.find(x=>x.name===g)?.icon}</span>}{g}
              </button>
            ))}
          </div>
          <div className="concerts-grid" style={{display:"grid",gap:16}}>
            {filtered.map((c,i)=>(
              <div key={c.id} className="cc" style={{animation:`fadeUp 0.4s ${i*0.06}s ease both`,opacity:0}} onClick={()=>nav("upcoming-detail",c)}>
                <div style={{height:110,background:"linear-gradient(135deg,rgba(201,168,76,0.08),rgba(201,168,76,0.02))",display:"flex",alignItems:"center",justifyContent:"center",fontSize:44,position:"relative"}}>
                  {c.img}
                  <div style={{position:"absolute",top:10,left:12}}><span className="ub"><span className="ld"/>{c.daysLeft}j</span></div>
                  <div style={{position:"absolute",top:10,right:12,fontSize:16}}>{GENRES.find(g=>g.name===c.genre)?.icon}</div>
                </div>
                <div style={{padding:"14px 18px 18px"}}>
                  <h3 style={{fontSize:15,fontWeight:700,letterSpacing:1,marginBottom:3}}>{c.artist}</h3>
                  <p style={{fontSize:11,color:"#888",marginBottom:10}}>{c.genre}</p>
                  <div className="gd" style={{marginBottom:10}}/>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                    <div><p style={{fontSize:11,color:"#aaa"}}>{c.date}</p><p style={{fontSize:11,color:"#777"}}>{c.city} · {c.venue}</p></div>
                    <span className="tag" style={{fontSize:8}}>{c.category}</span>
                  </div>
                </div>
              </div>
            ))}
            {filtered.length===0&&<div style={{textAlign:"center",padding:"60px 20px",color:"#555",gridColumn:"1/-1"}}><p style={{fontSize:32,marginBottom:12}}>{GENRES.find(g=>g.name===activeGenre)?.icon}</p><p style={{fontSize:13}}>Aucun concert {activeGenre} pour le moment.</p></div>}
          </div>
        </div>
      </div>
    </div>
  );
}

function UpcomingDetail({c,nav}) {
  if(!c) return null;
  const gi=GENRES.find(g=>g.name===c.genre)?.icon;
  return (
    <div style={{paddingBottom:80,paddingTop:72}}>
      <div className="detail-grid" style={{display:"grid",maxWidth:1200,margin:"0 auto",padding:"40px 32px",gap:48,alignItems:"start"}}>
        {/* Left */}
        <div style={{textAlign:"center"}}>
          <span className="ub" style={{marginBottom:20,display:"inline-flex"}}><span className="ld"/>{c.daysLeft} jours restants</span>
          <div style={{fontSize:96,margin:"24px 0 20px"}}>{c.img}</div>
          <h1 className="fd" style={{fontSize:"clamp(30px,5vw,52px)",fontWeight:400,letterSpacing:3,marginBottom:8,cursor:"pointer",textDecoration:"underline",textDecorationColor:"rgba(201,168,76,0.3)"}} onClick={()=>nav("artist",{artistName:c.artist})}>{c.artist}</h1>
          <p style={{fontSize:13,color:"#888",marginBottom:12}}>{c.date} · {c.city} · {c.venue}</p>
          <div style={{display:"flex",gap:8,justifyContent:"center",flexWrap:"wrap"}}>
            <span className="tag">{c.category}</span>
            <span style={{padding:"4px 12px",background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.1)",fontSize:11,color:"#aaa"}}>{gi} {c.genre}</span>
          </div>
        </div>
        {/* Right */}
        <div>
          <div style={{background:"rgba(201,168,76,0.05)",border:"1px solid rgba(201,168,76,0.2)",padding:"28px 24px",marginBottom:24,textAlign:"center"}}>
            <Crown size={28}/>
            <h3 className="fd" style={{fontSize:20,fontWeight:600,letterSpacing:2,marginBottom:8,marginTop:12}}>Devenir Juré CROWDN</h3>
            <p style={{fontSize:12,color:"#888",lineHeight:1.7,marginBottom:4}}>Ce concert sera évalué par un panel de jurés certifiés.</p>
            <button style={{background:"transparent",border:"1px solid rgba(201,168,76,0.6)",color:GOLD,padding:"12px 28px",fontFamily:"'Montserrat',sans-serif",fontWeight:700,fontSize:10,letterSpacing:3,textTransform:"uppercase",cursor:"pointer",transition:"all 0.3s",width:"100%",marginTop:12}} onClick={()=>nav("become-jury")}>★ Become a Jury Member</button>
          </div>
          <div style={{background:BG2,border:"1px solid rgba(201,168,76,0.08)",padding:24}}>
            <p className="sl" style={{marginBottom:16}}>Informations</p>
            {[["Artiste",c.artist],["Date",c.date],["Ville",c.city],["Salle",c.venue],["Catégorie",c.category],["Genre",`${gi} ${c.genre}`]].map(([k,v])=>(
              <div key={k} style={{display:"flex",justifyContent:"space-between",padding:"10px 0",borderBottom:"1px solid rgba(255,255,255,0.04)",fontSize:12}}>
                <span style={{color:"#666"}}>{k}</span><span style={{color:"#eee"}}>{v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function PastPage({nav,concerts}) {
  const [activeGenre,setActiveGenre]=useState("Tous");
  const P=concerts||PAST_DEFAULT;
  const allGenres=["Tous",...Array.from(new Set(P.map(c=>c.genre)))];
  const filtered=activeGenre==="Tous"?P:P.filter(c=>c.genre===activeGenre);
  return (
    <div style={{padding:"80px 0 80px",maxWidth:1400,margin:"0 auto"}}>
      <div style={{padding:"20px 32px 32px"}}>
        <p className="sl" style={{marginBottom:8}}>Archives</p>
        <h1 className="fd" style={{fontSize:"clamp(28px,5vw,44px)",fontWeight:400,letterSpacing:2,marginBottom:8}}>Previous Concerts</h1>
        <p style={{fontSize:12,color:"#777"}}>Le témoignage de nos jurés sur les concerts passés</p>
      </div>
      <div className="desktop-two-col" style={{display:"grid",gap:0,alignItems:"start"}}>
        <div className="desktop-sidebar" style={{padding:"0 24px 0 32px",position:"sticky",top:80}}>
          <p className="sl" style={{marginBottom:16,fontSize:9}}>Genres</p>
          <div style={{display:"flex",flexDirection:"column",gap:6}}>
            {allGenres.map(g=>(
              <button key={g} onClick={()=>setActiveGenre(g)}
                style={{display:"flex",alignItems:"center",gap:10,padding:"10px 14px",background:activeGenre===g?"rgba(201,168,76,0.1)":"transparent",border:`1px solid ${activeGenre===g?"rgba(201,168,76,0.4)":"rgba(255,255,255,0.06)"}`,color:activeGenre===g?GOLD:"#888",cursor:"pointer",fontFamily:"'Montserrat',sans-serif",fontSize:10,fontWeight:700,letterSpacing:1.5,textTransform:"uppercase",transition:"all 0.2s",textAlign:"left"}}>
                {g!=="Tous"&&<span style={{fontSize:16}}>{GENRES.find(x=>x.name===g)?.icon}</span>}
                {g}
              </button>
            ))}
          </div>
        </div>
        <div style={{padding:"0 32px"}}>
          <div className="genre-filter" style={{marginBottom:24,display:"flex"}}>
            {allGenres.map(g=>(
              <button key={g} className={`gf-btn ${activeGenre===g?"active":""}`} onClick={()=>setActiveGenre(g)}>
                {g!=="Tous"&&<span style={{marginRight:6}}>{GENRES.find(x=>x.name===g)?.icon}</span>}{g}
              </button>
            ))}
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(400px,1fr))",gap:16}}>
            {filtered.map((c,i)=><PastCard key={c.id} c={c} idx={i} onClick={()=>nav("past-detail",c)}/>)}
          </div>
        </div>
      </div>
    </div>
  );
}

function PastDetail({c,nav}) {
  if(!c) return null;
  const gi=GENRES.find(g=>g.name===c.genre)?.icon;
  return (
    <div style={{paddingBottom:80}}>
      <div style={{padding:"100px 20px 40px",textAlign:"center",background:"linear-gradient(to bottom,rgba(201,168,76,0.04),transparent)"}}>
        <div style={{fontSize:64,marginBottom:16}}>{c.img}</div>
        <p className="sl" style={{marginBottom:8}}>{gi} {c.genre}</p>
        <h1 className="fd" style={{fontSize:"clamp(28px,6vw,48px)",fontWeight:400,letterSpacing:3,marginBottom:8,cursor:"pointer",textDecoration:"underline",textDecorationColor:"rgba(201,168,76,0.3)"}} onClick={()=>nav("artist",{artistName:c.artist})}>{c.artist}</h1>
        <p style={{fontSize:13,color:"#888",marginBottom:16}}>{c.date} · {c.city} · {c.venue}</p>
        <span className="tag">{c.category}</span>
      </div>
      <div style={{maxWidth:620,margin:"0 auto",padding:"20px 20px 0"}}>
        <div style={{marginBottom:24}}>
          <p className="sl" style={{marginBottom:16}}>Le mot du jury</p>
          <div style={{background:"rgba(201,168,76,0.04)",border:"1px solid rgba(201,168,76,0.15)",padding:"28px 24px"}}>
            <div style={{fontSize:40,color:GOLD,opacity:0.4,fontFamily:"serif",lineHeight:1,marginBottom:8}}>"</div>
            <p className="fd" style={{fontSize:"clamp(17px,3.5vw,22px)",fontStyle:"italic",color:"rgba(245,240,232,0.9)",lineHeight:1.7,marginBottom:24}}>{c.juryQuote}</p>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:12}}>
              <div style={{display:"flex",alignItems:"center",gap:12}}>
                <div className="ja" style={{width:48,height:48,fontSize:22}}>{c.juryAvatar}</div>
                <div>
                  <p style={{fontWeight:700,color:GOLD,fontSize:13}}>{c.juryName}</p>
                  <p style={{fontSize:10,color:"#666",marginTop:2}}>Juré certifié CROWDN</p>
                  <p style={{fontSize:10,color:"#555",marginTop:1}}>{c.juryHandle}</p>
                </div>
              </div>
              <a href={c.tiktokUrl} className="tb"><span style={{fontSize:16}}>▶</span>Voir sur TikTok</a>
            </div>
          </div>
        </div>
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

function ArtistPage({artistName,nav}) {
  const artist=ARTISTS[artistName];
  const upcoming=UPCOMING_DEFAULT.filter(c=>c.artist===artistName);
  const past=PAST_DEFAULT.filter(c=>c.artist===artistName);
  if(!artist) return null;
  return (
    <div style={{padding:"100px 20px 80px",maxWidth:680,margin:"0 auto"}}>
      <div style={{textAlign:"center",marginBottom:40}}>
        <div style={{fontSize:72,marginBottom:16}}>{[...UPCOMING_DEFAULT,...PAST_DEFAULT].find(c=>c.artist===artistName)?.img||"🎵"}</div>
        <p className="sl" style={{marginBottom:8}}>Artiste CROWDN</p>
        <h1 className="fd" style={{fontSize:"clamp(28px,6vw,48px)",fontWeight:400,letterSpacing:3,marginBottom:12}}>{artistName}</h1>
        <p style={{fontSize:12,color:"#888",lineHeight:1.8,maxWidth:480,margin:"0 auto"}}>{artist.bio}</p>
      </div>
      <div style={{display:"flex",gap:10,justifyContent:"center",flexWrap:"wrap",marginBottom:40}}>
        <a href={artist.spotify} target="_blank" rel="noreferrer" style={{display:"inline-flex",alignItems:"center",gap:8,padding:"10px 20px",background:"rgba(29,185,84,0.1)",border:"1px solid rgba(29,185,84,0.3)",color:"#1DB954",fontSize:10,fontWeight:700,letterSpacing:2,textTransform:"uppercase",textDecoration:"none",fontFamily:"'Montserrat',sans-serif"}}>♫ Spotify</a>
        <a href={artist.instagram} target="_blank" rel="noreferrer" style={{display:"inline-flex",alignItems:"center",gap:8,padding:"10px 20px",background:"rgba(225,48,108,0.08)",border:"1px solid rgba(225,48,108,0.25)",color:"#E1306C",fontSize:10,fontWeight:700,letterSpacing:2,textTransform:"uppercase",textDecoration:"none",fontFamily:"'Montserrat',sans-serif"}}>◎ Instagram</a>
        <a href={artist.tiktok} target="_blank" rel="noreferrer" style={{display:"inline-flex",alignItems:"center",gap:8,padding:"10px 20px",background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.12)",color:"#eee",fontSize:10,fontWeight:700,letterSpacing:2,textTransform:"uppercase",textDecoration:"none",fontFamily:"'Montserrat',sans-serif"}}>▶ TikTok</a>
      </div>
      <div className="gd" style={{marginBottom:32}}/>
      {upcoming.length>0&&(
        <div style={{marginBottom:32}}>
          <p className="sl" style={{marginBottom:16}}>Concerts à venir</p>
          {upcoming.map(c=>(
            <div key={c.id} className="cc" style={{marginBottom:10,cursor:"pointer"}} onClick={()=>nav("upcoming-detail",c)}>
              <div style={{display:"flex",alignItems:"center",gap:16,padding:"16px 20px"}}>
                <div style={{flex:1}}><p style={{fontWeight:700,fontSize:13}}>{c.date} · {c.city}</p><p style={{fontSize:11,color:"#888",marginTop:2}}>{c.venue}</p></div>
                <div style={{display:"flex",alignItems:"center",gap:10}}>
                  <span className="ub"><span className="ld"/>{c.daysLeft}j</span>
                  <span className="tag" style={{fontSize:8}}>{c.category.split(" ")[0]}</span>
                </div>
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

function BecomeJury({nav}) {
  return (
    <div style={{padding:"100px 20px 80px",maxWidth:720,margin:"0 auto"}}>
      <div style={{textAlign:"center",marginBottom:48}}>
        <Crown size={44}/>
        <p className="sl" style={{marginTop:20,marginBottom:8}}>Rejoindre l'élite</p>
        <h1 className="fd" style={{fontSize:"clamp(28px,6vw,44px)",fontWeight:400,letterSpacing:2,marginBottom:16}}>Become a Jury Member</h1>
        <div style={{background:"rgba(201,168,76,0.06)",border:"1px solid rgba(201,168,76,0.2)",padding:"16px 20px",maxWidth:540,margin:"0 auto",display:"flex",alignItems:"center",gap:12}}>
          <span style={{fontSize:20,flexShrink:0}}>⚖️</span>
          <p style={{fontSize:12,color:"rgba(245,240,232,0.75)",lineHeight:1.7,textAlign:"left"}}>
            Chaque concert est évalué par un panel de 3 types de jurés. <strong style={{color:GOLD}}>Les votes individuels restent privés.</strong> Seul le résultat collectif est publié. CROWDN détermine si chaque fan est Fan ou Non-fan selon ses genres déclarés.
          </p>
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
              <div>
                <p style={{fontWeight:700,fontSize:13,color:j.color}}>{j.type}</p>
                <span style={{display:"inline-block",padding:"2px 8px",background:"rgba(201,168,76,0.08)",border:"1px solid rgba(201,168,76,0.2)",fontSize:8,letterSpacing:1.5,color:"#888",textTransform:"uppercase",fontWeight:600,marginTop:3}}>{j.tag}</span>
              </div>
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
      <div style={{background:"rgba(201,168,76,0.04)",border:"1px solid rgba(201,168,76,0.15)",padding:24,marginBottom:40}}>
        <p className="sl" style={{marginBottom:16}}>Ce que vous obtenez</p>
        {["Accès à l'espace jury privé","Concerts assignés en avant-première","Badge Juré certifié CROWDN","Profil visible sur la plateforme","Participation aux CROWDN Awards"].map((item,i)=>(
          <div key={i} style={{display:"flex",alignItems:"center",gap:12,padding:"8px 0",borderBottom:"1px solid rgba(255,255,255,0.04)",fontSize:12}}>
            <span style={{color:GOLD,fontSize:14}}>✦</span><span style={{color:"#ccc"}}>{item}</span>
          </div>
        ))}
      </div>
      <div style={{textAlign:"center"}}>
        <p style={{fontSize:12,color:"#888",marginBottom:20,lineHeight:1.8}}>Prêt à rejoindre le jury ? Crée ton compte — tu compléteras ton profil juré directement à l'inscription.</p>
        <button className="bp" style={{padding:"16px 40px",fontSize:11,letterSpacing:3}} onClick={()=>nav("login",{wantsJury:true})}>👑 Créer mon compte juré</button>
        <p style={{fontSize:11,color:"#555",marginTop:16}}>Déjà membre ?{" "}<span style={{color:GOLD,cursor:"pointer",fontWeight:600}} onClick={()=>nav("login")}>Se connecter</span></p>
      </div>
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
  const [wantsJury,setWantsJury]=useState(initWantsJury);
  const [juryProfile,setJuryProfile]=useState("");
  const [pressCard,setPressCard]=useState("");
  const [media,setMedia]=useState("");
  const [pressDoc,setPressDoc]=useState("");
  const [proRole,setProRole]=useState("");
  const [company,setCompany]=useState("");
  const [proDoc,setProDoc]=useState("");
  const [genres,setGenres]=useState(["","","","",""]);
  const [motivation,setMotivation]=useState("");

  const handleLogin=async()=>{
    if(!email||!password){setError("Email et mot de passe requis");return;}
    setLoading(true);setError("");
    try{
      const{data,error}=await supabase.auth.signInWithPassword({email,password});
      if(error){setError("Email ou mot de passe incorrect");return;}
      const{data:profile}=await supabase.from("profiles").select("role,name").eq("id",data.user.id).single();
      onLogin(profile?.role||"user",data.user);
    }catch(e){setError("Erreur de connexion");}
    finally{setLoading(false);}
  };

  const handleSignup=async()=>{
    if(!email||!password||!name){setError("Tous les champs sont requis");return;}
    if(password.length<6){setError("Mot de passe : 6 caractères minimum");return;}
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

  const handleProfileComplete=async()=>{
    setLoading(true);
    try{
      if(wantsJury){
        await supabase.from("jury_applications").insert({
          name,email,profile_type:juryProfile,
          genre:genres.filter(g=>g).join(", "),
          motivation,status:"pending"
        });
      }
      setSuccess("Profil créé ! Vérifie ton email pour confirmer ton compte.");
      setTimeout(()=>{onLogin("user",newUser);},2000);
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
          {mode==="signup"&&<input className="ifield" placeholder="Votre nom complet" value={name} onChange={e=>setName(e.target.value)}/>}
          <input className="ifield" placeholder="votre@email.com" type="email" value={email} onChange={e=>setEmail(e.target.value)}/>
          <input className="ifield" type="password" placeholder={mode==="signup"?"Mot de passe (6 caractères min.)":"Mot de passe"} value={password} onChange={e=>setPassword(e.target.value)}/>
        </div>
        {error&&<div style={{padding:"10px 14px",background:"rgba(255,50,50,0.08)",border:"1px solid rgba(255,50,50,0.25)",color:"#FF6060",fontSize:11,marginBottom:16}}>⚠️ {error}</div>}
        {success&&<div style={{padding:"10px 14px",background:"rgba(76,200,100,0.08)",border:"1px solid rgba(76,200,100,0.25)",color:"#4CC864",fontSize:11,marginBottom:16}}>✅ {success}</div>}
        <button className="bp" style={{width:"100%",padding:16,fontSize:11,letterSpacing:3,opacity:loading?0.6:1}} onClick={mode==="login"?handleLogin:handleSignup} disabled={loading}>
          {loading?"...":mode==="login"?"Connexion":"Créer mon compte →"}
        </button>
        {mode==="login"&&(
          <p style={{textAlign:"center",marginTop:16,fontSize:11,color:"#555"}}>
            Mot de passe oublié ?{" "}
            <span style={{color:GOLD,cursor:"pointer",fontWeight:600}} onClick={async()=>{
              if(!email){setError("Entrez votre email d'abord");return;}
              await supabase.auth.resetPasswordForEmail(email);
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
          <h2 className="fd" style={{fontSize:28,fontWeight:400,letterSpacing:2,marginBottom:8}}>Complète ton profil</h2>
          <p style={{fontSize:12,color:"#888",lineHeight:1.7}}>Une dernière étape avant de rejoindre CROWDN.</p>
        </div>
        <div className="gd" style={{marginBottom:28}}/>
        <p className="sl" style={{marginBottom:14}}>Quel est ton rôle ?</p>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:28}}>
          <button onClick={()=>setWantsJury(false)} style={{padding:"18px",background:!wantsJury?"rgba(201,168,76,0.12)":"rgba(255,255,255,0.03)",border:`1px solid ${!wantsJury?GOLD:"rgba(201,168,76,0.12)"}`,color:!wantsJury?GOLD:"#888",cursor:"pointer",fontFamily:"'Montserrat',sans-serif",fontSize:10,fontWeight:700,letterSpacing:1.5,textTransform:"uppercase",textAlign:"center",transition:"all 0.2s"}}>
            <div style={{fontSize:24,marginBottom:6}}>👤</div>Utilisateur
            <p style={{fontSize:9,color:"#666",marginTop:4,fontWeight:400,letterSpacing:0,textTransform:"none"}}>Je suis fan de concerts</p>
          </button>
          <button onClick={()=>setWantsJury(true)} style={{padding:"18px",background:wantsJury?"rgba(201,168,76,0.12)":"rgba(255,255,255,0.03)",border:`1px solid ${wantsJury?GOLD:"rgba(201,168,76,0.12)"}`,color:wantsJury?GOLD:"#888",cursor:"pointer",fontFamily:"'Montserrat',sans-serif",fontSize:10,fontWeight:700,letterSpacing:1.5,textTransform:"uppercase",textAlign:"center",transition:"all 0.2s"}}>
            <div style={{fontSize:24,marginBottom:6}}>⭐</div>Candidat Jury
            <p style={{fontSize:9,color:"#666",marginTop:4,fontWeight:400,letterSpacing:0,textTransform:"none"}}>Je veux évaluer des concerts</p>
          </button>
        </div>
        {wantsJury&&(
          <div style={{display:"flex",flexDirection:"column",gap:14,marginBottom:24}}>
            <div className="gd"/>
            <p className="sl" style={{marginTop:8}}>Ton profil de juré</p>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
              {[["journalist","📰 Journaliste"],["music_pro","🎶 Acteur musique"],["fan","🎤 Fan de musique live"]].map(([v,l])=>(
                <button key={v} onClick={()=>setJuryProfile(v)} style={{padding:"10px 8px",background:juryProfile===v?"rgba(201,168,76,0.12)":"rgba(255,255,255,0.03)",border:`1px solid ${juryProfile===v?GOLD:"rgba(201,168,76,0.12)"}`,color:juryProfile===v?GOLD:"#888",cursor:"pointer",fontFamily:"'Montserrat',sans-serif",fontSize:9,fontWeight:700,letterSpacing:1,textTransform:"uppercase",transition:"all 0.2s"}}>{l}</button>
              ))}
            </div>
            {juryProfile==="journalist"&&(
              <div style={{display:"flex",flexDirection:"column",gap:10,padding:"14px",background:"rgba(201,168,76,0.04)",border:"1px solid rgba(201,168,76,0.15)"}}>
                <p style={{fontSize:11,color:GOLD,fontWeight:700}}>📰 Vérification journaliste</p>
                <input className="ifield" placeholder="Numéro carte de presse CCIJP" value={pressCard} onChange={e=>setPressCard(e.target.value)}/>
                <input className="ifield" placeholder="Média / Publication" value={media} onChange={e=>setMedia(e.target.value)}/>
                <label style={{display:"flex",alignItems:"center",gap:10,padding:"12px",border:`2px dashed ${pressDoc?"rgba(76,200,100,0.5)":"rgba(201,168,76,0.3)"}`,background:pressDoc?"rgba(76,200,100,0.05)":"rgba(201,168,76,0.02)",cursor:"pointer"}}>
                  <input type="file" accept="image/*,.pdf" style={{display:"none"}} onChange={e=>setPressDoc(e.target.files[0]?.name||"")}/>
                  <span style={{fontSize:18}}>{pressDoc?"✅":"📎"}</span>
                  <div><p style={{fontSize:11,fontWeight:600,color:pressDoc?"#4CC864":GOLD}}>{pressDoc||"Photo carte de presse"}</p><p style={{fontSize:9,color:"#666"}}>JPG, PNG ou PDF</p></div>
                </label>
                <div style={{display:"flex",gap:8,padding:"8px",background:"rgba(255,255,255,0.02)",border:"1px solid rgba(255,255,255,0.06)"}}>
                  <span>🔒</span><p style={{fontSize:10,color:"#666",lineHeight:1.6}}>Document supprimé après vérification — RGPD</p>
                </div>
              </div>
            )}
            {juryProfile==="music_pro"&&(
              <div style={{display:"flex",flexDirection:"column",gap:10,padding:"14px",background:"rgba(201,168,76,0.04)",border:"1px solid rgba(201,168,76,0.15)"}}>
                <p style={{fontSize:11,color:GOLD,fontWeight:700}}>🎶 Vérification acteur de la musique</p>
                <select className="ifield" style={{cursor:"pointer"}} value={proRole} onChange={e=>setProRole(e.target.value)}>
                  <option value="">Votre rôle</option>
                  <option>Manager / Agent artistique</option>
                  <option>Tourneur / Promoteur</option>
                  <option>Directeur artistique / Label</option>
                  <option>Booker / Programmateur</option>
                  <option>Intermittent du spectacle</option>
                  <option>Autre professionnel</option>
                </select>
                <input className="ifield" placeholder="Structure / Entreprise" value={company} onChange={e=>setCompany(e.target.value)}/>
                <label style={{display:"flex",alignItems:"center",gap:10,padding:"12px",border:`2px dashed ${proDoc?"rgba(76,200,100,0.5)":"rgba(201,168,76,0.3)"}`,background:proDoc?"rgba(76,200,100,0.05)":"rgba(201,168,76,0.02)",cursor:"pointer"}}>
                  <input type="file" accept="image/*,.pdf" style={{display:"none"}} onChange={e=>setProDoc(e.target.files[0]?.name||"")}/>
                  <span style={{fontSize:18}}>{proDoc?"✅":"📎"}</span>
                  <div><p style={{fontSize:11,fontWeight:600,color:proDoc?"#4CC864":GOLD}}>{proDoc||"Justificatif professionnel"}</p><p style={{fontSize:9,color:"#666"}}>Contrat, fiche de paie, carte intermittent...</p></div>
                </label>
                <div style={{display:"flex",gap:8,padding:"8px",background:"rgba(255,255,255,0.02)",border:"1px solid rgba(255,255,255,0.06)"}}>
                  <span>🔒</span><p style={{fontSize:10,color:"#666",lineHeight:1.6}}>Document supprimé après vérification — RGPD</p>
                </div>
              </div>
            )}
            {juryProfile==="fan"&&(
              <div style={{display:"flex",flexDirection:"column",gap:10,padding:"14px",background:"rgba(201,168,76,0.04)",border:"1px solid rgba(201,168,76,0.15)"}}>
                <p style={{fontSize:11,color:GOLD,fontWeight:700}}>🎵 Tes 5 genres préférés</p>
                <p style={{fontSize:10,color:"#888",lineHeight:1.6}}>Du plus écouté au moins écouté — définit ton profil Fan ou Non-fan.</p>
                {[1,2,3,4,5].map(n=>(
                  <div key={n} style={{display:"flex",alignItems:"center",gap:10}}>
                    <span style={{width:22,height:22,border:`1px solid ${GOLD}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700,color:GOLD,flexShrink:0,fontFamily:"serif"}}>{n}</span>
                    <select className="ifield" style={{cursor:"pointer"}} value={genres[n-1]||""} onChange={e=>{const g=[...genres];g[n-1]=e.target.value;setGenres(g);}}>
                      <option value="">Genre {n}</option>
                      {["Hip-Hop","Pop","Rock","R&B","Électro","Jazz","Metal","Classique","Reggae","Soul","Folk","Afrobeats","Flamenco","Punk","Latin","Blues"].map(g=>(<option key={g}>{g}</option>))}
                    </select>
                  </div>
                ))}
              </div>
            )}
            <textarea className="ifield" rows={3} placeholder="Pourquoi veux-tu rejoindre le jury CROWDN ?" value={motivation} onChange={e=>setMotivation(e.target.value)} style={{resize:"vertical"}}/>
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
  const [scores,setScores]=useState([7,8,7,9,8,8]);
  const [comment,setComment]=useState("");
  const [submitted,setSubmitted]=useState(false);
  const avg=(scores.reduce((a,b)=>a+b,0)/scores.length).toFixed(1);
  return (
    <div style={{padding:"100px 20px 80px",maxWidth:680,margin:"0 auto"}}>
      <span style={{padding:"4px 12px",background:"rgba(201,168,76,0.1)",border:"1px solid rgba(201,168,76,0.3)",fontSize:9,letterSpacing:2,color:GOLD,textTransform:"uppercase",fontWeight:600}}>⭐ Accès Juré</span>
      <h1 className="fd" style={{fontSize:"clamp(24px,5vw,36px)",fontWeight:400,letterSpacing:2,marginBottom:32,marginTop:8}}>Tableau de Bord</h1>
      <p className="sl" style={{marginBottom:12}}>Concerts assignés</p>
      {UPCOMING_DEFAULT.slice(0,3).map(c=>(
        <div key={c.id} style={{background:BG2,border:"1px solid rgba(201,168,76,0.1)",padding:"14px 18px",marginBottom:8,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <div style={{display:"flex",alignItems:"center",gap:12}}><span style={{fontSize:22}}>{c.img}</span><div><p style={{fontWeight:700,fontSize:13}}>{c.artist}</p><p style={{fontSize:11,color:"#888"}}>{c.date} · {c.city} · {GENRES.find(g=>g.name===c.genre)?.icon} {c.genre}</p></div></div>
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
              <button className="bp" style={{padding:"14px 28px",fontSize:11,letterSpacing:2}} onClick={()=>setSubmitted(true)}>Soumettre</button>
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

function AdminDash() {
  const [tab,setTab]=useState("upcoming");
  const [toast,setToast]=useState("");
  const show=msg=>{setToast(msg);setTimeout(()=>setToast(""),2500);};
  return (
    <div style={{padding:"100px 20px 80px",maxWidth:960,margin:"0 auto"}}>
      <span style={{padding:"4px 12px",background:"rgba(201,168,76,0.1)",border:"1px solid rgba(201,168,76,0.3)",fontSize:9,letterSpacing:2,color:GOLD,textTransform:"uppercase",fontWeight:600}}>🔑 Administration</span>
      <h1 className="fd" style={{fontSize:"clamp(24px,5vw,36px)",fontWeight:400,letterSpacing:2,marginBottom:32,marginTop:8}}>Back Office CROWDN</h1>
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:10,marginBottom:32}}>
        {[["8","À venir","🎵"],["4","Passés","🎭"],["4","Jurés","⭐"],["247","Membres","👥"]].map(([n,l,ic])=>(
          <div key={l} style={{background:BG2,border:"1px solid rgba(201,168,76,0.08)",padding:"16px",textAlign:"center"}}>
            <div style={{fontSize:20,marginBottom:6}}>{ic}</div>
            <div className="fd gt" style={{fontSize:22,fontWeight:700}}>{n}</div>
            <div style={{fontSize:9,color:"#666",letterSpacing:1.5,textTransform:"uppercase",marginTop:4}}>{l}</div>
          </div>
        ))}
      </div>
      <div style={{display:"flex",borderBottom:"1px solid rgba(201,168,76,0.12)",marginBottom:24}}>
        {["upcoming","passés","jurés"].map(t=>(
          <button key={t} style={{padding:"12px 22px",fontFamily:"'Montserrat',sans-serif",fontWeight:600,fontSize:10,letterSpacing:2,textTransform:"uppercase",background:"none",border:"none",borderBottom:tab===t?`2px solid ${GOLD}`:"2px solid transparent",color:tab===t?GOLD:"#666",cursor:"pointer",transition:"all 0.2s",marginBottom:-1}} onClick={()=>setTab(t)}>{t}</button>
        ))}
      </div>
      {tab==="upcoming"&&(
        <div>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:14}}>
            <p style={{fontSize:11,color:"#888"}}>{UPCOMING_DEFAULT.length} concerts à venir</p>
            <button className="bp" style={{fontSize:9,padding:"8px 16px"}} onClick={()=>show("Concert ajouté ✓")}>+ Ajouter</button>
          </div>
          <div style={{background:BG2,border:"1px solid rgba(201,168,76,0.08)",overflow:"hidden"}}>
            <table className="at"><thead><tr><th>Artiste</th><th>Genre</th><th>Date</th><th>Catégorie</th><th>Actions</th></tr></thead>
              <tbody>{UPCOMING_DEFAULT.map(c=>(<tr key={c.id}><td style={{fontWeight:600,color:"#eee"}}>{c.artist}</td><td>{GENRES.find(g=>g.name===c.genre)?.icon} {c.genre}</td><td>{c.date}</td><td><span className="tag" style={{fontSize:8}}>{c.category.split(" ")[0]}</span></td><td><button className="bo" style={{fontSize:8,padding:"4px 10px"}} onClick={()=>show("Jury assigné ✓")}>Assigner jury</button></td></tr>))}</tbody>
            </table>
          </div>
        </div>
      )}
      {tab==="passés"&&(
        <div style={{background:BG2,border:"1px solid rgba(201,168,76,0.08)",overflow:"hidden"}}>
          <table className="at"><thead><tr><th>Artiste</th><th>Genre</th><th>Date</th><th>Citation</th><th>Actions</th></tr></thead>
            <tbody>{PAST_DEFAULT.map(c=>(<tr key={c.id}><td style={{fontWeight:600,color:"#eee"}}>{c.artist}</td><td>{GENRES.find(g=>g.name===c.genre)?.icon} {c.genre}</td><td>{c.date}</td><td><span style={{color:"#4CC864"}}>✓ Publiée</span></td><td><div style={{display:"flex",gap:6}}><button className="bo" style={{fontSize:8,padding:"4px 10px"}} onClick={()=>show("Citation modifiée ✓")}>Modifier</button><button className="bo" style={{fontSize:8,padding:"4px 10px"}} onClick={()=>show("TikTok mis à jour ✓")}>TikTok</button></div></td></tr>))}</tbody>
          </table>
        </div>
      )}
      {tab==="jurés"&&(
        <div>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:14,flexWrap:"wrap",gap:8}}>
            <p style={{fontSize:11,color:"#888"}}>Candidatures — validation manuelle</p>
            <div style={{display:"flex",gap:6}}>
              {["Tous","En attente","Validé","Refusé"].map(f=>(<button key={f} style={{padding:"4px 12px",background:"rgba(201,168,76,0.08)",border:"1px solid rgba(201,168,76,0.2)",color:GOLD,fontSize:8,fontWeight:700,letterSpacing:1,textTransform:"uppercase",cursor:"pointer",fontFamily:"'Montserrat',sans-serif"}}>{f}</button>))}
            </div>
          </div>
          <div style={{background:BG2,border:"1px solid rgba(201,168,76,0.08)",overflow:"auto"}}>
            <table className="at">
              <thead><tr><th>Nom</th><th>Profil</th><th>Top genres</th><th>Document</th><th>Statut</th><th>Actions</th></tr></thead>
              <tbody>
                {[{n:"Sophie L.",p:"📰 Journaliste",g:"Pop · R&B · Soul",doc:true,st:"Validé"},{n:"Marc F.",p:"🎶 Acteur musique",g:"Hip-Hop · Rap",doc:true,st:"Validé"},{n:"Elena R.",p:"🎤 Fan du genre",g:"Flamenco · Latin · Jazz",doc:false,st:"Validé"},{n:"Thomas V.",p:"👁️ Non-fan",g:"Rock · Metal · Punk",doc:false,st:"En attente"},{n:"Karim B.",p:"📰 Journaliste",g:"Hip-Hop · R&B",doc:true,st:"En attente"},{n:"Julie M.",p:"🎶 Acteur musique",g:"Pop · Électro · R&B",doc:true,st:"En attente"}].map(({n,p,g,doc,st})=>(
                  <tr key={n}>
                    <td style={{fontWeight:600,color:"#eee"}}>{n}</td>
                    <td style={{fontSize:11}}>{p}</td>
                    <td style={{fontSize:10,color:"#888"}}>{g}</td>
                    <td>{doc?(<div style={{display:"flex",gap:4}}><button className="bo" style={{fontSize:8,padding:"3px 8px"}} onClick={()=>show("Document téléchargé ✓")}>📎 Voir</button><button style={{background:"rgba(255,50,50,0.1)",border:"1px solid rgba(255,50,50,0.3)",color:"#FF5050",fontSize:8,padding:"3px 8px",cursor:"pointer",fontFamily:"'Montserrat',sans-serif",fontWeight:700}} onClick={()=>show("Document supprimé 🗑️")}>🗑️</button></div>):(<span style={{fontSize:10,color:"#555"}}>—</span>)}</td>
                    <td><span style={{padding:"3px 10px",background:st==="Validé"?"rgba(76,200,100,0.1)":st==="En attente"?"rgba(201,168,76,0.1)":"rgba(255,50,50,0.1)",border:`1px solid ${st==="Validé"?"rgba(76,200,100,0.3)":st==="En attente"?"rgba(201,168,76,0.3)":"rgba(255,50,50,0.3)"}`,color:st==="Validé"?"#4CC864":st==="En attente"?GOLD:"#FF5050",fontSize:9,letterSpacing:1.5,fontWeight:600,textTransform:"uppercase",display:"inline-block"}}>{st}</span></td>
                    <td><div style={{display:"flex",gap:6}}>{st==="En attente"&&<><button className="bp" style={{fontSize:8,padding:"4px 10px"}} onClick={()=>show("Juré validé ✓")}>✓ Valider</button><button className="bo" style={{fontSize:8,padding:"4px 10px"}} onClick={()=>show("Candidature refusée")}>✗ Refuser</button></>}{st==="Validé"&&<button className="bo" style={{fontSize:8,padding:"4px 10px"}} onClick={()=>show("Email envoyé ✓")}>Contacter</button>}</div></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {toast&&<div className="toast">{toast}</div>}
    </div>
  );
}

export default function App() {
  const [page,setPage]=useState("home");
  const [sel,setSel]=useState(null);
  const [role,setRole]=useState(null);
  const [user,setUser]=useState(null);
  const [genreFilter,setGenreFilter]=useState(null);
  const [artistName,setArtistName]=useState(null);
  const [upcomingData,setUpcomingData]=useState(UPCOMING_DEFAULT);
  const [pastData,setPastData]=useState(PAST_DEFAULT);
  const [wantsJuryLogin,setWantsJuryLogin]=useState(false);
  const [cookieConsent,setCookieConsent]=useState(()=>localStorage.getItem("crowdn_cookies")||null);

  useEffect(()=>{
    supabase.auth.getSession().then(({data:{session}})=>{
      if(session){
        supabase.from("profiles").select("role,name").eq("id",session.user.id).single()
          .then(({data:profile})=>{setUser(session.user);setRole(profile?.role||"user");});
      }
    });
    const{data:{subscription}}=supabase.auth.onAuthStateChange((_,session)=>{
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
    {key:"how-it-works",label:"Info",icon:"💡"},
    ...(!role?[{key:"become-jury",label:"Jury",icon:"👑"}]:[]),
    ...(role==="jury"?[{key:"jury-dash",label:"Mon espace",icon:"⭐"}]:[]),
    ...(role==="admin"?[{key:"admin",label:"Admin",icon:"🔑"}]:[]),
  ];

  return (
    <>
      <style>{styles}</style>
      <nav className="nav">
        <button style={{background:"none",border:"none",cursor:"pointer"}} onClick={()=>nav("home")}>
          <span style={{fontWeight:800,fontSize:20,letterSpacing:6,color:GOLD}}>CROWD</span>
          <span className="fd" style={{fontSize:20,fontWeight:700,color:GOLD}}>N</span>
        </button>
        <div style={{display:"flex",gap:20,alignItems:"center"}}>
          {navItems.map(item=>(<button key={item.key} className={`nl ${page===item.key?"active":""}`} onClick={()=>nav(item.key)}>{item.label}</button>))}
          {role?(
            <div style={{display:"flex",alignItems:"center",gap:10}}>
              <span style={{fontSize:11,color:GOLD,fontWeight:600,letterSpacing:1}}>{user?.email?.split("@")[0]}</span>
              <button className="bo" style={{fontSize:9,padding:"8px 16px"}} onClick={async()=>{await supabase.auth.signOut();setRole(null);setUser(null);nav("home");}}>Déconnexion</button>
            </div>
          ):(
            <button className="bp" onClick={()=>nav("login")}>Connexion</button>
          )}
        </div>
      </nav>

      {page==="home"&&<HomePage nav={nav} upcoming={upcomingData} past={pastData}/>}
      {page==="login"&&<Login nav={nav} onLogin={(r,u)=>{setRole(r);setUser(u);setWantsJuryLogin(false);if(r==="jury")nav("jury-dash");else if(r==="admin")nav("admin");else nav("home");}} wantsJury={wantsJuryLogin}/>}
      {page==="upcoming"&&<UpcomingPage nav={nav} initialGenre={genreFilter} concerts={upcomingData}/>}
      {page==="upcoming-detail"&&<UpcomingDetail c={sel} nav={nav}/>}
      {page==="past"&&<PastPage nav={nav} concerts={pastData}/>}
      {page==="past-detail"&&<PastDetail c={sel} nav={nav}/>}
      {page==="become-jury"&&<BecomeJury nav={nav}/>}
      {page==="how-it-works"&&<HowItWorks nav={nav}/>}
      {page==="artist"&&<ArtistPage artistName={artistName} nav={nav}/>}
      {page==="jury-dash"&&role==="jury"&&<JuryDash/>}
      {page==="admin"&&role==="admin"&&<AdminDash/>}
      {page==="mentions-legales"&&<MentionsLegales nav={nav}/>}
      {page==="politique-confidentialite"&&<PolitiqueConfidentialite nav={nav}/>}

      {/* Footer */}
      <div style={{background:"#080808",borderTop:"1px solid rgba(201,168,76,0.08)",padding:"28px 32px",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:12,marginBottom:role||!cookieConsent?60:0}}>
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          <span style={{fontWeight:800,fontSize:14,letterSpacing:4,color:GOLD}}>CROWDN</span>
          <span style={{fontSize:10,color:"#555"}}>© {new Date().getFullYear()}</span>
        </div>
        <div style={{display:"flex",gap:20,flexWrap:"wrap"}}>
          {[["mentions-legales","Mentions légales"],["politique-confidentialite","Politique de confidentialité"]].map(([p,l])=>(
            <button key={p} onClick={()=>nav(p)} style={{background:"none",border:"none",color:"#666",fontSize:10,cursor:"pointer",fontFamily:"'Montserrat',sans-serif",letterSpacing:1,textTransform:"uppercase",transition:"color 0.2s"}}
              onMouseOver={e=>e.currentTarget.style.color=GOLD}
              onMouseOut={e=>e.currentTarget.style.color="#666"}>
              {l}
            </button>
          ))}
          <a href="mailto:contact@crowdn.fr" style={{color:"#666",fontSize:10,textDecoration:"none",letterSpacing:1,textTransform:"uppercase",fontFamily:"'Montserrat',sans-serif"}}>contact@crowdn.fr</a>
        </div>
      </div>

      {/* Cookie banner */}
      {!cookieConsent&&(
        <CookieBanner
          onAccept={()=>{localStorage.setItem("crowdn_cookies","accepted");setCookieConsent("accepted");}}
          onRefuse={()=>{localStorage.setItem("crowdn_cookies","refused");setCookieConsent("refused");}}
        />
      )}

      <div className="mnav">
        <button className={`mni ${page==="home"?"active":""}`} onClick={()=>nav("home")}><span style={{fontSize:18}}>🏠</span>Accueil</button>
        <button className={`mni ${page==="upcoming"?"active":""}`} onClick={()=>nav("upcoming")}><span style={{fontSize:18}}>🎵</span>À venir</button>
        <button className={`mni ${page==="past"?"active":""}`} onClick={()=>nav("past")}><span style={{fontSize:18}}>🎭</span>Passés</button>
        <button className={`mni ${page==="how-it-works"?"active":""}`} onClick={()=>nav("how-it-works")}><span style={{fontSize:18}}>💡</span>Info</button>
        {!role&&<button className={`mni ${page==="become-jury"?"active":""}`} onClick={()=>nav("become-jury")}><span style={{fontSize:18}}>👑</span>Jury</button>}
        {!role&&<button className={`mni ${page==="login"?"active":""}`} onClick={()=>nav("login")}><span style={{fontSize:18}}>🔐</span>Login</button>}
        {role==="jury"&&<button className={`mni ${page==="jury-dash"?"active":""}`} onClick={()=>nav("jury-dash")}><span style={{fontSize:18}}>⭐</span>Mon espace</button>}
        {role==="admin"&&<button className={`mni ${page==="admin"?"active":""}`} onClick={()=>nav("admin")}><span style={{fontSize:18}}>🔑</span>Admin</button>}
        {role&&<button className="mni" onClick={async()=>{await supabase.auth.signOut();setRole(null);setUser(null);nav("home");}}><span style={{fontSize:18}}>🚪</span>Quitter</button>}
      </div>
    </>
  );
}
