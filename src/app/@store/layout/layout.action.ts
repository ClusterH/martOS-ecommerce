import { Action } from '@ngrx/store';

export const RESIZE_WINDOW = '[Layout] Resize window';

export class ResizeWindow implements Action {
  readonly type: string = RESIZE_WINDOW;
  constructor(public payload: { width: number, height: number }) { }
}

export const TOGGLE_SIDEBAR = '[Layout] Toggle Sidebar';

export class ToggleSidebar implements Action {
  readonly type: string = TOGGLE_SIDEBAR;
}

export type LayoutActions =
  | ResizeWindow
  | ToggleSidebar;
