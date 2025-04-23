/* fetch data from directus */
import directus from "@/lib/directus";
import { notFound } from "next/navigation";
import { readItems } from "@directus/sdk";
/* import fonts */
import { cutiveMono } from "@/lib/font";
/* MUI */
import { Box, Stack } from "@mui/material";

/* fetch data from directus */
async function getAbout() {
  try {
    const about = await directus.request(
      readItems("about", {
        fields: ["*", "*.*"],
      })
    );
    return about;
  } catch (error) {
    notFound();
  }
}

export default async function AboutPage() {
  const about = await getAbout();
  // console.log(about.cv);
  return (
    <Box sx={{ m: { xs: "0.9rem !important", md: "1.8rem !important" } }}>
      <Box
        sx={{ paddingBottom: "16px !important" }}
        dangerouslySetInnerHTML={{ __html: about.bio }}
      />
      <Box sx={{ paddingBottom: "2px !important" }}>{about.email}</Box>
      <Box sx={{ paddingBottom: "2px !important" }}>
        <a target="_blank" href={about.instagram}>
          {about.ig}
        </a>
      </Box>
      <Box>
        <a
          target="_blank"
          href={`${process.env.DIRECTUS_IMAGE_DOMAIN_DO}/${about.cv.filename_disk}`}
        >
          簡歷 | CV
        </a>
      </Box>
    </Box>
  );
}
