import React from "react";
import Start from "../components/landingComponents/Start";
import Mail from "../components/landingComponents/Mail";
import Questions from "../components/landingComponents/Questions";
import { Paper } from "@mui/material";
import LandingNavbar from "../components/landingComponents/LandingNavbar";
const Landing = () => {
  return (
    <Paper>
      <LandingNavbar />
      <Start />
      <Mail />
      <Questions />
    </Paper>
  );
};

export default Landing;
