// custom-react-dom-client.d.ts

declare module 'react-dom/client' {
    function createRoot(container: Element | DocumentFragment, options?: { hydrate?: boolean }): {
      render(element: React.ReactElement): void;
    };
  
    export { createRoot };
  }
  