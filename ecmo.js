/* ECMO module integrated into Recursos UCI HUVM. */
(function(){
  'use strict';
  const docs={
    general:{file:'protocolo-ecmo.pdf',name:'Protocolo de enfermería ECMO',version:'V4 · noviembre 2023'},
    checklist:{file:'checklist-ecmo-original.pdf',name:'Checklist ECMO HUVM',version:'V1 · documento original'},
    anticoag:{file:'anticoagulacion-ecmo.pdf',name:'Anticoagulación en ECMO',version:'V2 · enero 2023'}
  };
  const pressureCard=window.ECMO_PANELS.find(panel=>panel.id==='incidencias')?.cards.find(card=>card.id==='tabla-presiones');
  if(pressureCard)pressureCard.items=[];
  const pressureStyle=document.createElement('style');
  pressureStyle.textContent=`
    #ecmo-card-tabla-presiones{grid-column:1/-1}
    .ecmo-pressure-table td.ecmo-pressure-up{color:#c7263a!important;background:#ffe3e6!important;box-shadow:inset 0 0 0 1px #f6b7c0}
    .ecmo-pressure-table td.ecmo-pressure-down{color:#1671bd!important;background:#e2f2ff!important;box-shadow:inset 0 0 0 1px #add8f6}
    @media(max-width:720px){
      #ecmo-card-tabla-presiones{grid-column:auto}
      .ecmo-pressure-table-wrap{overflow:visible!important;border:0!important;box-shadow:none!important}
      .ecmo-pressure-table,.ecmo-pressure-table tbody{display:block!important;width:100%!important;min-width:0!important}
      .ecmo-pressure-table thead{display:none!important}
      .ecmo-pressure-table tr{display:grid!important;grid-template-columns:repeat(4,minmax(0,1fr))!important;gap:5px!important;padding:8px 0!important;border-top:1px solid #dbe6ee!important}
      .ecmo-pressure-table tr:first-child{border-top:0!important;padding-top:0!important}
      .ecmo-pressure-table td,.ecmo-pressure-table td:not(:last-child){display:flex!important;width:auto!important;min-height:47px!important;padding:5px 3px!important;border:0!important;border-radius:6px!important;align-items:center!important;justify-content:center!important;flex-direction:column!important;font-size:16px!important}
      .ecmo-pressure-table td:not(.ecmo-pressure-diagnosis)::before{content:attr(data-pressure)!important;font-size:8px!important;font-weight:800!important;letter-spacing:.04em!important;margin-bottom:3px!important;color:#5c7284!important}
      .ecmo-pressure-table td.ecmo-pressure-diagnosis{grid-column:1/-1!important;display:block!important;min-width:0!important;min-height:0!important;padding:8px 9px!important;text-align:left!important;background:#f6fafc!important;color:#536b7d!important;font-size:11px!important;line-height:1.45!important}
      .ecmo-pressure-table td.ecmo-pressure-diagnosis b{display:block!important;margin-bottom:2px!important}
    }`;
  document.head.append(pressureStyle);
  const root=document.createElement('main');
  root.id='ecmo-view';root.style.display='none';root.setAttribute('aria-label','ECMO: recordatorios de enfermería');
  root.innerHTML=`
    <div class="ecmo-topline"><button type="button" class="ecmo-back" onclick="showLanding()">← Portada</button><span>Recursos UCI HUVM <span aria-hidden="true">/</span> ECMO</span></div>
    <div class="ecmo-hero">
      <div class="ecmo-hero-symbol" aria-hidden="true"><svg viewBox="0 0 80 80" fill="none" aria-hidden="true"><path d="M17 30V20a7 7 0 0 1 7-7h32a7 7 0 0 1 7 7v10" stroke="#255b9b" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/><path d="M14 30v33a8 8 0 0 0 8 8h36a8 8 0 0 0 8-8V30" stroke="#255b9b" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/><path d="M20 28h40a5 5 0 0 1 5 5v26a6 6 0 0 1-6 6H21a6 6 0 0 1-6-6V33a5 5 0 0 1 5-5Z" fill="#f8fafc" stroke="#a9b8c7" stroke-width="2"/><rect x="23" y="35" width="27" height="17" rx="2.5" fill="#173f73"/><path d="M27 43.5h12" stroke="#e7f1ff" stroke-width="2.5" stroke-linecap="round"/><circle cx="56" cy="48" r="7" fill="#e5eef8" stroke="#255b9b" stroke-width="2"/><circle cx="56" cy="48" r="2" fill="#255b9b"/><path d="M25 59h16" stroke="#a9b8c7" stroke-width="2" stroke-linecap="round"/><circle cx="52" cy="59" r="2.5" fill="#d95362"/><circle cx="60" cy="59" r="2.5" fill="#72849a"/></svg></div>
      <div class="ecmo-hero-copy"><p class="ecmo-kicker">GUÍA RÁPIDA · ENFERMERÍA</p><h2>ECMO</h2><p>Repaso claro para iniciar el turno.</p></div>
      <button type="button" class="ecmo-emergency" id="ecmo-emergency-open"><span aria-hidden="true">!</span> Emergencias <span aria-hidden="true">↗</span></button>
    </div>
    <div class="ecmo-context">
      <label class="ecmo-search"><span class="ecmo-sr">Buscar un recordatorio de ECMO</span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><circle cx="10" cy="10" r="6"/><path d="m15 15 5 5"/></svg><input id="ecmo-search" type="search" placeholder="Buscar en ECMO…" autocomplete="off"><button type="button" id="ecmo-clear" aria-label="Borrar búsqueda ECMO" hidden>×</button></label>
    </div>
    <nav class="ecmo-nav" aria-label="Apartados ECMO"></nav>
    <section class="ecmo-mode-note" id="ecmo-mode-note" aria-label="Vigilancia según modalidad y canulación">
      <div class="ecmo-mode-note-heading"><div><b>VIGILANCIA POR MODALIDAD</b><h4>Controles específicos según la canulación</h4></div></div>
      <div class="ecmo-mode-grid">
        <article class="ecmo-mode-card ecmo-mode-vv"><div class="ecmo-mode-card-head"><span>V-V</span><div><strong>Veno-Venoso</strong><small>Recirculación</small></div></div><ul><li>La recirculación es frecuente si las cánulas no están bien posicionadas.</li><li>Comparar la coloración entre ambas cánulas.</li><li>Sospecharla ante saturación baja del paciente con saturación venosa premembrana elevada.</li></ul></article>
        <article class="ecmo-mode-card ecmo-mode-ff"><div class="ecmo-mode-card-head"><span>V-A<br>FF</span><div><strong>Veno-Arterial Femorofemoral</strong><small>Perfusión distal y síndrome de Arlequín</small></div></div><ul><li>Inspeccionar la cánula de reperfusión y comparar temperatura, coloración y pulsos pedios en ambos miembros; usar NIRS bilateral si está disponible.</li><li>La canulación femoral tiene riesgo elevado de isquemia del miembro.</li><li>Vigilar síndrome de Arlequín: monitorizar arteria radial derecha y pulsioximetría en MSD.</li></ul></article>
        <article class="ecmo-mode-card ecmo-mode-fa"><div class="ecmo-mode-card-head"><span>V-A<br>FA</span><div><strong>Veno-Arterial Femoroaxilar</strong><small>Miembros superiores y riesgo de hiperaflujo</small></div></div><ul><li>Vigilar pulsioximetría en MSI y presión arterial bilateral; la presión en MSD debe ser inferior a la de MSI.</li><li>Valorar el miembro superior derecho: riesgo de síndrome de hiperaflujo.</li></ul></article>
      </div>
    </section>
    <div class="ecmo-heading"><div><p class="ecmo-eyebrow" id="ecmo-eyebrow">EN CADA TURNO</p><h3 id="ecmo-panel-title" tabindex="-1"></h3><p id="ecmo-panel-intro"></p></div><span class="ecmo-count" id="ecmo-count"></span></div>
    <section class="ecmo-box-papers" id="ecmo-box-papers" aria-labelledby="ecmo-box-papers-title" hidden>
      <div class="ecmo-box-papers-heading"><span class="ecmo-print-symbol" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M6 8V3h12v5M6 17H3V8h18v9h-3"/><path d="M6 14h12v7H6z"/><circle cx="17.5" cy="10.5" r=".7" fill="currentColor" stroke="none"/></svg></span><div><small>DOCUMENTACIÓN</small><h4 id="ecmo-box-papers-title">Hojas de registro del turno</h4></div></div>
      <p>Checklist y hoja de parámetros ECMO: dos veces por turno y ante cambios.</p>
      <div class="ecmo-paper-grid">
        <a href="documentos/checklist-ecmo-para-imprimir.pdf" target="_blank" rel="noopener"><span class="ecmo-paper-tag">01 · CHECKLIST</span><b>Checklist ECMO</b><span>Revisión de cánulas, circuito, consola y material.</span><small>2 veces por turno</small><strong>Ver hoja ↗</strong></a>
        <a href="documentos/hoja-registro-parametros-ecmo.pdf" target="_blank" rel="noopener"><span class="ecmo-paper-tag">02 · REGISTRO ECMO</span><b>Registro de parámetros</b><span>Flujo, RPM, presiones, gases, anticoagulación y controles del paciente.</span><small>2 veces por turno y ante cambios</small><strong>Ver hoja ↗</strong></a>
      </div>
      <a class="ecmo-full-anticoag-link" href="documentos/protocolo-ecmo.pdf" target="_blank" rel="noopener">Protocolo ECMO completo ↗</a>
    </section>

    <section class="ecmo-transfer-video" id="ecmo-transfer-video" aria-labelledby="ecmo-transfer-video-title" hidden>
      <div class="ecmo-transfer-video-heading"><div><small>VÍDEO · TRASLADO</small><h4 id="ecmo-transfer-video-title">Procedimiento de traslado ECMO</h4></div><a href="https://drive.google.com/file/d/19Otm-bzQlQOjnPl7fsGJDa2SqV7FBp5l/view?usp=drive_link" target="_blank" rel="noopener">Abrir en Drive ↗</a></div>
      <div class="ecmo-transfer-video-frame"><iframe data-src="https://drive.google.com/file/d/19Otm-bzQlQOjnPl7fsGJDa2SqV7FBp5l/preview" title="Vídeo del procedimiento de traslado ECMO" loading="lazy" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe></div>
    </section>
    <div class="ecmo-cards" id="ecmo-cards"></div>
    <p class="ecmo-no-results" id="ecmo-no-results" hidden>No hay recordatorios con esa búsqueda. Prueba «cánula», «sangrado» o «control».</p>
    <details class="ecmo-sources"><summary>Documentos de referencia <span>Protocolos completos ↗</span></summary><div class="ecmo-docs" id="ecmo-docs"></div><p class="ecmo-source-note">El checklist preparado para imprimir corrige la fila repetida a «Medición cánula retorno (cm)». Los documentos originales se conservan sin cambios.</p></details>
    <div class="ecmo-foot"><span>UCI · Hospital Universitario Virgen Macarena</span><span>Cuidados y recursos de enfermería ECMO</span></div><button type="button" class="ecmo-quick-emergency" id="ecmo-quick-emergency" aria-label="Abrir emergencias ECMO"><span aria-hidden="true">!</span> Emergencias</button>`;
  const foot=document.querySelector('body > footer');
  if(foot)foot.before(root);else document.body.append(root);
  const dialog=document.createElement('dialog');dialog.id='ecmo-emergency-dialog';
  dialog.setAttribute('aria-labelledby','ecmo-emergency-title');
  dialog.innerHTML=`<div class="ecmo-dialog-head"><div><p class="ecmo-eyebrow">ACTUACIONES A PIE DE CAMA</p><h2 id="ecmo-emergency-title">Emergencias ECMO</h2></div><button type="button" id="ecmo-emergency-close" aria-label="Cerrar emergencias">×</button></div><p class="ecmo-dialog-intro">Pide ayuda. Selecciona el evento para ver las actuaciones y comprueba la consola antes de utilizar el respaldo.</p><div class="ecmo-emergency-links" id="ecmo-emergency-links"></div><div class="ecmo-dialog-equipment" id="ecmo-dialog-equipment"></div>`;
  document.body.append(dialog);
  const pafiDialog=document.createElement('dialog');pafiDialog.id='ecmo-pafi-dialog';
  pafiDialog.setAttribute('aria-labelledby','ecmo-pafi-title');
  pafiDialog.innerHTML=`<div class="ecmo-pafi-dialog-head"><div><p class="ecmo-eyebrow">HERRAMIENTA RÁPIDA</p><h2 id="ecmo-pafi-title">Calculadora PAFI</h2></div><button type="button" data-pafi-close aria-label="Cerrar calculadora">×</button></div><p class="ecmo-pafi-dialog-intro">Divide la PaO₂ entre la FiO₂ expresada como fracción.</p><form class="ecmo-pafi" data-pafi-calculator novalidate><div class="ecmo-pafi-heading"><b>PaO₂ ÷ (FiO₂ / 100)</b><small>Ejemplo: 90 mmHg y FiO₂ 50 % = PAFI 180</small></div><label>PaO₂ <span>mmHg</span><input type="number" min="0" step="1" inputmode="decimal" data-pafi-pao2 aria-label="PaO₂ en mmHg" placeholder="Ej. 90"></label><label>FiO₂ <span>%</span><input type="number" min="1" max="100" step="1" inputmode="decimal" data-pafi-fio2 aria-label="FiO₂ en porcentaje" placeholder="Ej. 50"></label><output class="ecmo-pafi-result" data-pafi-result aria-live="polite">PAFI —</output><p>Introduce FiO₂ como porcentaje: 50 equivale a 0,50.</p></form>`;
  document.body.append(pafiDialog);
  const hemofilterDialog=document.createElement('dialog');hemofilterDialog.id='ecmo-hemofilter-dialog';
  hemofilterDialog.setAttribute('aria-labelledby','ecmo-hemofilter-title');
  hemofilterDialog.innerHTML=`<div class="ecmo-hemofilter-dialog-head"><div><p class="ecmo-eyebrow">ESQUEMA DE APOYO</p><h2 id="ecmo-hemofilter-title">Conexión de hemofiltro</h2></div><button type="button" data-hemofilter-close aria-label="Cerrar esquema">×</button></div><p class="ecmo-hemofilter-dialog-intro">Entrada y retorno señalados en el circuito ECMO.</p><figure><img src="assets/hemofiltro-conexion.png" alt="Esquema de conexión del hemofiltro al sistema ECMO, con los puntos de entrada y retorno señalados."><figcaption>La imagen muestra los puntos de conexión de entrada y retorno.</figcaption></figure>`;
  document.body.append(hemofilterDialog);
  let selected='cuidados', selectedCard=null, activeModal=null;
  const tabs=[['cuidados','Cuidados','CUIDADOS DE ENFERMERÍA'],['maquinas','Máquinas','CONOCER LAS MÁQUINAS'],['incidencias','Incidencias','COMPLICACIONES DEL SISTEMA'],['traslado','Traslado','ANTES DE SALIR']];
  const escape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const normalize=s=>String(s).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/<[^>]*>/g,'');
  const sourceLink=(doc,page,label)=>`<a href="documentos/${docs[doc].file}#page=${page}" target="_blank" rel="noopener" aria-label="${escape(label||docs[doc].name)} · página ${page} · abrir PDF">${escape(label||'Ver en protocolo')} · p. ${page} ↗</a>`;
  const machinePhoto=card=>card.image?`<figure class="ecmo-machine-photo"><img src="${escape(card.image)}" alt="${escape(card.imageAlt||`Consola ${card.title}`)}" loading="lazy"></figure>`:'';
  const pafiCalculator=card=>card.calculator==='pafi'?`<button type="button" class="ecmo-pafi-link" data-pafi-open>Abrir calculadora PAFI ↗</button>`:'';
  const hemofilterDiagram=card=>card.hemofilterImage?`<button type="button" class="ecmo-hemofilter-link" data-hemofilter-open>Ver esquema de conexión ↗</button>`:'';
  const emergencyGroup=(title,steps,notes='')=>`<section class="ecmo-emergency-group"><h3>${title}</h3><ol>${steps.map(step=>`<li>${step}</li>`).join('')}</ol>${notes?`<p class="ecmo-emergency-note">${notes}</p>`:''}</section>`;
  const emergencyCard=(id,title,subtitle,content,page)=>`<details class="ecmo-emergency-card" id="ecmo-emergency-${id}" name="ecmo-event"><summary><span><b>${title}</b><small>${subtitle}</small></span><span class="ecmo-chevron" aria-hidden="true">+</span></summary><div class="ecmo-emergency-body">${content}<div class="ecmo-card-source">${sourceLink('general',page)}</div></div></details>`;
  const decannulation=emergencyGroup('Periférica · cánula de drenaje',[
    '<b>Pinzar inmediatamente la vía de retorno</b> para interrumpir el flujo sanguíneo y detener la entrada de aire.',
    '<b>Comprimir la zona</b> para detener el sangrado.',
    '<b>Parar la bomba.</b>',
    'Colocar al paciente en <b>antitrendelenburg</b>.',
    '<b>Pedir ayuda</b> para atender al paciente.',
    'Proporcionar soporte respiratorio en VV y soporte respiratorio y circulatorio en VA, con el equipo responsable.'
  ],'<b>No intentar una reintroducción ciega de la cánula.</b>')+emergencyGroup('Periférica · cánula de retorno',[
    '<b>Pinzar inmediatamente la vía de retorno</b> para detener la pérdida de sangre.',
    '<b>Comprimir la zona</b> para detener el sangrado.',
    '<b>Parar la bomba.</b>',
    '<b>Pedir ayuda</b> para atender al paciente.',
    'Proporcionar soporte respiratorio en VV y soporte respiratorio y circulatorio en VA, con el equipo responsable.',
    'Preparar la reposición de la pérdida de sangre y administrar los hemoderivados indicados.'
  ],'<b>No intentar una reintroducción ciega de la cánula.</b>')+emergencyGroup('Canulación central',[
    'Preparar el material para la <b>reesternotomía</b> y la atención por cirugía.'
  ]);
  const pumpFailure=emergencyGroup('Parada o incapacidad de mantener el flujo',[
    '<b>Clampar las líneas de drenaje y retorno.</b>',
    '<b>Poner las RPM a cero.</b>',
    'Con el equipo médico, preparar y administrar el aporte de volumen y el ajuste de vasoactivos prescritos.',
    'Comprobar si el problema es de alimentación, consola, acoplamiento del cabezal o presencia de aire/trombos.'
  ])+emergencyGroup('Actuar sobre la causa',[
    '<b>Corriente o batería agotada:</b> restablecer alimentación. Si no se recupera, utilizar bomba manual en Cardiohelp, motor de back-up en ECMOLife o consola y motor de reserva en Centrimag.',
    '<b>Fallo de consola:</b> pasar al respaldo del equipo seleccionado; los pasos se muestran debajo.',
    '<b>Cabezal desacoplado:</b> recolocarlo en el motor. Si persiste el fallo, preparar el cambio completo del circuito.',
    '<b>Trombosis o exceso de aire:</b> ante cambios del ruido de la bomba y fallo del sistema, pide ayuda y prepara el cambio completo del circuito.'
  ],'Antes de atribuir un flujo bajo a fallo de bomba, revisar también el acceso venoso y los acodamientos.');
  const circuitRupture=emergencyGroup('Localizar el tramo y preparar la reparación',[
    'Pide ayuda e identifica si la rotura o desconexión está <b>antes o después de la bomba</b>.',
    '<b>Si es antes de bomba:</b> actuar como embolia gaseosa.',
    '<b>Intenta aislar la fuga sin interrumpir el flujo sanguíneo</b>.',
    'Pide ayuda para la <b>sustitución del componente afectado</b>.',
    'Si no es posible sustituir ese componente, preparar el <b>recambio de todo el circuito</b>.'
  ]);
  dialog.querySelector('#ecmo-emergency-links').innerHTML=
    emergencyCard('bomba','Fallo de bomba','Actuación inicial y causas',pumpFailure,67)+
    emergencyCard('decanulacion','Decanulación','Drenaje · retorno · central',decannulation,65)+
    emergencyCard('rotura','Rotura o desconexión del circuito','Localización de la fuga y recambio',circuitRupture,66);
  const backups={
    cardiohelp:{title:'Cardiohelp · bomba manual',page:83,steps:[
      'Clampar las líneas de drenaje y retorno; reducir las RPM a cero con el mando rotatorio.',
      'Colocar la bomba manual en una posición cómoda.',
      'Apagar el calentador y retirar las mangueras del oxigenador retrayendo el cabezal de los conectores.',
      'Abrir la barra de seguridad y desconectar el cabezal venoso de sensores; colocarlo en la conexión de la barra. <b>Se trata del sensor, no de la línea sanguínea.</b>',
      'Desconectar el sensor de presiones internas del oxigenador y sujetarlo en la conexión de la consola.',
      'Presionar el botón inferior, girar ligeramente el módulo del oxigenador a la derecha y retirarlo de la consola.',
      'Anclar el módulo en la bomba manual: primero arriba y después abajo, presionando el botón de fijación.',
      'Retirar las pinzas <b>primero de drenaje y después de retorno</b>; reiniciar el flujo mediante la manivela y adecuar el giro a las RPM previas al fallo.'
    ]},
    centrimag:{title:'Centrimag · consola y motor de reserva',page:90,steps:[
      'Cambiar conjuntamente consola, motor, sonda de flujo y cables; reparar el sistema averiado después de establecer el soporte de reserva.',
      'Pinzar el tubo de retorno a la vez que se reducen las RPM hasta cero; después, apagar la consola principal.',
      'Aflojar el tornillo de fijación, retirar la bomba sanguínea del motor principal y colocarla en el motor de reserva.',
      'Retirar la sonda de flujo principal de la línea de retorno y conectar la de reserva.',
      'Reiniciar aumentando gradualmente las RPM mientras se libera la pinza de salida, hasta recuperar el caudal previo.',
      'Restablecer las opciones y alarmas que tenía la consola principal.'
    ]},
    ecmolife:{title:'ECMOLife · motor de back-up',page:93,steps:[
      'Ante parada de bomba, <b>clampar ambas líneas</b>.',
      'Encender el motor de back-up. Utilizar los botones de la zona gris oscura; el mando rotatorio no funciona en este modo.',
      'Conectar el sensor de flujo del back-up en la línea de retorno.',
      'Poner las RPM del motor principal a cero. Girar el anillo y extraer la centrífuga, venciendo la atracción del imán.',
      'Acoplar la centrífuga al motor de back-up y girar para fijarla; sujetarla por arriba para evitar atrapamiento de los dedos.',
      'Pulsa START en la pantalla de back-up y fija al menos 1500 RPM antes de desclampar.',
      'Desclampar <b>primero la línea de drenaje y después la de retorno</b>; subir las RPM hasta el nivel previo.',
      'Comprueba la recuperación del flujo y usa el botón circular para reconocer las alarmas generadas durante el cambio.'
    ]}
  };
  const backupSteps=backup=>`<ol class="ecmo-backup-steps">${backup.steps.map(step=>`<li>${step}</li>`).join('')}</ol>`;
  const backupCards=()=>Object.values(backups).map(backup=>`<details class="ecmo-backup-card"><summary>${backup.title}<span class="ecmo-chevron" aria-hidden="true">+</span></summary>${backupSteps(backup)}<div class="ecmo-card-source">${sourceLink('general',backup.page)}</div></details>`).join('');
  const machineBackupKeys={cardiohelp:'cardiohelp',centrimag:'centrimag',ecmolife:'ecmolife'};
  const machineBackups=card=>{
    const backup=backups[machineBackupKeys[card.id]];
    return backup?`<details class="ecmo-machine-backups"><summary><span><b>Respaldo de emergencia</b><small>${escape(backup.title)}</small></span><span class="ecmo-chevron" aria-hidden="true">+</span></summary><div class="ecmo-machine-backup-body">${backupSteps(backup)}<div class="ecmo-card-source">${sourceLink('general',backup.page)}</div></div></details>`:'';
  };
  root.querySelector('.ecmo-nav').innerHTML=tabs.map(([id,label])=>`<button type="button" data-ecmo-panel="${id}" aria-pressed="${id===selected}" aria-controls="ecmo-cards">${label}</button>`).join('');
  root.querySelector('#ecmo-docs').innerHTML=Object.entries(docs).map(([id,d])=>`<a href="documentos/${d.file}" target="_blank" rel="noopener"><span class="ecmo-pdf-icon" aria-hidden="true">PDF</span><span><b>${d.name}</b><small>${d.version}</small></span><span aria-hidden="true">↗</span></a>`).join('');

  function equipment(){
    dialog.querySelector('#ecmo-dialog-equipment').innerHTML=`<b>RESPALDO POR MÁQUINA</b><p>Antes de actuar, identificar la consola.</p>${backupCards()}`;
  }
  function render(){
    const q=normalize(root.querySelector('#ecmo-search').value.trim());
    const panel=window.ECMO_PANELS.find(p=>p.id===selected);
    const cards=q?window.ECMO_PANELS.flatMap(p=>p.cards.map(c=>({...c,panel:p.title}))):selected==='incidencias'?[...panel.cards].sort((a,b)=>(a.id==='tabla-presiones'?-1:0)-(b.id==='tabla-presiones'?-1:0)):panel.cards;
    const shown=cards.filter(c=>!q||q.split(/\s+/).every(t=>normalize(c.title+' '+c.subtitle+' '+c.items.join(' ')+' '+(c.panel||'')).includes(t)));
    root.querySelector('#ecmo-panel-title').textContent=q?'Resultados de búsqueda':panel.title;
    root.querySelector('#ecmo-panel-intro').textContent=q?'Búsqueda en todos los apartados de ECMO.':panel.intro;
    root.querySelector('#ecmo-eyebrow').textContent=q?'CONSULTA RÁPIDA':tabs.find(t=>t[0]===selected)[2];
    root.querySelector('#ecmo-count').textContent=shown.length+' '+(q?'resultado'+(shown.length===1?'':'s'):'recordatorios');
    root.querySelector('#ecmo-count').setAttribute('role','status');
    root.querySelector('#ecmo-count').setAttribute('aria-live','polite');
    root.querySelector('#ecmo-clear').hidden=!q;
    root.querySelector('#ecmo-mode-note').hidden=selected!=='cuidados'||!!q;
    root.querySelector('#ecmo-box-papers').hidden=selected!=='cuidados'||!!q;
    root.querySelector('#ecmo-transfer-video').hidden=selected!=='traslado'||!!q;
    root.querySelector('#ecmo-no-results').hidden=shown.length>0;
    root.querySelector('#ecmo-cards').innerHTML=shown.map((c,i)=>`<details class="ecmo-card" id="ecmo-card-${c.id}" ${q||c.id==='tabla-presiones'||(selected!=='incidencias'&&i<2)?'open':''}><summary><span class="ecmo-card-index" aria-hidden="true">${String(i+1).padStart(2,'0')}</span><span class="ecmo-card-copy"><small>${escape(q?c.panel:c.tag)}</small><b>${escape(c.title)}</b><span>${escape(c.subtitle)}</span></span><span class="ecmo-chevron" aria-hidden="true">+</span></summary><div class="ecmo-card-body">${machinePhoto(c)}<ul>${c.items.map(item=>`<li>${item}</li>`).join('')}</ul>${machineBackups(c)}${pafiCalculator(c)}${hemofilterDiagram(c)}${c.table?`<div class="ecmo-pressure-table-wrap"><table class="ecmo-pressure-table"><thead><tr>${c.table.headers.map(h=>`<th scope="col">${escape(h)}</th>`).join('')}</tr></thead><tbody>${c.table.rows.map(row=>`<tr>${row.map((cell,j)=>{const classes=[j===4?'ecmo-pressure-diagnosis':'',cell==='↑'?'ecmo-pressure-up':'',cell==='↓'?'ecmo-pressure-down':''].filter(Boolean).join(' ');const label=j===4?'':` data-pressure="${escape(c.table.headers[j])}"`;return `<td${classes?` class="${classes}"`:''}${label}>${j===4?cell:escape(cell)}</td>`}).join('')}</tr>`).join('')}</tbody></table></div>`:''}<div class="ecmo-card-source">${sourceLink(c.doc,c.page)}</div></div></details>`).join('');
    root.querySelectorAll('[data-ecmo-panel]').forEach(b=>b.setAttribute('aria-pressed',!q&&b.dataset.ecmoPanel===selected?'true':'false'));
    equipment();
    syncTransferVideo();
  }
  root.addEventListener('click',event=>{
    const pafiOpen=event.target.closest('[data-pafi-open]');
    if(pafiOpen){window.showECMO(selected,pafiOpen.closest('.ecmo-card').id.slice(10),'pafi');return;}
    const hemofilterOpen=event.target.closest('[data-hemofilter-open]');
    if(hemofilterOpen){window.showECMO(selected,hemofilterOpen.closest('.ecmo-card').id.slice(10),'hemofiltro');return;}
    const tab=event.target.closest('[data-ecmo-panel]');
    if(tab)window.showECMO(tab.dataset.ecmoPanel);
  });
  pafiDialog.addEventListener('input',event=>{
    const calculator=event.target.closest?.('[data-pafi-calculator]');
    if(!calculator)return;
    const pao2=Number(calculator.querySelector('[data-pafi-pao2]').value);
    const fio2=Number(calculator.querySelector('[data-pafi-fio2]').value);
    const result=calculator.querySelector('[data-pafi-result]');
    result.textContent=pao2>0&&fio2>0&&fio2<=100?`PAFI ${Math.round(pao2/(fio2/100))}`:'PAFI —';
  });
  pafiDialog.addEventListener('submit',event=>{if(event.target.matches('[data-pafi-calculator]'))event.preventDefault();});
  root.querySelector('#ecmo-search').addEventListener('input',render);
  root.querySelector('#ecmo-clear').addEventListener('click',()=>{root.querySelector('#ecmo-search').value='';render();root.querySelector('#ecmo-search').focus();});
  const dialogs={emergencias:dialog,pafi:pafiDialog,hemofiltro:hemofilterDialog};
  const transferPlayer=root.querySelector('#ecmo-transfer-video iframe');
  function syncTransferVideo(){
    const visible=root.style.display==='block'&&!root.querySelector('#ecmo-transfer-video').hidden;
    if(visible){
      if(!transferPlayer.hasAttribute('src'))transferPlayer.src=transferPlayer.dataset.src;
    }else if(transferPlayer.hasAttribute('src'))transferPlayer.removeAttribute('src');
  }
  function applyModal(name){
    activeModal=Object.prototype.hasOwnProperty.call(dialogs,name)?name:null;
    Object.entries(dialogs).forEach(([key,element])=>{
      if(key!==activeModal&&element.open)element.close();
    });
    if(activeModal){
      const element=dialogs[activeModal];
      if(!element.open){
        element.showModal();
        if(activeModal==='pafi')element.querySelector('[data-pafi-pao2]').focus();
      }
    }
  }
  function closeModal(){
    const view=window.history.state&&window.history.state.uciHuVmView;
    if(view&&view.view==='ecmo'&&view.modal){window.history.back();return;}
    applyModal(null);
  }
  root.querySelector('#ecmo-emergency-open').addEventListener('click',()=>window.showECMO(selected,selectedCard,'emergencias'));
  root.querySelector('#ecmo-quick-emergency').addEventListener('click',()=>window.showECMO(selected,selectedCard,'emergencias'));
  dialog.querySelector('#ecmo-emergency-close').addEventListener('click',closeModal);
  pafiDialog.querySelector('[data-pafi-close]').addEventListener('click',closeModal);
  hemofilterDialog.querySelector('[data-hemofilter-close]').addEventListener('click',closeModal);
  Object.values(dialogs).forEach(element=>{
    element.addEventListener('cancel',event=>{event.preventDefault();closeModal();});
    element.addEventListener('click',event=>{
      if(event.target!==element)return;
      const box=element.getBoundingClientRect();
      if(event.clientX<box.left||event.clientX>box.right||event.clientY<box.top||event.clientY>box.bottom)closeModal();
    });
  });
  window.addEventListener('uci-view-change',event=>{
    if(event.detail&&event.detail.view!=='ecmo'){
      root.style.display='none';applyModal(null);syncTransferVideo();
    }
  });
  window.getECMOViewState=()=>({panel:selected,cardId:selectedCard,modal:activeModal});
  window.showECMO=function(panel,cardId,modal){
    const nextPanel=window.ECMO_PANELS.find(item=>item.id===panel)||window.ECMO_PANELS[0];
    const nextCard=nextPanel.cards.some(card=>card.id===cardId)?cardId:null;
    const alreadyVisible=root.style.display==='block';
    const redraw=!alreadyVisible||selected!==nextPanel.id||selectedCard!==nextCard
      ||(!modal&&root.querySelector('#ecmo-search').value);
    selected=nextPanel.id;selectedCard=nextCard;
    if(redraw){root.querySelector('#ecmo-search').value='';render();}
    document.querySelectorAll('body > main').forEach(main=>main.style.display='none');
    root.style.display='block';document.body.classList.remove('v35-drug-list');
    const card=selectedCard&&document.getElementById('ecmo-card-'+selectedCard);
    if(card)card.open=true;
    applyModal(modal);syncTransferVideo();
    if(!activeModal){
      if(card){card.scrollIntoView({block:'center'});card.querySelector('summary').focus({preventScroll:true});}
      else window.scrollTo(0,0);
    }
  };
  window.openECMOCard=(panel,id)=>window.showECMO(panel,id);
  render();
})();





