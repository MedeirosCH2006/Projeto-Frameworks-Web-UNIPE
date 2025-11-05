// items/actions.ts

import { ItemsActionTypes, ItemsAction, Item } from './types';

// 1. Ação para Iniciar a Busca de Itens (sem payload)
export const fetchItemsRequest = (): ItemsAction => ({
  type: ItemsActionTypes.FETCH_REQUEST,
});

// 2. Ação para Busca de Itens Bem-Sucedida
export const fetchItemsSuccess = (items: Item[]): ItemsAction => ({
  type: ItemsActionTypes.FETCH_SUCCESS,
  payload: items,
});

// 3. Ação para Busca de Itens com Falha
export const fetchItemsFailure = (error: string): ItemsAction => ({
  type: ItemsActionTypes.FETCH_FAILURE,
  payload: error,
});

// 4. Ação para Adicionar um Novo Item
export const addItem = (item: Item): ItemsAction => ({
  type: ItemsActionTypes.ADD_ITEM,
  payload: item,
});

// 5. Ação para Deletar um Item
export const deleteItem = (id: string): ItemsAction => ({
  type: ItemsActionTypes.DELETE_ITEM,
  payload: id,
});

