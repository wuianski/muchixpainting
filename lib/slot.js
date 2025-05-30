'use client';

import { Typography, Box } from "@mui/material";
/* import fonts */
import { cutiveMono } from "@/lib/font";
import Link from "next/link";

export function CustomAppTitle() {
    return (
        <Typography variant="small"  >
            <Link href="/">
                <Box sx={{ marginLeft: { xs: "0.9rem !important", md: "1.8rem !important" }, marginTop: { xs: "0.3rem !important", md: "unset !important" } }} >
                    <Box component="span" className={cutiveMono.className}>謝 牧 岐 | </Box>
                    <Box component="span" className={cutiveMono.className}>Muchi Hsieh</Box>
                </Box>
            </Link>
        </Typography >
    );
}

export function SidebarFooter() {
    return (
        <>
            <Typography
                variant="caption"
                sx={{ m: "1.8rem", whiteSpace: 'nowrap' }}
                className={cutiveMono.className}
            >
                {`© ${new Date().getFullYear()}  Muchi Hsieh All Rights Reserved.`}
            </Typography>
        </>
    );
}

/* Must included to hide theme switcher on top right corner. */
export function CustomThemeSwitcher() {
    return (
        <div>
            {null}
        </div>
    );
}