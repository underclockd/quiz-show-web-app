import { appDescription, appName } from "@/app/site";
import { themeColors } from "@/app/theme";
import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: appName,
        short_name: appName,
        description: appDescription,
        id: "/",
        start_url: "/",
        scope: "/",
        lang: "en-US",
        display: "standalone",
        background_color: themeColors.dark,
        theme_color: themeColors.blue,
        categories: ["games", "entertainment"],
    };
}
