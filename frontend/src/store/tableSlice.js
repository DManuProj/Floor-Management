import { createSlice } from "@reduxjs/toolkit";

const tablesSlice = createSlice({
  name: "tables",
  initialState: {
    tables: [], // Array of tables per room
    selectedTableId: null,
  },
  reducers: {
    addTable: (state, action) => {
      const { roomId, table } = action.payload;
      state.tables[roomId] = [...(state.tables[roomId] || []), table];
    },
    updateTable: (state, action) => {
      const { roomId, tableId, data } = action.payload;
      const roomTables = state.tables[roomId];
      const tableIndex = roomTables.findIndex((table) => table.id === tableId);
      if (tableIndex >= 0) {
        roomTables[tableIndex] = { ...roomTables[tableIndex], ...data };
      }
    },
    selectTable: (state, action) => {
      state.selectedTableId = action.payload;
    },
  },
});

export const { addTable, updateTable, selectTable } = tablesSlice.actions;
export default tablesSlice.reducer;
