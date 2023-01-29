/// <reference types="vite/client" />

// declare module "*.vue";

export interface Workspace {
  id: number;
  content: string;
}

export interface UserConfig {
  font: string;
  family: string;
  theme?: string;
}
