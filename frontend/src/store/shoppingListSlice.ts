import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

// *** URL COMPLETA COODIFICADA PARA IGNORAR ERROS DE CACHE/PROXY ***
const BASE_URL = 'http://127.0.0.1:3001/api/list'; 
// ***************************************************************

interface ShoppingItem {
  _id: string;
  name: string;
  quantity: number;
  purchased: boolean;
}

interface ShoppingListState {
  items: ShoppingItem[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ShoppingListState = {
  items: [],
  status: 'idle',
  error: null,
};

// Função auxiliar para obter o token
const getToken = () => localStorage.getItem('token');


// --- Thunk: Buscar a Lista de Compras ---
export const fetchItems = createAsyncThunk('shoppingList/fetchItems', async (_, { rejectWithValue }) => {
  const token = getToken();
  if (!token) return rejectWithValue('Token não encontrado. Faça login novamente.');

  try {
    const response = await fetch(BASE_URL, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Falha ao buscar a lista (Erro de Token/CORS).');
    }

    return response.json();

  } catch (error: any) {
    let errorMessage = error.message || 'Falha ao buscar a lista. Verifique a conexão com o Backend.';
    return rejectWithValue(errorMessage);
  }
});

// --- Thunk: Adicionar Item ---
export const addItem = createAsyncThunk(
  'shoppingList/addItem',
  async (itemData: { name: string; quantity: number }, { rejectWithValue }) => {
    const token = getToken();
    if (!token) return rejectWithValue('Token não encontrado.');

    try {
      const response = await fetch(BASE_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(itemData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erro ao adicionar item.');
      }

      return response.json();

    } catch (error: any) {
      return rejectWithValue(error.message || 'Erro ao adicionar item.');
    }
  }
);

// --- Thunk: Alternar Status de Compra ---
export const toggleItem = createAsyncThunk(
    'shoppingList/toggleItem',
    async (item: ShoppingItem, { rejectWithValue }) => {
        const token = getToken();
        if (!token) return rejectWithValue('Token não encontrado.');

        try {
            const response = await fetch(`${BASE_URL}/${item._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ purchased: !item.purchased })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Erro ao atualizar item.');
            }

            return response.json();

        } catch (error: any) {
            return rejectWithValue(error.message || 'Erro ao atualizar item.');
        }
    }
);

// --- Thunk: Deletar Item ---
export const deleteItem = createAsyncThunk(
    'shoppingList/deleteItem',
    async (itemId: string, { rejectWithValue }) => {
        const token = getToken();
        if (!token) return rejectWithValue('Token não encontrado.');

        try {
            const response = await fetch(`${BASE_URL}/${itemId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Erro ao deletar item.');
            }

            return itemId;

        } catch (error: any) {
            return rejectWithValue(error.message || 'Erro ao deletar item.');
        }
    }
);


// --- Slice ---
const shoppingListSlice = createSlice({
  name: 'shoppingList',
  initialState,
  reducers: {
    clearList(state) {
        state.items = [];
        state.status = 'idle';
        state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch Items
      .addCase(fetchItems.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchItems.fulfilled, (state, action: PayloadAction<ShoppingItem[]>) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string || 'Falha ao buscar a lista.';
      })

      // Add Item
      .addCase(addItem.fulfilled, (state, action: PayloadAction<ShoppingItem>) => {
        state.items.unshift(action.payload);
        state.status = 'succeeded';
      })
      .addCase(addItem.rejected, (state, action) => {
         state.status = 'failed';
         state.error = action.payload as string || 'Erro ao adicionar item.';
      })

      // Toggle Item (Update)
      .addCase(toggleItem.fulfilled, (state, action: PayloadAction<ShoppingItem>) => {
          const index = state.items.findIndex(item => item._id === action.payload._id);
          if (index !== -1) {
              state.items[index] = action.payload;
          }
          state.status = 'succeeded';
      })
      .addCase(toggleItem.rejected, (state, action) => {
         state.status = 'failed';
         state.error = action.payload as string || 'Erro ao atualizar item.';
      })

      // Delete Item
      .addCase(deleteItem.fulfilled, (state, action: PayloadAction<string>) => {
          state.items = state.items.filter(item => item._id !== action.payload);
          state.status = 'succeeded';
      })
      .addCase(deleteItem.rejected, (state, action) => {
         state.status = 'failed';
         state.error = action.payload as string || 'Erro ao deletar item.';
      });
  },
});

export const { clearList } = shoppingListSlice.actions;

export default shoppingListSlice.reducer;
