import { useEffect, useRef, useState } from "react";

// ── helpers ──────────────────────────────────────────────────────────────────
function eio(t: number) { return t < .5 ? 2*t*t : -1+(4-2*t)*t; }
function eo(t: number)  { return 1-(1-t)**3; }
function lerp(a: number, b: number, t: number) { return a+(b-a)*t; }

function rrp(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x+r,y); ctx.lineTo(x+w-r,y); ctx.quadraticCurveTo(x+w,y,x+w,y+r);
  ctx.lineTo(x+w,y+h-r); ctx.quadraticCurveTo(x+w,y+h,x+w-r,y+h);
  ctx.lineTo(x+r,y+h); ctx.quadraticCurveTo(x,y+h,x,y+h-r);
  ctx.lineTo(x,y+r); ctx.quadraticCurveTo(x,y,x+r,y); ctx.closePath();
}

// ── constants ─────────────────────────────────────────────────────────────────
const SD = 3;
const TD = 15;

export const FLASHING_STEPS = [
  { number:"01", title:"Source Code Modification",    description:"Writing, optimizing, and customizing specific unlock logic and brand layouts.",                                                 color:"#06b6d4" },
  { number:"02", title:"Project Compilation & Build", description:"Bundling safe partitions and compiling error-free binary outputs.",                                                            color:"#8b5cf6" },
  { number:"03", title:"Live Tool Integration",       description:"Deploying the compiled build as a premium, ready-to-use professional flashing and unlocking tool.",                            color:"#3b82f6" },
  { number:"04", title:"Worldwide Availability",      description:"Distributing to independent developers, repair networks, and tech shops globally.",                                            color:"#10b981" },
  { number:"05", title:"Available at NetCodeShop",    description:"Secure your high-quality premium source code license instantly with multiple payment options.",                               color:"#f59e0b" },
];

// ── code tokens for IDE step ──────────────────────────────────────────────────
type Token = [string, string];
const CODE: Token[][] = [
  [["kw","public class "],["cls","UnlockManager "],["cm","// MTK Auth v2"]],
  [["kw","  extends "],["cls","BaseFlashService"],["pt"," {"]],
  [["cm","  // Initialize USB secure bridge"]],
  [["kw","  void "],["fn","initBridge"],["pt","() {"]],
  [["id","    this.protocol"],["pt"," = "],["st",'"ADB_SECURE"'],["pt",";"]],
  [["id","    this.baudRate"],["pt"," = "],["nm","921600"],["pt",";"]],
  [["pt","  }"]],
  [["cm","  // Flash firmware partition"]],
  [["kw","  async "],["fn","flashPartition"],["pt","(Partition p) {"]],
  [["kw","    byte[] "],["id","crc"],["pt"," = CRC32.compute(p.data);"]],
  [["kw","    await "],["fn","writeBlock"],["pt","(p.offset, p.data);"]],
  [["kw","    return "],["fn","verify"],["pt","(crc, p.expected);"]],
  [["pt","  }"]],
  [["cm","  // Unlock bootloader"]],
  [["kw","  boolean "],["fn","unlockBoot"],["pt","() {"]],
  [["kw","    return "],["fn","sendAuth"],["pt","("],["st",'"UNLOCK_CMD"'],["pt",");"]],
  [["pt","  }"]],
  [["pt","}"]],
];

const SX: Record<string,string> = {
  kw:"#c084fc", cls:"#fbbf24", fn:"#22d3ee", st:"#86efac",
  nm:"#fb923c", cm:"#475569", id:"#e2e8f0", pt:"#94a3b8",
};

// ── world map data ────────────────────────────────────────────────────────────
const CONTINENTS: number[][][] = [
  [[.08,.13],[.15,.07],[.22,.08],[.27,.13],[.30,.19],[.28,.28],[.24,.38],[.19,.46],[.13,.48],[.09,.43],[.05,.33],[.06,.22]],
  [[.21,.47],[.28,.44],[.32,.48],[.34,.56],[.32,.67],[.27,.78],[.20,.82],[.17,.73],[.18,.60]],
  [[.44,.13],[.51,.10],[.55,.13],[.57,.19],[.54,.26],[.49,.31],[.45,.30],[.42,.23]],
  [[.46,.30],[.55,.27],[.60,.33],[.62,.46],[.58,.61],[.51,.73],[.44,.70],[.43,.58],[.44,.42]],
  [[.58,.08],[.73,.05],[.83,.08],[.91,.15],[.92,.23],[.88,.31],[.82,.40],[.74,.48],[.67,.48],[.62,.44],[.58,.33],[.57,.22]],
  [[.82,.59],[.90,.56],[.95,.61],[.94,.70],[.88,.75],[.80,.74],[.77,.68],[.79,.63]],
];

// normalized: Myanmar source + 5 destinations
const MYANMAR = [.767,.406];
const DEST = [
  { label:"Asia",    pt:[.886,.306] },
  { label:"Europe",  pt:[.500,.217] },
  { label:"America", pt:[.294,.278] },
  { label:"Africa",  pt:[.508,.467] },
  { label:"Oceania", pt:[.919,.689] },
];

function mapC(nx: number, ny: number, W: number, H: number) {
  return [W*.06 + nx*W*.88, H*.05 + ny*H*.90] as [number,number];
}

// ── draw functions ────────────────────────────────────────────────────────────

function drawIDE(ctx: CanvasRenderingContext2D, W: number, H: number, t: number, elapsed: number, col: string) {
  ctx.fillStyle = "#070d1a"; ctx.fillRect(0,0,W,H);
  const ew = W*.82, eh = H*.78;
  const ex = (W-ew)/2, ey = (H-eh)/2;
  // glow
  ctx.shadowColor = col; ctx.shadowBlur = 22+8*Math.sin(elapsed*2.5);
  rrp(ctx,ex,ey,ew,22,0); ctx.fillStyle = "#161f2e"; ctx.fill(); ctx.shadowBlur = 0;
  rrp(ctx,ex,ey+22,ew,eh-22,0); ctx.fillStyle = "#0b1320"; ctx.fill();
  // border glow
  ctx.shadowColor = col; ctx.shadowBlur = 12;
  rrp(ctx,ex,ey,ew,eh,6); ctx.strokeStyle = col+"33"; ctx.lineWidth = 1; ctx.stroke(); ctx.shadowBlur = 0;
  // title traffic lights
  [[col,5],[("#475569"),16],[("#475569"),27]].forEach(([c,ox],i)=>{
    ctx.beginPath(); ctx.arc(ex+10+(i as number)*14,(ey+11) as number,4.5,0,Math.PI*2);
    ctx.fillStyle = i===0 ? col as string : "#1e293b"; ctx.fill();
  });
  ctx.fillStyle = "#475569"; ctx.font = "11px monospace"; ctx.textAlign = "center";
  ctx.fillText("UnlockManager.java", W/2, ey+15);
  // line number gutter
  ctx.fillStyle = "#0d1626"; ctx.fillRect(ex+1, ey+22, 26, eh-23);
  ctx.fillStyle = col+"18"; ctx.fillRect(ex+1,ey+22,1.5,eh-23);

  const LH = 15.5;
  const visLines = Math.min(CODE.length, Math.ceil(t * CODE.length * 1.6));
  ctx.font = "10.5px 'Courier New',monospace";
  CODE.forEach((tokens,li) => {
    if (li >= visLines) return;
    const y = ey + 34 + li*LH;
    const isActive = li === Math.min(visLines-1, CODE.length-1);
    if (isActive) { ctx.fillStyle = col+"0c"; ctx.fillRect(ex+28,y-1,ew-29,LH+1); }
    ctx.fillStyle = "#2d3748"; ctx.textAlign = "left";
    ctx.fillText(String(li+1).padStart(2," "), ex+4, y+10);
    let x = ex+32;
    tokens.forEach(([tp,tx])=>{
      ctx.fillStyle = SX[tp]||"#94a3b8"; ctx.fillText(tx,x,y+10); x+=ctx.measureText(tx).width;
    });
    if (isActive && Math.floor(elapsed*2)%2===0) {
      ctx.fillStyle = col; ctx.fillRect(x,y+1,2,LH-2);
    }
  });
  // progress bar
  const pbH = 4;
  ctx.fillStyle = "#0f172a"; ctx.fillRect(ex,ey+eh-pbH,ew,pbH);
  const pgrad = ctx.createLinearGradient(ex,0,ex+ew*t,0);
  pgrad.addColorStop(0,col); pgrad.addColorStop(1,col+"88");
  ctx.fillStyle = pgrad; ctx.fillRect(ex,ey+eh-pbH,ew*t,pbH);
  // status bar
  ctx.fillStyle = col+"22"; ctx.fillRect(ex,ey+eh-18,ew,14);
  ctx.fillStyle = col; ctx.font = "9px monospace"; ctx.textAlign = "left";
  ctx.fillText(`  ✎ EDITING  |  Ln ${Math.min(visLines,CODE.length)}/${CODE.length}  |  UTF-8  |  Java`, ex+4, ey+eh-7);
}

function drawCompile(ctx: CanvasRenderingContext2D, W: number, H: number, t: number, elapsed: number, col: string) {
  ctx.fillStyle = "#07090f"; ctx.fillRect(0,0,W,H);
  const cx = W/2, cy = H/2;

  // Outer ring
  const ringR = Math.min(W,H)*0.30;
  const ringW = 7;
  ctx.strokeStyle = "#1e293b"; ctx.lineWidth = ringW;
  ctx.beginPath(); ctx.arc(cx,cy,ringR,0,Math.PI*2); ctx.stroke();
  const progress = eio(t);
  const grad = ctx.createLinearGradient(cx-ringR,cy,cx+ringR,cy);
  grad.addColorStop(0,col); grad.addColorStop(1,"#22d3ee");
  ctx.strokeStyle = grad; ctx.lineWidth = ringW;
  ctx.lineCap = "round";
  ctx.beginPath(); ctx.arc(cx,cy,ringR,-Math.PI/2,-Math.PI/2+progress*Math.PI*2); ctx.stroke();
  // Ring glow
  ctx.shadowColor = col; ctx.shadowBlur = 18;
  ctx.beginPath(); ctx.arc(cx,cy,ringR,-Math.PI/2,-Math.PI/2+progress*Math.PI*2); ctx.stroke();
  ctx.shadowBlur = 0; ctx.lineCap = "butt";

  // Central rotating hexagon/gear
  const sides = 6, gr = Math.min(W,H)*0.16, teethN = 10, teethD = gr*0.22;
  const rot = elapsed*1.2;
  ctx.save(); ctx.translate(cx,cy); ctx.rotate(rot);
  const hexGrad = ctx.createRadialGradient(0,0,0,0,0,gr);
  hexGrad.addColorStop(0, col+"55"); hexGrad.addColorStop(1, col+"11");
  ctx.fillStyle = hexGrad;
  ctx.beginPath();
  for (let i=0;i<sides;i++){
    const a = (i/sides)*Math.PI*2; const r2 = i%2===0?gr:gr*0.88;
    ctx.lineTo(Math.cos(a)*r2,Math.sin(a)*r2);
  }
  ctx.closePath(); ctx.fill();
  ctx.strokeStyle = col+"88"; ctx.lineWidth = 1.5; ctx.stroke();
  // Teeth
  for (let i=0;i<teethN;i++){
    const a = (i/teethN)*Math.PI*2;
    ctx.fillStyle = col+"66";
    ctx.fillRect(Math.cos(a)*(gr-2)-3, Math.sin(a)*(gr-2)-3, 6, 6);
  }
  ctx.restore();

  // Center symbol
  ctx.fillStyle = col; ctx.font = `bold ${Math.min(W,H)*0.08}px monospace`;
  ctx.textAlign = "center"; ctx.textBaseline = "middle";
  ctx.shadowColor = col; ctx.shadowBlur = 20;
  ctx.fillText("⚙", cx, cy); ctx.shadowBlur = 0; ctx.textBaseline = "alphabetic";

  // Percentage
  ctx.fillStyle = "#e2e8f0"; ctx.font = `bold ${Math.min(W,H)*0.05}px monospace`;
  ctx.textAlign = "center"; ctx.fillText(`${Math.round(progress*100)}%`, cx, cy + ringR*0.55);

  // Spark particles
  const sparkCount = 16;
  for (let i=0;i<sparkCount;i++){
    const a = (i/sparkCount)*Math.PI*2 + elapsed*2.5;
    const rInner = ringR*0.6, rOuter = ringR*1.1;
    const r = rInner + (rOuter-rInner)*((Math.sin(elapsed*4+i*0.8)+1)/2);
    const sa = 0.3+0.7*((Math.sin(elapsed*3+i*1.1)+1)/2);
    ctx.globalAlpha = sa * Math.min(1, progress*2);
    ctx.fillStyle = col;
    ctx.beginPath(); ctx.arc(cx+Math.cos(a)*r, cy+Math.sin(a)*r, 2.5, 0, Math.PI*2); ctx.fill();
  }
  ctx.globalAlpha = 1;

  // BUILD SUCCESS badge
  if (t > 0.72) {
    const ba = eo(Math.min(1,(t-0.72)/0.2));
    const bw = Math.min(W,H)*0.68, bh = 36;
    const bx = cx-bw/2, by = cy+ringR+14;
    ctx.globalAlpha = ba;
    ctx.shadowColor = "#22c55e"; ctx.shadowBlur = 22;
    rrp(ctx,bx,by,bw,bh,8); ctx.fillStyle = "#052e16"; ctx.fill();
    ctx.strokeStyle = "#22c55e88"; ctx.lineWidth = 1; ctx.stroke();
    ctx.shadowBlur = 0;
    ctx.fillStyle = "#22c55e"; ctx.font = `bold ${bh*0.42}px monospace`;
    ctx.textAlign = "center"; ctx.fillText("✓  BUILD SUCCESS", cx, by+bh*0.66);
    ctx.globalAlpha = 1;
  }
}

function drawPhone(ctx: CanvasRenderingContext2D, W: number, H: number, t: number, elapsed: number, col: string) {
  ctx.fillStyle = "#060b14"; ctx.fillRect(0,0,W,H);
  const cx = W/2, cy = H/2 - 8;
  const PW = Math.min(W,H)*0.36, PH = PW*2, PR = PW*0.12;
  const SW = PW*0.80, SH = PH*0.83;
  const floatY = Math.sin(elapsed*0.9)*5;

  // phone body
  ctx.save(); ctx.translate(cx, cy+floatY);
  ctx.shadowColor = col; ctx.shadowBlur = 20+8*Math.sin(elapsed*2);
  rrp(ctx,-PW/2,-PH/2,PW,PH,PR);
  const bg = ctx.createLinearGradient(-PW/2,-PH/2,PW/2,PH/2);
  bg.addColorStop(0,"#1e293b"); bg.addColorStop(1,"#0a1224");
  ctx.fillStyle = bg; ctx.fill(); ctx.shadowBlur = 0;
  ctx.strokeStyle = "#334155"; ctx.lineWidth = 1.5; rrp(ctx,-PW/2,-PH/2,PW,PH,PR); ctx.stroke();
  // screen
  ctx.fillStyle = "#060d18"; ctx.fillRect(-SW/2,-SH/2,SW,SH);
  // screen content
  ctx.save(); ctx.beginPath(); ctx.rect(-SW/2,-SH/2,SW,SH); ctx.clip();
  const sW = SW, sH = SH;
  // screen bg
  ctx.fillStyle = "#04080f"; ctx.fillRect(-sW/2,-sH/2,sW,sH);
  // Header bar
  ctx.fillStyle = col+"22"; ctx.fillRect(-sW/2,-sH/2,sW,sH*0.14);
  ctx.fillStyle = col; ctx.font = `bold ${sH*0.06}px monospace`; ctx.textAlign = "center";
  ctx.fillText("MiFix Pro v2.1", 0, -sH/2+sH*0.095);
  // Menu items
  const items = ["Flash Firmware","Auth Bypass","Read Info","Factory Reset"];
  items.forEach((txt,i)=>{
    const iy = -sH/2+sH*0.22+i*sH*0.17;
    const active = i===Math.floor(t*items.length*0.9);
    ctx.fillStyle = active ? col+"33" : "#0d1f2d";
    ctx.fillRect(-sW/2+sW*0.05, iy, sW*0.9, sH*0.14);
    if (active) { ctx.strokeStyle = col; ctx.lineWidth = 1; ctx.strokeRect(-sW/2+sW*0.05, iy, sW*0.9, sH*0.14); }
    ctx.fillStyle = active ? col : "#64748b"; ctx.font = `${sH*0.05}px monospace`; ctx.textAlign = "left";
    ctx.fillText(txt, -sW/2+sW*0.10, iy+sH*0.096);
    if (active){ ctx.textAlign = "right"; ctx.fillStyle = col; ctx.fillText("▶", sW/2-sW*0.08, iy+sH*0.096); }
  });
  // Status bar
  ctx.fillStyle = "#0a1a2b"; ctx.fillRect(-sW/2,sH/2-sH*0.10,sW,sH*0.10);
  ctx.fillStyle = "#22c55e"; ctx.font = `${sH*0.045}px monospace`; ctx.textAlign = "center";
  ctx.fillText("● CONNECTED  USB 3.0", 0, sH/2-sH*0.04);
  ctx.restore();
  // Camera + speaker
  ctx.fillStyle = "#020617"; ctx.beginPath(); ctx.arc(PW/2-PW*0.14,-PH/2+PH*0.06,PW*0.07,0,Math.PI*2); ctx.fill();
  ctx.fillStyle = "#1d4ed8"; ctx.beginPath(); ctx.arc(PW/2-PW*0.14,-PH/2+PH*0.06,PW*0.04,0,Math.PI*2); ctx.fill();
  ctx.fillStyle = "#0f172a"; ctx.fillRect(-PW*0.07,PH/2-PH*0.04,PW*0.14,PH*0.03);
  ctx.restore();

  // USB cable
  const portY = cy+floatY+PH/2;
  const plugOffset = lerp(120, 0, eio(t));
  const plugY = portY+plugOffset;
  ctx.strokeStyle = "#1e293b"; ctx.lineWidth = 5; ctx.lineCap = "round";
  ctx.beginPath(); ctx.moveTo(cx,plugY);
  ctx.bezierCurveTo(cx+28,plugY+30,cx-18,plugY+65,cx,plugY+105); ctx.stroke();
  ctx.strokeStyle = "#334155"; ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(cx,plugY);
  ctx.bezierCurveTo(cx+28,plugY+30,cx-18,plugY+65,cx,plugY+105); ctx.stroke();
  ctx.fillStyle = "#94a3b8";
  ctx.shadowColor = plugOffset < 2 ? col : "transparent"; ctx.shadowBlur = plugOffset < 2 ? 14 : 0;
  ctx.fillRect(cx-11,plugY-14,22,14);
  ctx.fillStyle = "#d4af37";
  for (let i=-1;i<=1;i++) ctx.fillRect(cx+i*7-2,plugY-11,4,6);
  ctx.shadowBlur = 0;
  ctx.lineCap = "butt";

  // floor shadow
  const sg = ctx.createRadialGradient(cx,portY+20,5,cx,portY+20,52);
  sg.addColorStop(0,"rgba(0,0,0,0.4)"); sg.addColorStop(1,"rgba(0,0,0,0)");
  ctx.fillStyle = sg; ctx.beginPath(); ctx.ellipse(cx,portY+20,52,10,0,0,Math.PI*2); ctx.fill();
}

function drawWorldMap(ctx: CanvasRenderingContext2D, W: number, H: number, t: number, elapsed: number, col: string) {
  ctx.fillStyle = "#030809"; ctx.fillRect(0,0,W,H);

  // holographic grid
  ctx.strokeStyle = col+"18"; ctx.lineWidth = 0.5;
  for (let x=0;x<W;x+=W/20){ ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x,H); ctx.stroke(); }
  for (let y=0;y<H;y+=H/12){ ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(W,y); ctx.stroke(); }

  // continents
  CONTINENTS.forEach(pts=>{
    ctx.beginPath();
    pts.forEach(([nx,ny],i)=>{
      const [x,y] = mapC(nx,ny,W,H);
      i===0 ? ctx.moveTo(x,y) : ctx.lineTo(x,y);
    });
    ctx.closePath();
    ctx.fillStyle = col+"18"; ctx.fill();
    ctx.strokeStyle = col+"55"; ctx.lineWidth = 1; ctx.stroke();
  });

  // Myanmar source dot
  const [mx,my] = mapC(MYANMAR[0],MYANMAR[1],W,H);
  const pulse = 0.5+0.5*Math.sin(elapsed*4);
  ctx.shadowColor = col; ctx.shadowBlur = 16*pulse;
  ctx.fillStyle = col; ctx.beginPath(); ctx.arc(mx,my,5,0,Math.PI*2); ctx.fill();
  ctx.shadowBlur = 0;
  // Rings around Myanmar
  for (let r=0;r<3;r++){
    const rr = 10+r*10+(elapsed*30)%(30);
    const a = 1-rr/40;
    ctx.strokeStyle = col+Math.round(a*255).toString(16).padStart(2,"0");
    ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(mx,my,rr,0,Math.PI*2); ctx.stroke();
  }
  ctx.fillStyle = col; ctx.font = "9px monospace"; ctx.textAlign = "left"; ctx.fillText("Myanmar",mx+8,my+4);

  // Arc lines + pulse dots
  const arcProgress = eio(Math.min(1, t*1.6));
  DEST.forEach(({label,pt},i)=>{
    const delay = i/DEST.length;
    const ap = Math.max(0, (arcProgress-delay*0.6)/(1-delay*0.6));
    if (ap <= 0) return;
    const [dx,dy] = mapC(pt[0],pt[1],W,H);
    // control point arcs upward
    const cpx = (mx+dx)/2 + (dy-my)*0.25;
    const cpy = (my+dy)/2 - Math.sqrt((dx-mx)**2+(dy-my)**2)*0.35;
    // draw partial bezier
    const steps = 40, maxS = Math.floor(steps*ap);
    ctx.beginPath();
    for (let s=0;s<=maxS;s++){
      const bt = s/steps;
      const bx = (1-bt)*(1-bt)*mx + 2*(1-bt)*bt*cpx + bt*bt*dx;
      const by = (1-bt)*(1-bt)*my + 2*(1-bt)*bt*cpy + bt*bt*dy;
      s===0 ? ctx.moveTo(bx,by) : ctx.lineTo(bx,by);
    }
    ctx.shadowColor = col; ctx.shadowBlur = 5;
    ctx.strokeStyle = col+(ap>0.5?"cc":"66"); ctx.lineWidth = 1.5; ctx.stroke(); ctx.shadowBlur = 0;
    // traveling dot
    const dotT = (elapsed*0.55+i*0.2)%1 * ap;
    const dt = Math.min(dotT,1);
    const dBx = (1-dt)*(1-dt)*mx + 2*(1-dt)*dt*cpx + dt*dt*dx;
    const dBy = (1-dt)*(1-dt)*my + 2*(1-dt)*dt*cpy + dt*dt*dy;
    ctx.shadowColor = "#ffffff"; ctx.shadowBlur = 8;
    ctx.fillStyle = "#ffffff"; ctx.beginPath(); ctx.arc(dBx,dBy,3.5,0,Math.PI*2); ctx.fill();
    ctx.shadowBlur = 0;
    // destination dot
    if (ap >= 1) {
      ctx.shadowColor = col; ctx.shadowBlur = 12;
      ctx.fillStyle = col; ctx.beginPath(); ctx.arc(dx,dy,4,0,Math.PI*2); ctx.fill(); ctx.shadowBlur = 0;
      ctx.fillStyle = col; ctx.font = "9px monospace"; ctx.textAlign = dx>W/2?"right":"left";
      ctx.fillText(label, dx+(dx>W/2?-8:8), dy+4);
    }
  });
  ctx.textAlign = "center";

  // Stats bar
  const statsA = eo(Math.max(0,(t-0.5)*2));
  ctx.globalAlpha = statsA;
  const stats = [`${Math.round(t*127)} Devs Online`, `${Math.round(t*42)} Downloads`, "5 Continents"];
  stats.forEach((s,i)=>{
    const sx = W/2 + (i-1)*W*0.30;
    rrp(ctx,sx-W*0.12,H-28,W*0.24,22,4);
    ctx.fillStyle = col+"22"; ctx.fill(); ctx.strokeStyle = col+"44"; ctx.lineWidth=1; ctx.stroke();
    ctx.fillStyle = col; ctx.font = "10px monospace"; ctx.textAlign = "center"; ctx.fillText(s,sx,H-13);
  });
  ctx.globalAlpha = 1;
}

function drawStore(ctx: CanvasRenderingContext2D, W: number, H: number, t: number, elapsed: number, col: string) {
  ctx.fillStyle = "#07040a"; ctx.fillRect(0,0,W,H);
  const cx = W/2, cy = H/2;

  // Background particles
  for (let i=0;i<30;i++){
    const angle = (i/30)*Math.PI*2 + elapsed*0.3;
    const r = Math.min(W,H)*(0.28+0.12*((i%5)/5));
    const pa = 0.2+0.3*Math.sin(elapsed*2+i);
    ctx.globalAlpha = pa;
    ctx.fillStyle = i%3===0?col:i%3===1?"#c084fc":"#818cf8";
    ctx.beginPath(); ctx.arc(cx+Math.cos(angle)*r, cy+Math.sin(angle)*r*0.7, 1.8+i%3, 0, Math.PI*2); ctx.fill();
  }
  ctx.globalAlpha = 1;

  // Central shield / store badge
  const sr = Math.min(W,H)*0.19;
  const appear = eo(Math.min(1,t*3));
  ctx.save(); ctx.translate(cx,cy-sr*0.2); ctx.scale(appear,appear);
  // shield shape
  ctx.beginPath();
  ctx.moveTo(0,-sr); ctx.bezierCurveTo(sr*1.1,-sr,sr*1.1,0,0,sr*1.2);
  ctx.bezierCurveTo(-sr*1.1,0,-sr*1.1,-sr,0,-sr); ctx.closePath();
  const sg = ctx.createRadialGradient(0,-sr*0.2,0,0,0,sr*1.1);
  sg.addColorStop(0,"#2e1065"); sg.addColorStop(0.6,col+"44"); sg.addColorStop(1,col+"11");
  ctx.fillStyle = sg; ctx.fill();
  ctx.shadowColor = col; ctx.shadowBlur = 28+10*Math.sin(elapsed*2.5);
  ctx.strokeStyle = col; ctx.lineWidth = 2; ctx.stroke(); ctx.shadowBlur = 0;
  // cart icon inside shield
  ctx.fillStyle = col; ctx.font = `bold ${sr*0.65}px sans-serif`; ctx.textAlign = "center"; ctx.textBaseline = "middle";
  ctx.fillText("🛒", 0, sr*0.05); ctx.textBaseline = "alphabetic";
  ctx.restore();

  // NetCodeShop text
  const ta = eo(Math.max(0,(t-0.25)*2));
  ctx.globalAlpha = ta;
  ctx.shadowColor = col; ctx.shadowBlur = 18;
  ctx.fillStyle = "#ffffff"; ctx.font = `bold ${Math.min(W,H)*0.06}px 'Courier New',monospace`;
  ctx.textAlign = "center"; ctx.fillText("NetCodeShop", cx, cy+sr*0.9+4);
  ctx.shadowBlur = 0;
  ctx.fillStyle = col; ctx.font = `${Math.min(W,H)*0.036}px monospace`;
  ctx.fillText("PREMIUM SOURCE CODE MARKETPLACE", cx, cy+sr*0.9+24);
  ctx.globalAlpha = 1;

  // Orbiting stars
  const starCount = 5;
  const orbitA = eo(Math.max(0,(t-0.3)*2));
  for (let i=0;i<starCount;i++){
    const orbitR = sr*1.55;
    const angle = (i/starCount)*Math.PI*2 + elapsed*1.8;
    const sx = cx + Math.cos(angle)*orbitR;
    const sy = (cy-sr*0.2) + Math.sin(angle)*orbitR*0.5;
    ctx.globalAlpha = orbitA*(0.6+0.4*Math.sin(elapsed*3+i));
    ctx.shadowColor = "#fbbf24"; ctx.shadowBlur = 10;
    ctx.fillStyle = "#fbbf24"; ctx.font = `${Math.min(W,H)*0.038}px sans-serif`;
    ctx.textAlign = "center"; ctx.fillText("★", sx, sy+5);
    ctx.shadowBlur = 0;
  }
  ctx.globalAlpha = 1;

  // Floating badges
  const badges = ["✓ VERIFIED","★ 5.0 RATED","INSTANT DL","LICENSED"];
  const badgeA = eo(Math.max(0,(t-0.5)*3));
  badges.forEach((b,i)=>{
    const angle = ((i/badges.length)*Math.PI*2)+elapsed*0.5+Math.PI*0.25;
    const br = sr*1.95;
    const bx = cx + Math.cos(angle)*br;
    const by = (cy-sr*0.2) + Math.sin(angle)*br*0.42;
    ctx.globalAlpha = badgeA*(0.5+0.5*Math.sin(elapsed*2+i*1.5));
    const bw = 70, bh = 18;
    rrp(ctx,bx-bw/2,by-bh/2,bw,bh,4);
    ctx.fillStyle = "#1c0a3a"; ctx.fill(); ctx.strokeStyle = col+"66"; ctx.lineWidth=1; ctx.stroke();
    ctx.fillStyle = col; ctx.font = "9px monospace"; ctx.textAlign = "center"; ctx.fillText(b,bx,by+5);
  });
  ctx.globalAlpha = 1;

  // Bottom CTA
  const ctaA = eo(Math.max(0,(t-0.6)*2.5));
  ctx.globalAlpha = ctaA;
  const cbw = Math.min(W*0.55,180), cbh = 28;
  rrp(ctx,cx-cbw/2,H-42,cbw,cbh,8);
  ctx.fillStyle = col; ctx.fill();
  ctx.fillStyle = "#07040a"; ctx.font = `bold ${cbh*0.42}px monospace`; ctx.textAlign = "center";
  ctx.fillText("Browse & License Now", cx, H-42+cbh*0.66);
  ctx.globalAlpha = 1;
}

// ── main 2D animation loop ───────────────────────────────────────────────────
function run2D(canvas: HTMLCanvasElement, onStep: (s: number, p: number) => void) {
  const ctx = canvas.getContext("2d")!;
  let animId: number;
  const start = performance.now();

  function frame() {
    animId = requestAnimationFrame(frame);
    const W = canvas.width, H = canvas.height;
    ctx.clearRect(0,0,W,H);
    const elapsed = (performance.now()-start)/1000;
    const loopT = elapsed % TD;
    const step = Math.min(4, Math.floor(loopT/SD));
    const t = (loopT % SD) / SD;
    onStep(step, t);
    const col = FLASHING_STEPS[step].color;
    if (step===0) drawIDE(ctx,W,H,t,elapsed,col);
    else if (step===1) drawCompile(ctx,W,H,t,elapsed,col);
    else if (step===2) drawPhone(ctx,W,H,t,elapsed,col);
    else if (step===3) drawWorldMap(ctx,W,H,t,elapsed,col);
    else drawStore(ctx,W,H,t,elapsed,col);
  }

  frame();
  return () => cancelAnimationFrame(animId);
}

// ── exported component ────────────────────────────────────────────────────────
export function FlashingProcessSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeStep, setActiveStep]     = useState(0);
  const [stepProgress, setStepProgress] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const parent = canvas.parentElement!;
    const resize = () => { canvas.width = parent.clientWidth; canvas.height = parent.clientHeight; };
    resize();
    window.addEventListener("resize", resize);
    const cleanup = run2D(canvas, (s,p) => { setActiveStep(s); setStepProgress(p); });
    return () => { cleanup(); window.removeEventListener("resize", resize); };
  }, []);

  const cur = FLASHING_STEPS[activeStep];

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      {/* Heading */}
      <div className="text-center mb-12">
        <p className="text-xs font-semibold tracking-[0.25em] uppercase text-purple-400 mb-3">How It Works</p>
        <h2 className="text-3xl md:text-4xl mb-4 text-white">From Code to Customer</h2>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          A fully automated 5-stage pipeline — from source writing to worldwide delivery.
        </p>
      </div>

      {/* Split layout */}
      <div className="flex flex-col lg:flex-row items-stretch gap-8">

        {/* Left: step cards */}
        <div className="lg:w-[40%] flex flex-col justify-center gap-3">
          {FLASHING_STEPS.map((s,i) => {
            const isActive = activeStep === i;
            const isDone   = activeStep > i;
            const prog     = isActive ? stepProgress : isDone ? 1 : 0;
            return (
              <div key={i} className="relative rounded-xl border overflow-hidden"
                style={{
                  borderColor: isActive ? s.color+"55" : isDone ? s.color+"33" : "#1e293b",
                  background: isActive ? `linear-gradient(135deg,${s.color}12 0%,#0f172a 100%)` : "#090e1a",
                  boxShadow: isActive ? `0 0 24px ${s.color}22` : "none",
                  transform: isActive ? "translateX(5px)" : "translateX(0)",
                  transition: "transform 0.4s ease,box-shadow 0.4s ease,border-color 0.4s ease,background 0.4s ease",
                }}>
                {/* progress underline */}
                <div className="absolute bottom-0 left-0 h-0.5"
                  style={{ width:`${prog*100}%`, background:s.color, transition:isActive?"none":"width 0.4s ease" }} />
                <div className="flex items-center gap-3 px-4 py-3">
                  <div className="flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center font-bold text-xs"
                    style={{ background:isActive?s.color:isDone?s.color+"33":"#1e293b", color:isActive?"#fff":isDone?s.color:"#475569", transition:"background 0.4s ease,color 0.4s ease" }}>
                    {isDone ? "✓" : s.number}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm leading-tight"
                      style={{ color:isActive?"#fff":isDone?s.color:"#475569", transition:"color 0.4s ease" }}>
                      {s.title}
                    </p>
                    <p className="text-xs leading-relaxed mt-0.5"
                      style={{ color:"#64748b", maxHeight:isActive?"50px":"0", opacity:isActive?1:0, overflow:"hidden", transition:"max-height 0.4s ease,opacity 0.3s ease" }}>
                      {s.description}
                    </p>
                  </div>
                  {isActive && <div className="flex-shrink-0 w-2 h-2 rounded-full animate-pulse" style={{ background:s.color }} />}
                </div>
              </div>
            );
          })}

          {/* Loop dots */}
          <div className="flex items-center gap-3 px-1 mt-1">
            <div className="flex gap-1.5">
              {FLASHING_STEPS.map((s,i) => (
                <div key={i} className="rounded-full" style={{ width:activeStep===i?18:6, height:6, background:activeStep===i?s.color:"#1e293b", transition:"width 0.3s ease,background 0.3s ease" }} />
              ))}
            </div>
            <span className="text-xs text-slate-600 tracking-widest">AUTO LOOP</span>
          </div>
        </div>

        {/* Right: animated canvas */}
        <div className="lg:w-[60%]">
          <div className="relative w-full rounded-2xl overflow-hidden border border-white/5"
            style={{
              background: "radial-gradient(ellipse at 50% 40%,#0d1f3c 0%,#050c18 60%,#020810 100%)",
              aspectRatio: "4/3",
              boxShadow: `0 0 60px ${cur.color}18,inset 0 0 40px rgba(0,0,0,0.6)`,
              transition: "box-shadow 0.6s ease",
            }}>
            {/* grid floor */}
            <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage:`linear-gradient(rgba(139,92,246,0.3) 1px,transparent 1px),linear-gradient(90deg,rgba(139,92,246,0.3) 1px,transparent 1px)`, backgroundSize:"40px 40px", maskImage:"linear-gradient(to top,rgba(0,0,0,0.8) 0%,transparent 60%)" }} />

            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

            {/* corner brackets */}
            {["top-3 left-3 border-t border-l","top-3 right-3 border-t border-r","bottom-3 left-3 border-b border-l","bottom-3 right-3 border-b border-r"].map((cls,i) => (
              <div key={i} className={`absolute w-4 h-4 ${cls} pointer-events-none`} style={{ borderColor:cur.color+"88", transition:"border-color 0.5s ease" }} />
            ))}

            {/* HUD: step badge */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 pointer-events-none">
              <div className="text-xs font-mono tracking-widest px-3 py-1 rounded-full border backdrop-blur-sm"
                style={{ color:cur.color, borderColor:cur.color+"44", background:cur.color+"11", transition:"color 0.5s ease,border-color 0.5s ease" }}>
                STEP {activeStep+1} / {FLASHING_STEPS.length}
              </div>
            </div>

            {/* HUD: timeline bar */}
            <div className="absolute bottom-4 left-6 right-6 pointer-events-none">
              <div className="flex justify-between text-xs font-mono text-slate-600 mb-1.5">
                <span>TIMELINE</span>
                <span style={{ color:cur.color, transition:"color 0.5s ease" }}>{(stepProgress*SD).toFixed(1)}s / {SD}s</span>
              </div>
              <div className="h-0.5 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full rounded-full" style={{ width:`${stepProgress*100}%`, background:`linear-gradient(90deg,${cur.color},${cur.color}88)` }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
