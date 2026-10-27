window.ECMO_PANELS=[
  {
    "id": "cuidados",
    "title": "Cuidados de enfermería",
    "intro": "Registros y cuidados del paciente con ECMO",
    "cards": [
      {
        "id": "neurologico",
        "title": "Vigilancia neurológica estricta",
        "subtitle": "Sedoanalgesia · relajación · neuromonitorización",
        "tag": "NEUROLÓGICO",
        "items": [
          "Vigilar dolor, agitación y asincronía con el respirador.",
          "Si la situación lo permite, preparar y aprovechar la ventana diaria de sedación acordada por el equipo para valorar al paciente.",
          "Registrar tamaño y reactividad pupilar, RASS, respuesta a estímulos y dolor; hacerlo cada hora si hay sangrado o anticoagulación fuera de rango, y anotar BIS y NIRS cuando estén disponibles.",
          "Avisar de inmediato ante anisocoria, pupilas no reactivas, cambio neurológico nuevo o descenso brusco de la respuesta."
        ],
        "doc": "general",
        "page": 49
      },
      {
        "id": "movilizacion-piel",
        "title": "Movilización, baño y piel",
        "subtitle": "Higiene y cambios posturales sin riesgo",
        "tag": "MOVILIZACIÓN · PIEL",
        "items": [
          "Planificar el baño y el cambio de ropa de cama cuando haya personal suficiente, preferentemente en turno de mañana.",
          "Antes y después de mover, revisar fijación de cánulas, ausencia de acodamientos, holgura de las líneas y valores habituales de flujo y presiones; asignar una persona a inmovilizar las cánulas, otra a controlar movilización y consola, y otra a vigilar tubos y conexiones.",
          "Aplicar ácidos grasos hiperoxigenados y proteger con hidrocoloide las zonas de riesgo; mantener talones elevados y dar cambios posturales si no hay riesgo de decanulación, problemas de flujo o canalización central.",
          "Movilizar en bandeja (grúa); si no es posible, hacerlo en bloque hacia el lado no canulado. Con esternón abierto, no realizar estas movilizaciones.",
          "Mantener cabecero a 30° o antitrendelenburg si no se tolera; evitar hiperextensión y equinismo, y elevar ligeramente el miembro canulado si presenta edema.",
          "Realizar higiene ocular y bucal y cambiar los puntos de apoyo del tubo orotraqueal y de la sonda nasogástrica; buscar hematomas o sangrado y evitar maniobras traumáticas."
        ],
        "doc": "general",
        "page": 51
      },
      {
        "id": "canulas-perfusion",
        "title": "Cánulas y perfusión de miembros",
        "subtitle": "Fijación, sangrado local y perfusión distal",
        "tag": "CÁNULAS · PERFUSIÓN",
        "items": [
          "En cada turno, revisar fijación, orificio de entrada, apósito, sangrado y trayecto visible; medir y registrar por separado la longitud externa de drenaje y retorno.",
          "En canulación periférica, realizar la cura con bata, guantes estériles, mascarilla y gorro; usar apósito transparente, preferiblemente con clorhexidina. En canulación central, la cura la realiza el cirujano. Si sangra la inserción, aplicar apósito hemostático, comunicarlo y no retirar costras ni coágulos.",
          "Fijar cada línea de forma independiente con al menos dos Grip-Lock por línea, por encima de la rodilla; proteger puntos de apoyo con espuma y mantener las cánulas sujetas a la cama, sin ropa u objetos que oculten el trayecto.",
          "Comparar color, temperatura, edema, relleno capilar y pulsos de ambos miembros; con cánula arterial femoral, vigilar también la reperfusión distal y NIRS bilateral si está disponible.",
          "En canulación axilar, vigilar el brazo canulado por hiperperfusión o isquemia; en ECMO VA con retorno femoral, comparar saturación de mano y pie. Ante miembro frío, cianótico, sin pulso o con empeoramiento brusco, comprobar la permeabilidad visible de la cánula distal si existe y avisar de inmediato."
        ],
        "doc": "general",
        "page": 54
      },
      {
        "id": "complicaciones-vigilancia",
        "title": "Fiebre y sangrado",
        "subtitle": "Fiebre, infección, sangrado y hemólisis",
        "tag": "COMPLICACIONES",
        "items": [
          "El objetivo de temperatura es 37 °C. Registrar la del paciente y la del módulo, teniendo en cuenta que el intercambiador puede enmascarar la curva térmica.",
          "Una fiebre persistente no se corrige con el módulo de normotermia; apagarlo, comunicarlo al equipo y preparar hemocultivos, urocultivo y aspirado bronquial solicitados.",
          "Durante la cura, registrar enrojecimiento, exudado o cualquier cambio local en las inserciones.",
          "Revisar inserciones, catéteres, heridas, drenajes, boca, tubo orotraqueal, contenido gástrico, heces y orina; cuantificar y comunicar cualquier aumento, sangrado activo o alteración de la coagulación.",
          "Hacer Labstix de orina cada 12 h y observar su color como vigilancia de hemólisis; minimizar punciones y proteger mucosas durante aspiración, higiene oral, sondas y catéteres.",
          "Controlar los drenajes y mantenerlos permeables según el procedimiento de la unidad; comprobar a diario con Banco de Sangre la reserva de al menos dos concentrados de hematíes y los hemoderivados necesarios."
        ],
        "doc": "general",
        "page": 56
      },
      {
        "id": "familia",
        "title": "Soporte emocional a la familia",
        "subtitle": "Información clara y presencia disponible",
        "tag": "FAMILIA",
        "items": [
          "Ofrecer una actitud abierta y tranquila, explicar qué se está haciendo con un lenguaje comprensible y mantener mensajes coherentes entre profesionales.",
          "Facilitar que la familia comunique dudas y preocupaciones, trasladándolas al profesional responsable cuando sea necesario."
        ],
        "doc": "general",
        "page": 56
      }
    ]
  },
  {
    "id": "maquinas",
    "title": "Máquinas y respaldo",
    "intro": "Distintas máquinas ECMO disponibles en la unidad",
    "cards": [
      {
        "id": "cardiohelp",
        "title": "Cardiohelp",
        "subtitle": "Bomba y oxigenador integrados",
        "tag": "CARDIOHELP",
        "image": "assets/maquina-cardiohelp-sin-fondo.png",
        "imageAlt": "Consola Cardiohelp",
        "items": [
          "La bomba centrífuga forma parte del oxigenador.",
          "Dispone de sensor de presiones internas del circuito; las presiones disponibles dependen de la configuración.",
          "Un único sensor mide flujo y detecta burbujas; se coloca en la línea arterial con la flecha orientada hacia el paciente.",
          "El cabezal medidor venoso aporta SvO₂, Hb, Hct y temperatura.",
          "El sistema de respaldo es un rotor manual."
        ],
        "doc": "general",
        "page": 18
      },
      {
        "id": "ecmolife",
        "title": "ECMOLife",
        "subtitle": "Bomba, oxigenador y sensores separados",
        "tag": "ECMOLIFE",
        "image": "assets/maquina-ecmolife.png",
        "imageAlt": "Consola ECMOLife",
        "items": [
          "Bomba y oxigenador son componentes separados; la consola incorpora el controlador del motor.",
          "Puede monitorizar caudal, presión, temperatura, SvO₂ y Hb.",
          "El sensor de flujo y el detector de burbujas son elementos independientes y están situados por separado en el circuito.",
          "Dispone de motor principal y motor de back-up. En el respaldo se manejan los botones de la zona gris oscura; el mando rotatorio no funciona en este modo.",
          "El material de respaldo incluye el sensor de flujo y cables de reserva junto al motor de back-up."
        ],
        "doc": "general",
        "page": 21
      },
      {
        "id": "centrimag",
        "title": "Centrimag",
        "subtitle": "Consola, motor y oxigenador separados",
        "tag": "CENTRIMAG",
        "image": "assets/maquina-centrimag.png",
        "imageAlt": "Consola Centrimag con monitor",
        "items": [
          "La consola principal controla el motor; el monitor grande muestra los datos y ofrece una vía alternativa de control.",
          "El sistema mide flujo y puede monitorizar hasta dos presiones si se han instalado las cápsulas correspondientes.",
          "El sensor de flujo mide caudal, pero no detecta burbujas ni aire.",
          "La consola, el motor, la sonda de flujo y los cables son elementos separados del sistema de respaldo.",
          "Una vez que se produce una alarma, el sonido no cesa al resolver el problema: aceptarla pulsando el botón «Silencio Alarma»."
        ],
        "doc": "general",
        "page": 22
      },

      {
        "id": "conexion-hemofiltro",
        "title": "Conexión de hemofiltro (TCRR)",
        "subtitle": "Conexiones en zonas de presión positiva",
        "tag": "TCRR",
        "hemofilterImage": "assets/hemofiltro-conexion.png",
        "hemofilterImageAlt": "Esquema de conexión del hemofiltro al sistema ECMO, con los puntos de entrada y retorno señalados.",
        "items": [
          "Conectar la TCRR en zonas del circuito con presión positiva; evitar la zona negativa por el riesgo de entrada de aire.",
          "Conectar la entrada de la TCRR en la línea arterial de retorno al paciente.",
          "Conectar el retorno de la TCRR entre la centrífuga y el oxigenador, que actúa como atrapaburbujas o filtro para coágulos.",
          "La presión de entrada de la TCRR puede generar alarmas por ser positiva; girar levemente la llave de tres pasos del latiguillo de entrada."
        ],
        "doc": "general",
        "page": 68
      }
    ]
  },
  {
    "id": "incidencias",
    "title": "Incidencias del sistema",
    "intro": "Complicaciones relacionadas con el sistema ECMO.",
    "cards": [
      {
        "id": "fallo-oxigenador",
        "title": "Fallo del oxigenador",
        "subtitle": "Hipoxia progresiva · gradiente transmembrana",
        "tag": "OXIGENADOR",
        "items": [
          "Sospecharlo ante descenso progresivo de la PaO₂/FiO₂ del ECMO hasta valores < 150.",
          "La formación de trombos se detecta mediante el gradiente transmembrana, diferencia de presiones antes y después del oxigenador.",
          "La presencia de trombos o fibrina no implica peligro mientras la PaO₂/FiO₂ sea > 150.",
          "La disfunción suele ser gradual y se resuelve reemplazando el oxigenador."
        ],
        "calculator": "pafi",
        "doc": "general",
        "page": 63
      },
      {
        "id": "pitido-mezclador",
        "title": "Pitido del mezclador de gases",
        "subtitle": "Conexiones y suministro de gas",
        "tag": "GASES",
        "items": [
          "Comprobar la colocación de las conexiones de aire y oxígeno.",
          "Si no hay suministro de gases, cambiar las conexiones a las balas de repuesto correspondientes.",
          "Comprobar que las balas estén llenas y prever repuestos."
        ],
        "doc": "general",
        "page": 63
      },
      {
        "id": "salida-liquido-oxigenador",
        "title": "Salida de líquido por el oxigenador",
        "subtitle": "Distinguir condensación de plasma o sangre",
        "tag": "OXIGENADOR",
        "items": [
          "Las gotas de vapor de agua por la salida de CO₂ corresponden a condensación.",
          "Si sale plasma, como espuma amarillenta, o sangre, sospechar rotura de la membrana y avisar para sustituir el sistema.",
          "Comprobar con tira reactiva si es plasma y DA+ en proteínas."
        ],
        "doc": "general",
        "page": 63
      },
      {
        "id": "trombos-circuito",
        "title": "Trombos en el circuito",
        "subtitle": "Inspección y localización",
        "tag": "CIRCUITO",
        "items": [
          "Pueden aparecer con anticoagulación insuficiente o tras recibir hemoderivados.",
          "Algunos se visualizan durante la inspección del circuito; son más peligrosos en la línea de retorno y en ECMO VA.",
          "Según su localización, se valorará el recambio de la zona afectada o del sistema completo."
        ],
        "doc": "general",
        "page": 64
      },
      {
        "id": "tabla-presiones",
        "title": "Alteraciones en las presiones",
        "subtitle": "Cambios respecto a los valores habituales",
        "tag": "PRESIONES",
        "items": [
          "Avisar al médico si se producen cambios en las presiones."
        ],
        "table": {
          "headers": [
            "P1",
            "P2",
            "P3",
            "ΔP",
            "Orientación"
          ],
          "rows": [
            [
              "↑",
              "↓",
              "↓",
              "↓",
              "<b>Resistencia a la aspiración:</b> hipovolemia, taponamiento, hemotórax, neumotórax o cánula/línea venosa acodada u obstruida."
            ],
            [
              "↓",
              "↓",
              "↓",
              "↓",
              "<b>Fallo de bomba:</b> problema mecánico (motor, cable…) o trombo en la bomba impulsora."
            ],
            [
              "↓",
              "↑",
              "↓",
              "↑",
              "<b>Fallo del oxigenador:</b> trombo o fibrina intraoxigenador."
            ],
            [
              "↓",
              "↑",
              "↑",
              "↓",
              "<b>Obstáculo a la entrada arterial:</b> paciente semisentado o cánula/línea arterial acodada u obstruida."
            ]
          ]
        },
        "doc": "general",
        "page": 64
      },
      {
        "id": "decanulacion",
        "title": "Decanulación",
        "subtitle": "Canulación periférica y central",
        "tag": "CÁNULAS",
        "items": [
          "Si se decanula la cánula de drenaje, existe riesgo de entrada masiva de aire en el circuito. Pinzar inmediatamente la vía de retorno, comprimir la zona y parar la bomba. Colocar al paciente en antitrendelenburg si se sospecha que ha entrado aire por la cánula de retorno.",
          "Si se decanula la cánula de retorno, existe riesgo de pérdida rápida de sangre. Pinzar inmediatamente la vía de retorno, comprimir la zona y parar la bomba.",
          "Pedir ayuda y proporcionar soporte respiratorio o cardíaco según la configuración. No intentar una reintroducción ciega.",
          "En canulación central, preparar el material para la reesternotomía."
        ],
        "doc": "general",
        "page": 65
      },
      {
        "id": "rotura-circuito",
        "title": "Rotura del circuito",
        "subtitle": "Corte, perforación o desconexión",
        "tag": "CIRCUITO",
        "items": [
          "Si ocurre antes de la bomba, actuar como embolia gaseosa.",
          "Intentar aislar la fuga sin interrumpir el flujo de sangre.",
          "Reemplazar el componente afectado; si no es posible, reemplazar todo el circuito."
        ],
        "doc": "general",
        "page": 66
      },
      {
        "id": "fallo-bomba",
        "title": "Fallo de bomba",
        "subtitle": "Ausencia de flujo objetivo",
        "tag": "BOMBA",
        "items": [
          "Descartar problemas de acceso venoso.",
          "Primera actuación: clampar el circuito, poner las revoluciones a cero, garantizar la volemia y aumentar las drogas vasoactivas.",
          "Ante problema de corriente, batería agotada o mal funcionamiento de la consola: reanudar el suministro y usar bombeo manual en Cardiohelp o consola de reserva en Centrimag o ECMOLife.",
          "Si se desacopla el cabezal, recolocarlo en el motor; si persiste el problema, cambiar todo el circuito.",
          "Ante trombosis o exceso de aire, se aprecian cambios en la intensidad o el tono del ruido habitual de la bomba; requiere cambio completo del circuito."
        ],
        "doc": "general",
        "page": 67
      }
    ]
  },
  {
    "id": "traslado",
    "title": "Traslado",
    "intro": "Procedimiento de traslado del paciente con ECMO",
    "cards": [
      {
        "id": "traslado-organizacion",
        "title": "Planificar antes de salir",
        "subtitle": "Destino · personal · paciente · material",
        "tag": "1 · PLANIFICACIÓN",
        "items": [
          "Confirmar que el destino está preparado y acordar el personal que acompaña al paciente.",
          "Revisar medicación y perfusiones que se mantienen; preparar la medicación de rescate indicada.",
          "Si el paciente tiene TCRR, desconectarla y dejar su circuito recirculando durante el traslado.",
          "Preparar el material: cuatro clamps, una bala de O₂ para ECMO, otra para el respirador, cable de corriente."
        ],
        "doc": "general",
        "page": 72
      },
      {
        "id": "traslado-salida",
        "title": "Al salir",
        "subtitle": "Desconexión ordenada del box",
        "tag": "2 · AL SALIR",
        "items": [
          "1. Apagar el intercambiador de calor y desconectar las aguas.",
          "2. Desconectar la toma de O₂ del mezclador de gases y conectarla a una bala de oxígeno tras comprobar su capacidad y funcionamiento. Abrir la bala a los mismos L/min a los que estaba el mezclador de gases.",
          "3. Desconectar el cable de suministro eléctrico y comprobar el estado de las baterías.",
          "4. Colocar la consola a los pies de la cama del paciente, vigilando que no existan acodamientos en las líneas."
        ],
        "doc": "general",
        "page": 73
      },
      {
        "id": "traslado-llegada",
        "title": "Al llegar",
        "subtitle": "Reconexión en orden inverso",
        "tag": "3 · AL LLEGAR",
        "items": [
          "1. Colocar la consola en su carro, junto a la cama, sin acodamientos ni tracciones de las líneas.",
          "2. Reconectar el cable de suministro eléctrico.",
          "3. Cerrar la bala de oxígeno, reconectar la toma al mezclador de gases y restablecer los mismos L/min.",
          "4. Reconectar las aguas y encender el intercambiador de calor."
        ],
        "doc": "general",
        "page": 73
      }
    ]
  }
];






