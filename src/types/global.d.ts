declare global {
  interface Window {
    scrollToCTA: () => void;
    openFaqModal: (modalId: string) => void;
    closeFaqModal: (modalId: string) => void;
    fbq?: (command: 'init' | 'track', eventName: string, parameters?: Record<string, string>) => void;
    _fbq?: Window['fbq'];
  }
}

export {};
