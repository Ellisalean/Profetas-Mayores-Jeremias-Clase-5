
import { Lesson } from '../types';

export const COUNSELING_LESSON: Lesson = {
  id: "jeremiah-module-final",
  title: "Jeremías: El Profeta del Castigo",
  subtitle: "Vida, Ministerio y Lamentaciones (Capítulos 26–52)",
  totalSlides: 11,
  duration: "45 min",
  objectives: [
    "Analizar el conflicto entre el mensaje de Dios y los líderes religiosos en el Templo.",
    "Comprender la soberanía de Dios a través de la supremacía de Babilonia.",
    "Explorar el 'Nuevo Pacto' y la fe costosa de Jeremías en Anatot.",
    "Identificar las consecuencias de la desobediencia y la estructura de Lamentaciones."
  ],
  slides: [
    {
      id: "slide-1",
      type: "intro",
      title: "Jeremías",
      subtitle: "El Mensajero de la Restauración en la Medianoche",
      visual: {
        type: "image",
        source: "https://cdn.myportfolio.com/d435fa58-d32c-4141-8a15-0f2bfccdea41/9da6049a-18ee-409d-a686-4c2aa29fe421_rw_1920.jpg?h=47680d8008aaa7ee63c00d56b1ef1cd0",
        position: "background",
        effect: "overlay-dark"
      },
      content: "Acompaña al profeta en los días más oscuros de Judá. Una historia de traición, juicios, yugos de hierro, pero sobre todo, de una esperanza inquebrantable en el Nuevo Pacto."
    },
    {
      id: "slide-2",
      type: "hermeneutics",
      title: "Conflicto en el Templo",
      visual: {
        type: "image",
        source: "https://cdn.myportfolio.com/d435fa58-d32c-4141-8a15-0f2bfccdea41/b23ef45a-2755-4c60-bd9c-a22a01512899_rw_1920.jpg?h=7f3d1550dbb460b47d98322394a01a6d",
        position: "left"
      },
      content: "Si no os volviereis de vuestros malos caminos, el templo de Jerusalén sufrirá la misma suerte que Silo.",
      interaction: {
        type: "click-reveal",
        revealItems: [
          {
            title: "La Advertencia de Silo",
            text: "Dios ordena advertir que el Templo será como Silo si no hay arrepentimiento.",
            icon: "AlertTriangle",
            longContent: "En el 608 a.C., Jeremías advirtió que Jerusalén sería destruida. La arqueología confirma que Silo fue destruida por incendio en el siglo XI a.C., validando la referencia del profeta. Los sacerdotes consideraron esto traición."
          },
          {
            title: "El Juicio del Profeta",
            text: "Los sacerdotes piden la muerte; los príncipes declaran su inocencia.",
            icon: "Scale",
            longContent: "Los sacerdotes y falsos profetas pidieron la pena de muerte. La defensa de Jeremías fue: 'Dios me envió'. Sorprendentemente, los príncipes y el pueblo rechazaron la acusación, salvando su vida en esa ocasión (Cap. 26)."
          }
        ]
      }
    },
    {
      id: "slide-3",
      type: "timeline",
      title: "La Supremacía de Babilonia",
      subtitle: "Sumisión vs. Falsa Esperanza (Cap. 27–29)",
      visual: {
        type: "image",
        source: "https://img.travesiasdigital.com/cdn-cgi/image/width=768,quality=90,format=auto,onerror=redirect/2019/07/babilonia-01.jpg",
        position: "background"
      },
      interaction: {
        type: "stepped-reveal",
        revealItems: [
          {
            title: "Yugos de Madera",
            text: "Jeremías usa yugos en su cuello para simbolizar la sumisión.",
            icon: "Link",
            image: "https://cdn.myportfolio.com/d435fa58-d32c-4141-8a15-0f2bfccdea41/7eebe11f-b32b-4f21-af95-65ba4e31c45f_rw_1920.jpg?h=b0995470f09c2ab68b0af38d9979d09d",
            longContent: "Dios ordenó enviar yugos a los reyes vecinos. El mensaje era claro: someterse a Nabucodonosor. Babilonia era la potencia escogida por Dios; la paz vendría solo por la sumisión."
          },
          {
            title: "Yugo de Hierro",
            text: "Hananías quiebra el yugo de madera, pero Dios pone uno de hierro.",
            icon: "ShieldAlert",
            image: "https://cdn.myportfolio.com/d435fa58-d32c-4141-8a15-0f2bfccdea41/eb3f7be8-cc6e-48ba-929a-73a8f8f6f323_rw_1920.jpg?h=5f55136c3a3683ff616abe38eda97dba",
            longContent: "El falso profeta Hananías predijo el fin de Babilonia en 2 años. Jeremías respondió que Dios pondría un yugo de hierro y predijo la muerte de Hananías, la cual ocurrió ese mismo año (Cap. 28)."
          },
          {
            title: "Carta a los Exiliados",
            text: "Establecerse en Babilonia por 70 años.",
            icon: "Mail",
            image: "https://cdn.myportfolio.com/d435fa58-d32c-4141-8a15-0f2bfccdea41/b729c3e0-5170-4215-a395-35627df1f786_rw_1920.jpg?h=fe2b86f2cc74be1aa7573738e14baa58",
            longContent: "Jeremías aconsejó a los cautivos edificar casas y plantar jardines. Predijo que el cautiverio duraría 70 años. Semaías intentó silenciarlo desde Babilonia, pero el plan de Dios persistió (Cap. 29)."
          }
        ]
      }
    },
    {
      id: "slide-4",
      type: "flashcards",
      title: "Alborada a Medianoche",
      subtitle: "Esperanza y Restauración (Cap. 30–33)",
      visual: {
        type: "image",
        source: "https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?q=80&w=2074&auto=format&fit=crop",
        position: "background"
      },
      interaction: {
        type: "flashcards",
        revealItems: [
          {
            title: "El Nuevo Pacto",
            text: "La ley escrita en el corazón (Jer. 31:31-34).",
            icon: "Heart",
            image: "https://www.bibliatodo.com/Reflexiones-Cristianas/wp-content/uploads/2024/09/Que-es-el-nuevo-pacto.jpg",
            longContent: "Una de las predicciones más significativas: la naturaleza espiritual del cristianismo. En lugar de tablas de piedra, la ley de Dios se grabaría en los corazones humanos."
          },
          {
            title: "Compra en Anatot",
            text: "La fe es costosa: comprar un campo bajo asedio (Jer. 32).",
            icon: "Key",
            image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2070&auto=format&fit=crop",
            longContent: "En la hora más oscura, Dios ordenó comprar un campo ocupado por el enemigo. Jeremías pagó el precio completo para demostrar su fe absoluta en que Judá regresaría a su tierra."
          },
          {
            title: "Los Recabitas",
            text: "Un ejemplo de fidelidad que avergonzó a Judá (Jer. 35).",
            icon: "ShieldCheck",
            image: "https://cvclavoz.com/wp-content/uploads/2023/07/No-te-basta-la-fidelidad-de-Dios-para-creer-en-El.jpg",
            longContent: "Los recabitas se negaron a beber vino por fidelidad a sus antepasados. Jeremías los usó como ejemplo para reprochar a Judá su falta de fidelidad a los convenios con Dios."
          }
        ]
      }
    },
    {
      id: "slide-5",
      type: "hotspot-reveal",
      title: "El Profeta en la Prisión",
      subtitle: "Traición, Cieno y Rescate (Cap. 37–38)",
      visual: {
        type: "map",
        source: "https://cdn.myportfolio.com/d435fa58-d32c-4141-8a15-0f2bfccdea41/824bca87-00f6-4352-8eb6-14c156dc58b2_rw_1920.jpg?h=a49d1eba921d09d5665b1b3e6fd7f5c0",
        position: "background"
      },
      interaction: {
        type: "hotspots",
        revealItems: [
          {
            title: "La Cisterna de Malquías",
            text: "Hundido en el cieno para morir de hambre.",
            x: 48, y: 65,
            icon: "Anchor",
            longContent: "Acusado de desmoralizar al ejército, Jeremías fue arrojado a una cisterna sin agua, solo con cieno. Sedequías, incapaz de resistir a sus príncipes, lo permitió."
          },
          {
            title: "Rescate de Ebed-melec",
            text: "La compasión de un sirviente etíope.",
            x: 52, y: 35,
            icon: "UserCheck",
            longContent: "Ebed-melec consiguió permiso del rey para salvarlo. Usó sogas y trapos viejos para que el agotado profeta no se lastimara mientras lo sacaban lentamente del lodo."
          },
          {
            title: "Puerta de Benjamín",
            text: "Arresto bajo falsa acusación de deserción.",
            x: 35, y: 45,
            icon: "Lock",
            longContent: "Durante una tregua, Jeremías intentó inspeccionar su campo en Anatot. Fue arrestado, golpeado y acusado injustamente de desertar a los caldeos."
          }
        ]
      }
    },
    {
      id: "slide-6",
      type: "stepped-overlay",
      title: "La Caída de Jerusalén",
      subtitle: "El Juicio Consumado (Cap. 39)",
      visual: {
        type: "image",
        source: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=2068&auto=format&fit=crop",
        position: "background"
      },
      interaction: {
        type: "stepped-reveal",
        revealItems: [
          {
            title: "Fin del Sitio",
            text: "Brecha en las murallas tras 18 meses de hambre.",
            icon: "Flame",
            image: "https://cdn.myportfolio.com/d435fa58-d32c-4141-8a15-0f2bfccdea41/89d54d7a-27bc-45a1-8f9d-38bbdcf9cb9d_rw_1920.jpg?h=57c489cf524bf9753b9f5eab8d82bc32",
            longContent: "En el año 11 de Sedequías (586 a.C.), Jerusalén cae. Su decisión de no rendirse como Dios aconsejó terminó en la destrucción total de la ciudad santa."
          },
          {
            title: "Tragedia de Sedequías",
            text: "Capturado, cegado y llevado en cadenas.",
            icon: "EyeOff",
            image: "https://cdn.myportfolio.com/d435fa58-d32c-4141-8a15-0f2bfccdea41/278e90e6-ea61-475a-a2e7-556c82fef8f0_rw_1920.jpg?h=656dc8b6ec2eee04f469f19cf292b656",
            longContent: "Sedequías vio morir a sus hijos antes de que le arrancaran los ojos. Fue llevado encadenado a Babilonia, pagando el precio de su voluntad débil e inestable."
          }
        ]
      }
    },
    {
      id: "slide-7",
      type: "info-menu-reveal",
      title: "Consecuencias y Desobediencia",
      subtitle: "Gedalías y la Huida a Egipto (Cap. 40–44)",
      visual: {
        type: "image",
        source: "https://images.unsplash.com/photo-1542361345-89e58247f2d5?q=80&w=2070&auto=format&fit=crop",
        position: "left"
      },
      interaction: {
        type: "menu-reveal",
        revealItems: [
          {
            title: "Gedalías",
            text: "El nuevo gobernador en Mizpa asesinado.",
            icon: "Briefcase",
            image: "https://cdn.myportfolio.com/d435fa58-d32c-4141-8a15-0f2bfccdea41/608c133e-733c-4afc-a23c-d78e361c3a76_rw_1920.jpg?h=925d8b265349f7c0b61853f0bcffcc2e",
            longContent: "Gedalías intentó pacificar la tierra, pero fue asesinado por Ismael por orden de Amón. Esto desató el pánico entre el remanente de Judá."
          },
          {
            title: "Huida a Egipto",
            text: "Desobediencia total del remanente judío.",
            icon: "FastForward",
            image: "https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?q=80&w=2070&auto=format&fit=crop",
            longContent: "A pesar de las órdenes divinas de quedarse en la tierra, el pueblo huyó a Egipto llevándose a Jeremías a la fuerza. Allí persistieron en la idolatría a la 'reina del cielo'."
          }
        ]
      }
    },
    {
      id: "slide-8",
      type: "tabs-reveal",
      title: "Naciones Extranjeras",
      subtitle: "Juicios de Alcance Global (Cap. 46–51)",
      visual: {
        type: "image",
        source: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=2074&auto=format&fit=crop",
        position: "background"
      },
      interaction: {
        type: "tabs-reveal",
        revealItems: [
          {
            title: "Egipto",
            text: "Derrota en Carquemis (605 a.C.).",
            icon: "History",
            image: "https://cdn.myportfolio.com/d435fa58-d32c-4141-8a15-0f2bfccdea41/32592f04-063a-4c7a-b54d-65fc5f6b9d4f_rw_1920.jpg?h=4b03e5d54181e26ecc74450a3fed8aa0",
            longContent: "Faraón Necao fue humillado junto al Éufrates. Nabucodonosor se consolidó como el poder dominante. Egipto cayó con orgullo abrumador."
          },
          {
            title: "Babilonia",
            text: "Hundimiento de la potencia perseguidora.",
            icon: "Anchor",
            image: "https://cdn.myportfolio.com/d435fa58-d32c-4141-8a15-0f2bfccdea41/16c43a0d-5f76-411a-9ec6-abb926bf5475_rw_1920.jpg?h=a6ee3588a532c51961d3821b5550a854",
            longContent: "Jeremías ordenó arrojar su profecía al río Éufrates como símbolo de que Babilonia se hundiría para nunca levantarse (Cap. 51). Arqueológicamente comprobado."
          }
        ]
      }
    },
    {
      id: "slide-9",
      type: "grid-cards",
      title: "Lamentaciones",
      subtitle: "Elegías y Esperanza en el Dolor",
      visual: {
        type: "image",
        source: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=2070&auto=format&fit=crop",
        position: "background"
      },
      interaction: {
        type: "grid-cards",
        revealItems: [
          {
            title: "Estructura Acróstica",
            text: "Poemas ordenados por el alfabeto hebreo.",
            icon: "FileText",
            longContent: "Los primeros 4 capítulos siguen un orden acróstico. Es una forma de expresar el dolor total y organizado; cada letra una etapa del lamento nacional."
          },
          {
            title: "Metro Qinah",
            text: "El ritmo melancólico de la muerte de Judá.",
            icon: "Music",
            longContent: "Usa un ritmo desigual para expresar profundo dolor. Otorga un tono melancólico que refleja la tristeza por la caída de Jerusalén."
          },
          {
            title: "Oración Final",
            text: "Un clamor ferviente por la restauración.",
            icon: "Sunrise",
            longContent: "El libro termina con una oración: 'Renueva nuestros días como al principio'. No es solo lamento, sino un clamor de esperanza en el cautiverio."
          }
        ]
      }
    },
    {
      id: "slide-10",
      type: "quiz",
      title: "Evaluación Final",
      visual: {
        type: "image",
        source: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop",
        position: "right"
      },
      interaction: {
        type: "multiple-choice",
        options: [
          {
            id: "q1",
            label: "¿Por qué Jeremías compró un campo en Anatot mientras la ciudad era sitiada?",
            options: [
              { id: "a1", label: "Para invertir su dinero ante la crisis.", isCorrect: false, feedback: "Incorrecto. Comprar tierra ocupada era una locura financiera." },
              { id: "a2", label: "Como evidencia de fe en el retorno del cautiverio.", isCorrect: true, feedback: "¡Correcto! Demostró su fe absoluta en la promesa de restauración pagando por propiedad enemiga." },
              { id: "a3", label: "Porque el rey Sedequías se lo obligó.", isCorrect: false, feedback: "Incorrecto. Fue una orden divina voluntaria." }
            ]
          },
          {
            id: "q2",
            label: "¿Quién rescató físicamente a Jeremías de la cisterna de cieno?",
            options: [
              { id: "b1", label: "El profeta Hananías.", isCorrect: false, feedback: "Incorrecto. Hananías fue el falso profeta que lo desafió." },
              { id: "b2", label: "Ebed-melec, un hombre etíope.", isCorrect: true, feedback: "¡Exacto! Este sirviente mostró más compasión y fe que los príncipes de Judá." },
              { id: "b3", label: "Baruc, el fiel escriba.", isCorrect: false, feedback: "Incorrecto. Baruc fue fiel, pero el rescate fue de Ebed-melec." }
            ]
          },
          {
            id: "q3",
            label: "¿Cuántos años predijo Jeremías que duraría el cautiverio babilónico?",
            options: [
              { id: "c1", label: "40 años.", isCorrect: false, feedback: "Incorrecto. 40 años fue el tiempo del éxodo." },
              { id: "c2", label: "70 años.", isCorrect: true, feedback: "¡Correcto! Jeremías especificó 70 años como el tiempo de disciplina divina." },
              { id: "c3", label: "100 años.", isCorrect: false, feedback: "Incorrecto. El número profético fue 70." }
            ]
          },
          {
            id: "q4",
            label: "¿Qué define al metro 'qinah' utilizado en Lamentaciones?",
            options: [
              { id: "d1", label: "Es un ritmo de celebración victoriosa.", isCorrect: false, feedback: "Incorrecto. Lamentaciones es una elegía fúnebre." },
              { id: "d2", label: "Es un ritmo melancólico usado para elegías fúnebres.", isCorrect: true, feedback: "¡Correcto! El metro qinah transmite la profundidad del dolor por la caída nacional." },
              { id: "d3", label: "Es un tipo de rima basada en el alfabeto.", isCorrect: false, feedback: "Incorrecto. Eso es el acróstico. Qinah es el ritmo." }
            ]
          }
        ]
      }
    },
    {
      id: "slide-11",
      type: "completion",
      title: "Módulo Completado",
      subtitle: "De la Medianoche al Nuevo Pacto",
      visual: {
        type: "image",
        source: "https://cdn.myportfolio.com/d435fa58-d32c-4141-8a15-0f2bfccdea41/cfd2a316-4f0d-4b15-91aa-f7f625c9aa6c_rw_1920.jpg?h=1099b9e0a555c84d60c159bfd6b20ff7",
        position: "background",
        effect: "vignette"
      },
      content: "Has explorado la vida de Jeremías, el profeta que vio caer su mundo pero nunca perdió de vista el Nuevo Pacto. Su historia es un recordatorio de que Dios es fiel incluso en el juicio."
    }
  ]
};
