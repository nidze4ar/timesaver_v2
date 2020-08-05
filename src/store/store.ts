import { createStore, combineReducers, compose } from 'redux'
import { core } from './reducer/calendar'
import { ui } from './reducer/ui'
import { ux } from './reducer/ux'
import { ActionsTypes as CalendarActionsTypes } from  './reducer/calendar'
import { ActionsTypes as UIActionsTypes } from  './reducer/ui'
import { ActionsTypes as UXActionsTypes } from  './reducer/ux'
export type CoreActionsTypes = CalendarActionsTypes|UIActionsTypes|UXActionsTypes
const rootReducer = combineReducers({ core, ui, ux })
type RootReducerType = typeof rootReducer
export type AppStateType = ReturnType<RootReducerType>
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(rootReducer,
/*
  (localStorage['redux-store']) && JSON.parse(localStorage['redux-store']).core.calendar ?
  JSON.parse(localStorage['redux-store']) : {}
)
store.subscribe(() => {
  localStorage['redux-store'] = JSON.stringify(store.getState())
})
*/
  composeEnhancers() )
export type InferActionsTypes<T> = T extends { [keys: string]: (...args: any[]) => infer U } ? U : never
