import { RouterEffects } from './router/router.effect';
import { LayoutEffects } from './layout/layout.effect';

export const effects: any[] = [
  RouterEffects,
  LayoutEffects,
];

export * from './router/router.effect';
export * from './layout/layout.effect';
