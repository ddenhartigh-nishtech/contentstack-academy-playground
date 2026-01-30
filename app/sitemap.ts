import { getAllEntries } from "@/helper";
import { Pages, PostPage } from "@/typescript/pages";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const baseUrl =
		process.env.NEXT_PUBLIC_HOSTED_URL || "http://localhost:3000";

	let pages: Pages = await getAllEntries();

	const allPages = pages.map((page) => `${baseUrl}${page.url}`);
	const siteMapList = [...allPages].sort();

	return siteMapList.map((url) => {
		return {
			url: url,
			lastModified: new Date().toISOString(),
			changeFrequency: "monthly",
			priority: 1.0,
		};
	});
}
