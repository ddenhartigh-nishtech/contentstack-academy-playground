import * as React from "react";
import { IconProps } from "./IconProps";

const SearchIcon: React.FC<IconProps> = ({
	size = 20,
	color = "currentColor",
	className,
	ariaLabel = "Search",
}) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={size}
			height={size}
			viewBox="0 0 32 32"
			role="img"
			aria-label={ariaLabel}
			className={className}
			fill={color}
		>
			<path d="M22.621 24.007c-1.091 0.672-2.015 1.343-3.106 1.931-8.478 4.029-17.46-1.343-19.139-9.234-1.679-7.387 2.602-14.438 9.737-16.285 7.807-2.015 15.697 3.19 16.872 11.164 0.588 3.861-0.42 7.387-2.77 10.409-0.336 0.42-0.252 0.588 0.084 0.923 2.35 2.35 4.701 4.701 7.051 7.051 0.168 0.168 0.252 0.336 0.42 0.504 0.252 0.42 0.168 0.923-0.168 1.175s-0.839 0.336-1.175 0.084c-0.168-0.084-0.252-0.252-0.336-0.336-2.602-2.434-5.037-4.953-7.471-7.387zM13.555 25.351c6.464 0 11.752-5.204 11.752-11.668s-5.204-11.752-11.668-11.752-11.752 5.288-11.752 11.752c-0.084 6.38 5.204 11.668 11.668 11.668z" />
		</svg>
	);
};

export default React.memo(SearchIcon);
