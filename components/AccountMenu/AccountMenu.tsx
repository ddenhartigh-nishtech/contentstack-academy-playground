"use client";

import { useState, useRef, useEffect } from "react";
import { PersonIcon } from "../icons/index";
import "./AccountMenu.css";

interface AccountMenuLink {
	title: string;
	href: string;
}

interface AccountMenuItem {
	order: number | null;
	label: string;
	link: AccountMenuLink;
}

interface AccountMenuProps {
	data: AccountMenuItem[];
	userName?: string;
	accountName?: string;
}

const SPECIAL_LABELS = {
	GREETING: "Greeting",
	ACCOUNT_NAME: "Account Name",
	HORIZONTAL_RULE: "Horizontal Rule",
	SIGN_OUT: "Sign Out",
} as const;

export default function AccountMenu({
	data,
	userName = "Derek",
	accountName = "DOMESTIC TEMPLATE 1",
}: AccountMenuProps) {
	const [isOpen, setIsOpen] = useState(false);
	const menuRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		function handleClick(e: MouseEvent) {
			if (
				menuRef.current &&
				!menuRef.current.contains(e.target as Node)
			) {
				setIsOpen(false);
			}
		}
		document.addEventListener("mousedown", handleClick);
		return () => document.removeEventListener("mousedown", handleClick);
	}, []);

	const handleSignOut = () => {
		console.log("Sign out clicked");
		alert("Sign out functionality would trigger here");
	};

	return (
		<div ref={menuRef} className="account-menu">
			<button
				onClick={() => setIsOpen((prev) => !prev)}
				aria-haspopup="true"
				aria-expanded={isOpen}
				className="account-menu__trigger"
			>
				<PersonIcon />
			</button>

			{isOpen && (
				<div className="account-menu__dropdown">
					{data.map((item, index) => {
						const { label, link } = item;

						if (label === SPECIAL_LABELS.GREETING) {
							return (
								<div
									key={`greeting-${index}`}
									className="account-menu__greeting"
								>
									<span>Hello, {userName}!</span>
								</div>
							);
						}

						if (label === SPECIAL_LABELS.ACCOUNT_NAME) {
							return (
								<div
									key={`account-${index}`}
									className="account-menu__account-name"
								>
									<span>{accountName}</span>
								</div>
							);
						}

						if (label === SPECIAL_LABELS.HORIZONTAL_RULE) {
							return (
								<hr
									key={`hr-${index}`}
									className="account-menu__divider"
								/>
							);
						}

						if (label === SPECIAL_LABELS.SIGN_OUT) {
							return (
								<div
									key={`signout-${index}`}
									className="account-menu__signout-wrapper"
								>
									<button
										onClick={handleSignOut}
										className="account-menu__signout"
									>
										Sign Out
									</button>
								</div>
							);
						}

						if (link.href) {
							return (
								<a
									key={`link-${index}`}
									href={link.href}
									title={link.title}
									onClick={() => setIsOpen(false)}
									className="account-menu__link"
								>
									{label}
								</a>
							);
						}
						return null;
					})}
				</div>
			)}
		</div>
	);
}
