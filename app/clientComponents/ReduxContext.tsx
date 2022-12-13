"use client";

import { Provider } from 'react-redux'
import { store } from 'redux/store'

export interface ReduxContextProps {
  children: React.ReactNode;
}

export default function ReduxContext({ children }: ReduxContextProps) {
  return <Provider store={store} >{children}</Provider>;
}