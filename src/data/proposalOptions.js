export const proposalServices = [
  { id: 'coffee-break', title: 'Coffee break' },
  { id: 'brunch', title: 'Brunch' },
  { id: 'almuerzo', title: 'Almuerzo' },
  { id: 'barra-movil', title: 'Barra móvil' },
];
// Coverage confirmed by Divina Pausa: all 52 communes in the Metropolitan Region.
export const servedCommunes = [
  'Alhué', 'Buin', 'Calera de Tango', 'Cerrillos', 'Cerro Navia', 'Colina', 'Conchalí', 'Curacaví',
  'El Bosque', 'El Monte', 'Estación Central', 'Huechuraba', 'Independencia', 'Isla de Maipo',
  'La Cisterna', 'La Florida', 'La Granja', 'La Pintana', 'La Reina', 'Lampa', 'Las Condes',
  'Lo Barnechea', 'Lo Espejo', 'Lo Prado', 'Macul', 'Maipú', 'María Pinto', 'Melipilla', 'Ñuñoa',
  'Padre Hurtado', 'Paine', 'Pedro Aguirre Cerda', 'Peñaflor', 'Peñalolén', 'Pirque', 'Providencia',
  'Pudahuel', 'Puente Alto', 'Quilicura', 'Quinta Normal', 'Recoleta', 'Renca', 'San Bernardo',
  'San Joaquín', 'San José de Maipo', 'San Miguel', 'San Pedro', 'San Ramón', 'Santiago',
  'Talagante', 'Tiltil', 'Vitacura',
];
export const communeOptions = [...servedCommunes, 'Otra / por definir'];
export const scheduleOptions = ['Mañana', 'Mediodía', 'Tarde', 'Jornada completa', 'Por definir'];
export function formatEventDate(value) {
  if (!value) return 'Todavía no tengo fecha';
  const [year, month, day] = value.split('-');
  return `${day}/${month}/${year}`;
}
