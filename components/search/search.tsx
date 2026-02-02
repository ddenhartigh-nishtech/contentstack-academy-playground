import { useState } from "react";

type SearchBarProps = {
	placeholderText?: string;
	onSearch?: (query: string) => void;
};

export default function SearchBar({
	placeholderText = "How can we help?",
	onSearch,
}: SearchBarProps) {
	const [query, setQuery] = useState("");

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (!query.trim()) return;

		onSearch?.(query);

		console.log("Search submitted:", query);
	};

	return (
		<form className="search-form" onSubmit={handleSubmit}>
			<input
				type="search"
				value={query}
				onChange={(e) => setQuery(e.target.value)}
				placeholder={placeholderText}
				aria-label="Search"
			/>

			<button type="submit" aria-label="Search">
				🔍
			</button>
		</form>
	);
}
