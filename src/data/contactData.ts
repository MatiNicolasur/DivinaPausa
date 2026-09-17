export const contact = {
  email: 'contacto@divinapausa.cl',
  phones: [
    { label: '+56 9 7689 7765', number: '+56976897765' },
    { label: '+56 9 9419 7972', number: '+56994197972' },
  ],
};

export function whatsappLink(message = 'Hola Divina Pausa, me gustaría cotizar un evento.') {
  return `https://wa.me/56976897765?text=${encodeURIComponent(message)}`;
}

export const emailLink = `mailto:${contact.email}?subject=${encodeURIComponent('Cotización de catering')}`;
