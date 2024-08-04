import React, { useState } from "react";
import EditQuantityDialog from "./dialog";
import { Box, Button, Typography } from "@mui/material";

const InventoryItem = ({ name, quantity, removeItem, editQuantity }) => {
  return (
    <Box
      key={name}
      display={"flex"}
      justifyContent={"space-between"}
      alignItems={"center"}
      bgcolor={"#f0f0f0"}
      paddingX={5}
    >
      <Typography
        variant={"h6"}
        width="25%"
        color={"#333"}
        textAlign={"center"}
        flexShrink={0}
      >
        {name.charAt(0).toUpperCase() + name.slice(1)}
      </Typography>
      <Typography
        variant={"h6"}
        color={"#333"}
        textAlign={"center"}
        flexShrink={0}
      >
        Quantity: {quantity}
      </Typography>

      <Button variant="contained" onClick={() => removeItem(name)}>
        Remove
      </Button>

      <EditQuantityDialog
        name={name}
        quantity={quantity}
        editQuantity={editQuantity}
      />
    </Box>
  );
};

export default InventoryItem;
