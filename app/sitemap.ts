import type { MetadataRoute } from "next";
import { getBaseUrl } from "@/utils/enviroment";

export default function sitemap(): MetadataRoute.Sitemap {
	const baseUrl = getBaseUrl();

	return [
		{
			url: baseUrl[0],
			lastModified: new Date(),
			changeFrequency: "weekly",
			priority: 1,
		},
		{
			url: `${baseUrl[0]}/how-to-use`,
			lastModified: new Date(),
			changeFrequency: "monthly",
			priority: 0.8,
		},
	];
}
