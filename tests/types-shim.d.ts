// Minimal stand-in declarations so `tsc` can check this project's own code in a sandbox
// without @types/react or next installed. Not shipped; real types come from npm.
declare namespace React {
  type ReactNode = any;
  type CSSProperties = { [k: string]: string | number | undefined };
  interface SyntheticEvent<T = Element> { currentTarget: T; preventDefault(): void }
  interface KeyboardEvent<T = Element> extends SyntheticEvent<T> { key: string }
  type RefObject<T> = { current: T | null };
}
declare module "react" {
  export type ReactNode = React.ReactNode;
  export type CSSProperties = React.CSSProperties;
  export type KeyboardEvent<T = Element> = React.KeyboardEvent<T>;
  export type SyntheticEvent<T = Element> = React.SyntheticEvent<T>;
  export function useState<S>(init: S | (() => S)): [S, (v: S | ((p: S) => S)) => void];
  export function useRef<T>(init: T): { current: T };
  export function useRef<T>(init: T | null): React.RefObject<T>;
  export function useEffect(fn: () => void | (() => void), deps?: unknown[]): void;
  export function useMemo<T>(fn: () => T, deps: unknown[]): T;
  export function useCallback<T extends (...a: any[]) => any>(fn: T, deps: unknown[]): T;
}
declare module "react/jsx-runtime" { export const jsx: any; export const jsxs: any; export const Fragment: any; }
declare namespace JSX { interface IntrinsicElements { [el: string]: any } interface Element {} interface ElementChildrenAttribute { children: {} } interface IntrinsicAttributes { key?: string | number } }
declare const process: { env: Record<string, string | undefined> };
declare module "next/image" {
  const Image: (p: { src: string; alt: string; fill?: boolean; sizes?: string; priority?: boolean; placeholder?: "blur" | "empty"; blurDataURL?: string; className?: string; style?: React.CSSProperties; onError?: (e: React.SyntheticEvent<HTMLImageElement>) => void }) => any;
  export default Image;
}
declare module "next" {
  export type Metadata = Record<string, unknown>;
  export type Viewport = Record<string, unknown>;
  export namespace MetadataRoute { type Robots = { rules: { userAgent: string; disallow: string }[] } }
  export type NextConfig = Record<string, unknown> & { headers?: () => Promise<unknown[]> };
}
declare module "next/font/google" {
  type F = (o: Record<string, unknown>) => { variable: string; className: string };
  export const Archivo: F; export const Source_Serif_4: F; export const IBM_Plex_Mono: F;
}
declare module "next/server" {
  export class NextResponse extends Response { static next(): NextResponse }
  export type NextRequest = Request;
}
declare module "*.css" {}
