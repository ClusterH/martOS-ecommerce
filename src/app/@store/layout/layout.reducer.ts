import * as fromActions from './layout.action';
import { ROUTER_NAVIGATION } from '@ngrx/router-store';

export const TABLET_WIDTH = 1024;
export const LAPTOP_WIDTH = 1366;

export class LayoutState {
  sidebarOpened: boolean;
  isTablet: boolean;
  isLaptop: boolean;
  isDesktop: boolean;
  windowHeight: number;
  windowWidth: number;
}

const initialState: LayoutState = {
  sidebarOpened: true,
  isTablet: (window.innerWidth <= TABLET_WIDTH),
  isLaptop: (window.innerWidth > TABLET_WIDTH) && (window.innerWidth <= LAPTOP_WIDTH),
  isDesktop: window.innerWidth > LAPTOP_WIDTH,
  windowHeight: window.innerHeight,
  windowWidth: window.innerWidth,
};

export function layoutReducer(
  state: LayoutState = initialState,
  action: fromActions.LayoutActions
): LayoutState {
  switch (action.type) {
    case fromActions.RESIZE_WINDOW: {
      const height: number = action['payload']['height'];
      const width: number = action['payload']['width'];

      const isTablet = width <= TABLET_WIDTH;
      const isLaptop = (width > TABLET_WIDTH) && (width <= LAPTOP_WIDTH);
      const isDesktop = width > LAPTOP_WIDTH;

      return {
        ...state,
        windowHeight: height,
        windowWidth: width,
        isTablet,
        isLaptop,
        isDesktop,
      };
    }

    case fromActions.TOGGLE_SIDEBAR: {
      return {
        ...state,
        sidebarOpened: !state.sidebarOpened
      };
    }

    default:
      return state;
  }
}

export const getSidebarOpened: any = (state: LayoutState): boolean => state.sidebarOpened;
export const getIsTablet: any = (state: LayoutState): boolean => state.isTablet;
export const getIsLaptop: any = (state: LayoutState): boolean => state.isLaptop;
export const getIsDesktop: any = (state: LayoutState): boolean => state.isDesktop;
