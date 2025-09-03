declare const self: ServiceWorkerGlobalScope;
export {};

declare module '*.svg' {
  const content: any;
  export default content;
}

declare module '*.png' {
  const value: any;
  export = value;
}

declare module '*.jpg' {
  const value: any;
  export = value;
}

declare module '*.mp4' {
  const src: string;
  export default src;
}

declare module '*.md' {
  const src: string;
  export default src;
}

declare module '*.webp' {
  const value: any;
  export = value;
}

declare module '*.gif' {
  const value: any;
  export = value;
}
