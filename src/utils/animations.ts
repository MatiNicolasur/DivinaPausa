import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { initGSAP } from './gsapInit';

// Helper function for common scroll-triggered animations
export function animateOnScroll(
  target: gsap.DOMTarget,
  animationProps: gsap.TweenVars,
  scrollTriggerProps: Partial<ScrollTrigger.Vars> = {},
  isDesktopOnly: boolean = true // New parameter for conditional ScrollTrigger
): gsap.core.Tween | gsap.core.Timeline | undefined {
  const elements = typeof target === 'string' ? gsap.utils.toArray<Element>(target) : target;

  if (!(elements instanceof Element) && (!Array.isArray(elements) || elements.length === 0 || !elements.every(el => el instanceof Element))) {
    console.warn('animateOnScroll: Invalid target or empty target array.', target);
    return;
  }

  const defaultAnimationProps: gsap.TweenVars = {
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out',
  };

  const defaultScrollTriggerProps: Partial<ScrollTrigger.Vars> = {
    trigger: elements,
    start: 'top 85%',
    end: 'bottom top',
    toggleActions: 'play none none none',
    once: true,
    // markers: import.meta.env.DEV, // Keep commented for production
  };

  const finalAnimationProps = { ...defaultAnimationProps, ...animationProps };
  const finalScrollTriggerProps = { ...defaultScrollTriggerProps, ...scrollTriggerProps };

  if (isDesktopOnly && typeof window !== 'undefined' && window.matchMedia('(max-width: 1023px)').matches) {
    // On smaller screens, play animation immediately without ScrollTrigger
    // Remove scrollTrigger prop from finalAnimationProps if it exists to avoid GSAP warnings
    const { scrollTrigger, ...animPropsWithoutScrollTrigger } = finalAnimationProps;
    return gsap.from(elements, animPropsWithoutScrollTrigger);
  } else {
    // On desktop or if not desktopOnly, use ScrollTrigger
    return gsap.from(elements, {
      ...finalAnimationProps,
      scrollTrigger: finalScrollTriggerProps,
    });
  }
}

// Main initialization function for page animations
export function initPageAnimations(): () => void {
  // Initialize GSAP if not already done
  const cleanup = initGSAP();
  
  // Create a cleanup function
  const cleanupAll = () => {
    cleanup?.();
    if (typeof window !== 'undefined') {
      window.removeEventListener('unload', cleanupAll);
    }
  };
  
  // Add cleanup to window unload
  if (typeof window !== 'undefined') {
    window.addEventListener('unload', cleanupAll);
  }
  
  // Create a GSAP context for animations
  const ctx = gsap.context(() => {
    // Banner Animations
    gsap.from('.banner h1', {
      opacity: 0,
      y: -50,
      duration: 1.0,
      ease: 'power3.out',
      delay: 0.3,
    });
    
    gsap.from('.buttons-banner a', {
      opacity: 0,
      y: 30,
      duration: 1.0,
      ease: 'power3.out',
      stagger: 0.2,
      delay: 0.5,
    });
    
    // Services Section Animations
    animateOnScroll('.head-services-title', { x: -50, opacity: 0 });
    animateOnScroll('.head-services-description', { x: 50, opacity: 0, delay: 0.15 });
    
    animateOnScroll(
      gsap.utils.toArray('.body-service-item'),
      { opacity: 0, y: 50, stagger: 0.2, duration: 0.6 },
      { trigger: '.body-services', start: 'top 80%' },
      false // Apply ScrollTrigger on all screen sizes for this specific animation
    );
  });
  
  // Return a cleanup function that reverts the context and cleans up
  return () => {
    ctx.revert();
    cleanupAll();
  };
}

// Function to be called from Astro page script to set up animations
export function setupPageAnimations(animationCallback?: () => void): () => void {
  if (typeof window === 'undefined') return () => {};
  
  // Initialize GSAP and get cleanup function
  const cleanupGSAP = initGSAP();
  
  // Create a cleanup function that reverts both GSAP context and cleans up GSAP
  const cleanup = () => {
    cleanupGSAP?.();
    if (typeof window !== 'undefined') {
      window.removeEventListener('unload', cleanup);
    }
  };
  
  // Set up page animations if a callback is provided
  if (animationCallback) {
    const ctx = gsap.context(() => {
      animationCallback();
      ScrollTrigger.refresh();
    });
    
    // Update cleanup function to also revert the context
    const originalCleanup = cleanup;
    return () => {
      ctx.revert();
      originalCleanup();
    };
  }
  
  return cleanup;
}
