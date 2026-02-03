"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { onEntryChange } from "../../contentstack-sdk";
import { getFooterRes } from "../../helper";
import Skeleton from "react-loading-skeleton";
import { FooterProps } from "../../typescript/layout";
import { ChatIcon, VimeoIcon, IssuuIcon, LinkedInIcon } from "../icons/index";
import "./Footer.css";

const getSocialIcon = (title: string) => {
	const t = title.toLowerCase();
	if (t.includes("linkedin")) return <LinkedInIcon />;
	if (t.includes("vimeo")) return <VimeoIcon />;
	if (t.includes("issuu")) return <IssuuIcon />;
	if (t.includes("chat")) return <ChatIcon />;
	return null;
};

export default function Footer() {
	const [footer, setFooter] = useState<FooterProps | undefined>(undefined);

	// 1. Simple fetch function
	const fetchData = async () => {
		try {
			const footerRes = await getFooterRes();
			console.log("Footer Response:", footerRes);
			setFooter(footerRes);
		} catch (error) {
			console.error("Error fetching footer:", error);
		}
	};

	// 2. Initial Fetch
	useEffect(() => {
		fetchData();
	}, []);

	// 3. Live Preview Listener (Refetches when content changes in CMS)
	useEffect(() => {
		onEntryChange(() => fetchData());
	}, []);

	if (!footer) {
		return (
			<div className="footer-skeleton">
				<Skeleton count={5} height={20} />
			</div>
		);
	}

	// 4. Parse Copyright (handling the JSON RTE structure)
	const currentYear = new Date().getFullYear();
	let copyrightText = "";
	try {
		// Navigating the JSON RTE structure: doc -> p -> text
		const rawText =
			footer.copyright?.children?.[0]?.children?.[0]?.text || "";
		copyrightText = rawText.replace("{{year}}", currentYear.toString());
	} catch (e) {
		copyrightText = `© ${currentYear} Aspen Surgical Products, Inc. All Rights Reserved.`;
	}

	// 5. Sort columns by order
	const columns = footer.navigation?.sort((a, b) => a.order - b.order) || [];

	return (
		<footer className="footer-wrapper">
			<div className="footer-container">
				{/* Navigation Grid */}
				<div className="footer-columns">
					{columns.map((col, index) => {
						// Determine if this is the "Special" 4th column (Logo/Socials)
						// We check for the presence of a Logo OR if it's the specific index
						const isBrandColumn = !!col.logo || index === 3;

						return (
							<div
								key={index}
								className={`footer-col col-${index + 1}`}
							>
								{/* Column Header (if text exists) */}
								{col.section_header && (
									<h3 className="footer-header">
										{col.section_header}
									</h3>
								)}

								{/* A) Standard Links (Columns 1-3) */}
								{!isBrandColumn && col.footer_items && (
									<ul className="footer-links">
										{col.footer_items.map((item, i) => {
											const text = item.line_text;
											const href = item.line_link?.href;

											// Check for Email/Phone if no link is provided
											const isEmail =
												!href && text.includes("@");
											const isPhone =
												!href &&
												(text.match(/\d/) ||
													text.includes("+"));

											return (
												<li
													key={i}
													className="footer-link-item"
												>
													{href ? (
														<Link href={href}>
															{item.line_link
																.title || text}
														</Link>
													) : isEmail ? (
														<a
															href={`mailto:${text}`}
														>
															{text}
														</a>
													) : isPhone ? (
														<a
															href={`tel:${text.replace(/[^\d+]/g, "")}`}
														>
															{text}
														</a>
													) : (
														<span className="footer-text">
															{text}
														</span>
													)}
												</li>
											);
										})}
									</ul>
								)}

								{/* B) Brand Column (Column 4: Logo, Button, Socials) */}
								{isBrandColumn && (
									<div className="footer-brand-section">
										{/* Logo */}
										{col.logo?.url && (
											<div className="footer-logo">
												<img
													src={col.logo.url}
													alt="Aspen Surgical Logo"
												/>
											</div>
										)}

										{/* CTA Button */}
										{col.button_link?.href && (
											<Link
												href={col.button_link.href}
												className="footer-btn-orange"
											>
												{col.button_link.title ||
													"Request Samples"}
											</Link>
										)}

										{/* Social Icons */}
										{col.social_media?.social_media_share
											?.length > 0 && (
											<div className="footer-socials">
												{col.social_media.social_media_share.map(
													(social, sIdx) => (
														<a
															key={sIdx}
															href={
																social.url
																	?.href ||
																"#"
															}
															target="_blank"
															rel="noopener noreferrer"
															className="social-icon"
															title={social.title}
														>
															{getSocialIcon(
																social.title,
															)}
														</a>
													),
												)}
											</div>
										)}
									</div>
								)}
							</div>
						);
					})}
				</div>

				{/* Copyright */}
				<div className="footer-copyright">
					<p>{copyrightText}</p>
				</div>
			</div>
		</footer>
	);
}
