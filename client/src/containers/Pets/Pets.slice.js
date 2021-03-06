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

const removeAdapterLoading = (loading, petId) => loading.filter(a => a !== petId);

const petsSlice = createSlice({
  name: "PetsSlice",
  initialState: {
    adopters: [],
    adoptersLoading: []
  },
  extraReducers: {
    [loadAdopters.fulfilled]: (state, action) => {
      state.adopters = action.payload
    },
    [adoptPet.fulfilled]: (state, action) => {
      state.adopters[action.payload.petIndex] = action.payload.adopterAddress;
      state.adoptersLoading = removeAdapterLoading(state.adoptersLoading, action.meta.arg);
    },
    [adoptPet.pending]: (state, action) => {
      state.adoptersLoading.push(action.meta.arg);
    },
    [adoptPet.rejected]: (state, action) => {
      const { message } = action.error;
      state.adoptersLoading = removeAdapterLoading(state.adoptersLoading, action.meta.arg);
      if (message.indexOf("Already adopted") !== -1 || message.indexOf("Transaction has been reverted by the EVM") !== -1) alert("Pet is already adopted");
      else alert(message);
    },
    [unadoptPet.fulfilled]: (state, action) => {
      state.adopters[action.payload.petIndex] = "0x0000000000000000000000000000000000000000";
      state.adoptersLoading = removeAdapterLoading(state.adoptersLoading, action.meta.arg);
    },
    [unadoptPet.pending]: (state, action) => {
      state.adoptersLoading.push(action.meta.arg);
    },
    [unadoptPet.rejected]: (state, action) => {
      const { message } = action.error;
      state.adoptersLoading = removeAdapterLoading(state.adoptersLoading, action.meta.arg);
      if (message.indexOf("You have not adopted this pet") !== -1 || message.indexOf("Transaction has been reverted by the EVM") !== -1) alert("You have not adopted this pet");
      else alert(message);
      console.log(message);
    },
  }
})

export default petsSlice.reducer;
export const { adopt } = petsSlice.actions;