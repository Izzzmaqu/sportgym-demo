/*
  ============================================================
  GYM DATA — Datos centralizados de SportGym Costa Rica
  ============================================================
  Este archivo actua como la "fuente de verdad" de todo el contenido
  estatico del sitio. Centralizar la data en un solo lugar tiene varias ventajas:

  1. MANTENIMIENTO: Para actualizar un dato (precio, horario, etc.)
     solo se modifica en un lugar, no en multiples componentes.

  2. CONSISTENCIA: Todos los componentes usan la misma informacion.

  3. ESCALABILIDAD: En el futuro se puede reemplazar este archivo
     por llamadas a una API real sin cambiar los componentes.

  4. LEGIBILIDAD: Los componentes quedan mas limpios al no tener
     data hardcodeada en su logica o template.

  Todos los datos son constantes (readonly) porque no cambian
  en runtime; son datos estaticos del sitio.
  ============================================================
*/

/*
  INFORMACION GENERAL DEL GIMNASIO
  Datos usados en el footer, pagina de contacto, mapa y schema.org
*/
export const GYM_INFO = {
  name: 'SportGym Costa Rica',
  tagline: 'Forja tu mejor versión',
  description:
    'Somos el gimnasio de referencia en Barrio Escalante, San José. Ofrecemos instalaciones de primer nivel, instructores certificados y zonas especializadas para todo tipo de atleta.',
  shortDescription:
    'Tu gimnasio de alto rendimiento en el corazón de San José, Costa Rica.',

  // Informacion de contacto (numeros en formato costarricense: +506 XXXX-XXXX)
  contact: {
    phone: '+506 2256-4890',        // Telefono fijo (codigo area 2xxx = linea fija CR)
    whatsapp: '+50688974561',       // Numero WhatsApp sin espacios para el link wa.me
    whatsappDisplay: '+506 8897-4561', // Version visible al usuario
    email: 'info@sportgym.cr',
    emailContact: 'contacto@sportgym.cr',
  },

  // Direccion fisicaqui usamos referencia tipica costarricense
  address: {
    street: '150 metros norte del Parque España',
    neighborhood: 'Barrio Escalante',
    city: 'San José',
    province: 'San José',
    country: 'Costa Rica',
    postalCode: '10103',
    // Coordenadas para OpenStreetMap (Barrio Escalante, San Jose, CR)
    lat: 9.9366,
    lng: -84.0717,
    // URL del mapa con las coordenadas de Barrio Escalante, San Jose
    mapEmbedUrl:
      'https://www.openstreetmap.org/export/embed.html?bbox=-84.0817%2C9.9266%2C-84.0617%2C9.9466&layer=mapnik&marker=9.9366%2C-84.0717',
    mapLinkUrl:
      'https://www.openstreetmap.org/?mlat=9.9366&mlon=-84.0717#map=16/9.9366/-84.0717',
  },

  // Horarios de atencion
  schedule: {
    weekdays: 'Lunes a Viernes: 5:00 am – 10:00 pm',
    saturday: 'Sábados: 6:00 am – 8:00 pm',
    sunday: 'Domingos: 7:00 am – 2:00 pm',
    holidays: 'Feriados: 8:00 am – 12:00 pm',
  },

  // Redes sociales (usamos "@" de gimnasios reales de CR como referencia ficcia del sitio)
  social: {
    instagram: { url: 'https://www.instagram.com/', handle: '@sportgym.cr' },
    facebook: { url: 'https://www.facebook.com/', handle: 'SportGym Costa Rica' },
    youtube: { url: 'https://www.youtube.com/', handle: 'SportGym CR' },
    tiktok: { url: 'https://www.tiktok.com/', handle: '@sportgym.cr' },
  },

  // Estadisticas destacadas para la seccion de cifras en el Home
  stats: [
    { value: '1,200+', label: 'Atletas activos', icon: 'users' },
    { value: '15+',    label: 'Instructores certificados', icon: 'award' },
    { value: '8',      label: 'Zonas de entrenamiento', icon: 'layout' },
    { value: '12',     label: 'Años de experiencia', icon: 'calendar' },
  ],
} as const;

/*
  IDENTIDAD CORPORATIVA
  Mision, vision y valores del gimnasio.
  Usados en la pagina "Acerca de".
*/
export const GYM_IDENTITY = {
  mission: `Brindar a nuestra comunidad de atletas un espacio seguro, moderno y motivador donde cada persona
    pueda alcanzar sus metas de acondicionamiento físico, promoviendo hábitos de vida saludables con el
    apoyo de instructores altamente calificados y equipos de última generación.`,

  vision: `Ser el gimnasio líder de Costa Rica reconocido por la excelencia en sus instalaciones, la calidad
    humana de su equipo y el impacto positivo en la salud y bienestar de la comunidad costarricense,
    expandiendo nuestra presencia a las principales ciudades del país.`,

  // Los valores son el nucleo de la identidad corporativa.
  // Cada uno tiene un icono SVG path (Material Icons / Heroicons style) para visualizarlos.
  values: [
    {
      id: 1,
      title: 'Excelencia',
      description:
        'Superamos las expectativas en cada servicio, instalación y interacción con nuestros atletas.',
      // Icono: estrella (trofeo)
      icon: `<path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.563.563 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />`,
    },
    {
      id: 2,
      title: 'Comunidad',
      description:
        'Fomentamos un ambiente inclusivo donde cada atleta se siente parte de una familia deportiva.',
      // Icono: grupo de personas
      icon: `<path stroke-linecap="round" stroke-linejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />`,
    },
    {
      id: 3,
      title: 'Seguridad',
      description:
        'Garantizamos entornos seguros con equipos mantenidos y protocolos de seguridad rigurosos.',
      // Icono: escudo con check
      icon: `<path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />`,
    },
    {
      id: 4,
      title: 'Innovación',
      description:
        'Incorporamos constantemente los últimos avances en equipos, metodologías y tecnología deportiva.',
      // Icono: rayo / innovacion
      icon: `<path stroke-linecap="round" stroke-linejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />`,
    },
    {
      id: 5,
      title: 'Compromiso',
      description:
        'Nos comprometemos con el progreso de cada atleta, acompañándolo en cada etapa de su camino.',
      // Icono: corazon / compromiso
      icon: `<path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />`,
    },
  ],

  // Historia del gimnasio
  history: `SportGym nació en 2012 con una visión clara: democratizar el acceso al entrenamiento de alto rendimiento
    en Costa Rica. Lo que comenzó como un pequeño espacio de 400 m² en Barrio Escalante hoy se ha convertido
    en uno de los complejos deportivos más completos de San José, con más de 2,500 m² de instalaciones
    especializadas que sirven a más de 1,200 atletas activos mensualmente.`,

  team: [
    {
      name: 'Carlos Rodríguez',
      role: 'Director General y Fundador',
      // Imagen de Unsplash — hombre profesional deportivo
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=300&q=80',
      certifications: 'NSCA-CSCS, CrossFit Level 3',
    },
    {
      name: 'María Vásquez',
      role: 'Directora de Operaciones',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&q=80',
      certifications: 'ACSM-CPT, Nutrición Deportiva',
    },
    {
      name: 'Andrés Mora',
      role: 'Jefe de Instructores',
      image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=300&q=80',
      certifications: 'NASM-CPT, Yoga Alliance',
    },
  ],
} as const;

/*
  ZONAS DE ENTRENAMIENTO
  Informacion de los servicios ofrecidos por el gimnasio.
  Usados en la pagina de Servicios y en el preview del Home.

  Los precios estan en Colones Costarricenses (₡).
  Las imagenes son de Unsplash con parametros de optimizacion:
  ?w=800 -> ancho 800px (suficiente para cards en pantallas medianas)
  &q=80  -> calidad JPEG al 80% (balance bueno entre calidad y peso)
  &fit=crop -> recortar para que se ajuste exactamente al tamano solicitado
  &auto=format -> Unsplash sirve WebP automaticamente si el browser lo soporta
*/
export const TRAINING_ZONES = [
  {
    id: 1,
    name: 'Zona Cardiovascular',
    slug: 'cardio',
    description:
      'Equipos de última generación: cintas de correr, bicicletas estáticas, elípticas y remos. Perfecta para mejorar resistencia y quemar calorías.',
    longDescription:
      'Nuestra zona cardiovascular cuenta con más de 40 equipos de marcas premium como Life Fitness y Technogym. Pantallas individuales con entretenimiento, medición de frecuencia cardíaca y modo atletismo para entrenamiento por intervalos.',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80&fit=crop',
    price: 15000,      // Precio por sesion en colones
    priceDisplay: '₡15,000 / sesión',
    capacity: 40,      // Capacidad maxima de personas simultaneas
    instructor: 'Roberto Jiménez',
    instructorCert: 'ACSM-CPT',
    schedule: 'Disponible todos los días en horario de apertura',
    features: ['40+ equipos', 'Pantallas individuales', 'AC controlado', 'WiFi'],
    featured: true,    // Se muestra en el preview del Home
  },
  {
    id: 2,
    name: 'Sala de Pesas Libres',
    slug: 'pesas',
    description:
      'Espacio dedicado al entrenamiento con pesas libres: mancuernas hasta 50 kg, barras olímpicas, racks de sentadilla y bancos de press.',
    longDescription:
      'La sala de pesas libres es el corazón de SportGym. Disponemos de juegos completos de mancuernas (2-50 kg), 6 racks de sentadilla con jaulas de seguridad, barras olímpicas de competencia y suelos de goma amortiguante para proteger las articulaciones.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80&fit=crop',
    price: 18000,
    priceDisplay: '₡18,000 / sesión',
    capacity: 25,
    instructor: 'Diego Solís',
    instructorCert: 'NSCA-CSCS',
    schedule: 'Lun-Vie 5am-10pm | Sáb 6am-8pm | Dom 7am-2pm',
    features: ['Pesas hasta 50kg', '6 racks de sentadilla', 'Barras olímpicas', 'Entresuelo amortiguado'],
    featured: true,
  },
  {
    id: 3,
    name: 'Zona Funcional / CrossFit',
    slug: 'funcional',
    description:
      'Área abierta equipada con kettlebells, battle ropes, TRX, cajas pliométricas y barra de dominadas para entrenamiento funcional de alta intensidad.',
    longDescription:
      'El espacio funcional tiene 300 m² de área abierta para entrenamientos dinámicos. Los WODs (Workout of the Day) son dirigidos por instructores certificados CrossFit. Ideal para mejorar potencia, coordinación y resistencia muscular.',
    image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&q=80&fit=crop',
    price: 20000,
    priceDisplay: '₡20,000 / sesión',
    capacity: 20,
    instructor: 'Gabriela Quesada',
    instructorCert: 'CrossFit Level 2',
    schedule: 'Clases grupales: Lun/Mié/Vie 6am, 12pm, 6pm | Mar/Jue 7am, 5pm',
    features: ['Clases grupales', 'WODs diarios', 'Instructor certificado', '300 m² abiertos'],
    featured: true,
  },
  {
    id: 4,
    name: 'Sala de Yoga y Meditación',
    slug: 'yoga',
    description:
      'Espacio tranquilo con piso de bambú, espejos de piso a techo, blocks de yoga, correas y props premium para clases de Hatha, Vinyasa y meditación.',
    longDescription:
      'Diseñado para el bienestar mental y físico. Nuestras clases van desde yoga restaurativo para principiantes hasta Vinyasa avanzado. También ofrecemos sesiones de meditación guiada y mindfulness para la gestión del estrés.',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80&fit=crop',
    price: 14000,
    priceDisplay: '₡14,000 / sesión',
    capacity: 15,
    instructor: 'Ana Fernández',
    instructorCert: 'Yoga Alliance RYT-500',
    schedule: 'Clases: Lun/Mié/Vie 7am y 7pm | Mar/Jue 8am y 6pm | Sáb 9am',
    features: ['Piso de bambú', 'Clases para todos los niveles', 'Props incluidos', 'Ambiente zen'],
    featured: false,
  },
  {
    id: 5,
    name: 'Área de Spinning',
    slug: 'spinning',
    description:
      'Studio de spinning con 20 bicicletas Keiser, sistema de audio envolvente y luces LED para sesiones de Cycling Indoor de alta energía.',
    longDescription:
      'Las clases de Spinning en SportGym son una experiencia inmersiva. Bicicletas Keiser M3i con telemetría Bluetooth, instructor certificado, música con BPM sincronizado al ritmo de la clase y control de intensidad individual para cada ciclista.',
    image: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=800&q=80&fit=crop',
    price: 16000,
    priceDisplay: '₡16,000 / sesión',
    capacity: 20,
    instructor: 'Carlos Monge',
    instructorCert: 'Mad Dogg Athletics Spinning',
    schedule: 'Clases fijas: Lun-Vie 6am, 9am, 5:30pm | Sáb 7am, 9am',
    features: ['20 bicicletas Keiser', 'Audio envolvente', 'Telemetría Bluetooth', 'Luces LED'],
    featured: false,
  },
  {
    id: 6,
    name: 'Zona de Natación',
    slug: 'natacion',
    description:
      'Piscina semiolímpica de 25 metros, temperatura controlada, 6 carriles y sistema de purificación de agua por ozono sin cloro irritante.',
    longDescription:
      'La piscina de SportGym es ideal para natación de competencia, terapia acuática y aqua-aeróbics. Temperatura mantenida a 28°C, iluminación LED subacuática y acceso a vestuarios con ducha de agua caliente incluida en la reservación.',
    image: 'https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?w=800&q=80&fit=crop',
    price: 22000,
    priceDisplay: '₡22,000 / sesión',
    capacity: 12,
    instructor: 'Patricia Ureña',
    instructorCert: 'FINA Level 2',
    schedule: 'Lun-Vie 5am-9pm | Sáb-Dom 7am-4pm (última entrada 1hr antes del cierre)',
    features: ['25 metros', 'Agua ozono', '6 carriles', 'Temp. 28°C'],
    featured: false,
  },
] as const;

/*
  TESTIMONIOS
  Opiniones de atletas del gimnasio para la seccion de testimonios del Home.
  En un proyecto real vendrian de una API/base de datos.
  Las imagenes de avatares usan Unsplash con formato cuadrado pequeno (150x150).
*/
export const TESTIMONIALS = [
  {
    id: 1,
    name: 'Valentina Salas',
    role: 'Atleta Competitiva',
    rating: 5,
    text: 'SportGym cambió mi vida. Llevo 2 años entrenando aquí y los instructores son increíbles. El ambiente es motivador y las instalaciones siempre están impecables. No hay otro lugar en San José donde entrenaría.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80&fit=crop',
    zone: 'Zona Funcional',
  },
  {
    id: 2,
    name: 'Marco Herrera',
    role: 'Ingeniero | Entrena hace 3 años',
    rating: 5,
    text: 'Comencé sin saber nada de gym y los instructores me guiaron paso a paso. Bajé 18 kg en 8 meses con el plan de entrenamiento personalizado. El sistema de reservas en la app es muy conveniente.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&q=80&fit=crop',
    zone: 'Sala de Pesas Libres',
  },
  {
    id: 3,
    name: 'Sofía Montoya',
    role: 'Profesora | Spinning',
    rating: 5,
    text: 'Las clases de spinning son una experiencia única. La música, la energía del grupo y la calidad de las bicicletas Keiser hacen cada clase especial. Recomiendo SportGym a todos mis conocidos.',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&q=80&fit=crop',
    zone: 'Área de Spinning',
  },
  {
    id: 4,
    name: 'Diego Ulate',
    role: 'Corredor Amateur',
    rating: 4,
    text: 'La zona cardiovascular tiene todo lo que necesito para mis entrenamientos de triatlón. La piscina de 25 metros es perfecta para mis sesiones de natación. Excelente personal y ambiente profesional.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&q=80&fit=crop',
    zone: 'Zona Cardiovascular',
  },
] as const;

/*
  IMAGENES DEL SLIDER (Hero Banner)
  Usadas en el componente de slider de la pagina Home.
  Cada imagen de Unsplash tiene:
  - w=1920: ancho Full HD para pantallas grandes
  - q=85: calidad alta (el slider es la primera impresion)
  - fit=crop: recorta para mantener la proporcion
  - auto=format: sirve WebP si el browser lo soporta

  El 'alt' es descriptivo para accesibilidad (lectores de pantalla).
  El 'caption' es el texto superpuesto en el slide.
*/
export const SLIDER_IMAGES = [
  {
    id: 1,
    url: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1920&q=85&fit=crop',
    alt: 'Atleta entrenando en la zona cardiovascular de SportGym, usando una cinta de correr moderna',
    caption: 'Equipo de última generación',
    subcaption: 'Más de 40 equipos cardiovasculares para tu entrenamiento',
  },
  {
    id: 2,
    url: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=1920&q=85&fit=crop',
    alt: 'Entrenamiento funcional de alta intensidad en el área CrossFit de SportGym',
    caption: 'Entrenamiento funcional',
    subcaption: 'WODs diarios dirigidos por instructores CrossFit Level 2',
  },
  {
    id: 3,
    url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=85&fit=crop',
    alt: 'Sala de pesas libres de SportGym con racks de sentadilla y barras olímpicas',
    caption: 'Sala de pesas libre',
    subcaption: 'Racks de sentadilla, barbas olímpicas y pesas hasta 50 kg',
  },
  {
    id: 4,
    url: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1920&q=85&fit=crop',
    alt: 'Clase de yoga en la sala de bienestar de SportGym con iluminación natural',
    caption: 'Bienestar integral',
    subcaption: 'Yoga, meditación y área de spinning para tu equilibrio físico y mental',
  },
] as const;

/*
  PLANES DE MEMBRESIA
  Usados en la pagina de servicios y como CTA en otras partes.
  Precios en colones costarricenses.
*/
export const MEMBERSHIP_PLANS = [
  {
    id: 1,
    name: 'Básico',
    price: 35000,
    priceDisplay: '₡35,000',
    period: 'mensual',
    description: 'Acceso a zonas cardiovascular y de pesas libres en horario regular.',
    features: [
      'Zona cardiovascular',
      'Sala de pesas libres',
      'Vestidores y duchas',
      'Acceso Lun-Vie 6am-8pm',
    ],
    notIncluded: ['Clases grupales', 'Spinning', 'Piscina', 'Yoga'],
    highlighted: false,
    cta: 'Comenzar ahora',
  },
  {
    id: 2,
    name: 'Premium',
    price: 55000,
    priceDisplay: '₡55,000',
    period: 'mensual',
    description: 'Acceso completo a todas las zonas incluidas las clases grupales.',
    features: [
      'Todas las zonas',
      'Clases grupales ilimitadas',
      'Spinning',
      'Yoga',
      'Piscina',
      'Acceso completo 7 días',
      '1 sesión de evaluación fisica',
    ],
    notIncluded: [],
    highlighted: true,   // Este plan se destaca visualmente (el mas popular)
    cta: 'Elegir Premium',
  },
  {
    id: 3,
    name: 'Familiar',
    price: 90000,
    priceDisplay: '₡90,000',
    period: 'mensual',
    description: 'Acceso Premium para 2 personas del mismo nucleo familiar.',
    features: [
      'Todo lo de Premium',
      'Para 2 personas',
      'Descuento en sesiones adicionales',
      'Reservaciones prioritarias',
    ],
    notIncluded: [],
    highlighted: false,
    cta: 'Plan familiar',
  },
] as const;

/*
  TIPOS TYPESCRIPT INFERIDOS
  Exportamos los tipos para que los componentes puedan usarlos
  con tipado estricto sin redefinirlos.
*/
export type TrainingZone = (typeof TRAINING_ZONES)[number];
export type Testimonial = (typeof TESTIMONIALS)[number];
export type SliderImage = (typeof SLIDER_IMAGES)[number];
export type GymValue = (typeof GYM_IDENTITY.values)[number];
export type MembershipPlan = (typeof MEMBERSHIP_PLANS)[number];
