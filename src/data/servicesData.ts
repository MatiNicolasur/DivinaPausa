export interface Service {
  title: string;
  description: string;
  imgSrc: string;
  imgAlt: string;
}

export interface Benefit {
  title: string;
  description: string;
  icon: string; // Placeholder for now
}

// Image paths
const coffeeBreakImg = "/images/services/coffee.jpeg";
const almuerzosImg = "/images/services/almuerzo-gourmet.jpg";
const cocktailsImg = "/images/services/tablas.jpg";
const aMedidaImg = "/images/services/soluciones-a-medida.png";
const afterOfficeImg = "/images/services/after-office.jpg";
const paellaImg = "/images/services/service-paella.jpg";
const barPortatilImg = "/images/services/service-bar.jpg";

export const services: Service[] = [
  {
    title: "Coffee Break Premium",
    description: "Inicia tus mañanas o energiza tus pausas con nuestra selección de cafés de especialidad, tés aromáticos, bollería artesanal recién horneada, frutas frescas y bocados saludables. Creamos el ambiente perfecto para la productividad y el networking.",
    imgSrc: coffeeBreakImg,
    imgAlt: "Elegante coffee break con pastelería fina y café de especialidad"
  },
  {
    title: "After Office Dinámico",
    description: "Transforma el final de la jornada laboral en una experiencia relajada y social. Ofrecemos una selección de bebidas, cocktails innovadores y apetitosos snacks, perfectos para fomentar la camaradería y el networking en un ambiente distendido.",
    imgSrc: afterOfficeImg, 
    imgAlt: "Grupo de personas disfrutando de un after office con bebidas y snacks"
  },
  {
    title: "Brunch & Almuerzos de Excelencia",
    description: "Desde brunches relajados hasta almuerzos corporativos formales, ofrecemos menús que combinan sabor, nutrición y presentación sofisticada. Opciones personalizables para satisfacer cualquier preferencia, garantizando una experiencia culinaria memorable.",
    imgSrc: almuerzosImg,
    imgAlt: "Mesa de brunch abundante y variada con opciones dulces y saladas"
  },
  {
    title: "Tablas & Cocktail Gourmet",
    description: "Celebra tus eventos con nuestras exquisitas tablas de quesos, fiambres, antipastos y opciones vegetarianas, acompañadas de canapés gourmet y una mixología creativa. Ideal para lanzamientos, celebraciones internas o cualquier ocasión especial.",
    imgSrc: cocktailsImg,
    imgAlt: "Tabla de cocktail gourmet con quesos, fiambres y frutas"
  },
  {
    title: "Paella Presencial",
    description: "Sorprende a tus invitados con el espectáculo y sabor de una auténtica paella española cocinada en vivo. Utilizamos ingredientes frescos y tradicionales para una experiencia gastronómica vibrante y memorable, perfecta para eventos al aire libre.",
    imgSrc: paellaImg, 
    imgAlt: "Chef cocinando una gran paella española en un evento"
  },
  {
    title: "Bar Portátil y Mixología Creativa",
    description: "Llevamos la experiencia de un bar completo a tu evento. Con un Bar movil personalizable con el logo de tu empresa + un entretenido sistema de tickets para retirar tragos de autor, champagnes y vinos entre otros tragos!.",
    imgSrc: barPortatilImg, 
    imgAlt: "Bartender preparando cocktails en un elegante bar portátil"
  },
  {
    title: "Catering a Medida para Ocasiones Únicas",
    description: "¿Tienes una visión particular para tu evento? Nuestro equipo de expertos culinarios y planificadores trabaja contigo para diseñar una experiencia de catering completamente personalizada. Desde la conceptualización del menú hasta la ejecución, cada detalle es cuidadosamente orquestado.",
    imgSrc: aMedidaImg,
    imgAlt: "Chef preparando un plato especial para catering a medida"
  }
];

export const benefits: Benefit[] = [
  { 
    title: "Calidad Insuperable", 
    description: "Seleccionamos solo los ingredientes más frescos y de la más alta calidad, priorizando proveedores locales y sostenibles.",
    icon: "icon-quality.svg" // Placeholder
  },
  { 
    title: "Presentación Artística", 
    description: "Cada plato es una obra de arte, diseñado para deleitar la vista tanto como el paladar, reflejando elegancia y sofisticación.",
    icon: "icon-presentation.svg" // Placeholder
  },
  { 
    title: "Servicio Excepcional", 
    description: "Nuestro equipo profesional y atento se dedica a superar tus expectativas, asegurando una experiencia fluida y memorable.",
    icon: "icon-service.svg" // Placeholder
  }
];
