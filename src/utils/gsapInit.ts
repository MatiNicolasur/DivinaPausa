import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

let isInitialized = false;

export function initGSAP() {
  if (typeof window === 'undefined') return;
  
  if (!isInitialized) {
    try {
      gsap.registerPlugin(ScrollTrigger);
      isInitialized = true;
      console.log('GSAP and ScrollTrigger initialized');
    } catch (error) {
      console.error('Error initializing GSAP:', error);
    }
  }
  
  // Create a new GSAP context for cleanup
  const ctx = gsap.context(() => {});
  
  // Return cleanup function
  return () => ctx.revert();
}

export function setupPageAnimations(animationCallback: () => void) {
  if (typeof window === 'undefined') return () => {};
  
  // Initialize GSAP if not already done
  initGSAP();
  
  // Create a new GSAP context for this page
  const ctx = gsap.context(() => {
    // Run the provided animation setup
    animationCallback();
    
    // Refresh ScrollTrigger after all animations are set up
    ScrollTrigger.refresh();
  });
  
  // Return cleanup function
  return () => ctx.revert();
}
