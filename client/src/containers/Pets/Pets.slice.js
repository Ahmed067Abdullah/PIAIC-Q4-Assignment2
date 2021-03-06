import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const loadAdopters = createAsyncThunk(
  "LoadAdopters",
  async (payload, thunkAPI) => {
    console.log("here")
    const contract = thunkAPI.getState().main.contract;
    const adopterList = await contract.methods.getAdopters().call();
    console.log(adopterList);
    return adopterList;
  }
)

export const adoptPet = createAsyncThunk(
  "AdoptPet",
  async (petIndex, thunkAPI) => {
    console.log("Hello in adopt pet");
    console.log(" in adopt pet petIndex = ", petIndex);
    console.log(" in adopt pet thunkAPI = ", thunkAPI);
    console.log(" in adopt pet c = ", thunkAPI.getState());
    const contract = thunkAPI.getState().main.contract;
    const address = thunkAPI.getState().main.address;
    const result = await contract.methods.adopt(petIndex).send({ from: address });
    console.log("after adopt result = ", result);

    return {
      adopterAddress: result.from,
      petIndex: petIndex
    };

  }
);


const petsSlice = createSlice({
  name: "PetsSlice",
  initialState: {
    adopters: [],
    adoptInProgress: false,
    adoptError: false,
    adoptErrorMessage: "",
    adoptersLoading: false,
  },
  extraReducers: {
    [loadAdopters.fulfilled]: (state, action) => {
      state.adopters = action.payload
    },
    [loadAdopters.rejected]: (state, action) => {
      console.log(state,action)
    },
    [adoptPet.fulfilled]: (state, action) => {
      console.log("Adopt pet fullfile state = ", state);
      console.log("Adopt pet fullfile action = ", action);
      state.adopters[action.payload.petIndex] = action.payload.adopterAddress
      state.adoptInProgress = false;
      state.adoptError = false
    },
    [adoptPet.pending]: (state, action) => {
      console.log("Adopt pet pending state = ", state);
      console.log("Adopt pet pending action = ", action);
      state.adoptInProgress = true;
    },
    [adoptPet.rejected]: (state, action) => {
      console.log("Adopt pet rejected state = ", state);
      console.log("Adopt pet rejected action = ", action);
      state.adoptInProgress = false;
      state.adoptError = true;
      state.adoptErrorMessage = action.error.message;
    }
  }
})

export default petsSlice.reducer;
export const { adopt } = petsSlice.actions;