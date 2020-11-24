import { Registry } from "../core/registry";

export interface HandlerProvider extends Registry{
  serve(): void
}