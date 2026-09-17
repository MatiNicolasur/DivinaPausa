import { whatsappLink } from "./contactData";

export type ServiceCategory = 'standard' | 'premium';

export interface Service {
  title: string;
  description: string;
  imgSrc: string;
  imgAlt: string;
  category: ServiceCategory;
  pricingId?: string; // matches pricingData id for standard services
  whatsappMessage?: string;
}

export interface Benefit {
  title: string;
  description: string;
  icon: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

const coffeeBreakImg = "/images/services/coffee.jpeg";
const almuerzosImg2 = "/images/services/almuerzo-gourmet-2.jpg";
const brunchImg = "/images/services/brunch.png";
const cocktailsImg = "/images/services/tablas.jpg";
const afterOfficeImg = "/images/services/after-office.jpg";
const paellaImg = "/images/services/service-paella.jpg";

const whatsappBase = "https://wa.me/56976897765?text=";

export const services: Service[] = [
  {
    title: "Coffee Break Premium",
    description: "Inicia tus mañanas o energiza tus pausas con nuestra selección de cafés de especialidad, tés aromáticos, bollería artesanal recién horneada, frutas frescas y bocados saludables. Creamos el ambiente perfecto para la productividad y el networking.",
    imgSrc: coffeeBreakImg,
    imgAlt: "Elegante coffee break con pastelería fina y café de especialidad",
    category: 'standard',
    pricingId: 'coffee-break',
    whatsappMessage: `${whatsappBase}Hola%20Divina%20Pausa%2C%20me%20interesa%20el%20servicio%20de%20Coffee%20Break%20Premium`
  },
  {
    title: "After Office Dinámico",
    description: "Transforma el final de la jornada laboral en una experiencia relajada y social. Ofrecemos una selección de bebidas, cocktails innovadores y apetitosos snacks, perfectos para fomentar la camaradería y el networking en un ambiente distendido.",
    imgSrc: afterOfficeImg,
    imgAlt: "Grupo de personas disfrutando de un after office con bebidas y snacks",
    category: 'premium',
    whatsappMessage: `${whatsappBase}Hola%20Divina%20Pausa%2C%20me%20interesa%20el%20servicio%20de%20After%20Office%20Dinámico`
  },
  {
    title: "Almuerzo Corporativo",
    description: "Almuerzos corporativos formales con menús que combinan sabor, nutrición y presentación sofisticada. Opciones personalizables para satisfacer cualquier preferencia, garantizando una experiencia culinaria memorable.",
    imgSrc: almuerzosImg2,
    imgAlt: "Almuerzo corporativo elegante con platos gourmet",
    category: 'standard',
    pricingId: 'almuerzo',
    whatsappMessage: `${whatsappBase}Hola%20Divina%20Pausa%2C%20me%20interesa%20el%20servicio%20de%20Almuerzo%20Corporativo`
  },
  {
    title: "Brunch de Excelencia",
    description: "Brunches relajados con una mesa abundante y variada: opciones dulces y saladas, café de especialidad y una presentación cuidada para arrancar el día con energía.",
    imgSrc: brunchImg,
    imgAlt: "Mesa de brunch abundante y variada con opciones dulces y saladas",
    category: 'standard',
    pricingId: 'brunch',
    whatsappMessage: `${whatsappBase}Hola%20Divina%20Pausa%2C%20me%20interesa%20el%20servicio%20de%20Brunch%20de%20Excelencia`
  },
  {
    title: "Tablas & Cocktail Gourmet",
    description: "Celebra tus eventos con nuestras exquisitas tablas de quesos, fiambres, antipastos y opciones vegetarianas, acompañadas de canapés gourmet y una mixología creativa. Ideal para lanzamientos, celebraciones internas o cualquier ocasión especial.",
    imgSrc: cocktailsImg,
    imgAlt: "Tabla de cocktail gourmet con quesos, fiambres y frutas",
    category: 'premium',
    whatsappMessage: `${whatsappBase}Hola%20Divina%20Pausa%2C%20me%20interesa%20el%20servicio%20de%20Tablas%20%26%20Cocktail%20Gourmet`
  },
  {
    title: "Paella Presencial",
    description: "Sorprende a tus invitados con el espectáculo y sabor de una auténtica paella española cocinada en vivo. Utilizamos ingredientes frescos y tradicionales para una experiencia gastronómica vibrante y memorable, perfecta para eventos al aire libre.",
    imgSrc: paellaImg,
    imgAlt: "Chef cocinando una gran paella española en un evento",
    category: 'premium',
    whatsappMessage: `${whatsappBase}Hola%20Divina%20Pausa%2C%20me%20interesa%20el%20servicio%20de%20Paella%20Presencial`
  }
];

export const standardServices = ['coffee-break', 'brunch', 'almuerzo'].map(id => {
  const service = services.find(s => s.pricingId === id)!;
  const descriptions: Record<string, string> = {
    'coffee-break': 'Una pausa con café, opciones dulces y saladas para reuniones, capacitaciones y jornadas de trabajo.',
    brunch: 'Una mesa para compartir a media mañana, con opciones dulces y saladas que se adaptan a tu encuentro.',
    almuerzo: 'Menús para reunir a tu equipo alrededor de la mesa. Coordinamos contigo las preferencias y necesidades del grupo.',
  };
  const titles: Record<string, string> = { 'coffee-break': 'Coffee Break', brunch: 'Brunch', almuerzo: 'Almuerzo' };
  return { ...service, title: titles[id], description: descriptions[id], whatsappMessage: whatsappLink(`Hola Divina Pausa, me gustaría cotizar ${titles[id]} para un evento.`) };
});
export const premiumServices = services.filter(s => s.category === 'premium');

export const benefits: Benefit[] = [
  {
    title: "Calidad Insuperable",
    description: "Seleccionamos solo los ingredientes más frescos y de la más alta calidad, priorizando proveedores locales y sostenibles.",
    icon: "icon-quality.svg"
  },
  {
    title: "Presentación Artística",
    description: "Cada plato es una obra de arte, diseñado para deleitar la vista tanto como el paladar, reflejando elegancia y sofisticación.",
    icon: "icon-presentation.svg"
  },
  {
    title: "Servicio Excepcional",
    description: "Nuestro equipo profesional y atento se dedica a superar tus expectativas, asegurando una experiencia fluida y memorable.",
    icon: "icon-service.svg"
  }
];

export const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Consulta Inicial",
    description: "Nos cuentas tu visión y analizamos tus necesidades, el tipo de evento y presupuesto para crear una propuesta a medida."
  },
  {
    number: "02",
    title: "Diseño del Menú",
    description: "Nuestros chefs diseñan un menú exclusivo que refleja tu marca, con sabores únicos y presentaciones impecables."
  },
  {
    number: "03",
    title: "Preparación",
    description: "Seleccionamos cada ingrediente y preparamos artesanalmente con altos estándares de calidad y atención al detalle."
  },
  {
    number: "04",
    title: "El Evento",
    description: "Montaje impecable, servicio profesional y atención al detalle para que disfrutes y sorprendas a tus invitados."
  }
];
