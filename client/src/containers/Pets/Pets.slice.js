import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const loadAdopters = createAsyncThunk(
  "LoadAdopters",
  async (payload, thunkAPI) => {
    const contract = thunkAPI.getState().main.contract;
    const adopterList = await contract.methods.getAdopters().call();
    return adopterList;
  }
)

export const adoptPet = createAsyncThunk(
  "AdoptPet",
  async (petIndex, thunkAPI) => {
    const contract = thunkAPI.getState().main.contract;
    const address = thunkAPI.getState().main.address;
    await contract.methods.adopt(petIndex).send({ from: address });
    return {
      adopterAddress: address,
      petIndex
    };
  }
);

export const unadoptPet = createAsyncThunk(
  "UnadoptPet",
  async (petIndex, thunkAPI) => {
    const contract = thunkAPI.getState().main.contract;
    const address = thunkAPI.getState().main.address;
    await contract.methods.unadopt(petIndex).send({ from: address });
    return { petIndex };
  }
);

const petsSlice = createSlice({
  name: "PetsSlice",
  initialState: {
    adopters: [],
  },
  extraReducers: {
    [loadAdopters.fulfilled]: (state, action) => {
      state.adopters = action.payload
    },
    [adoptPet.fulfilled]: (state, action) => {
      state.adopters[action.payload.petIndex] = action.payload.adopterAddress
    },
    [adoptPet.pending]: (state, action) => {

    },
    [adoptPet.rejected]: (state, action) => {
      const { message } = action.error;
      if(message.substring(message.indexOf("Already adopted")));
      alert("Pet is already adopted");
    },
    [unadoptPet.fulfilled]: (state, action) => {
      state.adopters[action.payload.petIndex] = "0x0000000000000000000000000000000000000000"
    },
  }
})

export default petsSlice.reducer;
export const { adopt } = petsSlice.actions;