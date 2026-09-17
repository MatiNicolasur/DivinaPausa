export interface ServiceVariant {
  id: string; // 'basico' | 'medio' | 'premium'
  title: string;
  description: string; // qué incluye
  pricePerPersonPerHour: number; // CLP
  image: string;
}

export interface ServiceType {
  id: string;
  title: string;
  description: string;
  icon: string;
  variants: ServiceVariant[];
}

export const serviceTypes: ServiceType[] = [
  {
    id: 'coffee-break',
    title: 'Coffee Break',
    description: 'Café de especialidad, tés aromáticos y bollería artesanal para pausas productivas.',
    icon: '/images/icons/035-snacks.svg',
    variants: [
      {
        id: 'basico',
        title: 'Básico',
        pricePerPersonPerHour: 6500,
        image: '/images/services/coffee.jpeg',
        description: 'Café de especialidad, tés, jugos naturales, 2 tipos de pastelería por persona, agua y servicio básico.',
      },
      {
        id: 'medio',
        title: 'Medio',
        pricePerPersonPerHour: 8000,
        image: '/images/services/coffee-2.jpg',
        description: 'Todo lo del Básico + sándwiches gourmet, frutas frescas, opciones veganas y sin gluten.',
      },
      {
        id: 'premium',
        title: 'Premium',
        pricePerPersonPerHour: 10000,
        image: '/images/services/coffee.png',
        description: 'Todo lo del Medio + tabla de quesos, estación de barista, snacks gourmet y presentación premium.',
      },
    ],
  },
  {
    id: 'almuerzo',
    title: 'Almuerzo',
    description: 'Menús completos para almuerzos corporativos, con sabor, nutrición y presentación sofisticada.',
    icon: '/images/icons/019-salad.svg',
    variants: [
      {
        id: 'basico',
        title: 'Básico',
        pricePerPersonPerHour: 16500,
        image: '/images/services/almuerzo-gourmet-2.jpg',
        description: 'Plato principal + acompañamiento, bebida, pan artesanal y postre del día.',
      },
      {
        id: 'medio',
        title: 'Medio',
        pricePerPersonPerHour: 20000,
        image: '/images/services/tablas.jpg',
        description: 'Todo lo del Básico + entrada, opción proteica premium y ensaladas gourmet.',
      },
      {
        id: 'premium',
        title: 'Premium',
        pricePerPersonPerHour: 24000,
        image: '/images/services/service-paella.jpg',
        description: 'Todo lo del Medio + estación de cocina en vivo, maridaje, postre de autor y servicio de mesas completo.',
      },
    ],
  },
  {
    id: 'brunch',
    title: 'Brunch',
    description: 'Brunches relajados y abundantes, ideales para arrancar la jornada con energía.',
    icon: '/images/icons/046-buffet.svg',
    variants: [
      {
        id: 'basico',
        title: 'Básico',
        pricePerPersonPerHour: 13000,
        image: '/images/services/brunch.png',
        description: 'Café, jugos naturales, pastelería variada, frutas frescas y opciones dulces y saladas.',
      },
      {
        id: 'medio',
        title: 'Medio',
        pricePerPersonPerHour: 16500,
        image: '/images/services/almuerzo-gourmet.jpg',
        description: 'Todo lo del Básico + huevos, tocino, opciones veganas, tostadas gourmet y mimosa station.',
      },
      {
        id: 'premium',
        title: 'Premium',
        pricePerPersonPerHour: 20000,
        image: '/images/services/cocktail-2.jpg',
        description: 'Todo lo del Medio + estación en vivo de omelettes, maridaje, postres de autor y servicio completo.',
      },
    ],
  },
];

export interface CustomService {
  id: string;
  title: string;
  description: string;
  icon: string;
  whatsappMessage: string;
}

export const customServices: CustomService[] = [
  {
    id: 'reunion-gastronomica',
    title: 'Reunión Gastronómica',
    description: 'Experiencia curada con maridajes y degustación. Una propuesta exclusiva diseñada para paladares exigentes.',
    icon: '/images/icons/013-wine.svg',
    whatsappMessage: 'Hola%20Divina%20Pausa%2C%20me%20gustar%C3%ADa%20solicitar%20una%20cotizaci%C3%B3n%20para%20una%20Reuni%C3%B3n%20Gastron%C3%B3mica',
  },
  {
    id: 'catering-a-medida',
    title: 'Catering a Medida',
    description: 'Diseñamos cada detalle para tu evento. Desde la conceptualización del menú hasta la ejecución, todo personalizado.',
    icon: '/images/icons/023-catering.svg',
    whatsappMessage: 'Hola%20Divina%20Pausa%2C%20me%20gustar%C3%ADa%20solicitar%20una%20cotizaci%C3%B3n%20para%20un%20Catering%20a%20Medida',
  },
];

export const CALCULATOR_LIMITS = {
  minPeople: 15,
  maxPeople: 200,
  peopleStep: 5,
  minHours: 1,
  maxHours: 12,
  hoursStep: 1,
  defaultPeople: 50,
  defaultHours: 2,
} as const;

/**
 * Descuento por tramo de personas.
 * Más de 50 → 5% · Más de 100 → 10% · Más de 150 → 12%
 */
export const DISCOUNT_TIERS = [
  { minPeople: 150, percent: 12 },
  { minPeople: 100, percent: 10 },
  { minPeople: 50, percent: 5 },
] as const;

export function getDiscountPercent(people: number): number {
  for (const tier of DISCOUNT_TIERS) {
    if (people > tier.minPeople) return tier.percent;
  }
  return 0;
}

export const formatCurrency = (value: number): string => {
  return '$' + Math.round(value).toLocaleString('es-CL');
};
