import { useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  documentId,
} from "firebase/firestore";
import { firestore } from "../../firebase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/material";

const SearchBar = ({ setSearchResults }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    const collectionRef = collection(firestore, "inventory");
    const q = query(
      collectionRef,
      where(documentId(), ">=", searchQuery),
      where(documentId(), "<=", searchQuery + "\uf8ff")
    );

    const querySnapshot = await getDocs(q);
    const results = [];
    querySnapshot.forEach((doc) => {
      results.push({ id: doc.id, ...doc.data() });
    });
    setSearchResults(results);
  };

  return (
    <form onSubmit={handleSearch} width="100%">
      <Box display="flex" flexDirection={"row"} alignItems="center">
        <TextField
          id="search-bar"
          className="text"
          fullWidth
          onInput={(e) => {
            setSearchQuery(e.target.value);
          }}
          variant="outlined"
          placeholder="Search"
          size="small"
        />
        <IconButton type="submit" aria-label="search">
          <SearchIcon style={{ fill: "blue" }} />
        </IconButton>
      </Box>
    </form>
  );
};

export default SearchBar;
