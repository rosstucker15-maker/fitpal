import { useState, useRef, useEffect } from "react";

// ─── FP LOGO SVG ──────────────────────────────────────────────────────────────
const FPLogo = ({ size = 40 }) => (
  <svg width={size} height={size} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" style={{flexShrink:0}}>
    <rect x="0" y="0" width="200" height="200" rx="44" fill="white"/>
    <rect x="0" y="0" width="200" height="200" rx="44" fill="none" stroke="#e8e8e8" strokeWidth="3"/>
    <text x="66" y="108" fontFamily="Fredoka One, sans-serif" fontSize="78" fill="#1a56ff" textAnchor="middle">F</text>
    <text x="136" y="108" fontFamily="Fredoka One, sans-serif" fontSize="78" fill="#e8182c" textAnchor="middle">P</text>
    <path d="M 52,128 C 52,168 148,168 148,128" stroke="#111111" strokeWidth="6.5" fill="none" strokeLinecap="round"/>
  </svg>
);

// ─── CSS ──────────────────────────────────────────────────────────────────────
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Fredoka+One&family=Nunito:wght@600;700;800;900&family=DM+Sans:wght@300;400;500&display=swap');

  :root {
    --bg:        #f4f5fa;
    --white:     #ffffff;
    --border:    #e4e6f0;
    --blue:      #1a56ff;
    --blue-lt:   rgba(26,86,255,0.09);
    --red:       #e8182c;
    --red-lt:    rgba(232,24,44,0.08);
    --dark:      #111827;
    --mid:       #6b7280;
    --muted:     #9ca3af;
    --radius:    20px;
    --F: 'Nunito', sans-serif;
    --FB: 'Fredoka One', sans-serif;
    --B: 'DM Sans', sans-serif;
  }

  * { box-sizing:border-box; margin:0; padding:0; }
  body { background:var(--bg); color:var(--dark); font-family:var(--B); min-height:100vh; overflow-x:hidden; }

  .shell {
    max-width:480px; margin:0 auto; min-height:100vh;
    background:var(--bg); position:relative; overflow:hidden;
  }
  .shell::before {
    content:''; position:fixed; inset:0; max-width:480px; margin:0 auto; pointer-events:none; z-index:0;
    background: radial-gradient(ellipse at 15% 15%, rgba(26,86,255,0.05) 0%,transparent 55%),
                radial-gradient(ellipse at 85% 85%, rgba(232,24,44,0.05) 0%,transparent 55%);
  }

  /* ── PAGE ── */
  .page {
    position:relative; z-index:1;
    padding:0 22px 40px;
    min-height:100vh;
    display:flex; flex-direction:column;
    animation:fadeUp .4s cubic-bezier(.22,1,.36,1) both;
  }
  @keyframes fadeUp { from{opacity:0;transform:translateY(22px)} to{opacity:1;transform:translateY(0)} }

  /* ── LOGO BAR ── */
  .logo-bar { display:flex; align-items:center; gap:11px; padding:26px 0 6px; }
  .wordmark { font-family:var(--FB); font-size:24px; line-height:1; }
  .wordmark .f { color:var(--blue); }
  .wordmark .p { color:var(--red); }

  /* ── PROGRESS ── */
  .prog-track { height:4px; background:var(--border); border-radius:99px; margin:18px 0 30px; overflow:hidden; }
  .prog-fill {
    height:100%; background:linear-gradient(90deg,var(--blue),var(--red));
    border-radius:99px; transition:width .5s cubic-bezier(.34,1.56,.64,1);
  }

  /* ── TYPOGRAPHY ── */
  .ttl { font-family:var(--F); font-size:30px; font-weight:900; line-height:1.15; letter-spacing:-.5px; margin-bottom:8px; }
  .ttl .hl { color:var(--blue); }
  .sub { color:var(--mid); font-size:15px; line-height:1.55; margin-bottom:30px; }

  /* ── OPTION GRID 2-col ── */
  .og { display:grid; grid-template-columns:1fr 1fr; gap:11px; margin-bottom:26px; }
  .oc {
    background:var(--white); border:2px solid var(--border); border-radius:var(--radius);
    padding:17px 15px; cursor:pointer;
    transition:all .2s; display:flex; flex-direction:column; gap:7px;
    position:relative; box-shadow:0 2px 8px rgba(0,0,0,.04);
  }
  .oc:hover { border-color:var(--blue); transform:translateY(-2px); box-shadow:0 8px 22px rgba(26,86,255,.12); }
  .oc.sel { border-color:var(--blue); background:var(--blue-lt); }
  .oc.sel::after {
    content:'✓'; position:absolute; top:9px; right:11px;
    width:21px; height:21px; background:var(--blue); color:white;
    font-size:11px; font-weight:900; border-radius:50%;
    display:flex; align-items:center; justify-content:center;
  }
  .oe { font-size:27px; }
  .ol { font-family:var(--F); font-weight:800; font-size:14px; color:var(--dark); }
  .od { font-size:12px; color:var(--muted); line-height:1.4; }

  /* ── OPTION LIST full-width ── */
  .olist { display:flex; flex-direction:column; gap:10px; margin-bottom:26px; }
  .or {
    background:var(--white); border:2px solid var(--border); border-radius:16px;
    padding:15px 17px; cursor:pointer;
    transition:all .2s; display:flex; align-items:center; gap:13px;
    box-shadow:0 2px 8px rgba(0,0,0,.04);
  }
  .or:hover { border-color:var(--blue); box-shadow:0 6px 20px rgba(26,86,255,.1); }
  .or.sel { border-color:var(--blue); background:var(--blue-lt); }
  .or.sel .chk { background:var(--blue); border-color:var(--blue); }
  .or.sel .chk::after { content:'✓'; color:white; font-size:11px; font-weight:900; }
  .chk { width:22px; height:22px; border-radius:50%; border:2px solid var(--border); flex-shrink:0; transition:all .2s; display:flex; align-items:center; justify-content:center; }
  .re { font-size:23px; }
  .rl { font-family:var(--F); font-weight:800; font-size:15px; color:var(--dark); }
  .rd { font-size:12px; color:var(--muted); }

  /* ── COACH CARDS ── */
  .cg { display:flex; flex-direction:column; gap:11px; margin-bottom:26px; }
  .cc {
    border-radius:20px; padding:19px 21px; cursor:pointer;
    border:2px solid transparent; transition:all .25s;
    position:relative; box-shadow:0 4px 16px rgba(0,0,0,.09);
  }
  .cc:hover { transform:translateY(-2px); box-shadow:0 10px 28px rgba(0,0,0,.14); }
  .cc.sel { border-color:rgba(0,0,0,.7); }
  .cc.sel::after {
    content:'✓'; position:absolute; top:13px; right:15px;
    width:24px; height:24px; background:rgba(0,0,0,.75); color:white;
    font-size:12px; font-weight:900; border-radius:50%;
    display:flex; align-items:center; justify-content:center;
  }
  .ca { font-size:32px; margin-bottom:9px; }
  .cn { font-family:var(--F); font-weight:900; font-size:17px; margin-bottom:3px; }
  .ct { font-size:13px; opacity:.82; }

  /* ── DAYS PICKER ── */
  .dr { display:flex; gap:7px; margin-bottom:26px; }
  .db {
    flex:1; aspect-ratio:1; border-radius:13px;
    background:var(--white); border:2px solid var(--border);
    color:var(--mid); font-family:var(--F); font-weight:800; font-size:11px;
    cursor:pointer; transition:all .2s;
    display:flex; align-items:center; justify-content:center;
    box-shadow:0 2px 6px rgba(0,0,0,.04);
  }
  .db:hover { border-color:var(--blue); color:var(--blue); }
  .db.on { background:var(--blue); color:white; border-color:var(--blue); box-shadow:0 4px 16px rgba(26,86,255,.3); }

  /* ── BUTTONS ── */
  .btn {
    width:100%; padding:17px; background:var(--blue); color:white;
    border:none; border-radius:16px; font-family:var(--F); font-weight:900; font-size:16px;
    cursor:pointer; transition:all .2s; margin-top:auto; letter-spacing:.2px;
    box-shadow:0 6px 22px rgba(26,86,255,.3);
  }
  .btn:hover { transform:translateY(-2px); box-shadow:0 12px 34px rgba(26,86,255,.38); }
  .btn:disabled { opacity:.35; cursor:not-allowed; transform:none; box-shadow:none; }
  .btn2 {
    width:100%; padding:14px; background:var(--white); color:var(--dark);
    border:2px solid var(--border); border-radius:14px;
    font-family:var(--F); font-weight:800; font-size:14px;
    cursor:pointer; transition:all .2s;
  }
  .btn2:hover { border-color:var(--blue); color:var(--blue); }

  /* ── SPLASH ── */
  .splash {
    flex:1; display:flex; flex-direction:column;
    align-items:center; justify-content:center;
    text-align:center; padding:28px 0;
  }
  .splash-logo { margin-bottom:30px; filter:drop-shadow(0 16px 40px rgba(26,86,255,.2)) drop-shadow(0 4px 12px rgba(232,24,44,.14)); animation:lf 3s ease-in-out infinite; }
  @keyframes lf { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-9px)} }
  .splash-title { font-family:var(--F); font-size:36px; font-weight:900; line-height:1.1; letter-spacing:-1px; margin-bottom:13px; }
  .splash-title .bl { color:var(--blue); }
  .splash-title .rd { color:var(--red); }
  .splash-sub { color:#3d4451; font-size:15px; line-height:1.6; max-width:290px; margin-bottom:36px; font-weight:500; }
  .pills { display:flex; gap:7px; flex-wrap:wrap; justify-content:center; margin-bottom:38px; }
  .pill { background:var(--white); border:1.5px solid var(--border); border-radius:99px; padding:7px 15px; font-size:12px; color:var(--dark); font-weight:800; box-shadow:0 2px 5px rgba(0,0,0,.04); letter-spacing:.1px; }

  /* ── GENERATING ── */
  .gen { flex:1; display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center; gap:18px; }
  .spin { width:70px; height:70px; border-radius:50%; border:4px solid var(--border); border-top-color:var(--blue); border-right-color:var(--red); animation:rot .9s linear infinite; }
  @keyframes rot { to{transform:rotate(360deg)} }
  .gen-ttl { font-family:var(--F); font-size:22px; font-weight:900; }
  .gen-sub { color:var(--mid); font-size:14px; }

  /* ── CHAT ── */
  .chat-wrap { display:flex; flex-direction:column; height:calc(100vh - 72px); }
  .chat-top {
    padding:16px 22px 14px; display:flex; align-items:center; gap:13px;
    border-bottom:1.5px solid var(--border); background:var(--white);
    position:sticky; top:0; z-index:10; box-shadow:0 2px 10px rgba(0,0,0,.06);
  }
  .av-sm { width:44px; height:44px; border-radius:13px; display:flex; align-items:center; justify-content:center; font-size:22px; flex-shrink:0; }
  .cn2 { font-family:var(--F); font-weight:900; font-size:15px; color:var(--dark); }
  .cs { font-size:11px; color:var(--blue); font-weight:600; }

  .msgs { flex:1; overflow-y:auto; padding:18px 22px; display:flex; flex-direction:column; gap:14px; background:var(--bg); }
  .msgs::-webkit-scrollbar { width:3px; }
  .msgs::-webkit-scrollbar-thumb { background:var(--border); border-radius:99px; }

  .msg { display:flex; gap:9px; max-width:86%; }
  .msg.u { align-self:flex-end; flex-direction:row-reverse; }
  .mav { width:32px; height:32px; border-radius:9px; flex-shrink:0; display:flex; align-items:center; justify-content:center; font-size:15px; }
  .mb { padding:12px 15px; border-radius:17px; font-size:14px; line-height:1.55; }
  .msg.c .mb { background:var(--white); border:1.5px solid var(--border); border-bottom-left-radius:4px; color:var(--dark); box-shadow:0 2px 7px rgba(0,0,0,.05); }
  .msg.u .mb { background:var(--blue); color:white; font-weight:500; border-bottom-right-radius:4px; box-shadow:0 4px 14px rgba(26,86,255,.25); }
  .mt { font-size:10px; color:var(--muted); margin-top:3px; }
  .msg.u .mt { text-align:right; }

  .dots { display:flex; gap:4px; padding:3px 0; }
  .dots span { width:7px; height:7px; background:var(--muted); border-radius:50%; animation:td 1.2s ease-in-out infinite; }
  .dots span:nth-child(2){animation-delay:.2s} .dots span:nth-child(3){animation-delay:.4s}
  @keyframes td { 0%,80%,100%{opacity:.3;transform:scale(.8)} 40%{opacity:1;transform:scale(1)} }

  .chat-bar {
    padding:13px 20px 22px; background:var(--white);
    border-top:1.5px solid var(--border); display:flex; gap:9px; align-items:flex-end;
    box-shadow:0 -2px 10px rgba(0,0,0,.05);
    position:sticky; bottom:0;
  }
  .ci { flex:1; background:var(--bg); border:2px solid var(--border); border-radius:15px; padding:12px 15px; color:var(--dark); font-family:var(--B); font-size:14px; resize:none; outline:none; transition:border-color .2s; min-height:46px; max-height:110px; }
  .ci:focus { border-color:var(--blue); }
  .ci::placeholder { color:var(--muted); }
  .sbtn { width:46px; height:46px; background:var(--blue); border:none; border-radius:13px; color:white; font-size:17px; font-weight:900; cursor:pointer; transition:all .2s; display:flex; align-items:center; justify-content:center; flex-shrink:0; box-shadow:0 4px 14px rgba(26,86,255,.3); }
  .sbtn:hover { transform:scale(1.07); box-shadow:0 8px 22px rgba(26,86,255,.4); }
  .sbtn:disabled { opacity:.35; cursor:not-allowed; transform:none; }
  .vbtn { width:46px; height:46px; background:var(--white); border:2px solid var(--border); border-radius:13px; color:var(--mid); font-size:19px; cursor:pointer; transition:all .2s; display:flex; align-items:center; justify-content:center; flex-shrink:0; }
  .vbtn:hover { border-color:var(--blue); color:var(--blue); }
  .vbtn.rec { background:var(--red); border-color:var(--red); color:white; animation:vp 1s ease-in-out infinite; }
  @keyframes vp { 0%,100%{box-shadow:0 0 0 0 rgba(232,24,44,.4)} 50%{box-shadow:0 0 0 10px rgba(232,24,44,0)} }

  /* ── PROVIDER TOGGLE ── */
  .ptoggle { display:flex; align-items:center; gap:6px; background:var(--bg); border:1.5px solid var(--border); border-radius:99px; padding:4px 5px 4px 10px; }
  .ptoggle-label { font-size:10px; font-weight:800; color:var(--mid); font-family:var(--F); letter-spacing:.3px; white-space:nowrap; }
  .ptoggle-btn { display:flex; background:var(--white); border:1.5px solid var(--border); border-radius:99px; overflow:hidden; }
  .ptoggle-opt { padding:4px 10px; font-size:10px; font-weight:800; font-family:var(--F); cursor:pointer; border:none; background:transparent; color:var(--muted); transition:all .2s; white-space:nowrap; }
  .ptoggle-opt.on { background:var(--blue); color:white; border-radius:99px; }
  .ptoggle-opt.on.ds { background:#4e9f3d; }
  .bnav {
    position:fixed; bottom:0; left:50%; transform:translateX(-50%);
    width:100%; max-width:480px;
    background:rgba(255,255,255,.96); backdrop-filter:blur(20px);
    border-top:1.5px solid var(--border);
    display:flex; padding:10px 0 20px; z-index:100;
    box-shadow:0 -3px 20px rgba(0,0,0,.07);
  }
  .ni { flex:1; display:flex; flex-direction:column; align-items:center; gap:4px; cursor:pointer; transition:all .2s; padding:4px 0; }
  .ni-icon { font-size:21px; transition:transform .2s; }
  .ni-lbl { font-size:10px; color:var(--muted); font-weight:800; letter-spacing:.3px; font-family:var(--F); transition:color .2s; }
  .ni.on .ni-lbl { color:var(--blue); }
  .ni.on .ni-icon { transform:translateY(-2px); }

  /* ── PLAN ── */
  .plan-page { padding:0 22px 100px; overflow-y:auto; height:100vh; }
  .plan-hdr { padding:26px 0 18px; border-bottom:2px solid var(--border); margin-bottom:18px; }
  .plan-wk { font-size:11px; text-transform:uppercase; letter-spacing:1.5px; color:var(--blue); font-weight:800; margin-bottom:5px; font-family:var(--F); }
  .plan-ttl { font-family:var(--F); font-size:25px; font-weight:900; color:var(--dark); }

  .dblock { background:var(--white); border:2px solid var(--border); border-radius:16px; margin-bottom:9px; overflow:hidden; transition:all .2s; box-shadow:0 2px 7px rgba(0,0,0,.04); }
  .dblock:hover { border-color:rgba(26,86,255,.2); }
  .dh { padding:15px 17px; display:flex; align-items:center; justify-content:space-between; cursor:pointer; }
  .dl { display:flex; align-items:center; gap:11px; }
  .ddot { width:37px; height:37px; border-radius:11px; background:var(--blue); color:white; font-family:var(--F); font-weight:900; font-size:11px; display:flex; align-items:center; justify-content:center; box-shadow:0 4px 10px rgba(26,86,255,.25); }
  .ddot.rest { background:var(--bg); color:var(--muted); box-shadow:none; border:2px solid var(--border); }
  .dn { font-family:var(--F); font-weight:800; font-size:15px; color:var(--dark); }
  .df { font-size:12px; color:var(--muted); }
  .dbadge { background:var(--blue-lt); color:var(--blue); font-size:11px; font-weight:800; padding:5px 11px; border-radius:99px; font-family:var(--F); }
  .dbadge.rest { background:var(--bg); color:var(--muted); border:1.5px solid var(--border); }
  .dexs { padding:0 17px 14px; border-top:1.5px solid var(--border); }
  .exr { display:flex; align-items:center; gap:11px; padding:9px 0; border-bottom:1px solid var(--border); }
  .exr:last-child { border-bottom:none; }
  .exn { width:25px; height:25px; background:var(--blue-lt); color:var(--blue); font-size:11px; font-weight:900; border-radius:7px; display:flex; align-items:center; justify-content:center; flex-shrink:0; font-family:var(--F); }
  .exlbl { font-size:14px; font-weight:500; flex:1; color:var(--dark); }
  .exset { font-size:12px; color:var(--muted); font-weight:500; }

  /* ── PROFILE ── */
  .prof-hero { background:linear-gradient(135deg,var(--blue) 0%,#3d7fff 100%); border-radius:24px; padding:26px 22px; display:flex; flex-direction:column; align-items:center; text-align:center; margin-bottom:18px; box-shadow:0 8px 28px rgba(26,86,255,.3); }
  .prof-av { width:76px; height:76px; border-radius:22px; font-size:40px; display:flex; align-items:center; justify-content:center; margin-bottom:13px; background:rgba(255,255,255,.2); }
  .prof-nm { font-family:var(--F); font-size:21px; font-weight:900; color:white; margin-bottom:3px; }
  .prof-gl { font-size:13px; color:rgba(255,255,255,.75); }
  .stats { display:flex; gap:9px; margin-bottom:18px; }
  .sc { flex:1; background:var(--white); border:2px solid var(--border); border-radius:15px; padding:15px; text-align:center; box-shadow:0 2px 7px rgba(0,0,0,.04); }
  .sv { font-family:var(--F); font-size:25px; font-weight:900; color:var(--blue); }
  .slbl { font-size:11px; color:var(--muted); margin-top:3px; font-weight:500; }
  .slabel { font-size:11px; text-transform:uppercase; letter-spacing:1.5px; color:var(--muted); font-weight:800; margin-bottom:9px; font-family:var(--F); }

  /* ── TOAST ── */
  .toast { position:fixed; bottom:88px; left:50%; transform:translateX(-50%); background:var(--dark); color:white; border-radius:12px; padding:11px 20px; font-size:13px; z-index:200; animation:ti .3s ease; white-space:nowrap; font-weight:500; box-shadow:0 8px 22px rgba(0,0,0,.2); }
  @keyframes ti { from{opacity:0;transform:translateX(-50%) translateY(10px)} to{opacity:1;transform:translateX(-50%) translateY(0)} }
`;

// ─── DATA ─────────────────────────────────────────────────────────────────────
const COACHES = [
  { id:"hype",   name:"Hype Beast",       tagline:"LET'S GOOO! Every rep is legendary.",       avatar:"🔥", gradient:"linear-gradient(135deg,#ff6b35,#ffb347)", system:"You are Hype Beast, an ultra-energetic fitness coach. Use energy, caps occasionally, celebrate every win. Keep responses 2-4 sentences, punchy and motivating." },
  { id:"tough",  name:"Sergeant Steel",   tagline:"No excuses. No shortcuts. Just results.",   avatar:"⚔️", gradient:"linear-gradient(135deg,#1c2a3a,#3a5a8a)", system:"You are Sergeant Steel, tough-love military coach. Direct, no-nonsense, short sharp sentences. Hold people accountable. 2-4 sentences." },
  { id:"bestie", name:"Alex (BFF Mode)",  tagline:"Your ride-or-die gym bestie 💪",            avatar:"✨", gradient:"linear-gradient(135deg,#7b5ff5,#c471ed)", system:"You are Alex, a warm supportive best friend who is a great personal trainer. Casual, fun, encouraging, use 'we'. 2-4 sentences, warm and conversational." },
  { id:"flirty", name:"Rio (Hot Trainer)",tagline:"Looking good is the best motivation 😉",    avatar:"💋", gradient:"linear-gradient(135deg,#ff5e7d,#ff9a9e)", system:"You are Rio, a confident charming mildly flirtatious personal trainer. Playful, tasteful, make fitness glamorous. 2-4 sentences, witty." },
];
const GOALS = [
  {id:"lose_fat",emoji:"🔥",label:"Lose Fat",desc:"Burn calories, lean out"},
  {id:"build_muscle",emoji:"💪",label:"Build Muscle",desc:"Get bigger & stronger"},
  {id:"get_fit",emoji:"⚡",label:"Get Fit",desc:"Cardio & endurance"},
  {id:"tone_up",emoji:"✨",label:"Tone Up",desc:"Lean & defined"},
  {id:"athletic",emoji:"🏃",label:"Athletic",desc:"Performance & power"},
  {id:"stress",emoji:"🧘",label:"De-Stress",desc:"Move & feel better"},
];
const EQUIPMENT = [
  {id:"none",emoji:"🚫",label:"No Equipment",desc:"Bodyweight only"},
  {id:"dumbbells",emoji:"🏋️",label:"Dumbbells",desc:"Home setup"},
  {id:"gym",emoji:"🏟️",label:"Full Gym",desc:"All machines"},
  {id:"bands",emoji:"🎀",label:"Resistance Bands",desc:"Portable training"},
];
const LEVELS = [
  {id:"beginner",emoji:"🌱",label:"Beginner",desc:"Just starting out"},
  {id:"intermediate",emoji:"🌿",label:"Intermediate",desc:"6+ months training"},
  {id:"advanced",emoji:"🌳",label:"Advanced",desc:"2+ years consistent"},
];
const DAYS = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];

// ─── API ──────────────────────────────────────────────────────────────────────
const isLocal = typeof window !== 'undefined' && window.location.hostname === 'localhost';
const CLAUDE_URL   = isLocal ? 'https://api.anthropic.com/v1/messages' : '/api/claude';
const DEEPSEEK_URL = '/api/deepseek';

// Workout plan → always Claude (best quality, only runs once per user)
async function genPlan(profile) {
  const r = await fetch(CLAUDE_URL, {
    method:"POST", headers:{"Content-Type":"application/json"},
    body:JSON.stringify({ model:"claude-sonnet-4-20250514", max_tokens:1500,
      messages:[{role:"user",content:`Create a personalised 7-day workout plan:
Goal:${profile.goal}, Equipment:${profile.equipment}, Level:${profile.level}, Days:${profile.days.join(",")}.
Return ONLY a JSON array of 7 objects (Mon–Sun):
[{"day":"Monday","isRest":false,"focus":"Upper Body","duration":"45 min","exercises":[{"name":"Push-Ups","sets":"3×12"}]}]
Rest days: isRest:true, focus:"Active Recovery", exercises:[{"name":"Light stretching","sets":"20 min"}]. JSON only.`}]
    })
  });
  const d = await r.json();
  return JSON.parse(d.content[0].text.replace(/```json|```/g,"").trim());
}

// Daily chat → DeepSeek by default (95% cheaper), Claude as fallback/option
async function chat(msgs, sys, profile, provider="deepseek") {
  const systemPrompt = `${sys}\nUser: Goal:${profile.goal}, Equipment:${profile.equipment}, Level:${profile.level}, Days:${profile.days?.join(",")}. Max 2-4 sentences per reply.`;

  if (provider === "claude") {
    const r = await fetch(CLAUDE_URL, {
      method:"POST", headers:{"Content-Type":"application/json"},
      body:JSON.stringify({ model:"claude-sonnet-4-20250514", max_tokens:300, system:systemPrompt, messages:msgs })
    });
    const d = await r.json();
    return d.content[0].text;
  } else {
    // DeepSeek — uses OpenAI-compatible API format
    const r = await fetch(DEEPSEEK_URL, {
      method:"POST", headers:{"Content-Type":"application/json"},
      body:JSON.stringify({
        model:"deepseek-chat", max_tokens:300,
        messages:[{role:"system",content:systemPrompt},...msgs]
      })
    });
    const d = await r.json();
    return d.choices[0].message.content;
  }
}

function fallbackPlan(profile) {
  const map={Mon:"Monday",Tue:"Tuesday",Wed:"Wednesday",Thu:"Thursday",Fri:"Friday",Sat:"Saturday",Sun:"Sunday"};
  return Object.values(map).map(day=>{
    const s=Object.keys(map).find(k=>map[k]===day);
    return (profile.days||[]).includes(s)
      ? {day,isRest:false,focus:"Full Body",duration:"45 min",exercises:[{name:"Warm-up",sets:"5 min"},{name:"Squats",sets:"3×12"},{name:"Push-Ups",sets:"3×10"},{name:"Lunges",sets:"3×10 each"},{name:"Plank",sets:"3×30s"}]}
      : {day,isRest:true,focus:"Active Recovery",duration:"Optional",exercises:[{name:"Walk or stretching",sets:"20–30 min"}]};
  });
}

// ─── COMPONENT ───────────────────────────────────────────────────────────────
export default function FitPal() {
  const [screen, setScreen]   = useState("splash");
  const [step, setStep]       = useState(0);
  const [profile, setProfile] = useState({goal:"",equipment:"",level:"",days:[],coach:null});
  const [plan, setPlan]       = useState(null);
  const [tab, setTab]         = useState("chat");
  const [openDay, setOpenDay] = useState(null);
  const [msgs, setMsgs]       = useState([]);
  const [input, setInput]     = useState("");
  const [typing, setTyping]   = useState(false);
  const [recording, setRec]   = useState(false);
  const [toast, setToast]     = useState("");
  const [provider, setProvider] = useState("deepseek"); // "deepseek" | "claude"
  const endRef   = useRef(null);
  const recRef   = useRef(null);
  const coach    = COACHES.find(c=>c.id===profile.coach)||COACHES[0];
  const now      = ()=>new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"});
  const showToast= m=>{ setToast(m); setTimeout(()=>setToast(""),2500); };

  useEffect(()=>{ endRef.current?.scrollIntoView({behavior:"smooth"}); },[msgs,typing]);

  useEffect(()=>{
    if(screen==="app" && msgs.length===0){
      const g={
        hype:`YO! Your ${profile.goal?.replace("_"," ")} plan is LOCKED IN! 🔥 I'm here every day to keep you crushing it. What's your energy like today?`,
        tough:`Plan set. Excuses end here. Your ${profile.goal?.replace("_"," ")} program starts now. Are you ready to commit?`,
        bestie:`Hi!! I'm SO excited to be your coach bestie! 🥹 Your plan is ready and it's going to be amazing. How are you feeling?`,
        flirty:`Well hello 😏 Your plan looks almost as good as you're going to look after following it. Ready to make some gains?`,
      };
      setMsgs([{role:"assistant",content:g[coach.id]||g.bestie,time:now()}]);
    }
  },[screen]);

  const toggleVoice = ()=>{
    if(!("webkitSpeechRecognition" in window)&&!("SpeechRecognition" in window)){ showToast("🎤 Voice not supported here"); return; }
    if(recording){ recRef.current?.stop(); setRec(false); return; }
    const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
    const r=new SR(); r.lang="en-US"; r.interimResults=false;
    r.onresult=e=>{ setInput(p=>p+(p?" ":"")+e.results[0][0].transcript); setRec(false); };
    r.onerror=()=>{ setRec(false); showToast("🎤 Couldn't hear that"); };
    r.onend=()=>setRec(false);
    recRef.current=r; r.start(); setRec(true);
  };

  const send = async()=>{
    if(!input.trim()||typing) return;
    const um={role:"user",content:input.trim(),time:now()};
    const h=[...msgs,um];
    setMsgs(h); setInput(""); setTyping(true);
    try {
      const api=h.slice(-6).map(m=>({role:m.role==="assistant"?"assistant":"user",content:m.content}));
      const reply=await chat(api,coach.system,profile,provider);
      setMsgs(p=>[...p,{role:"assistant",content:reply,time:now()}]);
    } catch { setMsgs(p=>[...p,{role:"assistant",content:"Hit a snag! Try again 💪",time:now()}]); }
    setTyping(false);
  };

  const startGen = async()=>{
    setScreen("generating");
    try { setPlan(await genPlan(profile)); } catch { setPlan(fallbackPlan(profile)); }
    setTimeout(()=>setScreen("app"),800);
  };

  const canNext = [!!profile.goal,!!profile.equipment,!!profile.level,profile.days.length>0,!!profile.coach][step];
  const toggleDay = d=>setProfile(p=>({...p,days:p.days.includes(d)?p.days.filter(x=>x!==d):[...p.days,d]}));
  const cap = s=>s?.replace("_"," ").replace(/\b\w/g,l=>l.toUpperCase());

  return (
    <>
      <style>{css}</style>
      <div className="shell">

        {/* ── SPLASH ── */}
        {screen==="splash" && (
          <div className="page">
            <div className="logo-bar">
              <FPLogo size={38}/>
              <div className="wordmark"><span className="f">Fit</span><span className="p">Pal</span></div>
            </div>
            <div className="splash">
              <div className="splash-logo"><FPLogo size={108}/></div>
              <div className="splash-title">Your <span className="bl">AI coach</span><br/>is <span className="rd">ready</span> for you.</div>
              <div className="splash-sub">Personalised workouts + a daily AI companion who genuinely cares about your goals.</div>
              <div className="pills">
                <span className="pill">✅ 100% personalised</span>
                <span className="pill">🎯 Goal-driven</span>
                <span className="pill">🎤 Voice enabled</span>
              </div>
              <button className="btn" onClick={()=>setScreen("onboarding")}>Start My Journey →</button>
            </div>
          </div>
        )}

        {/* ── ONBOARDING ── */}
        {screen==="onboarding" && (
          <div className="page">
            <div className="logo-bar">
              <FPLogo size={36}/>
              <div className="wordmark"><span className="f">Fit</span><span className="p">Pal</span></div>
            </div>
            <div className="prog-track"><div className="prog-fill" style={{width:`${((step+1)/5)*100}%`}}/></div>

            {step===0 && <>
              <div className="ttl">What's your<br/><span className="hl">main goal?</span></div>
              <div className="sub">We'll build everything around this.</div>
              <div className="og">{GOALS.map(g=>(
                <div key={g.id} className={`oc ${profile.goal===g.id?"sel":""}`} onClick={()=>setProfile(p=>({...p,goal:g.id}))}>
                  <div className="oe">{g.emoji}</div><div className="ol">{g.label}</div><div className="od">{g.desc}</div>
                </div>
              ))}</div>
            </>}

            {step===1 && <>
              <div className="ttl">What <span className="hl">equipment</span><br/>do you have?</div>
              <div className="sub">We'll tailor every exercise to match.</div>
              <div className="olist">{EQUIPMENT.map(e=>(
                <div key={e.id} className={`or ${profile.equipment===e.id?"sel":""}`} onClick={()=>setProfile(p=>({...p,equipment:e.id}))}>
                  <div className="chk"/><div className="re">{e.emoji}</div>
                  <div><div className="rl">{e.label}</div><div className="rd">{e.desc}</div></div>
                </div>
              ))}</div>
            </>}

            {step===2 && <>
              <div className="ttl">Your <span className="hl">fitness</span><br/>level?</div>
              <div className="sub">Be honest — we'll meet you where you are.</div>
              <div className="olist">{LEVELS.map(l=>(
                <div key={l.id} className={`or ${profile.level===l.id?"sel":""}`} onClick={()=>setProfile(p=>({...p,level:l.id}))}>
                  <div className="chk"/><div className="re">{l.emoji}</div>
                  <div><div className="rl">{l.label}</div><div className="rd">{l.desc}</div></div>
                </div>
              ))}</div>
            </>}

            {step===3 && <>
              <div className="ttl">Which <span className="hl">days</span><br/>will you train?</div>
              <div className="sub">Tap every day that works for you.</div>
              <div className="dr">{DAYS.map(d=>(
                <button key={d} className={`db ${profile.days.includes(d)?"on":""}`} onClick={()=>toggleDay(d)}>{d}</button>
              ))}</div>
              {profile.days.length>0 && (
                <div style={{textAlign:"center",color:"var(--mid)",fontSize:"13px",marginBottom:"18px",fontWeight:500}}>
                  {profile.days.length} training day{profile.days.length>1?"s":""} · {7-profile.days.length} rest day{7-profile.days.length!==1?"s":""}
                </div>
              )}
            </>}

            {step===4 && <>
              <div className="ttl">Pick your<br/><span className="hl">coach vibe</span></div>
              <div className="sub">Your daily companion — who motivates you most?</div>
              <div className="cg">{COACHES.map(c=>(
                <div key={c.id} className={`cc ${profile.coach===c.id?"sel":""}`} style={{background:c.gradient}} onClick={()=>setProfile(p=>({...p,coach:c.id}))}>
                  <div className="ca">{c.avatar}</div>
                  <div className="cn">{c.name}</div>
                  <div className="ct">{c.tagline}</div>
                </div>
              ))}</div>
            </>}

            <button className="btn" disabled={!canNext} onClick={()=>step<4?setStep(s=>s+1):startGen()}>
              {step<4?"Continue →":"Generate My Plan 🚀"}
            </button>
          </div>
        )}

        {/* ── GENERATING ── */}
        {screen==="generating" && (
          <div className="page">
            <div className="gen">
              <div className="spin"/>
              <FPLogo size={62}/>
              <div className="gen-ttl">Building your plan...</div>
              <div className="gen-sub">Personalising every detail with AI ✨</div>
            </div>
          </div>
        )}

        {/* ── APP ── */}
        {screen==="app" && <>

          {/* CHAT */}
          {tab==="chat" && (
            <div className="chat-wrap" style={{position:"relative",zIndex:1}}>
              <div className="chat-top">
                <div className="av-sm" style={{background:coach.gradient}}>{coach.avatar}</div>
                <div><div className="cn2">{coach.name}</div><div className="cs">● Online · Ready to coach</div></div>
                <div style={{marginLeft:"auto",display:"flex",alignItems:"center",gap:8}}>
                  <div className="ptoggle">
                    <span className="ptoggle-label">AI</span>
                    <div className="ptoggle-btn">
                      <button className={`ptoggle-opt ds ${provider==="deepseek"?"on":""}`} onClick={()=>setProvider("deepseek")}>DeepSeek</button>
                      <button className={`ptoggle-opt ${provider==="claude"?"on":""}`} onClick={()=>setProvider("claude")}>Claude</button>
                    </div>
                  </div>
                  <FPLogo size={32}/>
                </div>
              </div>
              <div className="msgs">
                {msgs.map((m,i)=>(
                  <div key={i} className={`msg ${m.role==="user"?"u":"c"}`}>
                    {m.role!=="user" && <div className="mav" style={{background:coach.gradient,borderRadius:9}}>{coach.avatar}</div>}
                    <div><div className="mb">{m.content}</div><div className="mt">{m.time}</div></div>
                  </div>
                ))}
                {typing && (
                  <div className="msg c">
                    <div className="mav" style={{background:coach.gradient,borderRadius:9}}>{coach.avatar}</div>
                    <div className="mb"><div className="dots"><span/><span/><span/></div></div>
                  </div>
                )}
                <div ref={endRef}/>
              </div>
              <div className="chat-bar">
                <button className={`vbtn ${recording?"rec":""}`} onClick={toggleVoice}>{recording?"⏹":"🎤"}</button>
                <textarea className="ci" placeholder="Message your coach..." value={input}
                  onChange={e=>setInput(e.target.value)}
                  onKeyDown={e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();send();}}}
                  rows={1}/>
                <button className="sbtn" onClick={send} disabled={!input.trim()||typing}>↑</button>
              </div>
            </div>
          )}

          {/* PLAN */}
          {tab==="plan" && (
            <div className="plan-page" style={{position:"relative",zIndex:1}}>
              <div className="plan-hdr">
                <div className="plan-wk">Week 1 · Your Plan</div>
                <div className="plan-ttl">{cap(profile.goal)} Program</div>
              </div>
              {plan?.map((day,i)=>(
                <div key={i} className="dblock">
                  <div className="dh" onClick={()=>setOpenDay(openDay===i?null:i)}>
                    <div className="dl">
                      <div className={`ddot ${day.isRest?"rest":""}`}>{day.day.slice(0,3).toUpperCase()}</div>
                      <div><div className="dn">{day.day}</div><div className="df">{day.focus}</div></div>
                    </div>
                    <div className={`dbadge ${day.isRest?"rest":""}`}>{day.isRest?"Rest":day.duration}</div>
                  </div>
                  {openDay===i && (
                    <div className="dexs">
                      {day.exercises?.map((ex,j)=>(
                        <div key={j} className="exr">
                          <div className="exn">{j+1}</div>
                          <div className="exlbl">{ex.name}</div>
                          <div className="exset">{ex.sets}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* PROFILE */}
          {tab==="profile" && (
            <div style={{padding:"24px 22px 100px",overflowY:"auto",height:"100vh",position:"relative",zIndex:1}}>
              <div style={{paddingTop:"22px",marginBottom:"18px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                <div className="ttl" style={{fontSize:"23px",marginBottom:0}}>Your Profile</div>
                <FPLogo size={36}/>
              </div>
              <div className="prof-hero">
                <div className="prof-av">{coach.avatar}</div>
                <div className="prof-nm">FitPal Member</div>
                <div className="prof-gl">{cap(profile.goal)} · {cap(profile.level)}</div>
              </div>
              <div className="stats">
                <div className="sc"><div className="sv">{profile.days?.length}</div><div className="slbl">Train Days</div></div>
                <div className="sc"><div className="sv">1</div><div className="slbl">Week Active</div></div>
                <div className="sc"><div className="sv">{msgs.filter(m=>m.role==="user").length}</div><div className="slbl">Messages</div></div>
              </div>
              <div className="slabel">Your Coach</div>
              <div className="dblock" style={{marginBottom:18}}>
                <div className="dh" style={{cursor:"default"}}>
                  <div className="dl">
                    <div className="av-sm" style={{background:coach.gradient,width:42,height:42,borderRadius:13,fontSize:21}}>{coach.avatar}</div>
                    <div><div className="dn">{coach.name}</div><div className="df">{coach.tagline}</div></div>
                  </div>
                </div>
              </div>
              <div className="slabel">Training Schedule</div>
              <div className="dr" style={{marginBottom:24}}>
                {DAYS.map(d=><div key={d} className={`db ${profile.days.includes(d)?"on":""}`} style={{cursor:"default"}}>{d}</div>)}
              </div>
              <button className="btn2" onClick={()=>{setScreen("splash");setStep(0);setProfile({goal:"",equipment:"",level:"",days:[],coach:null});setPlan(null);setMsgs([]);}}>
                🔄 Start Over
              </button>
            </div>
          )}

          {/* NAV */}
          <div className="bnav">
            {[{id:"chat",icon:"💬",lbl:"Coach"},{id:"plan",icon:"📋",lbl:"My Plan"},{id:"profile",icon:"👤",lbl:"Profile"}].map(t=>(
              <div key={t.id} className={`ni ${tab===t.id?"on":""}`} onClick={()=>setTab(t.id)}>
                <div className="ni-icon">{t.icon}</div>
                <div className="ni-lbl">{t.lbl}</div>
              </div>
            ))}
          </div>
        </>}

        {toast && <div className="toast">{toast}</div>}
      </div>
    </>
  );
}
