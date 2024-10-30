import { configureStore } from "@reduxjs/toolkit";
import tablesReducer from "./tableSlice";
import roomsReducer from "./roomSlice";

const store = configureStore({
  reducer: {
    tables: tablesReducer,
    rooms: roomsReducer,
  },
});

export default store;
