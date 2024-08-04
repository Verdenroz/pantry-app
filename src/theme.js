"use client";

import { DM_Sans } from "next/font/google";
import { createTheme } from "@mui/material/styles";

const dmSans = DM_Sans({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
});

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1f2321",
    },
    secondary: {
      main: "#2eb999",
    },
    background: {
      default: '#ffffff',
      paper: '#f9eded',
    }
  },
  typography: {
    fontFamily: dmSans.style.fontFamily,
  },
});

export default theme;
