export interface ServiceLandingPage {
  id: string;
  slug: string;
  name: string;
  title: string;
  description: string;
  intro: string;
  image: string;
  imageAlt: string;
  eyebrow: string;
  sections: { title: string; body: string }[];
  occasions: string[];
}

export const serviceLandingPages: ServiceLandingPage[] = [
  {
    id: 'coffee-break',
    slug: 'coffee-break-empresas',
    name: 'Coffee Break',
    title: 'Coffee break para empresas en Santiago',
    description: 'Coffee break corporativo para reuniones, capacitaciones y jornadas de trabajo en Santiago y la Región Metropolitana. Solicita una propuesta a Divina Pausa.',
    eyebrow: 'Una pausa para compartir',
    intro: 'Café y opciones dulces y saladas para acompañar reuniones, capacitaciones y jornadas de trabajo. Coordinamos una propuesta según el encuentro de tu equipo.',
    image: '/images/services/coffee.jpeg',
    imageAlt: 'Coffee break preparado para compartir durante una jornada de trabajo',
    occasions: ['Reuniones de equipo', 'Capacitaciones', 'Pausas durante la jornada'],
    sections: [
      {
        title: 'Un momento pensado para la jornada',
        body: 'Una pausa de café ayuda a marcar un respiro dentro de una reunión o capacitación. La propuesta de Divina Pausa puede reunir café de especialidad, tés, bollería artesanal, fruta fresca y bocados saludables; las opciones se conversan según el evento.',
      },
      {
        title: 'Dulce, salado y coordinado contigo',
        body: 'Cada equipo y cada encuentro son distintos. Cuéntanos cuántas personas asistirán, qué fecha estás considerando y en qué comuna se realizará el evento para que podamos revisar disponibilidad y preparar una propuesta.',
      },
    ],
  },
  {
    id: 'brunch',
    slug: 'brunch-empresarial',
    name: 'Brunch',
    title: 'Brunch para empresas en Santiago',
    description: 'Brunch corporativo con alternativas dulces y saladas para encuentros de equipo en Santiago y la Región Metropolitana. Cotiza con Divina Pausa.',
    eyebrow: 'Una mesa para encontrarse',
    intro: 'Una mesa de brunch para compartir a media mañana, con opciones dulces y saladas, café de especialidad y una presentación cuidada para tu encuentro.',
    image: '/images/services/brunch.png',
    imageAlt: 'Mesa de brunch con opciones dulces y saladas para compartir',
    occasions: ['Encuentros de equipo', 'Celebraciones a media mañana', 'Reuniones extendidas'],
    sections: [
      {
        title: 'Una alternativa para compartir',
        body: 'El brunch combina distintos sabores en una mesa que invita a conversar. Divina Pausa prepara propuestas con opciones dulces y saladas y café de especialidad, coordinadas para el horario y formato de tu actividad.',
      },
      {
        title: 'La propuesta parte por tu evento',
        body: 'Para cotizar, indícanos la fecha estimada —o si aún no la tienes—, el número aproximado de asistentes y la comuna. Con esos datos podremos conversar sobre el encuentro y confirmar disponibilidad.',
      },
    ],
  },
  {
    id: 'almuerzo',
    slug: 'almuerzos-corporativos',
    name: 'Almuerzo',
    title: 'Almuerzos corporativos en Santiago',
    description: 'Almuerzos para reuniones y jornadas de empresa en Santiago y la Región Metropolitana. Menús coordinados según las necesidades del grupo.',
    eyebrow: 'Un encuentro alrededor de la mesa',
    intro: 'Almuerzos para reunir a tu equipo en torno a la mesa, con una propuesta gastronómica coordinada según las preferencias y necesidades del grupo.',
    image: '/images/services/almuerzo-gourmet-2.jpg',
    imageAlt: 'Preparación de platos para un almuerzo corporativo',
    occasions: ['Jornadas corporativas', 'Reuniones de trabajo', 'Encuentros de equipo'],
    sections: [
      {
        title: 'Un menú que acompaña la jornada',
        body: 'Un almuerzo puede ser parte central de una reunión, capacitación o jornada de trabajo. Conversamos contigo sobre el formato del encuentro y las preferencias generales del grupo antes de preparar la propuesta.',
      },
      {
        title: 'Coordinación antes del evento',
        body: 'Cuéntanos cuántas personas asistirán, la fecha estimada, la comuna y cualquier detalle general de organización que debamos considerar. Divina Pausa atiende eventos en Santiago y las comunas de la Región Metropolitana.',
      },
    ],
  },
  {
    id: 'barra-movil',
    slug: 'barra-movil-eventos',
    name: 'Barra móvil',
    title: 'Barra móvil para eventos en Santiago',
    description: 'Barra móvil para eventos corporativos en Santiago y la Región Metropolitana. La propuesta se coordina según el formato del evento y sus asistentes.',
    eyebrow: 'Una estación para tu evento',
    intro: 'Una estación de bebidas que suma un punto de encuentro. Coordinamos la propuesta de barra móvil según el formato de tu evento y la cantidad de asistentes.',
    image: '/images/services/service-bar.jpg',
    imageAlt: 'Estación de bebidas preparada para acompañar un evento',
    occasions: ['Celebraciones de empresa', 'Lanzamientos', 'Encuentros corporativos'],
    sections: [
      {
        title: 'Una propuesta coordinada para el formato',
        body: 'La barra móvil puede acompañar distintos tipos de encuentros. Para orientar la propuesta, conversamos sobre el tipo de evento, el número de asistentes, la fecha y el lugar donde se realizará.',
      },
      {
        title: 'Consulta disponibilidad en Santiago y la Región Metropolitana',
        body: 'Envíanos los datos esenciales del evento y el equipo de Divina Pausa podrá revisar disponibilidad y conversar contigo sobre la propuesta. Las opciones y condiciones se confirman antes de contratar el servicio.',
      },
    ],
  },
];
