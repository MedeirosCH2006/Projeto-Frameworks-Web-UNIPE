// items/types.ts

// 1. Tipagem para um único Item
export interface Item {
  id: string;
  name: string;
  description: string;
  price: number;
}

// 2. Tipagem para o Estado do Módulo Items
export interface ItemsState {
  list: Item[];
  loading: boolean;
  error: string | null;
}

// 3. Tipos de Ações (Action Types)
export enum ItemsActionTypes {
  FETCH_REQUEST = 'items/FETCH_REQUEST',
  FETCH_SUCCESS = 'items/FETCH_SUCCESS',
  FETCH_FAILURE = 'items/FETCH_FAILURE',
  ADD_ITEM = 'items/ADD_ITEM',
  DELETE_ITEM = 'items/DELETE_ITEM',
}

// 4. Tipagem das Ações (Actions)
interface FetchRequestAction {
  type: ItemsActionTypes.FETCH_REQUEST;
}

interface FetchSuccessAction {
  type: ItemsActionTypes.FETCH_SUCCESS;
  payload: Item[];
}

interface FetchFailureAction {
  type: ItemsActionTypes.FETCH_FAILURE;
  payload: string; // Mensagem de erro
}

interface AddItemAction {
  type: ItemsActionTypes.ADD_ITEM;
  payload: Item;
}

interface DeleteItemAction {
  type: ItemsActionTypes.DELETE_ITEM;
  payload: string; // ID do item a ser deletado
}

// Union Type de todas as ações possíveis
export type ItemsAction = FetchRequestAction 
  | FetchSuccessAction 
  | FetchFailureAction 
  | AddItemAction 
  | DeleteItemAction;
