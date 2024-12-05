import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:5000/api/carts";
const token = localStorage.getItem("token");

// Action untuk menambahkan item ke keranjang
export const addToCart = createAsyncThunk(
    'cart/addToCart',
    async (product, { getState, rejectWithValue }) => {
        try {
            const state = getState();
            const currentCart = state.cart.items;

            const existingProduct = currentCart.find(
                (item) => item.product._id === product._id
            );

            const updateQty = existingProduct
                ? existingProduct.qty + product.qty
                : product.qty

            const response = await axios.put(
                BASE_URL,
                {
                    items: [{ product_id: product._id, qty: updateQty }],
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            return response.data.cart;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    });

// Action untuk mendapatkan item dari keranjang
export const getCartItems = createAsyncThunk(
    'cart/getCartItems',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(BASE_URL, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data.cart;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    });

export const updateQty = createAsyncThunk(
    'cart/updateQty',
    async ({ product_id, qty }, { rejectWithValue }) => {
        try {
            const response = await axios.put(
                BASE_URL,
                {
                    items: [{ product_id, qty }]
                },
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);


export const deleteCart = createAsyncThunk(
    "cart/deleteCart",
    async (id, { rejectWithValue, dispatch }) => {
        try {
            if (!id) throw new Error('Invalid ID');
            await axios.delete(`${BASE_URL}/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            dispatch(getCartItems)

            return id;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    });





const cartSlice = createSlice({
    name: "cart",
    initialState: {
        items: [],
        qty: 0,
        total: 0,
        error: null,
    },
    reducers: {
        clearCart: (state) => {
            state.items = [];
        },
        increase: (state, { payload }) => {
            const cartItem = state.items.find((item) => item._id === payload.id);
            if (cartItem) {
                cartItem.qty += 1;
            }
        },
        decrease: (state, { payload }) => {
            const cartItem = state.items.find((item) => item._id === payload.id);
            if (cartItem && cartItem.qty > 0) {
                cartItem.qty -= 1;

                if (cartItem.qty === 0) {
                    state.items = state.items.filter((item) => item._id !== payload.id);
                }
            }
        },
        calculateTotals: (state) => {
            let qty = 0;
            let total = 0;
            state.items.forEach((item) => {
                qty += item.qty;
                total += item.qty * item.price;
            });
            state.qty = qty;
            state.total = total;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCartItems.fulfilled, (state, action) => {
                state.items = action.payload;
            })
            .addCase(getCartItems.rejected, (state, action) => {
                state.error = action.payload;
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                state.items = action.payload;
            })
            .addCase(addToCart.rejected, (state, action) => {
                state.error = action.payload;
            })
            .addCase(updateQty.fulfilled, (state, action) => {
                const { product_id, qty } = action.payload;
                const existingItem = state.items.find((item) => item.product === product_id);

                if (existingItem) {
                    existingItem.qty = qty;
                }
            })
            .addCase(updateQty.rejected, (state, action) => {
                state.error = action.payload;
            })
            .addCase(deleteCart.fulfilled, (state, action) => {
                state.items = state.items.filter((item) => item.id !== action.payload);
            })
            .addCase(deleteCart.rejected, (state, action) => {
                state.error = action.payload;
            });

    },
});

export const {
    clearCart,
    increase,
    decrease,
    calculateTotals,
    removeItem,
} = cartSlice.actions;

export default cartSlice.reducer;
