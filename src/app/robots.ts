import type { MetadataRoute } from "next";

export const dynamic = "force-static";
import { getBaseUrl } from "@/utils/enviroment";

export default function robots(): MetadataRoute.Robots {
	const baseUrl = getBaseUrl();

	return {
		rules: [
			{
				userAgent: "*",
				allow: "/",
			},
		],
		sitemap: `${baseUrl[0]}/sitemap.xml`,
	};
}
