import * as React from "react";
import { NextAppProvider } from "@toolpad/core/nextjs";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import LinearProgress from "@mui/material/LinearProgress";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { CustomAppTitle, SidebarFooter, CustomThemeSwitcher } from "@/lib/slot";
import theme from "@/lib/theme";

/* import fonts */
import { cutiveMono } from "@/lib/font";
import "@/app/globals.css";

/* Directus */
import directus from "../lib/directus";
import { notFound } from "next/navigation";
import { readItems } from "@directus/sdk";
/* MUI */
import { Box } from "@mui/material";

async function getCat1() {
  try {
    return await directus.request(
      readItems("works", {
        fields: ["*", "*.*"],
        sort: ["-year"],
        filter: {
          _and: [
            {
              status: { _eq: "published" },
              category: { _eq: "1" },
            },
          ],
        },
      })
    );
  } catch (error) {
    notFound();
  }
}

async function getCat2() {
  try {
    return await directus.request(
      readItems("works", {
        fields: ["*", "*.*"],
        sort: ["-year"],
        filter: {
          _and: [
            {
              status: { _eq: "published" },
              category: { _eq: "2" },
            },
          ],
        },
      })
    );
  } catch (error) {
    notFound();
  }
}

export default async function RootLayout({ children }) {
  const cat1 = await getCat1();
  const cat2 = await getCat2();
  // console.log(cat1[0].category.category_name);

  const NAVIGATION = [
    {
      segment: "about",
      title: "ABOUT",
    },
    {
      segment: "reviews",
      title: "REVIEWS / INTERVIEWS",
    },
    {
      kind: "header",
      title: "",
    },
    {
      kind: "header",
      title: cat1[0].category.category_name.toUpperCase(),
    },
    ...cat1.map((work) => ({
      segment: `works/${work.slug}`,
      title: work.title,
    })),
    {
      kind: "header",
      title: cat2[0].category.category_name.toUpperCase(),
    },
    ...cat2.map((work) => ({
      segment: `works/${work.slug}`,
      title: work.title,
    })),
  ];
  return (
    <html
      lang="en"
      data-toolpad-color-scheme="light"
      className={cutiveMono.className}
      suppressHydrationWarning
    >
      <body className={cutiveMono.className}>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <React.Suspense fallback={<LinearProgress />}>
            <NextAppProvider theme={theme} navigation={NAVIGATION}>
              <DashboardLayout
                // defaultSidebarCollapsed
                disableCollapsibleSidebar
                sidebarExpandedWidth={280}
                slots={{
                  appTitle: CustomAppTitle,
                  sidebarFooter: SidebarFooter,
                  toolbarActions: CustomThemeSwitcher,
                }}
              >
                {children}
              </DashboardLayout>
            </NextAppProvider>
          </React.Suspense>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
