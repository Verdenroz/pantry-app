import React, { useState } from 'react';
import { IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

const EditQuantityDialog = ({ name, quantity, editQuantity }) => {
  const [open, setOpen] = useState(false);
  const [newQuantity, setNewQuantity] = useState(quantity);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    editQuantity(name, newQuantity);
    handleClose();
  };

  return (
    <>
      <IconButton onClick={handleClickOpen}>
        <EditIcon />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Quantity</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Edit the quantity for {name}.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Quantity"
            type="number"
            fullWidth
            value={newQuantity}
            onChange={(e) => setNewQuantity(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EditQuantityDialog;