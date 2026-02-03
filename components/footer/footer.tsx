"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import parse from "html-react-parser";
import { onEntryChange } from "../../contentstack-sdk";
import { getAllEntries, getFooterRes } from "../../helper";
import Skeleton from "react-loading-skeleton";
import { FooterProps, Entry, Links } from "../../typescript/layout";
import { ChatIcon, VimeoIcon, IssuuIcon, LinkedInIcon } from "../icons/index";
import "./Footer.css";

export default function Footer() {
	const [footer, setFooterProp] = useState<FooterProps | undefined>(
		undefined,
	);
	const [entries, setEntries] = useState<Entry | undefined>(undefined);

	const [getFooter, setFooter] = useState(footer);

	function buildNavigation(ent: Entry, ft: FooterProps) {
		let newFooter = { ...ft };
		if (ent.length !== newFooter.navigation.link.length) {
			ent.forEach((entry) => {
				const fFound = newFooter?.navigation.link.find(
					(nlink: Links) => nlink.title === entry.title,
				);
				if (!fFound) {
					newFooter.navigation.link?.push({
						title: entry.title,
						href: entry.url,
						$: entry.$,
					});
				}
			});
		}
		return newFooter;
	}

	const fetchFooterAndEntries = async () => {
		const footerRes = await getFooterRes();
		const entriesRes = await getAllEntries();
		console.log("footerRes", footerRes);
		console.log("entriesRes", entriesRes);
		setFooterProp(footerRes);
		setEntries(entriesRes);
	};

	async function fetchData() {
		try {
			if (footer && entries) {
				const footerRes = await getFooterRes();
				const newfooter = buildNavigation(entries, footerRes);
				setFooter(newfooter);
			}
		} catch (error) {
			console.error(error);
		}
	}

	useEffect(() => {
		fetchFooterAndEntries();
	}, []);

	useEffect(() => {
		onEntryChange(() => fetchData());
	}, [footer]);

	const footerData = getFooter ? getFooter : undefined;

	/*
  populate this with 4 columns, each column determined by a footerRes.navigation_item (there are 4), left to right by order of navigatoin_item.order
  if a navigation[0].section_header exists, it should be the header for that column (column 4 will not have this)
  navigation[0].footer_items[0].line_text and line_link should be used to populate the links under that header
  if navigation[0].footer_items[0].line_text and line_link are empty, it is not a link, but the navigation[2].footer_items[1].line_text may contain an email or phone number, please handle those appropriately
  in the last column, there will be a logo, button_link (similar to other links but with --orange ronuded button styling), and social media icons (vimeo, issuu, linkedin, chat) - these should be displayed as icons horizontally, the links for those found here navigation[3].social_media.social_media_share[0].url.href 

  contentstack fooder structure reference: {"title":"Footer","copyright":{"type":"doc","attrs":{},"uid":"763acc061a47494e8b6f06d225982ff5","children":[{"type":"p","attrs":{},"uid":"96015bdf419c4d2abc82c2bac8722d44","children":[{"text":"© {{year}} Aspen Surgical Products, Inc. All Rights Reserved."}]}],"_version":6},"tags":[],"locale":"en-us","uid":"blt829eaf63f9f01b09","created_by":"csc428296e57575e55","updated_by":"csc428296e57575e55","created_at":"2026-01-29T21:59:21.176Z","updated_at":"2026-02-03T18:42:37.092Z","_version":6,"_in_progress":false,"navigation":[{"section_header":"Policies & Terms","order":0,"logo":null,"button_link":{"title":"","href":""},"social_media":{"social_media_share":[]},"footer_items":[{"order":0,"line_text":"Cookie Policy","line_link":{"title":"Cookie Policy","href":"/cookie-policy"},"_metadata":{"uid":"cs8ed1f3abb319db1e"}},{"order":1,"line_text":"Privacy Policy","line_link":{"title":"Privacy Policy","href":"/privacy"},"_metadata":{"uid":"cs79ff5bf2d0a64f3d"}},{"order":2,"line_text":"Terms of Use","line_link":{"title":"Terms of Use","href":"/terms-of-use"},"_metadata":{"uid":"cs26e7dcf38ef9792f"}},{"order":3,"line_text":"Terms & Conditions","line_link":{"title":"Terms & Conditions","href":"/t-and-c"},"_metadata":{"uid":"csd93f20eadaf3ae66"}}],"_metadata":{"uid":"csb94b98d87ef19e41"}},{"section_header":"Explore Aspen Surgical","order":1,"logo":null,"button_link":{"title":"","href":""},"social_media":{"social_media_share":[]},"footer_items":[{"order":0,"line_text":"Products","line_link":{"title":"Products","href":"/catalog/products"},"_metadata":{"uid":"cscf6adaea2fe2c168"}},{"order":1,"line_text":"Service & Support","line_link":{"title":"Service & Support","href":"/service-and-support"},"_metadata":{"uid":"cscd2bbd3790e4af32"}},{"order":2,"line_text":"Our Company","line_link":{"title":"Our Company","href":"/about"},"_metadata":{"uid":"csb541577ad3fce51b"}},{"order":3,"line_text":"Resources","line_link":{"title":"Resources","href":"/resources"},"_metadata":{"uid":"csffcd762a1e8ca4fd"}},{"order":4,"line_text":"Quick Cross","line_link":{"title":"Quick Cross","href":"/quick-cross"},"_metadata":{"uid":"cs305720e7062fc989"}}],"_metadata":{"uid":"cs6d73c6541f811d49"}},{"section_header":"Contact Us","order":2,"logo":null,"button_link":{"title":"","href":""},"social_media":{"social_media_share":[]},"footer_items":[{"order":0,"line_text":"Americas, Europe, Middle East & Africa: +1 888-364-7004","line_link":{"title":"","href":""},"_metadata":{"uid":"cs8961e17ecdf0631c"}},{"order":1,"line_text":"customerservice@aspensurgical.com","line_link":{"title":"","href":""},"_metadata":{"uid":"cs986a24bd61dad613"}},{"order":2,"line_text":"Australia, New Zealand & Asia Pacific: +61 3 9413 5555","line_link":{"title":"","href":""},"_metadata":{"uid":"cs45171fcb365b7ad9"}},{"order":3,"line_text":"anz@aspensurgical.com","line_link":{"title":"","href":""},"_metadata":{"uid":"cs60b8ce3cc7c665b1"}},{"order":4,"line_text":"Join Our Team","line_link":{"title":"Join Our Team","href":"/careers"},"_metadata":{"uid":"cs07002ef012f825f4"}}],"_metadata":{"uid":"cs924f299a26bf2180"}},{"section_header":"","order":3,"logo":{"uid":"bltb4011bc389a190c4","created_at":"2026-01-29T18:49:59.280Z","updated_at":"2026-01-29T18:49:59.280Z","created_by":"csc428296e57575e55","updated_by":"csc428296e57575e55","content_type":"image/png","file_size":"13647","tags":[],"filename":"2024_true_blue_aspen_logo.png","url":"https://images.contentstack.io/v3/assets/bltaa9ed144393c761a/bltb4011bc389a190c4/697babd74bd0198211c48542/2024_true_blue_aspen_logo.png","ACL":[],"is_dir":false,"parent_uid":"bltce8de34c35dc267d","_version":1,"title":"2024_true_blue_aspen_logo.png"},"button_link":{"title":"Request Product Samples","href":"/RequestProductSamplesForm"},"social_media":{"social_media_share":[{"title":"LinkedIn","icon":null,"url":{"title":"","href":"https://www.linkedin.com/company/aspen-surgical/"},"_metadata":{"uid":"cse0784c439b550f18"}},{"title":"Vimeo","icon":null,"url":{"title":"","href":"https://vimeo.com/aspensurgical"},"_metadata":{"uid":"cs49acd72f8823c5c3"}},{"title":"issuu","icon":null,"url":{"title":"","href":"https://issuu.com/symmetrysurgical"},"_metadata":{"uid":"cs052b5b039fc50125"}},{"title":"chat","icon":null,"url":{"title":"","href":""},"_metadata":{"uid":"cs99cd0fb78f1af9d8"}}]},"footer_items":[],"_metadata":{"uid":"csfb7e8d4f4fdc09ad"}}]}

  currently footer.css is empty, feel free to provide styles, I'm not using and FE stylign frameworks

  global style vars for reference:
  :root {
	--white: #ffffff;
	--black: #000000;
	--grey-100: #e5e6e5;
	--grey-200: #c9c9c8;
	--grey-600: #98a4ae;
	--grey-700: #545859;
	--grey-800: #363936;
	--grey-900: #253746;
	--white-blue: #c9e6ee;
	--light-blue: #55a9cb;
	--blue: #54a8cc;
	--dark-blue: #042359;
	--red: #c8102e;
	--orange: #e8732a;
}



  */
	return <div>placeholder</div>;
}
