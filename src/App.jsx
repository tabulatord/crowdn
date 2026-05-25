import { useState, useEffect } from "react";
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
  .bjury{background:transparent;border:1px solid rgba(201,168,76,0.6);color:#C9A84C;padding:12px 28px;font-family:'Montserrat',sans-serif;font-weight:700;font-size:10px;letter-spacing:3px;text-transform:uppercase;cursor:pointer;transition:all 0.3s;width:100%;margin-top:12px}
  .bjury:hover{border-color:#C9A84C;background:rgba(201,168,76,0.08);transform:translateY(-2px)}

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

  /* Genre scroll strip */
  .genre-strip{overflow:hidden;padding:0;position:relative}
  .genre-strip::before{content:'';position:absolute;left:0;top:0;bottom:0;width:60px;background:linear-gradient(to right,#0A0A0A,transparent);z-index:2;pointer-events:none}
  .genre-strip::after{content:'';position:absolute;right:0;top:0;bottom:0;width:60px;background:linear-gradient(to left,#0A0A0A,transparent);z-index:2;pointer-events:none}
  .genre-track{display:flex;gap:12px;animation:scrollX 28s linear infinite;width:max-content}
  .genre-track:hover{animation-play-state:paused}

  .genre-pill{display:flex;align-items:center;gap:10px;padding:12px 20px;background:#111;border:1px solid rgba(201,168,76,0.15);cursor:pointer;transition:all 0.2s;white-space:nowrap;flex-shrink:0}
  .genre-pill:hover{border-color:rgba(201,168,76,0.5);background:rgba(201,168,76,0.07)}
  .genre-pill.active{border-color:#C9A84C;background:rgba(201,168,76,0.12)}

  /* Genre filter bar (concerts page) */
  .genre-filter{display:flex;gap:8px;overflow-x:auto;padding-bottom:4px;scrollbar-width:none}
  .genre-filter::-webkit-scrollbar{display:none}
  .gf-btn{padding:7px 16px;background:transparent;border:1px solid rgba(255,255,255,0.1);color:#888;font-family:'Montserrat',sans-serif;font-size:9px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;cursor:pointer;transition:all 0.2s;white-space:nowrap;flex-shrink:0}
  .gf-btn:hover{border-color:rgba(201,168,76,0.4);color:#C9A84C}
  .gf-btn.active{border-color:#C9A84C;background:rgba(201,168,76,0.1);color:#C9A84C}
`;

// ─── DATA ─────────────────────────────────────────────────────────────────────

const GENRES = [
  { name:"Hip-Hop", icon:"🎤" },
  { name:"Pop", icon:"✨" },
  { name:"Rock", icon:"🎸" },
  { name:"R&B", icon:"🎶" },
  { name:"Électro", icon:"🎛️" },
  { name:"Jazz", icon:"🎷" },
  { name:"Metal", icon:"🤘" },
  { name:"Classique", icon:"🎻" },
  { name:"Reggae", icon:"🌿" },
  { name:"Soul", icon:"🔥" },
  { name:"Folk", icon:"🪕" },
  { name:"Afrobeats", icon:"🥁" },
  { name:"Flamenco", icon:"💃" },
  { name:"Punk", icon:"⚡" },
  { name:"Latin", icon:"🌶️" },
  { name:"Blues", icon:"🎵" },
];

// Calcul automatique des jours restants
function daysUntil(dateStr) {
  const parts = dateStr.split(" ");
  const months = {"Jan":0,"Fév":1,"Mar":2,"Avr":3,"Mai":4,"Juin":5,"Juil":6,"Août":7,"Sep":8,"Oct":9,"Nov":10,"Déc":11};
  const d = new Date(parseInt(parts[2]), months[parts[1]], parseInt(parts[0]));
  const diff = Math.ceil((d - new Date()) / (1000*60*60*24));
  return diff > 0 ? diff : 0;
}

// Profils artistes avec liens
const ARTISTS = {
  "Indochine":      { bio:"Groupe de rock new wave français fondé en 1981. L'une des scènes live les plus fidèles et intenses de France.", spotify:"https://open.spotify.com/artist/4YzZZvLCNm7FpGbQmEUxlR", instagram:"https://instagram.com/indochine_official", tiktok:"https://tiktok.com/@indochine_officiel" },
  "Imagine Dragons":{ bio:"Groupe de rock américain, l'un des plus streamés au monde. Leurs shows sont réputés pour leur intensité visuelle et émotionnelle.", spotify:"https://open.spotify.com/artist/53XhwfbYqKCa1cC15pYq2q", instagram:"https://instagram.com/imaginedragons", tiktok:"https://tiktok.com/@imaginedragons" },
  "Linkin Park":    { bio:"Légende du rock mondial. De retour avec une nouvelle formation après la disparition de Chester Bennington. Tournée mondiale 2025.", spotify:"https://open.spotify.com/artist/6XyY86QOPPrYVGvF9ch6wz", instagram:"https://instagram.com/linkinpark", tiktok:"https://tiktok.com/@linkinpark" },
  "Iron Maiden":    { bio:"Pilier du heavy metal mondial depuis 1975. Leurs shows sont des spectacles visuels et musicaux hors normes.", spotify:"https://open.spotify.com/artist/6mdiAmATAx73kdxrNrnlao", instagram:"https://instagram.com/ironmaiden", tiktok:"https://tiktok.com/@ironmaiden" },
  "Bob Dylan":      { bio:"Prix Nobel de littérature et légende vivante du folk et du rock. L'un des derniers grands concerts d'une carrière de 60 ans.", spotify:"https://open.spotify.com/artist/74ASZWbe4lXaubB36ztrGX", instagram:"https://instagram.com/bobdylan", tiktok:"https://tiktok.com/@bobdylan" },
  "Damso":          { bio:"Rappeur belge, l'un des artistes francophones les plus écoutés au monde. Sa musique mêle introspection et trap sombre.", spotify:"https://open.spotify.com/artist/5z6A4MFnRqFgDOFHSiGNzp", instagram:"https://instagram.com/damso", tiktok:"https://tiktok.com/@damso" },
  "The Weeknd":     { bio:"Superstar canadienne de la R&B et pop. Ses shows stadium sont parmi les plus spectaculaires de l'industrie musicale mondiale.", spotify:"https://open.spotify.com/artist/1Xyo4u8uXC1ZmMpatF05PJ", instagram:"https://instagram.com/theweeknd", tiktok:"https://tiktok.com/@theweeknd" },
  "Bigflo & Oli":   { bio:"Duo de rap toulousain, symbole du rap conscient français. Leur tournée 2026 est l'une des plus attendues de la scène française.", spotify:"https://open.spotify.com/artist/5oGiMRm6s68zCJd0dQnUQG", instagram:"https://instagram.com/bigfloetoli", tiktok:"https://tiktok.com/@bigfloetoli" },
  "Billie Eilish":  { bio:"Phénomène de la pop mondiale. Voix unique, univers sombre et poétique. Ses shows sont intimes malgré les grandes salles.", spotify:"https://open.spotify.com/artist/6qqNVTkY8uBg9cP3Jd7DAH", instagram:"https://instagram.com/billieeilish", tiktok:"https://tiktok.com/@billieeilish" },
  "Ninho":          { bio:"Rappeur français, l'un des artistes les plus streamés de France. Premier rapper français à remplir le Stade de France en solo.", spotify:"https://open.spotify.com/artist/1vyhD5VmyZ7KMfW5gqLgo5", instagram:"https://instagram.com/ninho", tiktok:"https://tiktok.com/@ninho" },
  "DJ Snake":       { bio:"DJ et producteur français mondialement reconnu. Ses sets mêlent électro, trap et sons du monde pour des shows explosifs.", spotify:"https://open.spotify.com/artist/540vIaP2JwjQb9dm3aArA4", instagram:"https://instagram.com/djsnake", tiktok:"https://tiktok.com/@djsnake" },
  "Slimane":        { bio:"Chanteur franco-algérien révélé par The Voice. Sa voix exceptionnelle en fait l'un des artistes live les plus impressionnants du moment.", spotify:"https://open.spotify.com/artist/0EmeFodog0BfCgMzAIvKQp", instagram:"https://instagram.com/slimane", tiktok:"https://tiktok.com/@slimane" },
};

const UPCOMING = [
  { id:1, artist:"Indochine",     date:"17 Juin 2025", city:"Paris",  venue:"Accor Arena",              category:"Arena Class",   genre:"Rock",    img:"🎸" },
  { id:2, artist:"Imagine Dragons",date:"5 Juil 2025", city:"Paris",  venue:"Stade de France",          category:"Stadium Class", genre:"Rock",    img:"🌩️" },
  { id:3, artist:"Linkin Park",   date:"11 Juil 2025", city:"Paris",  venue:"Stade de France",          category:"Stadium Class", genre:"Rock",    img:"🤘" },
  { id:4, artist:"Iron Maiden",   date:"19 Juil 2025", city:"Paris",  venue:"Paris La Défense Arena",   category:"Arena Class",   genre:"Metal",   img:"💀" },
  { id:5, artist:"Bob Dylan",     date:"30 Oct 2025",  city:"Paris",  venue:"Palais des Congrès",       category:"Olympia Class", genre:"Folk",    img:"🎵" },
  { id:6, artist:"Damso",         date:"28 Mai 2026",  city:"Paris",  venue:"Paris La Défense Arena",   category:"Arena Class",   genre:"Hip-Hop", img:"👑" },
  { id:7, artist:"The Weeknd",    date:"8 Juil 2026",  city:"Paris",  venue:"Stade de France",          category:"Stadium Class", genre:"R&B",     img:"🌙" },
  { id:8, artist:"Bigflo & Oli",  date:"15 Oct 2026",  city:"Paris",  venue:"Accor Arena",              category:"Arena Class",   genre:"Hip-Hop", img:"🎤" },
].map(c => ({ ...c, daysLeft: daysUntil(c.date.split(" ")[0]+" "+c.date.split(" ")[1]+" "+c.date.split(" ")[2]) }));

const PAST = [
  { id:10, artist:"Billie Eilish", date:"10 Juin 2025", city:"Paris", venue:"Accor Arena",     category:"Arena Class",   genre:"Pop",    img:"🖤", juryQuote:"Une présence scénique hors du commun. Elle a rendu l'Accor Arena intime — c'est un tour de force.", juryName:"Sophie L.", juryAvatar:"👩‍🎤", juryHandle:"@sophiecrowdn", tiktokUrl:"#", photos:["📸","🎬","🌟"] },
  { id:11, artist:"Ninho",         date:"2 Mai 2025",   city:"Paris", venue:"Stade de France", category:"Stadium Class", genre:"Hip-Hop",img:"🏆", juryQuote:"Un stade plein à craquer pour un rappeur français. La scène du rap français a changé de dimension ce soir.", juryName:"Marc F.", juryAvatar:"🎧", juryHandle:"@marcjury", tiktokUrl:"#", photos:["📸","🎬","🔥"] },
  { id:12, artist:"DJ Snake",      date:"10 Mai 2025",  city:"Paris", venue:"Stade de France", category:"Stadium Class", genre:"Électro",img:"🐍", juryQuote:"Un show pyrotechnique à couper le souffle. La foule n'a jamais eu autant l'impression d'être au centre du monde.", juryName:"Elena R.", juryAvatar:"🎭", juryHandle:"@elenarjury", tiktokUrl:"#", photos:["📸","🎬","🌟","🔥"] },
  { id:13, artist:"Slimane",       date:"8 Avr 2025",   city:"Paris", venue:"Accor Arena",     category:"Arena Class",   genre:"Pop",    img:"🎶", juryQuote:"Une voix qui transperce les murs. Slimane a prouvé qu'il appartient désormais aux plus grandes scènes.", juryName:"Thomas V.", juryAvatar:"🎤", juryHandle:"@thomasvjury", tiktokUrl:"#", photos:["📸","🎬"] },
];

const JURY_TYPES = [
  { icon:"📰", type:"Journaliste", tag:"Officiel", desc:"Critique musical ou journaliste culturel avec expérience live reconnue.", color:"#E8C96A" },
  { icon:"🎶", type:"Acteur de la musique", tag:"Officiel", desc:"Professionnel de l'industrie : manager, tourneur, directeur artistique, booker.", color:"#E8C96A" },
  { icon:"🎤", type:"Fan du genre", tag:"Communauté", desc:"Fan passionné et expert du genre évalué. Connaissance profonde de l'artiste et de son univers.", color:"#C9A84C" },
  { icon:"👁️", type:"Non-fan du genre", tag:"Communauté", desc:"Regard neuf et objectif. N'écoute pas l'artiste en dehors du concert — juge uniquement ce qu'il voit et ressent.", color:"#C9A84C" },
];

const CRITERIA = [
  { icon:"🎤", name:"Performance scénique", desc:"Voix, énergie, présence, technique et maîtrise de l'espace." },
  { icon:"💡", name:"Scénographie", desc:"Décors, lumières, vidéos, costumes — l'univers visuel du show." },
  { icon:"🔥", name:"Interaction foule", desc:"Comment l'artiste crée la connexion et fait vivre le public." },
  { icon:"🌊", name:"Atmosphère", desc:"L'émotion globale — tension, euphorie, magie du moment." },
  { icon:"🎬", name:"Direction artistique", desc:"La cohérence et l'originalité de la vision du show." },
  { icon:"🎵", name:"Qualité de la setlist", desc:"Le choix et l'ordre des titres — la narration du concert." },
];

// ─── CROWN ────────────────────────────────────────────────────────────────────
function Crown({ size=40 }) {
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

// ─── GENRE SCROLL STRIP (homepage) ────────────────────────────────────────────
function GenreStrip({ onGenreClick }) {
  const doubled = [...GENRES, ...GENRES];
  return (
    <div style={{padding:"40px 0",borderTop:"1px solid rgba(201,168,76,0.08)",borderBottom:"1px solid rgba(201,168,76,0.08)"}}>
      <div style={{textAlign:"center",marginBottom:24}}>
        <p className="sl" style={{marginBottom:8}}>Tous les genres</p>
        <p className="fd" style={{fontSize:"clamp(20px,4vw,28px)",fontWeight:400,letterSpacing:2,color:"rgba(245,240,232,0.8)"}}>
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

// ─── PAST CARD ────────────────────────────────────────────────────────────────
function PastCard({ c, idx, onClick }) {
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
            <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:6}}>
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

// ─── HOMEPAGE ─────────────────────────────────────────────────────────────────
function HomePage({ nav }) {
  return (
    <div style={{paddingBottom:80}}>
      {/* Hero */}
      <div style={{minHeight:"100vh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",position:"relative",background:`radial-gradient(ellipse at 50% 55%,rgba(201,168,76,0.07) 0%,transparent 60%),#0A0A0A`,overflow:"hidden"}}>
        <div style={{position:"absolute",inset:0,backgroundImage:"repeating-linear-gradient(0deg,transparent,transparent 60px,rgba(201,168,76,0.015) 60px,rgba(201,168,76,0.015) 61px),repeating-linear-gradient(90deg,transparent,transparent 60px,rgba(201,168,76,0.015) 60px,rgba(201,168,76,0.015) 61px)"}}/>
        <div style={{position:"relative",textAlign:"center",padding:"0 24px"}}>
          <div style={{marginBottom:28}}><Crown size={72}/></div>
          <div style={{marginBottom:10,animation:"fadeUp 0.8s 0.3s ease both",opacity:0}}>
            <span style={{fontWeight:800,fontSize:"clamp(34px,8vw,60px)",letterSpacing:"10px",background:"linear-gradient(135deg,#8B6914,#C9A84C,#E8C96A,#C9A84C)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>CROWD</span>
            <span className="fd" style={{fontSize:"clamp(34px,8vw,60px)",fontWeight:700,color:GOLD}}>N</span>
          </div>
          <p style={{fontSize:10,fontWeight:400,letterSpacing:"5px",color:"#888",textTransform:"uppercase",marginBottom:20,animation:"fadeUp 0.8s 0.5s ease both",opacity:0}}>Couronné par la Foule</p>
          <div className="gd" style={{width:100,margin:"0 auto 32px"}}/>
          <div style={{display:"flex",gap:14,justifyContent:"center",flexWrap:"wrap",animation:"fadeUp 0.8s 0.7s ease both",opacity:0}}>
            <button className="bp" onClick={()=>nav("login")}>Rejoindre CROWDN</button>
            <button className="bo" onClick={()=>nav("upcoming")}>Concerts à venir</button>
          </div>
          <div style={{display:"flex",gap:44,justifyContent:"center",marginTop:52,animation:"fadeUp 0.8s 0.9s ease both",opacity:0}}>
            {[["247","Concerts"],["89","Jurés"],["16","Genres"]].map(([n,l])=>(
              <div key={l} style={{textAlign:"center"}}>
                <div className="fd gt" style={{fontSize:26,fontWeight:700}}>{n}</div>
                <div style={{fontSize:9,letterSpacing:2,color:"#666",textTransform:"uppercase",marginTop:4}}>{l}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{position:"absolute",bottom:36,display:"flex",flexDirection:"column",alignItems:"center",gap:8,animation:"pulse 2s infinite"}}>
          <div style={{fontSize:9,letterSpacing:3,color:"#555",textTransform:"uppercase"}}>Explorer</div>
          <div style={{width:1,height:36,background:"linear-gradient(to bottom,rgba(201,168,76,0.5),transparent)"}}/>
        </div>
      </div>

      {/* Genre strip */}
      <GenreStrip onGenreClick={g => nav("upcoming", {filterGenre: g})} />

      {/* Upcoming */}
      <div style={{padding:"60px 20px 0",maxWidth:900,margin:"0 auto"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:28}}>
          <div><p className="sl" style={{marginBottom:8}}>Prochainement</p><h2 className="fd" style={{fontSize:"clamp(22px,5vw,34px)",fontWeight:400,letterSpacing:2}}>Concerts à venir</h2></div>
          <button className="bo" style={{fontSize:9,padding:"8px 16px"}} onClick={()=>nav("upcoming")}>Voir tout</button>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))",gap:14}}>
          {UPCOMING.slice(0,3).map((c,i)=>(
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

      {/* Past */}
      <div style={{padding:"50px 20px 80px",maxWidth:900,margin:"0 auto"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:28}}>
          <div><p className="sl" style={{marginBottom:8}}>Archives</p><h2 className="fd" style={{fontSize:"clamp(22px,5vw,34px)",fontWeight:400,letterSpacing:2}}>Previous Concerts</h2></div>
          <button className="bo" style={{fontSize:9,padding:"8px 16px"}} onClick={()=>nav("past")}>Voir tout</button>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:14}}>
          {PAST.slice(0,2).map((c,i)=><PastCard key={c.id} c={c} idx={i} onClick={()=>nav("past-detail",c)}/>)}
        </div>
      </div>
    </div>
  );
}

// ─── UPCOMING LIST ────────────────────────────────────────────────────────────
function UpcomingPage({ nav, initialGenre }) {
  const [activeGenre, setActiveGenre] = useState(initialGenre || "Tous");
  const allGenres = ["Tous", ...Array.from(new Set(UPCOMING.map(c=>c.genre)))];
  const filtered = activeGenre==="Tous" ? UPCOMING : UPCOMING.filter(c=>c.genre===activeGenre);

  return (
    <div style={{padding:"100px 20px 80px",maxWidth:900,margin:"0 auto"}}>
      <p className="sl" style={{marginBottom:8}}>Programme</p>
      <h1 className="fd" style={{fontSize:"clamp(28px,6vw,44px)",fontWeight:400,letterSpacing:2,marginBottom:24}}>Concerts à venir</h1>

      {/* Genre filter */}
      <div className="genre-filter" style={{marginBottom:32}}>
        {allGenres.map(g=>(
          <button key={g} className={`gf-btn ${activeGenre===g?"active":""}`} onClick={()=>setActiveGenre(g)}>
            {g!=="Tous" && <span style={{marginRight:6}}>{GENRES.find(x=>x.name===g)?.icon}</span>}
            {g}
          </button>
        ))}
      </div>

      <div style={{display:"flex",flexDirection:"column",gap:16}}>
        {filtered.map((c,i)=>(
          <div key={c.id} className="cc" style={{animation:`fadeUp 0.4s ${i*0.08}s ease both`,opacity:0}} onClick={()=>nav("upcoming-detail",c)}>
            <div style={{display:"flex",alignItems:"stretch"}}>
              <div style={{width:90,background:"linear-gradient(135deg,rgba(201,168,76,0.08),rgba(201,168,76,0.02))",display:"flex",alignItems:"center",justifyContent:"center",fontSize:38,flexShrink:0,position:"relative"}}>
                {c.img}
              </div>
              <div style={{flex:1,padding:"16px 20px"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:8}}>
                  <div>
                    <h3 style={{fontSize:15,fontWeight:700,marginBottom:3}}>{c.artist}</h3>
                    <p style={{fontSize:11,color:"#888",display:"flex",alignItems:"center",gap:6}}>
                      <span>{GENRES.find(g=>g.name===c.genre)?.icon}</span>{c.genre}
                    </p>
                  </div>
                  <span className="ub"><span className="ld"/>{c.daysLeft} jours</span>
                </div>
                <div className="gd" style={{margin:"10px 0"}}/>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <div><p style={{fontSize:11,color:"#bbb"}}>{c.date}</p><p style={{fontSize:11,color:"#777"}}>{c.city} · {c.venue}</p></div>
                  <span className="tag" style={{fontSize:8}}>{c.category}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
        {filtered.length===0 && (
          <div style={{textAlign:"center",padding:"60px 20px",color:"#555"}}>
            <p style={{fontSize:32,marginBottom:12}}>{GENRES.find(g=>g.name===activeGenre)?.icon}</p>
            <p style={{fontSize:13}}>Aucun concert {activeGenre} pour le moment.</p>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── UPCOMING DETAIL ──────────────────────────────────────────────────────────
function UpcomingDetail({ c, nav }) {
  if (!c) return null;
  const genreIcon = GENRES.find(g=>g.name===c.genre)?.icon;
  return (
    <div style={{paddingBottom:80}}>
      <div style={{padding:"100px 20px 40px",textAlign:"center",background:`radial-gradient(ellipse at 50% 80%,rgba(201,168,76,0.08) 0%,transparent 55%)`}}>
        <span className="ub" style={{marginBottom:20,display:"inline-flex"}}><span className="ld"/>{c.daysLeft} jours restants</span>
        <div style={{fontSize:64,margin:"20px 0 16px"}}>{c.img}</div>
        <h1 className="fd" style={{fontSize:"clamp(30px,7vw,52px)",fontWeight:400,letterSpacing:3,marginBottom:8,cursor:"pointer",textDecoration:"underline",textDecorationColor:"rgba(201,168,76,0.3)"}} onClick={()=>nav("artist",{artistName:c.artist})}>{c.artist}</h1>
        <p style={{fontSize:13,color:"#888",marginBottom:12}}>{c.date} · {c.city} · {c.venue}</p>
        <div style={{display:"flex",gap:8,justifyContent:"center",alignItems:"center",flexWrap:"wrap"}}>
          <span className="tag">{c.category}</span>
          <span style={{padding:"4px 12px",background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.1)",fontSize:11,color:"#aaa"}}>{genreIcon} {c.genre}</span>
        </div>
      </div>
      <div style={{maxWidth:620,margin:"0 auto",padding:"32px 20px 0"}}>
        <div style={{background:"rgba(201,168,76,0.05)",border:"1px solid rgba(201,168,76,0.2)",padding:"28px 24px",marginBottom:24,textAlign:"center"}}>
          <Crown size={28}/>
          <h3 className="fd" style={{fontSize:20,fontWeight:600,letterSpacing:2,marginBottom:8,marginTop:12}}>Devenir Juré CROWDN</h3>
          <p style={{fontSize:12,color:"#888",lineHeight:1.7,marginBottom:4}}>Ce concert sera évalué par un panel de 4 types de jurés certifiés.</p>
          <button className="bjury" onClick={()=>nav("become-jury")}>★ Become a Jury Member</button>
        </div>
        <div style={{background:BG2,border:"1px solid rgba(201,168,76,0.08)",padding:24}}>
          <p className="sl" style={{marginBottom:16}}>Informations</p>
          {[["Artiste",c.artist],["Date",c.date],["Ville",c.city],["Salle",c.venue],["Catégorie",c.category],["Genre",`${genreIcon} ${c.genre}`]].map(([k,v])=>(
            <div key={k} style={{display:"flex",justifyContent:"space-between",padding:"10px 0",borderBottom:"1px solid rgba(255,255,255,0.04)",fontSize:12}}>
              <span style={{color:"#666"}}>{k}</span><span style={{color:"#eee"}}>{v}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── PAST LIST ────────────────────────────────────────────────────────────────
function PastPage({ nav }) {
  const [activeGenre, setActiveGenre] = useState("Tous");
  const allGenres = ["Tous", ...Array.from(new Set(PAST.map(c=>c.genre)))];
  const filtered = activeGenre==="Tous" ? PAST : PAST.filter(c=>c.genre===activeGenre);
  return (
    <div style={{padding:"100px 20px 80px",maxWidth:900,margin:"0 auto"}}>
      <p className="sl" style={{marginBottom:8}}>Archives</p>
      <h1 className="fd" style={{fontSize:"clamp(28px,6vw,44px)",fontWeight:400,letterSpacing:2,marginBottom:8}}>Previous Concerts</h1>
      <p style={{fontSize:12,color:"#777",marginBottom:24}}>Le témoignage de nos jurés sur les concerts passés</p>
      <div className="genre-filter" style={{marginBottom:32}}>
        {allGenres.map(g=>(
          <button key={g} className={`gf-btn ${activeGenre===g?"active":""}`} onClick={()=>setActiveGenre(g)}>
            {g!=="Tous" && <span style={{marginRight:6}}>{GENRES.find(x=>x.name===g)?.icon}</span>}
            {g}
          </button>
        ))}
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:16}}>
        {filtered.map((c,i)=><PastCard key={c.id} c={c} idx={i} onClick={()=>nav("past-detail",c)}/>)}
      </div>
    </div>
  );
}

// ─── PAST DETAIL ─────────────────────────────────────────────────────────────
function PastDetail({ c }) {
  if (!c) return null;
  const genreIcon = GENRES.find(g=>g.name===c.genre)?.icon;
  return (
    <div style={{paddingBottom:80}}>
      <div style={{padding:"100px 20px 40px",textAlign:"center",background:"linear-gradient(to bottom,rgba(201,168,76,0.04),transparent)"}}>
        <div style={{fontSize:64,marginBottom:16}}>{c.img}</div>
        <p className="sl" style={{marginBottom:8}}>{genreIcon} {c.genre}</p>
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
            {c.photos.map((p,i)=>(
              <div key={i} style={{flex:1,aspectRatio:"1",background:"rgba(201,168,76,0.05)",border:"1px solid rgba(201,168,76,0.1)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,cursor:"pointer"}}>{p}</div>
            ))}
          </div>
        </div>
        <div style={{background:BG2,border:"1px solid rgba(201,168,76,0.08)",padding:24}}>
          <p className="sl" style={{marginBottom:16}}>Informations</p>
          {[["Artiste",c.artist],["Date",c.date],["Ville",c.city],["Salle",c.venue],["Catégorie",c.category],["Genre",`${genreIcon} ${c.genre}`]].map(([k,v])=>(
            <div key={k} style={{display:"flex",justifyContent:"space-between",padding:"10px 0",borderBottom:"1px solid rgba(255,255,255,0.04)",fontSize:12}}>
              <span style={{color:"#666"}}>{k}</span><span style={{color:"#eee"}}>{v}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── BECOME JURY ──────────────────────────────────────────────────────────────
function BecomeJury({ nav }) {
  const [applied, setApplied] = useState(false);
  const [form, setForm] = useState({
    name:"", email:"", profile:"", motivation:"",
    pressCard:"", media:"", pressDoc:"",
    proRole:"", company:"", proDoc:"",
    genres:["","","","",""],
  });
  return (
    <div style={{padding:"100px 20px 80px",maxWidth:720,margin:"0 auto"}}>
      <div style={{textAlign:"center",marginBottom:48}}>
        <Crown size={44}/>
        <p className="sl" style={{marginTop:20,marginBottom:8}}>Rejoindre l'élite</p>
        <h1 className="fd" style={{fontSize:"clamp(28px,6vw,44px)",fontWeight:400,letterSpacing:2,marginBottom:16}}>Become a Jury Member</h1>
        <div style={{background:"rgba(201,168,76,0.06)",border:"1px solid rgba(201,168,76,0.2)",padding:"16px 20px",maxWidth:540,margin:"0 auto",display:"flex",alignItems:"center",gap:12}}>
          <span style={{fontSize:20,flexShrink:0}}>⚖️</span>
          <p style={{fontSize:12,color:"rgba(245,240,232,0.75)",lineHeight:1.7,textAlign:"left"}}>
            Chaque concert est évalué par un panel mixte de 4 types de jurés. <strong style={{color:GOLD}}>Les votes individuels restent privés.</strong> Seul le résultat collectif est publié — pour garantir l'objectivité totale.
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
      <p style={{fontSize:12,color:"#777",marginBottom:24}}>6 critères publics et transparents. Chaque juré note de 1 à 10 sur chacun.</p>
      <div style={{marginBottom:48}}>
        {CRITERIA.map((c,i)=>(
          <div key={c.name} className="criteria-pill" style={{animation:`fadeUp 0.4s ${i*0.07}s ease both`,opacity:0}}>
            <span style={{fontSize:20,flexShrink:0}}>{c.icon}</span>
            <div style={{flex:1}}>
              <p style={{fontWeight:700,fontSize:12,color:GOLD,marginBottom:2}}>{c.name}</p>
              <p style={{fontSize:11,color:"#888"}}>{c.desc}</p>
            </div>
            <span style={{fontSize:11,color:"#555",fontWeight:600,letterSpacing:1}}>/ 10</span>
          </div>
        ))}
      </div>
      {!applied ? (
        <div>
          <div className="gd" style={{marginBottom:32}}/>
          <p className="sl" style={{marginBottom:20}}>Candidater</p>
          <div style={{display:"flex",flexDirection:"column",gap:14,marginBottom:24}}>

            {/* Infos de base */}
            <input className="ifield" placeholder="Votre nom complet" value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/>
            <input className="ifield" placeholder="Votre email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/>

            {/* Profil */}
            <div>
              <label className="sl" style={{display:"block",marginBottom:10,fontSize:9}}>Votre profil</label>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
                {[["journalist","📰 Journaliste"],["music_pro","🎶 Acteur musique"],["fan","🎤 Fan du genre"],["nonfan","👁️ Non-fan"]].map(([v,l])=>(
                  <button key={v}
                    style={{padding:"12px 8px",background:form.profile===v?"rgba(201,168,76,0.12)":"rgba(255,255,255,0.03)",border:`1px solid ${form.profile===v?GOLD:"rgba(201,168,76,0.12)"}`,color:form.profile===v?GOLD:"#888",cursor:"pointer",fontFamily:"'Montserrat',sans-serif",fontSize:10,fontWeight:700,letterSpacing:1,textTransform:"uppercase",transition:"all 0.2s"}}
                    onClick={()=>setForm({...form,profile:v})}>
                    {l}
                  </button>
                ))}
              </div>
            </div>

            {/* Champs spécifiques selon profil */}
            {form.profile==="journalist" && (
              <div style={{background:"rgba(201,168,76,0.04)",border:"1px solid rgba(201,168,76,0.15)",padding:"16px 18px",display:"flex",flexDirection:"column",gap:12}}>
                <p style={{fontSize:11,color:GOLD,fontWeight:700,letterSpacing:1}}>📰 Vérification Journaliste</p>
                <input className="ifield" placeholder="Numéro de carte de presse CCIJP" value={form.pressCard} onChange={e=>setForm({...form,pressCard:e.target.value})}/>
                <input className="ifield" placeholder="Média / Publication (ex: Les Inrocks, Télérama...)" value={form.media} onChange={e=>setForm({...form,media:e.target.value})}/>

                {/* Upload carte de presse */}
                <div>
                  <label className="sl" style={{display:"block",marginBottom:8,fontSize:9}}>Photo de votre carte de presse</label>
                  <label style={{
                    display:"flex",alignItems:"center",justifyContent:"center",gap:10,
                    padding:"16px",border:`2px dashed ${form.pressDoc ? "rgba(76,200,100,0.5)" : "rgba(201,168,76,0.3)"}`,
                    background:form.pressDoc?"rgba(76,200,100,0.05)":"rgba(201,168,76,0.02)",
                    cursor:"pointer",transition:"all 0.2s",
                  }}>
                    <input type="file" accept="image/*,.pdf" style={{display:"none"}}
                      onChange={e=>setForm({...form,pressDoc:e.target.files[0]?.name||""})}/>
                    <span style={{fontSize:20}}>{form.pressDoc ? "✅" : "📎"}</span>
                    <div>
                      <p style={{fontSize:11,fontWeight:600,color:form.pressDoc?"#4CC864":GOLD}}>
                        {form.pressDoc ? form.pressDoc : "Cliquer pour uploader"}
                      </p>
                      <p style={{fontSize:9,color:"#666",marginTop:2}}>JPG, PNG ou PDF — max 5MB</p>
                    </div>
                  </label>
                </div>

                {/* RGPD */}
                <div style={{background:"rgba(255,255,255,0.02)",border:"1px solid rgba(255,255,255,0.06)",padding:"10px 12px",display:"flex",gap:10,alignItems:"flex-start"}}>
                  <span style={{fontSize:14,flexShrink:0}}>🔒</span>
                  <p style={{fontSize:10,color:"#666",lineHeight:1.7}}>
                    Conformément au RGPD, votre document est collecté uniquement pour vérifier votre statut de journaliste. Il sera <strong style={{color:"#aaa"}}>définitivement supprimé</strong> après vérification. Seule l'équipe CROWDN y a accès.
                  </p>
                </div>
              </div>
            )}

            {form.profile==="music_pro" && (
              <div style={{background:"rgba(201,168,76,0.04)",border:"1px solid rgba(201,168,76,0.15)",padding:"16px 18px",display:"flex",flexDirection:"column",gap:12}}>
                <p style={{fontSize:11,color:GOLD,fontWeight:700,letterSpacing:1}}>🎶 Vérification Acteur de la musique</p>
                <select className="ifield" style={{cursor:"pointer"}} value={form.proRole} onChange={e=>setForm({...form,proRole:e.target.value})}>
                  <option value="">Votre rôle dans l'industrie</option>
                  <option>Manager / Agent artistique</option>
                  <option>Tourneur / Promoteur</option>
                  <option>Directeur artistique / Label</option>
                  <option>Booker / Programmateur</option>
                  <option>Intermittent du spectacle</option>
                  <option>Autre professionnel</option>
                </select>
                <input className="ifield" placeholder="Structure / Entreprise" value={form.company} onChange={e=>setForm({...form,company:e.target.value})}/>

                {/* Upload justificatif */}
                <div>
                  <label className="sl" style={{display:"block",marginBottom:8,fontSize:9}}>Justificatif professionnel</label>
                  <p style={{fontSize:10,color:"#888",marginBottom:8,lineHeight:1.6}}>Contrat de travail, fiche de paie, carte d'intermittent, ou tout document prouvant votre activité dans l'industrie musicale.</p>
                  <label style={{
                    display:"flex",alignItems:"center",justifyContent:"center",gap:10,
                    padding:"16px",border:`2px dashed ${form.proDoc ? "rgba(76,200,100,0.5)" : "rgba(201,168,76,0.3)"}`,
                    background:form.proDoc?"rgba(76,200,100,0.05)":"rgba(201,168,76,0.02)",
                    cursor:"pointer",transition:"all 0.2s",
                  }}>
                    <input type="file" accept="image/*,.pdf" style={{display:"none"}}
                      onChange={e=>setForm({...form,proDoc:e.target.files[0]?.name||""})}/>
                    <span style={{fontSize:20}}>{form.proDoc ? "✅" : "📎"}</span>
                    <div>
                      <p style={{fontSize:11,fontWeight:600,color:form.proDoc?"#4CC864":GOLD}}>
                        {form.proDoc ? form.proDoc : "Cliquer pour uploader"}
                      </p>
                      <p style={{fontSize:9,color:"#666",marginTop:2}}>JPG, PNG ou PDF — max 5MB</p>
                    </div>
                  </label>
                </div>

                {/* RGPD */}
                <div style={{background:"rgba(255,255,255,0.02)",border:"1px solid rgba(255,255,255,0.06)",padding:"10px 12px",display:"flex",gap:10,alignItems:"flex-start"}}>
                  <span style={{fontSize:14,flexShrink:0}}>🔒</span>
                  <p style={{fontSize:10,color:"#666",lineHeight:1.7}}>
                    Conformément au RGPD, votre document est collecté uniquement pour vérifier votre statut professionnel. Il sera <strong style={{color:"#aaa"}}>définitivement supprimé</strong> après vérification. Seule l'équipe CROWDN y a accès.
                  </p>
                </div>
              </div>
            )}

            {(form.profile==="fan" || form.profile==="nonfan") && (
              <div style={{background:"rgba(201,168,76,0.04)",border:"1px solid rgba(201,168,76,0.15)",padding:"16px 18px",display:"flex",flexDirection:"column",gap:12}}>
                <p style={{fontSize:11,color:GOLD,fontWeight:700,letterSpacing:1}}>🎵 Vos 5 genres préférés</p>
                <p style={{fontSize:10,color:"#888",lineHeight:1.6}}>Classez vos 5 genres du plus écouté au moins écouté. Cela définira votre profil Fan ou Non-fan selon les concerts assignés.</p>
                {[1,2,3,4,5].map(n=>(
                  <div key={n} style={{display:"flex",alignItems:"center",gap:10}}>
                    <span style={{width:24,height:24,border:`1px solid ${GOLD}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700,color:GOLD,flexShrink:0,fontFamily:"serif"}}>{n}</span>
                    <select className="ifield" style={{cursor:"pointer"}} value={form.genres[n-1]||""} onChange={e=>{const g=[...form.genres];g[n-1]=e.target.value;setForm({...form,genres:g});}}>
                      <option value="">Choisir un genre</option>
                      {["Hip-Hop","Pop","Rock","R&B","Électro","Jazz","Metal","Classique","Reggae","Soul","Folk","Afrobeats","Flamenco","Punk","Latin","Blues"].map(g=>(
                        <option key={g}>{g}</option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>
            )}

            {/* Motivation */}
            <textarea className="ifield" rows={3}
              placeholder="Pourquoi souhaitez-vous rejoindre le jury CROWDN ? (2-3 lignes)"
              value={form.motivation} onChange={e=>setForm({...form,motivation:e.target.value})}
              style={{resize:"vertical"}}/>
          </div>
          <button className="bp" style={{width:"100%",padding:16,fontSize:11,letterSpacing:3,opacity:form.name&&form.email&&form.profile?1:0.5}}
            onClick={async()=>{
              if(!form.name||!form.email||!form.profile) return;
              try {
                await supabase.from("jury_applications").insert({
                  name: form.name,
                  email: form.email,
                  profile_type: form.profile,
                  genre: form.genres.filter(g=>g).join(", "),
                  motivation: form.motivation,
                  status: "pending"
                });
              } catch(e) { console.log("Supabase insert error", e); }
              setApplied(true);
            }}>
            Envoyer ma candidature
          </button>
        </div>
      ) : (
        <div style={{background:"rgba(201,168,76,0.06)",border:"1px solid rgba(201,168,76,0.3)",padding:"40px 24px",textAlign:"center",animation:"fadeUp 0.5s ease"}}>
          <Crown size={32}/>
          <p className="fd" style={{fontSize:22,marginTop:20,marginBottom:8,letterSpacing:2}}>Candidature reçue</p>
          <p style={{fontSize:12,color:"#888"}}>Notre équipe vous contactera sous 7 jours</p>
          <button className="bo" style={{marginTop:24,fontSize:10,padding:"10px 24px"}} onClick={()=>nav("home")}>Retour à l'accueil</button>
        </div>
      )}
    </div>
  );
}

// ─── LOGIN ────────────────────────────────────────────────────────────────────
function Login({ nav, onLogin }) {
  const [role, setRole] = useState("user");
  return (
    <div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",padding:"100px 20px 80px",background:`radial-gradient(ellipse at 50% 50%,rgba(201,168,76,0.05) 0%,transparent 60%),#0A0A0A`}}>
      <div style={{width:"100%",maxWidth:400}}>
        <div style={{textAlign:"center",marginBottom:36}}>
          <Crown size={36}/>
          <div style={{marginTop:14,marginBottom:4}}><span style={{fontWeight:800,fontSize:18,letterSpacing:6,color:GOLD}}>CROWD</span><span className="fd" style={{fontSize:18,fontWeight:700,color:GOLD}}>N</span></div>
          <p style={{fontSize:9,letterSpacing:3,color:"#666",textTransform:"uppercase"}}>Couronné par la Foule</p>
        </div>
        <div style={{marginBottom:24}}>
          <p className="sl" style={{marginBottom:12}}>Type de compte</p>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8}}>
            {[["user","Utilisateur","👤"],["jury","Juré","⭐"],["admin","Admin","🔑"]].map(([r,l,ic])=>(
              <button key={r} onClick={()=>setRole(r)} style={{padding:"12px 8px",background:role===r?"rgba(201,168,76,0.12)":"rgba(255,255,255,0.03)",border:`1px solid ${role===r?GOLD:"rgba(201,168,76,0.12)"}`,color:role===r?GOLD:"#888",cursor:"pointer",fontFamily:"'Montserrat',sans-serif",fontSize:9,fontWeight:700,letterSpacing:1.5,textTransform:"uppercase",textAlign:"center",transition:"all 0.2s"}}>
                <div style={{fontSize:18,marginBottom:4}}>{ic}</div>{l}
              </button>
            ))}
          </div>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:12,marginBottom:22}}>
          <input className="ifield" placeholder="votre@email.com"/>
          <input className="ifield" type="password" placeholder="••••••••"/>
        </div>
        <button className="bp" style={{width:"100%",padding:16,fontSize:11,letterSpacing:3}} onClick={()=>{onLogin(role);nav("home");}}>Connexion</button>
        <p style={{textAlign:"center",marginTop:20,fontSize:11,color:"#555"}}>Pas encore membre ? <span style={{color:GOLD,cursor:"pointer",fontWeight:600}}>Créer un compte</span></p>
        <div style={{marginTop:24,padding:"10px 14px",background:"rgba(201,168,76,0.04)",border:"1px solid rgba(201,168,76,0.12)",textAlign:"center"}}>
          <p style={{fontSize:10,color:"#888"}}>Demo · Choisissez un rôle et cliquez connexion</p>
        </div>
      </div>
    </div>
  );
}

// ─── JURY DASH ────────────────────────────────────────────────────────────────
function JuryDash() {
  const [scores,setScores]=useState([7,8,7,9,8,8]);
  const [comment,setComment]=useState("");
  const [submitted,setSubmitted]=useState(false);
  const avg=(scores.reduce((a,b)=>a+b,0)/scores.length).toFixed(1);
  return (
    <div style={{padding:"100px 20px 80px",maxWidth:680,margin:"0 auto"}}>
      <span style={{padding:"4px 12px",background:"rgba(201,168,76,0.1)",border:"1px solid rgba(201,168,76,0.3)",fontSize:9,letterSpacing:2,color:GOLD,textTransform:"uppercase",fontWeight:600}}>⭐ Accès Juré</span>
      <h1 className="fd" style={{fontSize:"clamp(24px,5vw,36px)",fontWeight:400,letterSpacing:2,marginBottom:32,marginTop:8}}>Tableau de Bord</h1>
      <p className="sl" style={{marginBottom:12}}>Concerts assignés</p>
      {UPCOMING.slice(0,3).map(c=>(
        <div key={c.id} style={{background:BG2,border:"1px solid rgba(201,168,76,0.1)",padding:"14px 18px",marginBottom:8,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <div style={{display:"flex",alignItems:"center",gap:12}}>
            <span style={{fontSize:22}}>{c.img}</span>
            <div>
              <p style={{fontWeight:700,fontSize:13}}>{c.artist}</p>
              <p style={{fontSize:11,color:"#888"}}>{c.date} · {c.city} · <span>{GENRES.find(g=>g.name===c.genre)?.icon} {c.genre}</span></p>
            </div>
          </div>
          <span className="ub" style={{fontSize:8}}><span className="ld"/>{c.daysLeft}j</span>
        </div>
      ))}
      <div style={{marginTop:32}}>
        {!submitted ? (
          <div style={{background:BG2,border:"1px solid rgba(201,168,76,0.12)",padding:24}}>
            <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:4}}><span style={{fontSize:24}}>👑</span><div><p style={{fontWeight:700,fontSize:14}}>Kendrick Lamar</p><p style={{fontSize:11,color:"#888"}}>4 Juil 2025 · Bordeaux · 🎤 Hip-Hop</p></div></div>
            <p style={{fontSize:11,color:"#666",marginBottom:20,paddingLeft:36}}>Zenith Class</p>
            <p className="sl" style={{marginBottom:16}}>Notation privée</p>
            {CRITERIA.map((c,i)=>(
              <div key={c.name} className="crow">
                <div style={{display:"flex",alignItems:"center",gap:8,flex:1,minWidth:0}}>
                  <span style={{fontSize:14,flexShrink:0}}>{c.icon}</span>
                  <span style={{fontSize:11,color:"#ccc",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{c.name}</span>
                </div>
                <div style={{display:"flex",gap:3,flexShrink:0}}>
                  {[1,2,3,4,5,6,7,8,9,10].map(n=>(
                    <button key={n} style={{width:22,height:22,background:scores[i]>=n?"rgba(201,168,76,0.3)":"rgba(255,255,255,0.04)",border:`1px solid ${scores[i]>=n?GOLD:"rgba(255,255,255,0.08)"}`,cursor:"pointer",fontSize:9,color:scores[i]>=n?GOLD:"#555",fontFamily:"'Montserrat',sans-serif",fontWeight:700,transition:"all 0.1s"}}
                      onClick={()=>{const ns=[...scores];ns[i]=n;setScores(ns);}}>{n}</button>
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
        ) : (
          <div style={{background:"rgba(201,168,76,0.05)",border:"1px solid rgba(201,168,76,0.25)",padding:"40px 24px",textAlign:"center",animation:"fadeUp 0.5s ease"}}>
            <Crown size={32}/>
            <p className="fd" style={{fontSize:22,marginTop:20,marginBottom:8,letterSpacing:2}}>Note soumise</p>
            <p style={{fontSize:12,color:"#888"}}>Score confidentiel · Résultat collectif publié après clôture du panel</p>
            <button className="bo" style={{marginTop:24,fontSize:10,padding:"10px 24px"}} onClick={()=>setSubmitted(false)}>Nouvelle notation</button>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── ADMIN ────────────────────────────────────────────────────────────────────
function AdminDash() {
  const [tab,setTab]=useState("upcoming");
  const [toast,setToast]=useState("");
  const show=msg=>{setToast(msg);setTimeout(()=>setToast(""),2500);};
  return (
    <div style={{padding:"100px 20px 80px",maxWidth:960,margin:"0 auto"}}>
      <span style={{padding:"4px 12px",background:"rgba(201,168,76,0.1)",border:"1px solid rgba(201,168,76,0.3)",fontSize:9,letterSpacing:2,color:GOLD,textTransform:"uppercase",fontWeight:600}}>🔑 Administration</span>
      <h1 className="fd" style={{fontSize:"clamp(24px,5vw,36px)",fontWeight:400,letterSpacing:2,marginBottom:32,marginTop:8}}>Back Office CROWDN</h1>
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:10,marginBottom:32}}>
        {[["6","À venir","🎵"],["4","Passés","🎭"],["4","Jurés","⭐"],["247","Membres","👥"]].map(([n,l,ic])=>(
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
      {tab==="upcoming" && (
        <div>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:14}}>
            <p style={{fontSize:11,color:"#888"}}>{UPCOMING.length} concerts à venir</p>
            <button className="bp" style={{fontSize:9,padding:"8px 16px"}} onClick={()=>show("Concert ajouté ✓")}>+ Ajouter</button>
          </div>
          <div style={{background:BG2,border:"1px solid rgba(201,168,76,0.08)",overflow:"hidden"}}>
            <table className="at"><thead><tr><th>Artiste</th><th>Genre</th><th>Date</th><th>Catégorie</th><th>Actions</th></tr></thead>
              <tbody>{UPCOMING.map(c=>(<tr key={c.id}><td style={{fontWeight:600,color:"#eee"}}>{c.artist}</td><td>{GENRES.find(g=>g.name===c.genre)?.icon} {c.genre}</td><td>{c.date}</td><td><span className="tag" style={{fontSize:8}}>{c.category.split(" ")[0]}</span></td><td><button className="bo" style={{fontSize:8,padding:"4px 10px"}} onClick={()=>show("Jury assigné ✓")}>Assigner jury</button></td></tr>))}</tbody>
            </table>
          </div>
        </div>
      )}
      {tab==="passés" && (
        <div style={{background:BG2,border:"1px solid rgba(201,168,76,0.08)",overflow:"hidden"}}>
          <table className="at"><thead><tr><th>Artiste</th><th>Genre</th><th>Date</th><th>Citation</th><th>Actions</th></tr></thead>
            <tbody>{PAST.map(c=>(<tr key={c.id}><td style={{fontWeight:600,color:"#eee"}}>{c.artist}</td><td>{GENRES.find(g=>g.name===c.genre)?.icon} {c.genre}</td><td>{c.date}</td><td><span style={{color:"#4CC864"}}>✓ Publiée</span></td><td><div style={{display:"flex",gap:6}}><button className="bo" style={{fontSize:8,padding:"4px 10px"}} onClick={()=>show("Citation modifiée ✓")}>Modifier</button><button className="bo" style={{fontSize:8,padding:"4px 10px"}} onClick={()=>show("TikTok mis à jour ✓")}>TikTok</button></div></td></tr>))}</tbody>
          </table>
        </div>
      )}
      {tab==="jurés" && (
        <div>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:14,flexWrap:"wrap",gap:8}}>
            <p style={{fontSize:11,color:"#888"}}>Candidatures reçues — validation manuelle</p>
            <div style={{display:"flex",gap:6}}>
              {["Tous","En attente","Validé","Refusé"].map(f=>(
                <button key={f} style={{padding:"4px 12px",background:"rgba(201,168,76,0.08)",border:"1px solid rgba(201,168,76,0.2)",color:GOLD,fontSize:8,fontWeight:700,letterSpacing:1,textTransform:"uppercase",cursor:"pointer",fontFamily:"'Montserrat',sans-serif"}}>{f}</button>
              ))}
            </div>
          </div>
          <div style={{background:BG2,border:"1px solid rgba(201,168,76,0.08)",overflow:"auto"}}>
            <table className="at">
              <thead><tr><th>Nom</th><th>Profil</th><th>Top genres</th><th>Justificatif</th><th>Document</th><th>Statut</th><th>Actions</th></tr></thead>
              <tbody>
                {[
                  {n:"Sophie L.",p:"📰 Journaliste",g:"Pop · R&B · Soul",v:"Carte CCIJP #12453",doc:true,st:"Validé"},
                  {n:"Marc F.",p:"🎶 Acteur musique",g:"Hip-Hop · Rap · Électro",v:"Manager — AZ Music",doc:true,st:"Validé"},
                  {n:"Elena R.",p:"🎤 Fan du genre",g:"Flamenco · Latin · Jazz",v:"Top 5 genres déclarés",doc:false,st:"Validé"},
                  {n:"Thomas V.",p:"👁️ Non-fan",g:"Rock · Metal · Punk",v:"Top 5 genres déclarés",doc:false,st:"En attente"},
                  {n:"Karim B.",p:"📰 Journaliste",g:"Hip-Hop · R&B · Soul",v:"Carte CCIJP #98721",doc:true,st:"En attente"},
                  {n:"Julie M.",p:"🎶 Acteur musique",g:"Pop · Électro · R&B",v:"Booker — Live Nation",doc:true,st:"En attente"},
                ].map(({n,p,g,v,doc,st})=>(
                  <tr key={n}>
                    <td style={{fontWeight:600,color:"#eee"}}>{n}</td>
                    <td style={{fontSize:11}}>{p}</td>
                    <td style={{fontSize:10,color:"#888"}}>{g}</td>
                    <td style={{fontSize:10,color:"#777"}}>{v}</td>
                    <td>
                      {doc ? (
                        <div style={{display:"flex",gap:4}}>
                          <button className="bo" style={{fontSize:8,padding:"3px 8px"}} onClick={()=>show("Document téléchargé ✓")}>📎 Voir</button>
                          <button style={{background:"rgba(255,50,50,0.1)",border:"1px solid rgba(255,50,50,0.3)",color:"#FF5050",fontSize:8,padding:"3px 8px",cursor:"pointer",fontFamily:"'Montserrat',sans-serif",fontWeight:700}} onClick={()=>show("Document supprimé 🗑️")}>🗑️ Suppr.</button>
                        </div>
                      ) : (
                        <span style={{fontSize:10,color:"#555"}}>—</span>
                      )}
                    </td>
                    <td>
                      <span style={{padding:"3px 10px",background:st==="Validé"?"rgba(76,200,100,0.1)":st==="En attente"?"rgba(201,168,76,0.1)":"rgba(255,50,50,0.1)",border:`1px solid ${st==="Validé"?"rgba(76,200,100,0.3)":st==="En attente"?"rgba(201,168,76,0.3)":"rgba(255,50,50,0.3)"}`,color:st==="Validé"?"#4CC864":st==="En attente"?GOLD:"#FF5050",fontSize:9,letterSpacing:1.5,fontWeight:600,textTransform:"uppercase",display:"inline-block"}}>{st}</span>
                    </td>
                    <td>
                      <div style={{display:"flex",gap:6}}>
                        {st==="En attente" && <>
                          <button className="bp" style={{fontSize:8,padding:"4px 10px"}} onClick={()=>show("Juré validé ✓")}>✓ Valider</button>
                          <button className="bo" style={{fontSize:8,padding:"4px 10px"}} onClick={()=>show("Candidature refusée")}>✗ Refuser</button>
                        </>}
                        {st==="Validé" && <button className="bo" style={{fontSize:8,padding:"4px 10px"}} onClick={()=>show("Email envoyé ✓")}>Contacter</button>}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}

// ─── ARTIST PAGE ─────────────────────────────────────────────────────────────
function ArtistPage({ artistName, nav }) {
  const artist = ARTISTS[artistName];
  const upcoming = UPCOMING.filter(c => c.artist === artistName);
  const past = PAST.filter(c => c.artist === artistName);
  if (!artist) return null;

  return (
    <div style={{padding:"100px 20px 80px", maxWidth:680, margin:"0 auto"}}>
      {/* Header */}
      <div style={{textAlign:"center", marginBottom:40}}>
        <div style={{fontSize:72, marginBottom:16}}>
          {[...UPCOMING, ...PAST].find(c=>c.artist===artistName)?.img || "🎵"}
        </div>
        <p className="sl" style={{marginBottom:8}}>Artiste CROWDN</p>
        <h1 className="fd" style={{fontSize:"clamp(28px,6vw,48px)", fontWeight:400, letterSpacing:3, marginBottom:12}}>{artistName}</h1>
        <p style={{fontSize:12, color:"#888", lineHeight:1.8, maxWidth:480, margin:"0 auto"}}>{artist.bio}</p>
      </div>

      {/* Réseaux */}
      <div style={{display:"flex", gap:10, justifyContent:"center", flexWrap:"wrap", marginBottom:40}}>
        <a href={artist.spotify} target="_blank" rel="noreferrer"
          style={{display:"inline-flex", alignItems:"center", gap:8, padding:"10px 20px", background:"rgba(29,185,84,0.1)", border:"1px solid rgba(29,185,84,0.3)", color:"#1DB954", fontSize:10, fontWeight:700, letterSpacing:2, textTransform:"uppercase", textDecoration:"none", transition:"all 0.2s", fontFamily:"'Montserrat',sans-serif"}}>
          ♫ Spotify
        </a>
        <a href={artist.instagram} target="_blank" rel="noreferrer"
          style={{display:"inline-flex", alignItems:"center", gap:8, padding:"10px 20px", background:"rgba(225,48,108,0.08)", border:"1px solid rgba(225,48,108,0.25)", color:"#E1306C", fontSize:10, fontWeight:700, letterSpacing:2, textTransform:"uppercase", textDecoration:"none", transition:"all 0.2s", fontFamily:"'Montserrat',sans-serif"}}>
          ◎ Instagram
        </a>
        <a href={artist.tiktok} target="_blank" rel="noreferrer"
          style={{display:"inline-flex", alignItems:"center", gap:8, padding:"10px 20px", background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.12)", color:"#eee", fontSize:10, fontWeight:700, letterSpacing:2, textTransform:"uppercase", textDecoration:"none", transition:"all 0.2s", fontFamily:"'Montserrat',sans-serif"}}>
          ▶ TikTok
        </a>
      </div>

      <div className="gd" style={{marginBottom:32}}/>

      {/* Concerts à venir */}
      {upcoming.length > 0 && (
        <div style={{marginBottom:32}}>
          <p className="sl" style={{marginBottom:16}}>Concerts à venir</p>
          {upcoming.map(c=>(
            <div key={c.id} className="cc" style={{marginBottom:10, cursor:"pointer"}} onClick={()=>nav("upcoming-detail",c)}>
              <div style={{display:"flex", alignItems:"center", gap:16, padding:"16px 20px"}}>
                <div style={{flex:1}}>
                  <p style={{fontWeight:700, fontSize:13}}>{c.date} · {c.city}</p>
                  <p style={{fontSize:11, color:"#888", marginTop:2}}>{c.venue}</p>
                </div>
                <div style={{display:"flex", alignItems:"center", gap:10}}>
                  <span className="ub"><span className="ld"/>{c.daysLeft}j</span>
                  <span className="tag" style={{fontSize:8}}>{c.category.split(" ")[0]}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Concerts passés */}
      {past.length > 0 && (
        <div>
          <p className="sl" style={{marginBottom:16}}>Concerts évalués</p>
          {past.map(c=>(
            <div key={c.id} className="pc" style={{marginBottom:10, cursor:"pointer"}} onClick={()=>nav("past-detail",c)}>
              <div style={{display:"flex", alignItems:"center", gap:16, padding:"16px 20px"}}>
                <div style={{flex:1}}>
                  <p style={{fontWeight:700, fontSize:13}}>{c.date} · {c.city}</p>
                  <p style={{fontSize:11, color:"#888", marginTop:2}}>{c.venue}</p>
                </div>
                <span className="tag" style={{fontSize:8}}>{c.category.split(" ")[0]}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {upcoming.length === 0 && past.length === 0 && (
        <p style={{textAlign:"center", color:"#555", fontSize:12}}>Aucun concert référencé pour le moment.</p>
      )}
    </div>
  );
}

// ─── HOW IT WORKS ─────────────────────────────────────────────────────────────
function HowItWorks({ nav }) {
  const steps = [
    { num:"01", icon:"🎵", title:"Concert annoncé", desc:"CROWDN référence le concert et constitue un panel de 4 jurés : journaliste, acteur de la musique, fan du genre, non-fan du genre." },
    { num:"02", icon:"⭐", title:"Le jury évalue", desc:"Après le concert, chaque juré note en privé sur 6 critères. Aucun juré ne voit la note des autres. Zéro influence, zéro pression." },
    { num:"03", icon:"👑", title:"Le verdict est publié", desc:"Le score collectif et la citation d'un juré sont publiés. Les notes individuelles restent confidentielles pour toujours." },
  ];

  return (
    <div style={{padding:"100px 20px 80px", maxWidth:680, margin:"0 auto"}}>
      <div style={{textAlign:"center", marginBottom:52}}>
        <p className="sl" style={{marginBottom:8}}>Transparence</p>
        <h1 className="fd" style={{fontSize:"clamp(28px,6vw,44px)", fontWeight:400, letterSpacing:2, marginBottom:12}}>Comment ça marche</h1>
        <p style={{fontSize:12, color:"#888", lineHeight:1.8}}>Un système simple, transparent, et indépendant.</p>
      </div>

      <div style={{display:"flex", flexDirection:"column", gap:0}}>
        {steps.map((s, i)=>(
          <div key={s.num} style={{display:"flex", gap:24, paddingBottom:40, position:"relative", animation:`fadeUp 0.5s ${i*0.15}s ease both`, opacity:0}}>
            {/* Line */}
            {i < steps.length-1 && (
              <div style={{position:"absolute", left:22, top:48, bottom:0, width:1, background:"linear-gradient(to bottom,rgba(201,168,76,0.3),transparent)"}}/>
            )}
            {/* Number */}
            <div style={{width:44, height:44, border:`1px solid ${GOLD}`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, background:"rgba(201,168,76,0.06)"}}>
              <span style={{fontFamily:"'Cormorant Garamond',serif", fontSize:18, fontWeight:700, color:GOLD}}>{s.num}</span>
            </div>
            <div style={{flex:1, paddingTop:8}}>
              <div style={{display:"flex", alignItems:"center", gap:10, marginBottom:8}}>
                <span style={{fontSize:20}}>{s.icon}</span>
                <h3 style={{fontWeight:700, fontSize:15, letterSpacing:0.5}}>{s.title}</h3>
              </div>
              <p style={{fontSize:12, color:"#999", lineHeight:1.8}}>{s.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="gd" style={{marginBottom:36}}/>

      {/* Les 6 critères en rappel */}
      <p className="sl" style={{marginBottom:20}}>Les 6 critères d'évaluation</p>
      <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginBottom:40}}>
        {CRITERIA.map((c,i)=>(
          <div key={c.name} style={{display:"flex", alignItems:"center", gap:10, padding:"12px 14px", background:"rgba(201,168,76,0.04)", border:"1px solid rgba(201,168,76,0.1)", animation:`fadeUp 0.4s ${i*0.06}s ease both`, opacity:0}}>
            <span style={{fontSize:16}}>{c.icon}</span>
            <span style={{fontSize:11, fontWeight:600, color:"#ccc"}}>{c.name}</span>
          </div>
        ))}
      </div>

      <div style={{textAlign:"center"}}>
        <button className="bp" style={{padding:"14px 32px", fontSize:11, letterSpacing:3}} onClick={()=>nav("become-jury")}>
          Devenir juré →
        </button>
      </div>
    </div>
  );
}

// ─── APP ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [page,setPage]=useState("home");
  const [sel,setSel]=useState(null);
  const [role,setRole]=useState(null);
  const [genreFilter,setGenreFilter]=useState(null);
  const [artistName,setArtistName]=useState(null);
  const [upcomingData, setUpcomingData] = useState(UPCOMING);
  const [pastData, setPastData] = useState(PAST);
  const [loading, setLoading] = useState(true);

  // Charger les données depuis Supabase
  useEffect(() => {
    async function fetchData() {
      try {
        const { data: upcoming } = await supabase
          .from("upcoming_concerts")
          .select("*")
          .order("id");

        const { data: past } = await supabase
          .from("past_concerts")
          .select("*")
          .order("id");

        if (upcoming && upcoming.length > 0) {
          setUpcomingData(upcoming.map(c => ({
            ...c,
            daysLeft: daysUntil(c.date.split(" ")[0]+" "+c.date.split(" ")[1]+" "+c.date.split(" ")[2])
          })));
        }
        if (past && past.length > 0) {
          setPastData(past.map(c => ({
            ...c,
            juryQuote: c.jury_quote,
            juryName: c.jury_name,
            juryAvatar: c.jury_avatar,
            juryHandle: c.jury_handle,
            tiktokUrl: c.tiktok_url,
            photos: ["📸","🎬","🌟"],
          })));
        }
      } catch(e) {
        console.log("Supabase non connecté, données locales utilisées");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const nav=(p,d)=>{
    setPage(p);
    if(d && d.filterGenre){setGenreFilter(d.filterGenre);}
    else if(d && d.artistName){setArtistName(d.artistName);}
    else if(d){setSel(d);}
    window.scrollTo({top:0,behavior:"smooth"});
  };

  const navItems=[
    {key:"home",label:"Accueil",icon:"🏠"},
    {key:"upcoming",label:"À venir",icon:"🎵"},
    {key:"past",label:"Passés",icon:"🎭"},
    {key:"how-it-works",label:"Comment ça marche",icon:"💡"},
    {key:"become-jury",label:"Jury",icon:"👑"},
    ...(role==="jury"?[{key:"jury-dash",label:"Mon jury",icon:"⭐"}]:[]),
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
          {role
            ? <button className="bo" style={{fontSize:9,padding:"8px 16px"}} onClick={()=>{setRole(null);nav("home");}}>Déconnexion</button>
            : <button className="bp" onClick={()=>nav("login")}>Connexion</button>
          }
        </div>
      </nav>

      {page==="home"            && <HomePage nav={nav} upcoming={upcomingData} past={pastData}/>}
      {page==="login"           && <Login nav={nav} onLogin={r=>setRole(r)}/>}
      {page==="upcoming"        && <UpcomingPage nav={nav} initialGenre={genreFilter} concerts={upcomingData}/>}
      {page==="upcoming-detail" && <UpcomingDetail c={sel} nav={nav}/>}
      {page==="past"            && <PastPage nav={nav} concerts={pastData}/>}
      {page==="past-detail"     && <PastDetail c={sel} nav={nav}/>}
      {page==="become-jury"     && <BecomeJury nav={nav}/>}
      {page==="how-it-works"    && <HowItWorks nav={nav}/>}
      {page==="artist"          && <ArtistPage artistName={artistName} nav={nav}/>}
      {page==="jury-dash"       && role==="jury" && <JuryDash/>}
      {page==="admin"           && role==="admin" && <AdminDash/>}

      <div className="mnav">
        {[{key:"home",icon:"🏠",label:"Accueil"},{key:"upcoming",icon:"🎵",label:"À venir"},{key:"past",icon:"🎭",label:"Passés"},{key:"how-it-works",icon:"💡",label:"Comment"},{key:"become-jury",icon:"👑",label:"Jury"}].map(item=>(
          <button key={item.key} className={`mni ${page===item.key?"active":""}`} onClick={()=>nav(item.key)}>
            <span style={{fontSize:18}}>{item.icon}</span>{item.label}
          </button>
        ))}
        {!role
          ? <button className={`mni ${page==="login"?"active":""}`} onClick={()=>nav("login")}><span style={{fontSize:18}}>🔐</span>Login</button>
          : role==="jury" ? <button className={`mni ${page==="jury-dash"?"active":""}`} onClick={()=>nav("jury-dash")}><span style={{fontSize:18}}>⭐</span>Mon jury</button>
          : role==="admin" ? <button className={`mni ${page==="admin"?"active":""}`} onClick={()=>nav("admin")}><span style={{fontSize:18}}>🔑</span>Admin</button>
          : null
        }
      </div>
    </>
  );
}
