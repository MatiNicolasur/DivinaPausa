
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// This function will be called from the client-side
export function initContactAnimations() {
  // Register the ScrollTrigger plugin
  gsap.registerPlugin(ScrollTrigger);

  // Animación del Hero
  gsap.from('.contact-hero h1, .contact-hero p', {
    opacity: 0,
    y: 30,
    duration: 0.8,
    stagger: 0.2,
    ease: 'power3.out',
  });

  // Animaciones con ScrollTrigger
  const animatedElements = gsap.utils.toArray('.contact-item, .map-container, .contact-form') as Element[];

  animatedElements.forEach((element: Element) => {
    gsap.from(element, {
      opacity: 0,
      y: 50,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: element,
        start: 'top 85%',
        end: 'bottom top',
        toggleActions: 'play none none none',
        once: true,
      },
    });
  });

  // Manejo del formulario
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto.');
      (e.target as HTMLFormElement).reset();
    });
  }
}