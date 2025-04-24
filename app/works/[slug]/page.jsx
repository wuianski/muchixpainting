/* fetch data from directus */
import directus from "@/lib/directus";
import { notFound } from "next/navigation";
import { readItem } from "@directus/sdk";
/* import fonts */
import { cutiveMono } from "@/lib/font";
/* MUI */
import { Box, Stack } from "@mui/material";
import Item from "@/components/StackItem";
/* Grid Image */
import PhotoGallery from "@/components/PhotoGallery";

/* fetch data from directus */
async function getWork(slug) {
  try {
    const work = await directus.request(
      readItem("works", slug, {
        fields: [
          "*",
          "*.*",
          {
            images: ["*.*", "*.*.*"],
          },
        ],
        filter: {
          _and: [
            {
              status: {
                _eq: "published",
              },
            },
          ],
        },
      })
    );
    return work;
  } catch (error) {
    notFound();
  }
}

export default async function Page({ params }) {
  const work = await getWork((await params).slug);
  //   console.log(work.images);
  return (
    <Box
      className={cutiveMono.className}
      sx={{
        m: { xs: "0.9rem !important", md: "1.8rem !important" },
      }}
    >
      {work.info && (
        <Stack direction={{ xs: "column", md: "row" }}>
          <Item sx={{ width: { xs: "100%", md: "calc(100% - 280px)" } }}>
            <Box>
              <PhotoGallery photos={work.images} />
            </Box>
          </Item>
          <Item
            sx={{
              width: { xs: "100%", md: "280px" },
              ml: { xs: "0rem !important", md: "1.8rem !important" },
              mt: { xs: "1.8rem !important", md: "0rem !important" },
            }}
          >
            <Box>
              <Box
                component="span"
                sx={{ fontStyle: "italic", fontWeight: "bold" }}
              >
                {work.title}
              </Box>
            </Box>
            <Box dangerouslySetInnerHTML={{ __html: work.info }} />
            <Box
              sx={{ mt: "1rem !important" }}
              dangerouslySetInnerHTML={{ __html: work.statement }}
            />
          </Item>
        </Stack>
      )}

      {!work.info && (
        <Stack direction={{ xs: "column", md: "row" }}>
          <Item sx={{ width: { xs: "100%", md: "100% " } }}>
            <Box>
              <PhotoGallery photos={work.images} />
            </Box>
          </Item>
        </Stack>
      )}
    </Box>
  );
}
