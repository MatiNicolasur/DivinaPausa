declare global {
  interface Window {
    scrollToCTA: () => void;
    openFaqModal: (modalId: string) => void;
    closeFaqModal: (modalId: string) => void;
  }
}

export {};
