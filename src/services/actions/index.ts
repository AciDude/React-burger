import { TSetTypeScreen } from "../types";

export const SET_TYPE_SCREEN = "SET_TYPE_SCREEN";

export const setTypeScreen = (bool: boolean): TSetTypeScreen => ({
  type: SET_TYPE_SCREEN,
  payload: bool,
});
