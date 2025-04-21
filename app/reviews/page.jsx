/* fetch data from directus */
import directus from "@/lib/directus";
import { notFound } from "next/navigation";
import { readItems } from "@directus/sdk";
/* import fonts */
import { cutiveMono } from "@/lib/font";
/* MUI */
import { Box, Stack } from "@mui/material";

/* fetch data from directus */
async function getReviews() {
  try {
    const reviews = await directus.request(
      readItems("reviews", {
        fields: ["*", "*.*", "*.*.*"],
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
    return reviews;
  } catch (error) {
    notFound();
  }
}

export default async function AboutPage() {
  const reviews = await getReviews();
  //   console.log(reviews);
  return (
    <Box sx={{ m: { xs: "0.9rem !important", md: "1.8rem !important" } }}>
      {reviews.map((item) => (
        <Box
          key={item.id}
          sx={{
            paddingBottom: "16px !important",
            lineHeight: "1.1em",
          }}
        >
          <a
            href={
              item.file
                ? `${process.env.DIRECTUS_IMAGE_DOMAIN_DEV}${item.file.filename_disk}`
                : item.link
            }
            target="_blank"
          >
            <Box component="span">{item.title}</Box>
            {item.category === 1 && <Box component="span"> Review</Box>}
            {item.category === 2 && <Box component="span"> Interview</Box>}
            {item.year && (
              <Box
                component="span"
                sx={{ color: "var(--mui-palette-text-secondary);" }}
              >
                {` | ${item.year}`}
              </Box>
            )}
          </a>
        </Box>
      ))}
    </Box>
  );
}
