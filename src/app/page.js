"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  Stack,
  Typography,
  Button,
  TextField,
} from "@mui/material";
import { firestore } from "../firebase.js";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  deleteDoc,
  documentId,
  where,
  getDoc,
} from "firebase/firestore";
import InventoryItem from "./components/item.js";
import SearchBar from "./components/search.js";

export default function Home() {
  const [inventory, setInventory] = useState([]);
  const [itemName, setItemName] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const updateInventory = async () => {
    const snapshot = query(collection(firestore, "inventory"));
    const docs = await getDocs(snapshot);
    const inventoryList = [];
    docs.forEach((doc) => {
      inventoryList.push({ name: doc.id, ...doc.data() });
    });
    setInventory(inventoryList);
  };

  useEffect(() => {
    updateInventory();
  }, []);

  const updateSearchResults = async (item) => {
    const collectionRef = collection(firestore, "inventory");
    const q = query(
      collectionRef,
      where(documentId(), ">=", item),
      where(documentId(), "<=", item + "\uf8ff")
    );

    const querySnapshot = await getDocs(q);
    const results = [];
    querySnapshot.forEach((doc) => {
      results.push({ id: doc.id, ...doc.data() });
    });
    setSearchResults(results);
  };

  const addItem = async (item) => {
    if (item === "") return;

    const docRef = doc(collection(firestore, "inventory"), item);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const { quantity } = docSnap.data();
      await setDoc(docRef, { quantity: Number(quantity) + 1 });
    } else {
      await setDoc(docRef, { quantity: 1 });
    }
    await updateInventory();

    if (searchResults.some((result) => result.id === item)) {
      await updateSearchResults(item);
    }
  };

  const removeItem = async (item) => {
    const docRef = doc(collection(firestore, "inventory"), item);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const { quantity } = docSnap.data();
      if (quantity === 1) {
        await deleteDoc(docRef);
      } else {
        await setDoc(docRef, { quantity: quantity - 1 });
      }
    }
    await updateInventory();

    if (searchResults.some((result) => result.id === item)) {
      await updateSearchResults(item);
    }
  };

  const editItem = async (item, quantity) => {
    const docRef = doc(collection(firestore, "inventory"), item);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      await setDoc(docRef, { quantity: quantity });
    }
    await updateInventory();

    if (searchResults.some((result) => result.id === item)) {
      await updateSearchResults(item);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center bg-[url('../assets/pantrybg.jpg')]">
      <Typography
        variant="h2"
        width={"100%"}
        textAlign={"center"}
        fontWeight={"bold"}
        sx={(bgcolor) => ({ bgcolor: bgcolor.palette.primary.main })}
      >
        Pantry Tracker
      </Typography>
      <Box
        width="100vw"
        height="100vh"
        display={"flex"}
        justifyContent={"space-between"}
        flexDirection={"row"}
        alignItems={"center"}
        gap={4}
      >
        <Box
          width="60%"
          height="100vh"
          display={"flex"}
          justifyContent={"center"}
          flexDirection={"column"}
          alignItems={"center"}
          gap={2}
        >
          <Box
            width={"80%"}
            display={"flex"}
            flexDirection={"column"}
            gap={2}
            paddingLeft={2}
            paddingRight={2}
          >
            <Stack width="100%" direction={"row"} spacing={2} justifyContent={"center"}>
              <TextField
                id="filled-basic"
                placeholder="Food Name"
                variant="filled"
                fullWidth
                color="secondary"
                sx={(theme) => ({
                  backgroundColor: theme.palette.background.paper,
                })}
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
              />
              <Button
                variant="outlined"
                onClick={() => {
                  addItem(itemName);
                  setItemName("");
                }}
                sx={(theme) => ({
                  backgroundColor: theme.palette.primary.main,
                })}
                color="secondary"
              >
                Add
              </Button>
            </Stack>
          </Box>
          <Box border={"1px solid #333"}>
            <Box
              width="800px"
              height="100px"
              bgcolor={"#f0f0f0"}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Typography variant={"h4"} color="black" textAlign={"center"}>
                Inventory
              </Typography>
            </Box>
            <Stack
              width="800px"
              height="400px"
              spacing={2}
              overflow={"auto"}
              bgcolor={"#f0f0f0"}
            >
              {inventory.map(({ name, quantity }) => (
  
                <InventoryItem
                  key={name}
                  name={name}
                  quantity={quantity}
                  removeItem={removeItem}
                  editQuantity={editItem}
                />
              ))}
            </Stack>
          </Box>
        </Box>
        <Box
          width="40%"
          height="100vh"
          display={"flex"}
          marginRight={4}
          justifyContent={"center"}
          flexDirection={"column"}
          alignItems={"center"}
          maxWidth="50%"
          gap={2}
        >
          <Typography variant="h3" color={"black"}>
            Search
          </Typography>
          <SearchBar
            setSearchResults={setSearchResults}
          />
          <Stack
              width="600px"
              height="600px"
              spacing={2}
              overflow={"auto"}
              bgcolor={"#f0f0f0"}
              paddingTop={2}
              border={"1px solid #333"}
            >
              {searchResults.map(({ id, quantity }) => (
                <InventoryItem
                  key={id}
                  name={id}
                  quantity={quantity}
                  removeItem={removeItem}
                  editQuantity={editItem}
                />
              ))}
            </Stack>
        </Box>
      </Box>
    </main>
  );
}
