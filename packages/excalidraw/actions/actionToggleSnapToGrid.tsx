import { CODES, KEYS } from "../keys";
import { register } from "./register";
import type { AppState } from "../types";
import { gridIcon } from "../components/icons";
import { StoreAction } from "../store";

export const actionToggleSnapToGrid = register({
  name: "snapToGridMode",
  icon: gridIcon,
  keywords: ["snap"],
  label: "labels.toggleSnapToGrid",
  viewMode: true,
  trackEvent: {
    category: "canvas",
    predicate: (appState) => !appState.gridSize,
  },
  perform(elements, appState) {
    return {
      appState: {
        ...appState,
        snapToGrid: !this.checked!(appState),
        objectsSnapModeEnabled: this.checked!(appState),
      },
      storeAction: StoreAction.NONE,
    };
  },
  checked: (appState: AppState) => appState.snapToGrid === true,
  predicate: (element, appState, props) => {
    return typeof props.gridModeEnabled === "undefined";
  },
  keyTest: (event) => event[KEYS.CTRL_OR_CMD] && event.code === CODES.QUOTE,
});
