import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
// Importa o cliente Axios configurado
import api from './api'; 

export interface Item {
    _id: string;
    name: string;
    completed: boolean;
    createdAt: string;
}

interface ShoppingState {
    items: Item[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: ShoppingState = {
    items: [],
    status: 'idle',
    error: null,
};

// Async Thunks
// 1. Fetch Items
export const fetchItems = createAsyncThunk<Item[], void>(
    'shopping/fetchItems',
    async (_, { rejectWithValue }) => {
        try {
            // CRÍTICO: Usa a rota relativa '/shopping/items' com o 'api' configurado
            const response = await api.get('/shopping/items');
            return response.data;
        } catch (error: any) {
            const message = error.response?.data?.message || 'Falha ao buscar itens. Verifique a conexão com o backend.';
            return rejectWithValue(message);
        }
    }
);

// 2. Add Item
export const addItem = createAsyncThunk<Item, string>(
    'shopping/addItem',
    async (itemName, { rejectWithValue }) => {
        try {
            // CRÍTICO: Usa a rota relativa '/shopping/items' com o 'api' configurado
            const response = await api.post('/shopping/items', { name: itemName });
            return response.data;
        } catch (error: any) {
            const message = error.response?.data?.message || 'Falha ao adicionar item. Verifique a conexão.';
            return rejectWithValue(message);
        }
    }
);

// 3. Toggle Item (Complete/Incomplete)
export const toggleItem = createAsyncThunk<Item, string>(
    'shopping/toggleItem',
    async (itemId, { rejectWithValue }) => {
        try {
            // CRÍTICO: Usa a rota relativa '/shopping/items/:id/toggle' com o 'api' configurado
            const response = await api.patch(`/shopping/items/${itemId}/toggle`);
            return response.data;
        } catch (error: any) {
            const message = error.response?.data?.message || 'Falha ao alterar item.';
            return rejectWithValue(message);
        }
    }
);

// 4. Delete Item
export const deleteItem = createAsyncThunk<string, string>(
    'shopping/deleteItem',
    async (itemId, { rejectWithValue }) => {
        try {
            // CRÍTICO: Usa a rota relativa '/shopping/items/:id' com o 'api' configurado
            await api.delete(`/shopping/items/${itemId}`);
            return itemId;
        } catch (error: any) {
            const message = error.response?.data?.message || 'Falha ao deletar item.';
            return rejectWithValue(message);
        }
    }
);

const shoppingSlice = createSlice({
    name: 'shopping',
    initialState,
    reducers: {
        clearShoppingError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // --- Fetch Items ---
            .addCase(fetchItems.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchItems.fulfilled, (state, action: PayloadAction<Item[]>) => {
                state.status = 'succeeded';
                state.items = action.payload;
                state.error = null;
            })
            .addCase(fetchItems.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
                state.items = []; // Limpa a lista em caso de falha de carregamento
            })
            // --- Add Item ---
            .addCase(addItem.fulfilled, (state, action: PayloadAction<Item>) => {
                state.items.push(action.payload);
                state.status = 'succeeded'; // Atualiza status se estava em 'failed'
                state.error = null;
            })
            .addCase(addItem.rejected, (state, action) => {
                state.error = action.payload as string;
            })
            // --- Toggle Item ---
            .addCase(toggleItem.fulfilled, (state, action: PayloadAction<Item>) => {
                const index = state.items.findIndex(item => item._id === action.payload._id);
                if (index !== -1) {
                    state.items[index] = action.payload;
                }
            })
            .addCase(toggleItem.rejected, (state, action) => {
                state.error = action.payload as string;
            })
            // --- Delete Item ---
            .addCase(deleteItem.fulfilled, (state, action: PayloadAction<string>) => {
                state.items = state.items.filter(item => item._id !== action.payload);
            })
            .addCase(deleteItem.rejected, (state, action) => {
                state.error = action.payload as string;
            });
    },
});

export const { clearShoppingError } = shoppingSlice.actions;

export default shoppingSlice.reducer;
