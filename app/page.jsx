import * as React from "react";

/* fetch data from directus */
import directus from "@/lib/directus";
import { notFound } from "next/navigation";
import { readItems } from "@directus/sdk";
/* import components */
import Box from "@mui/material/Box";
import Image from "next/image";

/* fetch data from directus */
async function getNews() {
  try {
    const reviews = await directus.request(
      readItems("news", {
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

export default async function NewsPage() {
  const news = await getNews();
  // console.log(news);
  return (
    <Box>
      <Box
        sx={{
          m: { xs: "0.9rem !important", md: "1.8rem !important" },
        }}
      >
        <Box>
          {news.map((news) => (
            <Box key={news.id}>
              <Box
                sx={{
                  fontSize: { xs: "14px", md: "14px" },
                  paddingBottom: "16px !important",
                }}
              >
                <Box
                  dangerouslySetInnerHTML={{ __html: news.caption }}
                  sx={{ lineHeight: "1.1em" }}
                />
              </Box>
              <Box
                sx={{
                  position: "relative",
                  width: { xs: "100%", md: "38vw", lg: "38vw" },
                  paddingBottom: "48px !important",
                }}
              >
                <a
                  href={news.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: "none" }}
                >
                  <Image
                    priority={true}
                    src={`${process.env.DIRECTUS_IMAGE_DOMAIN_DO}${news.poster.filename_disk}`}
                    quality={100}
                    width={0}
                    height={0}
                    alt="Picture of the news"
                    style={{
                      width: "100%",
                      height: "auto",
                    }}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw"
                    placeholder={
                      "blurDataURL" in news.poster ? "blur" : undefined
                    }
                  />
                </a>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
