import { useEffect, useRef, useState } from "react";

const C = { bg:"#0A0E17", bg2:"#0F1523", line:"#1E2636", cyan:"#00D9FF", violet:"#8B7CFF", amber:"#FFB86B", text:"#E8EAED", mute:"#7A8296" };

const EDU = [
  { id:"a1f9c02", title:"MSc, Artificial Intelligence & Machine Learning", org:"Coimbatore Institute of Technology", meta:"2024 – 2029 · CGPA 8.91 · Sem V, Dept. of Computing", body:"Coursework: Machine Learning, Software Engineering, Data Structures & Algorithms, Database Systems." },
  { id:"7b3e1d4", title:"Higher Secondary Education (CBSE)", org:"GEM International Senior Secondary School, Tirupur", meta:"2022 – 2024 · XII 91.6% · X 87.8%", body:"Computer Science with Mathematics." },
];
const EXP = [
  { id:"c9a04e1", title:"AI & Web Development Intern", org:"Boredom Technologies LLP × CIT Dept. of IT", meta:"2025 · 2 Weeks", body:"Internship 'MVP to AI-Powered Apps: For the Modern Web Builders' — built AI-integrated web prototypes across live sprint cycles." },
  { id:"5f21b88", title:"Member, District Priority Projects", org:"Rotaract Club of CIT (RAC CIT)", meta:"2024 – Present", body:"Led a stress & exam-pressure awareness session for government school students." },
  { id:"2d8f00c", title:"Class Representative", org:"Coimbatore Institute of Technology", meta:"June 2024 – June 2026", body:"Represented the class across association activities." },
];
const PROJECTS = [
  { name:"Inflow", tag:"AI Expense & GST Tax Tracker", stack:["React","TypeScript","Node.js","Supabase","Gemini API"], run:"$ inflow --scan receipt.pdf", out:"→ parsed merchant, GSTIN, line-items · CGST/SGST/IGST split · offline-first sync via Supabase RLS", detail:"Multimodal receipt scanner, dynamic daily-safe-spend budgeting, CSV/JSON tax export, warranty tracker, single-executable build via Vite + esbuild." },
  { name:"CropSense AI", tag:"Smart Agriculture ML System", stack:["Scikit-learn","Pandas","GridSearchCV","Streamlit"], run:"$ cropsense --train --classes 22", out:"→ 100% test accuracy · surpassed published benchmark", detail:"End-to-end 22-class crop & fertilizer recommender on soil/climate data; full sklearn pipeline with feature engineering, tuning, and serialization; deployed on HuggingFace Spaces." },
  { name:"HealPath", tag:"Post-Surgery Recovery Platform", stack:["React","Node.js","Socket.io","NLP","Twilio"], run:"$ healpath --patients --lang 8", out:"→ real-time chat · sentiment-tracked journaling · SOS alerts live", detail:"Multilingual (8 languages) recovery app: mood-tracking sentiment analysis, MediBot AI assistant, Twilio SOS alerts, web push, Leaflet/OSM geolocation." },
  { name:"Cook Share", tag:"Community Food & Recipe Platform", stack:["React","TypeScript","Node.js","Supabase","JWT"], run:"$ cookshare --deploy", out:"→ RESTful APIs live · UPI payments enabled", detail:"Full-stack community food ordering & recipe sharing app with real-time features and JWT-authenticated REST APIs." },
  { name:"EcoCart", tag:"Eco-Friendly E-Commerce", stack:["HTML","CSS","JavaScript"], run:"$ ecocart --build v3", out:"→ auth · cart · checkout shipped", detail:"Responsive sustainable-goods storefront with auth, cart, and checkout, iterated across multiple published versions." },
];
const SKILLS = {
  "languages.json":["Python","JavaScript","SQL","Java","C","R"],
  "ml-dl.json":["Scikit-learn","Pandas","NumPy","Matplotlib","Seaborn","XGBoost","LangChain"],
  "genai.json":["Prompt Engineering","AI Agents","HuggingFace Transformers"],
  "web.json":["React","Node.js","Express","MongoDB","Socket.io","REST APIs"],
  "deploy.json":["Streamlit","Flask","HuggingFace Spaces","Vercel"],
};
const AWARDS = [
  "3rd Place — Hackathon, Kongu Engineering College",
  "1st Place — Vibe Coding Challenge, Dept. of AI & ML, CIT",
  "Ideathon Runner-Up — Team Hacktivates, CIT",
  "Hackathon Participant — AIGNITE'25, SDC Club of CIT",
  "Workshop — Linux & Bootstrap, FOSS Club of CIT",
  "Workshop — NLP, Dept. of AI & Data Science, CIT",
  "Certified — Fundamentals of Generative AI, SAWIT.AI",
];

function Loader({ done }) {
  const [i,setI] = useState(0);
  const lines = ["booting kernel…","mounting neural weights…","resolving dependencies…","compiling portfolio.jsx…","ready."];
  useEffect(()=>{ const t=setInterval(()=>setI(v=>Math.min(v+1,lines.length)),340); return ()=>clearInterval(t); },[]);
  useEffect(()=>{ if(i>=lines.length) setTimeout(done,350); },[i]);
  return (
    <div style={{position:"fixed",inset:0,background:C.bg,color:C.cyan,display:"flex",alignItems:"center",justifyContent:"center",zIndex:100,fontFamily:"'JetBrains Mono',monospace"}}>
      <div style={{width:340}}>
        <svg width="56" height="56" viewBox="0 0 56 56" style={{display:"block",margin:"0 auto 18px"}}>
          <circle cx="28" cy="28" r="22" fill="none" stroke={C.line} strokeWidth="3"/>
          <circle cx="28" cy="28" r="22" fill="none" stroke={C.cyan} strokeWidth="3" strokeDasharray="138" strokeDashoffset={138-(i/lines.length)*138} strokeLinecap="round" style={{transition:"stroke-dashoffset .3s ease"}} transform="rotate(-90 28 28)"/>
          <circle cx="28" cy="28" r="4" fill={C.amber}>
            <animateTransform attributeName="transform" type="rotate" from="0 28 28" to="360 28 28" dur="2.2s" repeatCount="indefinite"/>
          </circle>
        </svg>
        {lines.slice(0,i).map((l,idx)=>(
          <div key={idx} style={{fontSize:13,color: idx===lines.length-1?C.amber:C.mute,marginBottom:4}}>
            <span style={{color:C.violet}}>{">"}</span> {l}
          </div>
        ))}
      </div>
    </div>
  );
}

function useNetworkCanvas(ref){
  useEffect(()=>{
    const canvas = ref.current; if(!canvas) return;
    const ctx = canvas.getContext("2d");
    let w,h,pts,raf;
    const resize=()=>{ w=canvas.width=canvas.offsetWidth*2; h=canvas.height=canvas.offsetHeight*2; };
    resize(); window.addEventListener("resize",resize);
    const N=46;
    pts = Array.from({length:N},()=>({x:Math.random()*w,y:Math.random()*h,vx:(Math.random()-.5)*.5,vy:(Math.random()-.5)*.5}));
    const tick=()=>{
      ctx.clearRect(0,0,w,h);
      pts.forEach(p=>{ p.x+=p.vx; p.y+=p.vy; if(p.x<0||p.x>w)p.vx*=-1; if(p.y<0||p.y>h)p.vy*=-1; });
      for(let i=0;i<N;i++) for(let j=i+1;j<N;j++){
        const d=Math.hypot(pts[i].x-pts[j].x,pts[i].y-pts[j].y);
        if(d<200){ ctx.strokeStyle=`rgba(0,217,255,${0.14*(1-d/200)})`; ctx.lineWidth=1; ctx.beginPath(); ctx.moveTo(pts[i].x,pts[i].y); ctx.lineTo(pts[j].x,pts[j].y); ctx.stroke(); }
      }
      pts.forEach(p=>{ ctx.fillStyle=C.violet; ctx.beginPath(); ctx.arc(p.x,p.y,2.4,0,7); ctx.fill(); });
      raf=requestAnimationFrame(tick);
    };
    tick();
    return ()=>{ cancelAnimationFrame(raf); window.removeEventListener("resize",resize); };
  },[ref]);
}

function Section({ id, file, children }){
  return (
    <section id={id} style={{maxWidth:920,margin:"0 auto",padding:"70px 24px 10px"}}>
      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:26,fontFamily:"'JetBrains Mono',monospace",fontSize:13,color:C.mute}}>
        <span style={{width:8,height:8,borderRadius:"50%",background:C.cyan,boxShadow:`0 0 8px ${C.cyan}`}}/>{file}
      </div>
      {children}
    </section>
  );
}

function ProjectCard({ p }){
  const [hov,setHov] = useState(false);
  return (
    <div onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{border:`1px solid ${hov?C.cyan:C.line}`,borderRadius:10,padding:20,marginBottom:16,background:C.bg2,transition:"border-color .25s, transform .25s",transform:hov?"translateY(-3px)":"none",cursor:"default"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"baseline",flexWrap:"wrap",gap:8}}>
        <h3 style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:20,color:C.text,margin:0}}>{p.name}</h3>
        <span style={{color:C.mute,fontSize:13}}>{p.tag}</span>
      </div>
      <div style={{display:"flex",flexWrap:"wrap",gap:6,margin:"12px 0"}}>
        {p.stack.map(s=>(<span key={s} style={{fontFamily:"'JetBrains Mono',monospace",fontSize:11,color:C.violet,border:`1px solid ${C.line}`,borderRadius:4,padding:"2px 7px"}}>{s}</span>))}
      </div>
      <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:12.5,background:"#070a11",border:`1px solid ${C.line}`,borderRadius:6,padding:"10px 12px",minHeight:66}}>
        <div style={{color:C.amber}}>{p.run}</div>
        <div style={{color: hov?C.cyan:C.mute,marginTop:4,transition:"color .2s"}}>{p.out}</div>
        <div style={{maxHeight:hov?80:0,overflow:"hidden",transition:"max-height .3s ease",color:C.mute,marginTop:hov?8:0}}>{p.detail}</div>
      </div>
    </div>
  );
}

function TimelineItem({ t }){
  const [open,setOpen] = useState(false);
  return (
    <div onClick={()=>setOpen(o=>!o)} style={{display:"flex",gap:16,cursor:"pointer",paddingBottom:26,position:"relative"}}>
      <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
        <div style={{width:10,height:10,borderRadius:"50%",background:open?C.amber:C.cyan,marginTop:5,transition:"background .2s"}}/>
        <div style={{flex:1,width:1,background:C.line}}/>
      </div>
      <div style={{flex:1}}>
        <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:11,color:C.mute}}>commit {t.id}</div>
        <div style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:17,color:C.text,margin:"3px 0"}}>{t.title}</div>
        <div style={{fontSize:13,color:C.violet}}>{t.org} <span style={{color:C.mute}}>· {t.meta}</span></div>
        <div style={{maxHeight:open?60:0,overflow:"hidden",transition:"max-height .3s ease",fontSize:13.5,color:C.mute,marginTop:open?6:0}}>{t.body}</div>
      </div>
    </div>
  );
}

export default function Portfolio(){
  const [loading,setLoading] = useState(true);
  const canvasRef = useRef(null);
  useNetworkCanvas(canvasRef);

  return (
    <div style={{background:C.bg,minHeight:"100vh",color:C.text,fontFamily:"'Space Grotesk',sans-serif"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&family=JetBrains+Mono:wght@400;500&display=swap');
        *{box-sizing:border-box} html{scroll-behavior:smooth}
        a.nav{color:${C.mute};text-decoration:none;font-family:'JetBrains Mono',monospace;font-size:13px;transition:color .2s}
        a.nav:hover{color:${C.cyan}}
        .skillrow:hover .skillbar{background:${C.cyan}}
      `}</style>
      {loading && <Loader done={()=>setLoading(false)}/>}

      <nav style={{position:"sticky",top:0,zIndex:20,background:"rgba(10,14,23,.85)",backdropFilter:"blur(8px)",borderBottom:`1px solid ${C.line}`,padding:"14px 24px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <span style={{fontFamily:"'JetBrains Mono',monospace",color:C.amber,fontSize:14}}>chandra_prabha.dev</span>
        <div style={{display:"flex",gap:20}}>
          {["education","experience","projects","skills","awards","contact"].map(s=>(
            <a key={s} className="nav" href={`#${s}`} onClick={e=>{e.preventDefault(); document.getElementById(s)?.scrollIntoView({behavior:"smooth"});}}>{s}</a>
          ))}
        </div>
      </nav>

      <div style={{position:"relative",height:420,overflow:"hidden",borderBottom:`1px solid ${C.line}`}}>
        <canvas ref={canvasRef} style={{position:"absolute",inset:0,width:"100%",height:"100%"}}/>
        <div style={{position:"relative",zIndex:2,maxWidth:920,margin:"0 auto",padding:"110px 24px 0"}}>
          <div style={{fontFamily:"'JetBrains Mono',monospace",color:C.cyan,fontSize:13,marginBottom:10}}>~/portfolio $ whoami</div>
          <h1 style={{fontSize:48,margin:0,lineHeight:1.1}}>Chandra Prabha V</h1>
          <p style={{color:C.mute,fontSize:17,maxWidth:560,marginTop:14}}>MSc AI & ML student building end-to-end ML systems, full-stack apps, and generative AI pipelines — from agri-tech to healthcare.</p>
          <div style={{display:"flex",gap:14,marginTop:22,fontFamily:"'JetBrains Mono',monospace",fontSize:13}}>
            <a href="mailto:chandraprabhav07@gmail.com" style={{color:C.amber}}>chandraprabhav07@gmail.com</a>
            <span style={{color:C.line}}>|</span>
            <a href="https://github.com/ChandraPrabha07" style={{color:C.amber}}>github.com/ChandraPrabha07</a>
          </div>
        </div>
      </div>

      <Section id="education" file="education.md">
        {EDU.map(e=><TimelineItem key={e.id} t={e}/>)}
      </Section>

      <Section id="experience" file="experience.md">
        {EXP.map(e=><TimelineItem key={e.id} t={e}/>)}
      </Section>

      <Section id="projects" file="projects/">
        {PROJECTS.map(p=><ProjectCard key={p.name} p={p}/>)}
      </Section>

      <Section id="skills" file="skills.json">
        {Object.entries(SKILLS).map(([k,v])=>(
          <div key={k} className="skillrow" style={{marginBottom:16}}>
            <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:12,color:C.violet,marginBottom:6}}>{k}</div>
            <div style={{display:"flex",flexWrap:"wrap",gap:8}}>
              {v.map(s=>(<span key={s} style={{fontSize:13,border:`1px solid ${C.line}`,borderRadius:6,padding:"5px 10px",transition:"all .2s"}}
                onMouseEnter={e=>{e.currentTarget.style.borderColor=C.cyan; e.currentTarget.style.color=C.cyan;}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor=C.line; e.currentTarget.style.color=C.text;}}>{s}</span>))}
            </div>
          </div>
        ))}
      </Section>

      <Section id="awards" file="achievements.log">
        {AWARDS.map((a,i)=>(
          <div key={i} style={{fontFamily:"'JetBrains Mono',monospace",fontSize:13,color:C.mute,padding:"7px 0",borderBottom:`1px solid ${C.line}`}}>
            <span style={{color:C.cyan}}>✓</span> {a}
          </div>
        ))}
      </Section>

      <Section id="contact" file="contact.sh">
        <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:14,color:C.mute,paddingBottom:70}}>
          <div style={{padding:"5px 0"}}><span style={{color:C.amber}}>$</span> echo $PHONE → <a href="tel:+918825792644" style={{color:C.text,borderBottom:`1px solid ${C.line}`,transition:"color .2s"}} onMouseEnter={e=>e.currentTarget.style.color=C.cyan} onMouseLeave={e=>e.currentTarget.style.color=C.text}>+91-88257 92644</a></div>
          <div style={{padding:"5px 0"}}><span style={{color:C.amber}}>$</span> echo $LINKEDIN → <a href="https://linkedin.com/in/chandra-prabha-v" target="_blank" rel="noopener noreferrer" style={{color:C.text,borderBottom:`1px solid ${C.line}`,transition:"color .2s"}} onMouseEnter={e=>e.currentTarget.style.color=C.cyan} onMouseLeave={e=>e.currentTarget.style.color=C.text}>linkedin.com/in/chandra-prabha-v</a></div>
          <div style={{padding:"5px 0"}}><span style={{color:C.amber}}>$</span> echo $EMAIL → <a href="mailto:chandraprabhav07@gmail.com" style={{color:C.text,borderBottom:`1px solid ${C.line}`,transition:"color .2s"}} onMouseEnter={e=>e.currentTarget.style.color=C.cyan} onMouseLeave={e=>e.currentTarget.style.color=C.text}>chandraprabhav07@gmail.com</a></div>
          <div style={{padding:"5px 0"}}><span style={{color:C.amber}}>$</span> echo $GITHUB → <a href="https://github.com/ChandraPrabha07" target="_blank" rel="noopener noreferrer" style={{color:C.text,borderBottom:`1px solid ${C.line}`,transition:"color .2s"}} onMouseEnter={e=>e.currentTarget.style.color=C.cyan} onMouseLeave={e=>e.currentTarget.style.color=C.text}>github.com/ChandraPrabha07</a></div>
        </div>
      </Section>
    </div>
  );
}
