import { Box, Divider, Typography, Checkbox } from "@mui/material";
import React, { useState } from "react";

const AdvancedSettings = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleAdvancedSettings = (event) => {
    // Toggle expansion based on checkbox checked state
    setIsExpanded(event.target.checked);
  };

  return (
    <Box>
      <Divider />
      <Box sx={{ fontWeight: "bold", marginBottom: "1.5rem" }} />
      <Typography variant="h7" sx={{ fontWeight: "bold", marginTop: "1.5rem" }}>
        Advanced Settings
        <Checkbox
          checked={isExpanded}
          onChange={toggleAdvancedSettings}
          sx={{ marginLeft: "8px" }}
        />
      </Typography>
      {isExpanded && (
        <div
          style={{
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        >
          <p>Advanced settings coming soon!</p>
          {/* Future advanced settings can be added here */}
        </div>
      )}
    </Box>
  );
};

export default AdvancedSettings;
