import { createSlice } from '@reduxjs/toolkit';

const paginationSlice = createSlice({
  name: 'pagination',
  initialState: {
    currentPage: 0,
    previousPage: null,
    data: [],
  },
  reducers: {
    setCurrentPage: (state, action) => {
      state.previousPage = state.currentPage;
      state.currentPage = action.payload;
    },
    setData: (state, action) => {
      state.previousData = state.data;
      state.data = action.payload;
    },
    removeData: (state, action) => {
      const pid = action.payload;
      state.data = state.data.filter(item => item.pid !== pid);
    },
  },
});

export const { setCurrentPage, setData,removeData } = paginationSlice.actions;
export const selectCurrentPage = (state) => state.pagination.currentPage;
export const selectPreviousPage = (state) => state.pagination.previousPage;
export const selectData = (state) => state.pagination.data;
export const paginationReducer = paginationSlice.reducer;