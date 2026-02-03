"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Skeleton from "react-loading-skeleton";
import { onEntryChange } from "../../contentstack-sdk";
import { getHeaderRes, getAllEntries } from "../../helper";
import { CartIcon, SearchIcon } from "../icons/index";
import { HeaderData } from "./HeaderInterfaces";
import "./Header.css";
import AccountMenu from "../AccountMenu/AccountMenu";

export default function Header() {
	// --- State ---
	const [headerData, setHeaderData] = useState<HeaderData | null>(null);
	// const [isLoggedIn, setIsLoggedIn] = useState(false); // Toggle this to test login state
	const [isLoggedIn, setIsLoggedIn] = useState(true); // Toggle this to test login state
	const pathname = usePathname();

	// --- Fetch Data (Existing Logic) ---
	const fetchHeaderAndEntries = async () => {
		try {
			const headerRes: HeaderData = await getHeaderRes();
			const entriesRes = await getAllEntries(); // maybe this could be used for header messages?
			// console.log("Header Response:", headerRes);
			// console.log("All Entries Response:", entriesRes);
			setHeaderData(headerRes);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		fetchHeaderAndEntries();
		onEntryChange(() => fetchHeaderAndEntries());
	}, []);

	// Dummy Search Handler
	const handleSearch = (e: React.FormEvent) => {
		e.preventDefault();
		console.log("Search submitted", e);
		alert("Search functionality would trigger here");
	};

	if (!headerData)
		return (
			<div className="header-skeleton">
				<Skeleton height={100} />
			</div>
		);

	return (
		<header className="aspen-header">
			{/* --- ROW 1: navigation menu --- */}
			<div className="utility-bar">
				<div className="max-width utility-container">
					{/* should prbobably be its own AccountMenu component */}
					{/* Links */}
					{headerData?.navigation_menu &&
						headerData?.navigation_menu.map((item, index) => {
							if (item.label?.toLowerCase() === "main search") {
								return (
									<div
										key={`${index}-search`}
										className="search-wrapper"
									>
										<form
											onSubmit={handleSearch}
											className="search-form"
										>
											<input
												type="text"
												placeholder={
													item.search_bar?.[0]
														?.placeholder_text
												}
												className="search-input"
											/>
											<button
												type="submit"
												className="search-btn"
											>
												<SearchIcon />
											</button>
										</form>
									</div>
								);
							} else if (
								item.label?.toLowerCase() === "sign in"
							) {
								return !isLoggedIn ? (
									<Link
										key={`${index}-signin`}
										href={item.page_reference?.[0]?.url}
										className="u-link"
									>
										{item.label}
									</Link>
								) : null;
							} else if (
								item.label?.toLowerCase() === "account menu"
							) {
								return isLoggedIn ? (
									<AccountMenu
										key={`${index}-accountmenu`}
										data={item.account_menu}
									/>
								) : null;
							} else if (item.label?.toLowerCase() === "cart") {
								if (isLoggedIn) {
									return (
										<Link
											key={`${index}-cart`}
											href={item.page_reference?.[0]?.url}
											className="u-link"
										>
											{item.label?.toLowerCase() ===
											"cart" ? (
												<CartIcon />
											) : (
												item.label
											)}
										</Link>
									);
								}
							} else {
								return (
									<Link
										key={`${index}-link`}
										href={item.page_reference?.[0]?.url}
										className="u-link"
									>
										{item.label}
									</Link>
								);
							}
						})}
				</div>
			</div>

			{/* this should probably be its own component as well */}
			{/* --- ROW 2: Dynamic Logo & Mega Menu --- */}
			{headerData.mega_menu && (
				<div className="main-nav-bar">
					<div className="max-width nav-container">
						{headerData.mega_menu
							.filter(
								(item: any) =>
									item.label?.toLowerCase() === "logo",
							)
							.map((logoItem: any, index: number) => (
								<div key={index} className="logo-wrapper">
									<Link
										href={
											logoItem.page_reference?.[0]?.url ||
											"/"
										}
									>
										{logoItem.logo?.url ? (
											<img
												src={logoItem.logo.url}
												alt="Aspen Surgical"
												className="main-logo"
											/>
										) : (
											<p>No Logo Available</p>
										)}
									</Link>
								</div>
							))}

						{/* 2. NAVIGATION ITERATION */}
						<nav className="desktop-nav">
							<ul className="nav-level-1">
								{headerData.mega_menu
									.filter(
										(item) =>
											item.label?.toLowerCase() !==
											"logo",
									)
									.sort(
										(a: any, b: any) =>
											(a.order || 0) - (b.order || 0),
									)
									.map((item, index: number) => {
										// what is isActive used for?  showing more mega menu options? page_reference is not on the model
										// const isActive =
										// 	pathname ===
										// 	item.page_reference?.[0]?.url;
										return (
											<li
												key={index}
												className="nav-item-1 has-mega-menu"
											>
												<Link
													href={item.link.href || "#"}
													// className={`nav-link-1 ${isActive ? "active" : ""}`}
													className="nav-link-1"
												>
													{item.label || ""}
												</Link>

												{/* 3. MEGA MENU DROPDOWN CONTENT t1 */}
												<div className="mega-menu-dropdown">
													<div className="max-width mega-menu-inner">
														{/* Sidebar Categories */}
														<ul className="mega-sidebar">
															{item.mega_menu_t1?.map(
																(
																	mmT1,
																	catIndex: number,
																) => (
																	<li
																		key={
																			catIndex
																		}
																		className="mega-cat-item"
																	>
																		<span className="cat-link">
																			{
																				mmT1.label
																			}
																			{mmT1
																				.mega_menu_t2
																				?.length >
																				0 && (
																				<span className="arrow">
																					›
																				</span>
																			)}
																		</span>

																		{/* Content Panel (Right Side) */}
																		<div className="mega-content-panel">
																			<h4 className="panel-title">
																				{
																					mmT1.label
																				}
																			</h4>
																			<ul className="panel-links">
																				{mmT1.mega_menu_t2?.map(
																					(
																						mmT2,
																						subIndex: number,
																					) => (
																						<li
																							key={
																								subIndex
																							}
																						>
																							<Link
																								href={
																									mmT2
																										.link
																										?.href ||
																									"#"
																								}
																							>
																								{
																									mmT2.label
																								}
																							</Link>
																						</li>
																					),
																				)}
																			</ul>
																		</div>
																	</li>
																),
															) || (
																/* Fallback if no data structure matches yet */
																<li className="mega-cat-item">
																	<span className="cat-link">
																		No Data
																		Found
																	</span>
																</li>
															)}
														</ul>
													</div>
												</div>
											</li>
										);
									})}
							</ul>
						</nav>
					</div>
				</div>
			)}
		</header>
	);
}
