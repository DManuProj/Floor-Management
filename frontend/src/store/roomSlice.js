import { createSlice } from "@reduxjs/toolkit";

const roomsSlice = createSlice({
  name: "rooms",
  initialState: {
    rooms: [{ id: 0, name: "Main Room" }],
  },
  reducers: {
    addRoom: (state) => {
      const newRoomId = state.rooms.length;
      state.rooms.push({ id: newRoomId, name: `Room ${newRoomId + 1}` });
    },
    saveRoomData: (state) => {
      console.log("Saving Room Data:", state.rooms);
    },
  },
});

export const { addRoom, saveRoomData } = roomsSlice.actions;
export default roomsSlice.reducer;
