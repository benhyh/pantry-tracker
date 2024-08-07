"use client";
import { styled, alpha } from "@mui/material/styles";
import { useState, useEffect } from "react";
import { fireStore } from "@/firebase";
import {
  Box,
  Button,
  Modal,
  Stack,
  TextField,
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  InputBase,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
} from "firebase/firestore";

export default function Home() {
  const [pantryItem, setPantryItem] = useState([]);
  const [open, setOpen] = useState(false);
  const [itemName, setItemName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // We're fetching pantry items from firestore and updating the React's component's state with this data.
  const updatePantry = async () => {
    const snapshot = query(collection(fireStore, "inventory")); // fetching the data from firestore
    const documents = await getDocs(snapshot); // getting the data from the snapshot
    const pantryList = []; // initializing an empty array
    documents.forEach((document) => {
      pantryList.push({
        name: document.id,
        ...document.data(),
      });
    }); // push data from documents to pantryList via forEach loop + object destructing
    setPantryItem(pantryList); // setting the state of pantryItem to the pantryList
  };

  // We're adding items to pantry
  const addItem = async (item) => {
    const docRef = doc(collection(fireStore, "inventory"), item); // Reference to the document in the "inventory" collection
    const docSnap = await getDoc(docRef); // Fetch document

    if (docSnap.exists()) {
      const { quantity } = docSnap.data(); // Get the quantity from the document if it exists
      await setDoc(docRef, { quantity: quantity + 1 }); // Increment by 1 and update the document
    } else {
      await setDoc(docRef, { quantity: 1 }); // If it does not, create it w/ 1 quantity
    }

    // Update the pantry list
    await updatePantry();
  };

  // We're removing items from pantry
  const removeItem = async (item) => {
    const docRef = doc(collection(fireStore, "inventory"), item);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const { quantity } = docSnap.data();
      if (quantity === 1) {
        await deleteDoc(docRef);
      } else {
        await setDoc(docRef, { quantity: quantity - 1 });
      }
    }

    await updatePantry();
  };

  // Search bar to filter items
  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  }));

  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    width: "100%",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      [theme.breakpoints.up("sm")]: {
        width: "12ch",
        "&:focus": {
          width: "20ch",
        },
      },
    },
  }));

  const ScrollableStack = styled(Stack)(({ theme }) => ({
    "&::-webkit-scrollbar": {
      display: "none",
    },
    "-ms-overflow-style": "none",
    "scrollbar-width": "none",
  }));

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredItems = pantryItem.filter((item) =>
    item.name
      .toLowerCase()
      .split(" ")
      .some((word) => word.startsWith(searchQuery.toLowerCase()))
  );

  useEffect(() => {
    updatePantry();
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Box
        width="100vw"
        height="100vh"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        gap={2}
      >
        <Modal open={open} onClose={handleClose}>
          <Box
            position="absolute"
            top="50%"
            left="50%"
            width={400}
            backgroundColor="#3d3d3d"
            color="orange"
            border="2px solid #4d4d4d"
            boxShadow={24}
            p={4}
            display="flex"
            flexDirection="column"
            gap={3}
            sx={{
              transform: "translate(-50%, -50%)",
            }}
          >
            <Typography variant="h6">Add Item</Typography>
            <Stack width="100%" direction="row" spacing={2}>
              <TextField
                variant="outlined"
                fullWidth
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "orange", // Change outline color
                    },
                    "&:hover fieldset": {
                      borderColor: "orange", // Lighter shade of orange
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "orange", // Change outline color when focused
                    },
                  },
                  "& .MuiInputBase-input": {
                    color: "white", // Change text color
                  },
                }}
              />
              <Button
                variant="outlined"
                onClick={() => {
                  addItem(itemName);
                  setItemName("");
                  handleClose();
                }}
                sx={{
                  color: "white",
                  backgroundColor: "orange",
                  fontWeight: "bold",
                  "&:hover": {
                    backgroundColor: "#CC7000",
                    borderColor: "#CC7000",
                  },
                }}
              >
                Add
              </Button>
            </Stack>
          </Box>
        </Modal>
        <Typography color="orange" variant="h1" fontWeight="bold">
          Pantry Tracker
        </Typography>
        <Button
          sx={{
            backgroundColor: "orange",
            color: "white",
            fontWeight: "bold",
            transition: "all 0.75s ease",
            "&:hover": {
              backgroundColor: "#CC7000",
              transform: "scale(1.1)",
            },
          }}
          variant="contained"
          onClick={() => {
            handleOpen();
          }}
        >
          Add Item
        </Button>
        <Box border="1px solid #333">
          <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{ backgroundColor: "#4a4a4a" }}>
              <Toolbar>
                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="open drawer"
                  sx={{ mr: 2 }}
                ></IconButton>
                <Typography
                  variant="h6"
                  noWrap
                  component="div"
                  sx={{
                    flexGrow: 1,
                    display: { xs: "none", sm: "block" },
                    color: "orange",
                    fontWeight: "bold",
                  }}
                >
                  Pantry Items
                </Typography>
                <Search>
                  <SearchIconWrapper>
                    <SearchIcon />
                  </SearchIconWrapper>
                  <StyledInputBase
                    placeholder="Search…"
                    inputProps={{ "aria-label": "search" }}
                    value={searchQuery}
                    onChange={handleSearchChange}
                  />
                </Search>
              </Toolbar>
            </AppBar>
          </Box>
          <ScrollableStack
            display="flex"
            width="45rem"
            height="15rem"
            spacing={2}
            overflow="auto"
          >
            {filteredItems.map(({ name, quantity }) => (
              <Box
                key={name}
                width="100%"
                minHeight="150px"
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                bgColor="#f0f0f0"
                padding={5}
              >
                <Typography variant="h3" color="orange" textAlign="center">
                  {name.charAt(0).toUpperCase() + name.slice(1)}
                </Typography>
                <Typography variant="h3" color="white" textAlign="center">
                  {quantity}
                </Typography>
                <Stack direction="row" spacing={2}>
                  <Button
                    sx={{
                      backgroundColor: "orange",
                      color: "white",
                      fontWeight: "bold",
                      fontSize: "1.5rem",
                      transition: "all 0.75s ease",
                      "&:hover": {
                        backgroundColor: "#CC7000",
                        transform: "scale(1.1)",
                      },
                    }}
                    variant="contained"
                    onClick={() => addItem(name)}
                  >
                    +
                  </Button>
                  <Button
                    sx={{
                      backgroundColor: "orange",
                      color: "white",
                      fontWeight: "bold",
                      fontSize: "1.5rem",
                      transition: "all 0.75s ease",
                      "&:hover": {
                        backgroundColor: "#CC7000",
                        transform: "scale(1.1)",
                      },
                    }}
                    variant="contained"
                    onClick={() => removeItem(name)}
                  >
                    -
                  </Button>
                </Stack>
              </Box>
            ))}
          </ScrollableStack>
        </Box>
      </Box>
    </>
  );
}
