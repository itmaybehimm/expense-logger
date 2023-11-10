export interface PopupState {
  isVisbile: boolean;
  status: number;
  message: string;
}

export interface PopupAction {
  status: number;
  message: string;
}
