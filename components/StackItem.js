'use client';

import { styled } from "@mui/material/styles";
/* MUI */
import { Paper } from "@mui/material";

/* Stack Item Setting */
const Item = styled(Paper)(() => ({
    textAlign: "left",
    color: "unset",
    background: "none",
    boxShadow: "none",
}));

export default Item;