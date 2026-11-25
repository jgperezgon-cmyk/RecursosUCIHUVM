/* Recursos UCI HUVM · Fármacos › ¿Periférica o central?
   Datos: window.VIA_DATA (via-data.js), de Manrique-Rodríguez S, et al. Drugs R D. 2020;21:39-64. */
(function(){
  'use strict';
  const DATA=window.VIA_DATA||[];
  const REC=[
    {key:'periferica',label:'Periférica',cls:'low',hint:''},
    {key:'midline',label:'Periférica',cls:'mid',hint:'Si va a ser prolongado, valorar midline'},
    {key:'central',label:'Vía central',cls:'high',hint:'CVC o PICC'},
    {key:'unk',label:'Precaución',cls:'unk',hint:'Concentración no medida'}
  ];
  const LEVEL=['low','mid','high','unk'];
  const DIL={'SF 0,9 %':'SF 0,9 %','SG 5 %':'SG 5 %'};

  const css=`
  .via-view{display:none;max-width:980px;margin:0 auto;padding:18px 16px 40px}
  .via-hero{background:linear-gradient(120deg,#edf4fb,#f4f8fc);border:1px solid #d6e4ef;border-radius:16px;padding:18px;margin-bottom:14px}
  .via-hero h2{margin:0 0 5px;font-size:23px;color:#12324a}
  .via-hero p{margin:0;color:#5d7183;font-size:14px;line-height:1.45}
  .via-tools{background:#fff;border:1px solid #dfe6ee;border-radius:14px;padding:12px;margin-bottom:12px;box-shadow:0 2px 8px rgba(20,40,60,.04)}
  .via-search{width:100%;box-sizing:border-box;font-size:16px;padding:11px 12px;border:1px solid #c8d3df;border-radius:10px;background:#f9fbfd}
  .via-chips{display:flex;flex-wrap:wrap;gap:6px;margin-top:10px}
  .via-chip{font-size:13px!important;font-weight:700!important;padding:7px 11px!important;border-radius:999px!important;border:1px solid #cbd6e1!important;background:#f6f9fc!important;color:#29445a!important;min-width:0!important}
  .via-chip.active{background:#12324a!important;border-color:#12324a!important;color:#fff!important}
  .via-chip .dot{display:inline-block;width:8px;height:8px;border-radius:50%;margin-right:6px;vertical-align:1px}
  .via-letters{display:flex;flex-wrap:wrap;gap:4px;margin-top:10px}
  .via-letter{min-width:30px!important;padding:5px 6px!important;font-size:12px!important;border-radius:7px!important;border:1px solid #d4dde7!important;background:#fff!important;color:#29445a!important}
  .via-letter.active{background:#dfeaf5!important;border-color:#8fb0cc!important}
  .via-count{font-size:13px;color:#667085;margin:4px 2px 8px}
  .via-card{background:#fff;border:1px solid #dfe6ee;border-left:5px solid #cbd5e1;border-radius:14px;padding:13px 14px;margin:10px 0;box-shadow:0 2px 8px rgba(20,40,60,.04)}
  .via-card.low{border-left-color:#2f9e5b}.via-card.mid{border-left-color:#e08a00}.via-card.high{border-left-color:#d92d20}
  .via-head{display:flex;flex-wrap:wrap;align-items:baseline;gap:6px 10px}
  .via-name{margin:0;font-size:18px;color:#17202a}
  .via-tag{font-size:11px;font-weight:800;letter-spacing:.02em;color:#6b4f00;background:#fff4cc;border:1px solid #ecd27a;border-radius:999px;padding:2px 8px}
  .via-rec{margin:8px 0 2px;display:flex;flex-wrap:wrap;align-items:center;gap:6px 8px;font-size:15px}
  .via-pill{display:inline-flex;flex-wrap:wrap;white-space:nowrap;align-items:baseline;gap:6px;font-weight:800;font-size:14px;border-radius:999px;padding:5px 11px}
  .via-pill.low{background:#e3f4ea;color:#17663a}.via-pill.mid{background:#fff0d9;color:#8a4b00}.via-pill.high{background:#fde5e3;color:#a3201a}
  .via-how{font-weight:700;color:#17202a}
  .via-how small{font-weight:500;color:#667085}
  .via-pill-hint{margin-left:6px;font-weight:600;font-size:11.5px;opacity:.85;white-space:normal}
  .via-meters{display:flex;flex-wrap:wrap;gap:6px;margin-top:9px}
  .via-m{font-size:12.5px;border-radius:8px;padding:4px 8px;border:1px solid;white-space:nowrap}
  .via-m b{font-weight:800}
  .via-m.low{background:#f1faf4;border-color:#bfe3cc;color:#1f5c37}.via-m.mid{background:#fff7eb;border-color:#f2cf98;color:#7a4500}.via-m.high{background:#fff1f0;border-color:#f3b8b3;color:#9b1c16}
  .via-why{font-size:13px;color:#45525f;margin-top:8px;line-height:1.45}
  .via-sub{font-size:12px;color:#7a8794;margin-top:6px}
  .via-more{margin-top:10px;border-top:1px solid #edf1f5;padding-top:8px}
  .via-more summary{cursor:pointer;font-size:13.5px;font-weight:700;color:#075985;list-style:none}
  .via-more summary::-webkit-details-marker{display:none}
  .via-more summary::before{content:'▸ ';}
  .via-more[open] summary::before{content:'▾ ';}
  .via-opt{display:grid;grid-template-columns:auto 1fr;gap:4px 10px;align-items:start;padding:9px 0;border-bottom:1px dashed #e6ebf0}
  .via-opt:last-child{border-bottom:0}
  .via-opt .via-pill{font-size:12px;padding:3px 9px}
  .via-opt-body{font-size:14px}
  .via-opt-body .via-meters{margin-top:5px}
  .via-caution{display:flex;gap:10px;align-items:flex-start;background:#fff8e6;border:1px solid #f0d48a;border-radius:12px;padding:11px 13px;margin:0 0 10px;font-size:13.5px;line-height:1.45;color:#4f4120}
  .via-caution b{color:#3d3214}
  .via-caution small{display:block;margin-top:4px;color:#7a6a3f;font-size:12px}
  .via-phleb{margin-top:8px;font-size:13px;line-height:1.4;background:#fff4f2;border:1px solid #f3c7c0;border-radius:9px;padding:7px 9px;color:#7a2318}
  .via-phleb small{color:#8f5a52}
  .via-vaso{margin-top:8px;font-size:13px;line-height:1.45;background:#eef5fc;border:1px solid #c5dbef;border-radius:9px;padding:8px 10px;color:#1d3f5e}
  .via-vaso small{display:block;color:#557089;margin-top:3px}
  .via-key{background:#fff;border:1px solid #dfe6ee;border-radius:14px;padding:11px 14px;margin-bottom:10px}
  .via-key summary{cursor:pointer;font-weight:800;font-size:14.5px;color:#12324a;list-style:none}
  .via-key summary::-webkit-details-marker{display:none}
  .via-key summary::before{content:'▸ ';}
  .via-key[open] summary::before{content:'▾ ';}
  .via-key[open] summary{margin-bottom:8px}
  .via-key-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px}
  .via-key-item{background:#f8fafc;border:1px solid #e8edf2;border-radius:10px;padding:9px 10px;font-size:13px;line-height:1.45;color:#33414e}
  .via-key-item p{margin:4px 0 0}
  .via-key-h{font-weight:800;color:#17202a;margin-bottom:6px}
  .via-key-h small{font-weight:500;color:#7a8794;margin-left:4px}
  .via-scale{display:flex;flex-wrap:wrap;gap:5px}
  .via-key-foot{margin:10px 0 0;font-size:13px;color:#45525f;display:flex;flex-wrap:wrap;align-items:center;gap:6px}
  .via-key-foot .via-pill{font-size:12px;padding:3px 9px}
  .via-key-pills{display:inline-flex;flex-wrap:nowrap;gap:6px}
  @media(max-width:640px){.via-key-foot{flex-direction:column;align-items:flex-start;gap:6px}}
  .via-compat-row{display:flex;justify-content:flex-end;margin-top:10px}
  .via-compat-row .via-compat{margin-top:0}
  @media(max-width:760px){.via-key-grid{grid-template-columns:1fr}}
  .via-compat{margin-top:10px;display:inline-flex;align-items:center;gap:6px;font-size:13.5px!important;font-weight:700!important;padding:8px 12px!important;border-radius:10px!important;border:1px solid #9cc3e0!important;background:#f2f8fd!important;color:#0b4f7f!important;min-height:40px}
  .via-compat-msg{font-size:12.5px;color:#667085;margin-top:6px;text-align:right}
  .via-approx{font-size:12.5px;color:#5b4a14;background:#fffbea;border:1px solid #eedc9a;border-radius:8px;padding:5px 8px;margin-top:6px}
  .via-dilnote{font-size:12.5px;color:#1f5c37;background:#f1faf4;border:1px solid #bfe3cc;border-radius:8px;padding:5px 8px;margin-top:6px}
  .via-suggest{font-size:12.5px;color:#1d3f5e;background:#eef5fc;border:1px solid #c5dbef;border-radius:8px;padding:5px 8px;margin-top:6px}
  .via-pill.unk{background:repeating-linear-gradient(135deg,#fde5e3 0 7px,#fff0d9 7px 14px);color:#8a2e12;border:1px solid #f0b8a0}
  .via-card.unk{border-left-color:transparent;border-image:repeating-linear-gradient(135deg,#d92d20 0 8px,#e08a00 8px 16px) 0 0 0 5}
  .via-m.unk{background:#f4f5f7;border-color:#d5dae1;color:#55606c}
  .via-unmeasured{font-size:12.5px;line-height:1.45;border-radius:8px;padding:6px 9px;margin-top:6px}
  .via-unmeasured.high{background:#fff1f0;border:1px solid #f3b8b3;color:#7a2318}
  .via-unmeasured.unk{background:repeating-linear-gradient(135deg,#fff6f4 0 10px,#fffaf0 10px 20px);border:1px dashed #e0a47a;color:#6b3410}
  .via-empty{text-align:center;color:#667085;padding:30px 10px;background:#fff;border:1px dashed #cbd5e1;border-radius:14px}
  .via-info{background:#fff;border:1px solid #dfe6ee;border-radius:14px;padding:11px 14px;margin:0 0 10px;font-size:13.5px;line-height:1.5;color:#33414e}
  .via-info summary{cursor:pointer;font-weight:800;font-size:14.5px;color:#12324a;list-style:none}
  .via-info summary::-webkit-details-marker{display:none}
  .via-info summary::before{content:'▸ ';}
  .via-info[open] summary::before{content:'▾ ';}
  .via-info[open] summary{margin-bottom:8px}
  .via-info table{width:100%;border-collapse:collapse;margin:6px 0 12px;font-size:13px}
  .via-info th,.via-info td{border-bottom:1px solid #e8edf2;padding:6px 5px;text-align:left;vertical-align:top}
  .via-info th{color:#55687a;font-weight:700}
  .via-info .note{background:#fffaf0;border:1px solid #eadfc8;border-radius:10px;padding:10px 11px;color:#5f5848;font-size:12.5px;margin-top:10px}
  .via-info cite{font-style:normal;color:#55687a;font-size:12.5px}
  @media(max-width:640px){.via-info thead{display:none}.via-info tr{display:grid;grid-template-columns:1fr 1fr;gap:2px 10px;padding:8px 0;border-bottom:1px solid #e8edf2}.via-info td{border:0;padding:2px 0}.via-info td:first-child,.via-info td:last-child{grid-column:1/-1}.via-info td[data-l]::before{content:attr(data-l) ': ';color:#7a8794;font-weight:600}.via-view{padding:12px 10px 30px}.via-card{padding:12px}.via-name{font-size:17px}.via-letters{flex-wrap:nowrap;overflow-x:auto;-webkit-overflow-scrolling:touch;padding-bottom:4px;scrollbar-width:none}.via-letters::-webkit-scrollbar{display:none}.via-letter{flex:none;min-height:34px}}
  `;
  const style=document.createElement('style');style.id='via-css';style.textContent=css;document.head.append(style);

  const norm=s=>(s||'').toString().normalize('NFD').replace(/[̀-ͯ]/g,'').toLowerCase();
  const esc=s=>(s||'').toString().replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const n2=x=>x.toFixed(2).replace('.',',').replace(/0$/,'').replace(/,$/,'');

  function howText(o){
    if(o.ready)return `<span class="via-how">${esc(o.howto)}</span>`;
    const dil=DIL[o.dil]||o.dil;
    if(o.noVol)return `<span class="via-how">${esc(o.howto)} en ${esc(dil)}</span> <small>(el estudio no indica el volumen)</small>`;
    return `<span class="via-how">${esc(o.howto)} de ${esc(dil)}</span>`;
  }
  function meters(o){
    if(o.unmeasured)return `<div class="via-meters"><span class="via-m unk">Osmolaridad y pH <b>no medidos</b></span><span class="via-m ${o.ves?'high':'low'}"><b>${o.ves?'Vesicante':'No vesicante'}</b></span></div>`;
    const osm=o.osm==null?'fuera de rango del osmómetro':o.osm+' mOsm/L';
    return `<div class="via-meters">
      <span class="via-m ${LEVEL[o.r[0]]}">Osmolaridad <b>${esc(osm)}</b></span>
      <span class="via-m ${LEVEL[o.r[1]]}">pH <b>${n2(o.ph)}</b></span>
      <span class="via-m ${LEVEL[o.r[2]]}"><b>${o.ves?'Vesicante':'No vesicante'}</b></span></div>`;
  }
  function why(o){
    if(!o.r)return '';
    const bad=[];
    if(o.r[0]>0)bad.push(o.osm==null?'osmolaridad muy alta':(o.osm>600?'osmolaridad > 600':'osmolaridad 450–600'));
    if(o.r[1]>0)bad.push(o.ph<4?'pH < 4 (muy ácido)':o.ph>9?'pH > 9 (muy básico)':(o.ph<5?'pH 4–5':'pH 7,5–9'));
    if(o.ves)bad.push('es vesicante');
    if(!bad.length)return '';
    let t=(o.g===2?'Riesgo alto por: ':'Riesgo moderado por: ')+bad.join(', ')+'.';
    if(o.ves&&o.r[0]===0&&o.r[1]===0)t='Riesgo alto solo por ser vesicante: la osmolaridad y el pH son buenos.';
    return `<div class="via-why">${t}</div>`;
  }
  function phleb(d){
    if(!d.phleb)return '';
    return `<div class="via-phleb">⚠️ <b>Flebitis ≥ 5 %</b> descrita en estudios clínicos por vía periférica${d.bves?', y la revisión la considera <b>vesicante</b>':''}. <small>(Borgonovo et al., 2023)</small></div>`;
  }
  function vaso(d){
    if(!d.vaso)return '';
    return `<div class="via-vaso">ℹ️ <b>Uso periférico transitorio.</b> Revisiones recientes respaldan administrar noradrenalina por vía periférica durante un tiempo limitado (por ejemplo, mientras se canaliza la vía central), con protocolo, catéter en vena de buen calibre y vigilancia frecuente del punto de inserción. La extravasación descrita ronda el 3 % y suele ser leve.<small>Tian et al., 2020; Fernández-Ginés et al., Farm Hosp 2025; Nayel et al., 2026.</small></div>`;
  }
  function notes(o){return (o.unmeasured?`<div class="via-unmeasured ${o.g===3?'unk':'high'}">${esc(o.unmeasured)}</div>`:'')+(o.dilnote?`<div class="via-dilnote">✓ ${esc(o.dilnote)}</div>`:'')+(o.suggest?`<div class="via-suggest">💡 ${esc(o.suggest)}</div>`:'');}
  function pill(g,small){
    const r=REC[g];return `<span class="via-pill ${r.cls}">${small?'':'● '}${esc(r.label)}${!small&&r.hint?`<small class="via-pill-hint">${esc(r.hint)}</small>`:''}</span>`;
  }
  function card(d){
    const best=d.opts[0],rest=d.opts.slice(1),r=REC[best.g];
    const lead=d.leadlabel||d.lead||(d.opts.length>1?'Opción más favorable:':'');
    const other=rest.length?`<details class="via-more"><summary>${d.reflabel?esc(d.reflabel):'Ver '+(rest.length===1?'la otra dilución':'las otras '+rest.length+' diluciones')}</summary>
      ${rest.map(o=>`<div class="via-opt">${pill(o.g,true)}<div class="via-opt-body">${howText(o)}${o.perml?` <small style="color:#7a8794">· ${esc(o.perml)}</small>`:''}${meters(o)}${o.approx?`<div class="via-approx">${esc(o.approx)}</div>`:''}${notes(o)}</div></div>`).join('')}</details>`:'';
    return `<article class="via-card ${r.cls}">
      <div class="via-head"><h3 class="via-name">${esc(d.name)}</h3>${d.mixed?'<span class="via-tag">Depende de la dilución</span>':''}</div>
      <div class="via-rec">${lead?`<span style="color:#667085;font-size:13px">${lead}</span>`:''}${pill(best.g)}<span>${best.ready?'':'con '}${howText(best)}</span></div>
      ${meters(best)}${best.approx?`<div class="via-approx">${esc(best.approx)}</div>`:''}${notes(best)}${why(best)}${phleb(d)}${vaso(d)}
      <div class="via-sub">${best.perml?esc(best.perml)+' · ':''}Presentación estudiada: ${esc(d.pres)}</div>
      ${d.compat?`<div class="via-compat-row"><button type="button" class="via-compat" data-compat="${esc(d.compat)}">Compatibilidad en Y →</button></div>`:''}
      ${other}</article>`;
  }

  const root=document.createElement('main');
  root.id='via-view';root.className='via-view';root.setAttribute('aria-label','¿Periférica o central?');
  const letters=[...new Set(DATA.map(d=>norm(d.name).charAt(0).toUpperCase()))].sort();
  root.innerHTML=`
    <button type="button" class="back v35-cover-back" onclick="showFarmacos()">← Fármacos</button>
    <section class="via-hero"><h2>¿Periférica o central?</h2>
      <p>Riesgo de daño para la vena de cada dilución según su osmolaridad, su pH y si es vesicante.</p></section>
    <div class="via-tools">
      <input id="via-search" class="via-search" type="search" placeholder="Buscar fármaco o marca" autocomplete="off">
      
      <div class="via-letters"><button type="button" class="via-letter active" data-l="all">Todas</button>${letters.map(l=>`<button type="button" class="via-letter" data-l="${l}">${l}</button>`).join('')}</div>
    </div>
    <details class="via-key">
      <summary>Cómo se clasifica</summary>
      <div class="via-key-grid">
        <div class="via-key-item"><div class="via-key-h">Osmolaridad <small>plasma ≈ 290 mOsm/L</small></div>
          <div class="via-scale"><span class="via-m low">&lt; 450</span><span class="via-m mid">450–600</span><span class="via-m high">&gt; 600</span></div></div>
        <div class="via-key-item"><div class="via-key-h">pH <small>sangre 7,35–7,45</small></div>
          <div class="via-scale"><span class="via-m low">5–7,5</span><span class="via-m mid">4–5 o 7,5–9</span><span class="via-m high">&lt; 4 o &gt; 9</span></div></div>
        <div class="via-key-item"><div class="via-key-h">Vesicante</div>
          <p>Fármaco que, si sale de la vena (extravasación), puede lesionar el tejido de alrededor: ampollas, ulceración o necrosis.</p></div>
      </div>
      <div class="via-key-foot"><span>Manda el criterio de mayor riesgo:</span><span class="via-key-pills">${pill(2,true)}${pill(1,true)}${pill(0,true)}</span></div>
    </details>
    <div class="via-caution" role="note"><span aria-hidden="true">⚠️</span><div><b>El riesgo no depende solo de la mezcla:</b> también influyen la duración de la infusión, su velocidad y el calibre de la vena. Respeta el tiempo de infusión del protocolo y elige la vena de mayor calibre posible, evitando mano y muñeca.<small>Fuentes: consenso ERPIUP (Pittiruti et al., 2023); INS Standards of Practice 2024; Piper et al., 2018; Marsh et al., 2021.</small></div></div>
<details class="via-info">
      <summary>Notas y fuentes</summary>
      <p>La elección final depende también de la duración del tratamiento y del capital venoso del paciente. Una infusión prolongada de una mezcla de riesgo por una vía periférica aumenta el riesgo de flebitis, y una velocidad excesiva en una vena pequeña también daña la pared.</p>
      <p>Diluir más acerca la osmolaridad y el pH a los del suero (SF ≈ 5–5,5; SG ≈ 4), pero no corrige un pH extremo ni el carácter vesicante. En SG, diluir puede incluso bajar el pH.</p>
      <div class="note">Los valores se midieron en laboratorio con las presentaciones del H. G. U. Gregorio Marañón. Si la concentración, diluyente o marca usada es distinta, la osmolaridad y el pH pueden cambiar. «Opción más favorable» no significa que sea la dilución indicada para el paciente.</div>
      <p style="margin-top:12px"><cite>Fuente: Manrique-Rodríguez S, Heras-Hidalgo I, Pernia-López MS, et al. Standardization and Chemical Characterization of Intravenous Therapy in Adult Patients: A Step Further in Medication Safety. Drugs R D. 2021;21:39-64 (corrección: 2021;21:239-265). doi:10.1007/s40268-020-00329-w · Licencia CC BY-NC 4.0.</cite></p>
      <p><cite>Aviso de flebitis ≥ 5 % (antimicrobianos): Borgonovo F, Quici M, Gidaro A, et al. Physicochemical Characteristics of Antimicrobials and Practical Recommendations for Intravenous Administration: A Systematic Review. Antibiotics (Basel). 2023;12(8):1338. doi:10.3390/antibiotics12081338. Este aviso no modifica el semáforo, que sigue el estudio principal.</cite></p>
      <p><cite>Aviso sobre la administración: Pittiruti M, et al. European recommendations on the proper indication and use of peripheral venous access devices (the ERPIUP consensus): A WoCoVA project. J Vasc Access. 2023;24(1):165-182. doi:10.1177/11297298211023274 · Nickel B, et al. Infusion Therapy Standards of Practice, 9th Edition. J Infus Nurs. 2024;47(1S Suppl 1):S1-S285. doi:10.1097/NAN.0000000000000532 · Piper R, et al. The mechanistic causes of peripheral intravenous catheter failure based on a parametric computational study. Sci Rep. 2018;8:3441. doi:10.1038/s41598-018-21617-1 · Marsh N, et al. Peripheral intravenous catheter failure: A secondary analysis of risks from 11,830 catheters. Int J Nurs Stud. 2021;124:104095. doi:10.1016/j.ijnurstu.2021.104095.</cite></p>
      <p><cite>Noradrenalina periférica: Tian DH, et al. Safety of peripheral administration of vasopressor medications: A systematic review. Emerg Med Australas. 2020;32(2):220-227. doi:10.1111/1742-6723.13406 · Fernández-Ginés FD, et al. Safe administration of noradrenaline by the peripheral route: A systematic review. Farm Hosp. 2025;49(1):T46-T52. doi:10.1016/j.farma.2024.07.004 · Nayel A, et al. Safety and efficiency of peripheral versus central line vasopressor administration in septic shock: a systematic review and meta-analysis. J Crit Care Med (Targu Mures). 2026;12(4):487-497. doi:10.62838/jccm-2026-0036.</cite></p>
    </details>
    <div class="via-count" id="via-count"></div>
    <div id="via-list"></div>
`;
  document.body.append(root);

  const search=root.querySelector('#via-search'),list=root.querySelector('#via-list'),count=root.querySelector('#via-count');
  let letter='all';
  function render(){
    const q=norm(search.value).trim();
    const items=DATA.filter(d=>{
      if(q&&!norm(d.name+' '+d.pres).includes(q))return false;
      if(letter!=='all'&&norm(d.name).charAt(0).toUpperCase()!==letter)return false;
      return true;
    });
    count.textContent=items.length===DATA.length?`${items.length} fármacos`:`${items.length} de ${DATA.length} fármacos`;
    list.innerHTML=items.length?items.map(card).join(''):'<div class="via-empty">No hay fármacos con ese filtro.</div>';
  }
  search.addEventListener('input',render);
  root.addEventListener('click',e=>{
    const cb=e.target.closest('.via-compat');
    if(cb){openCompat(cb.dataset.compat,cb);return;}
    const l=e.target.closest('.via-letter');
    if(l){letter=l.dataset.l;root.querySelectorAll('.via-letter').forEach(b=>b.classList.toggle('active',b===l));render();}
  });
  function openCompat(name,btn){
    let names=null;
    try{names=compatibilityData.names;}catch(_){}
    if(!names||typeof window.showCompatibility!=='function'||typeof window.selectCompatibilityDrug!=='function'){
      const row=btn.parentElement;
      if(!row.nextElementSibling||!row.nextElementSibling.classList.contains('via-compat-msg'))
        row.insertAdjacentHTML('afterend','<div class="via-compat-msg">Funcionará cuando la pestaña esté integrada en la app.</div>');
      return;
    }
    const idx=names.indexOf(name);
    window.showCompatibility();
    if(idx>=0){window.selectCompatibilityDrug(idx);const det=document.getElementById('compat-drug-details');if(det)det.scrollIntoView({behavior:'smooth',block:'start'});}
  }
  render();

  window.addEventListener('uci-view-change',e=>{if(e.detail&&e.detail.view!=='via')root.style.display='none';});
  window.showViaAcceso=function(){
    document.querySelectorAll('body > main').forEach(m=>m.style.display='none');
    root.style.display='block';document.body.classList.remove('v35-drug-list');window.scrollTo(0,0);
  };
})();
