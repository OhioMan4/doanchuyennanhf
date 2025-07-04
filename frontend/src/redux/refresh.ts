import { createSlice } from '@reduxjs/toolkit';

interface RefetchState {
  shouldRefetch: number; // dùng số để tăng version
}

const initialState: RefetchState = {
  shouldRefetch: 0,
};

const refetchSlice = createSlice({
  name: 'refetch',
  initialState,
  reducers: {
    triggerRefetch: (state) => {
      state.shouldRefetch += 1; 
    },
  },
});

export const { triggerRefetch } = refetchSlice.actions;
export default refetchSlice.reducer;
