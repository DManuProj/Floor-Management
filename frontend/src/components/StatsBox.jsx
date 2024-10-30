import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import DeskIcon from "@mui/icons-material/Desk";
import PeopleIcon from "@mui/icons-material/People";
import LanguageIcon from "@mui/icons-material/Language";
import axios from "axios";

const StatsBox = () => {
  const [roomData, setRoomData] = useState([]);

  console.log(roomData);
  useEffect(() => {
    const getdata = async () => {
      try {
        const result = await axios.get(
          "http://localhost:5000/api/get-all-tables"
        );

        console.log(result.data);

        if (result) {
          setRoomData(result.data);
        }
      } catch (error) {
        console.log(error.stack);
      }
    };
    getdata();
    // getRoomData();
  }, []);
  return (
    <Box
      width={"100%"}
      display={"flex"}
      justifyContent={"center"}
      sx={{
        height: "4rem",
        padding: "0 1rem",
      }}
    >
      <Box
        display={"flex"}
        width={"70%"}
        alignItems={"center"}
        justifyContent={"space-between"}
        sx={{
          backgroundColor: "black",
          color: "white",
          padding: "0 1rem",
          borderRadius: "10px",
          height: "70%",
        }}
      >
        <Box display="flex" alignItems="center">
          <DeskIcon />
          <Typography variant="body1" sx={{ marginLeft: "0.25rem" }}>
            {roomData.data?.totalTables} Tables
          </Typography>
        </Box>
        <Box display="flex" alignItems="center">
          <PeopleIcon />
          <Typography variant="body1" sx={{ marginLeft: "0.25rem" }}>
            {roomData.data?.totalMinCovers} Min Covers
          </Typography>
        </Box>
        <Box display="flex" alignItems="center">
          <PeopleIcon />
          <Typography variant="body1" sx={{ marginLeft: "0.25rem" }}>
            {roomData.data?.totalMaxCovers} Max Covers
          </Typography>
        </Box>
        <Box display="flex" alignItems="center">
          <LanguageIcon />
          <Typography variant="body1" sx={{ marginLeft: "0.28rem" }}>
            {roomData.data?.onlineTableCount} - {roomData.data?.totalTables}
            Online Captivity
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default StatsBox;
