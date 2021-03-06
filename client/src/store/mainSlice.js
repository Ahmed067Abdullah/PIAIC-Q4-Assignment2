import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Adoption from '../contracts/Adoption.json';
import Web3 from "web3";

export const initWeb3 = createAsyncThunk(
  "InitWeb3",
  async () => {
    try {
      if (Web3.givenProvider) {
        // Step 1: Enable Web3
        const web3 = new Web3(Web3.givenProvider);
        await Web3.givenProvider.enable();

        // Step 2: Load contract(s) from network
        const networkId = await web3.eth.net.getId();
        const network = Adoption.networks[networkId];
        const contract = new web3.eth.Contract(Adoption.abi, network.address);

        // Step 3: Get client active address
        const addresses = await web3.eth.getAccounts();

        // Store all above data in store
        return {
          web3,
          contract: contract,
          address: addresses[0]
        };
      }
      else {
        console.log("Error in loading web3");
      }
    }
    catch (error) {
      console.log("Error in loading Blockchain = ", error);
    }

  }
);

const mainSlice = createSlice({
  name: "main",
  initialState: {
    web3: null,
    contract: null,
    address: null,
  },
  extraReducers: {
    [initWeb3.fulfilled]: (state, action) => {
      state.web3 = action.payload.web3;
      state.contract = action.payload.contract;
      state.address = action.payload.address;
    },
  }
});

export default mainSlice.reducer;
