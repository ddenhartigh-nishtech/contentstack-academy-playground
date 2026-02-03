import React from "react";
import "./ShopByCategroyGrid.css";

export default function CategoryGrid({ data }: { data: any }) {
	const gridItems = data.shop_by_category_grid?.[0]?.category_grid || [];

	if (gridItems.length === 0) return null;

	return (
		<section className="category-grid-section">
			<div className="category-grid-container">
				{gridItems.map((item: any, index: number) => (
					<a
						key={index}
						href={item.category_link?.href || "#"}
						className="category-tile"
					>
						{/* Image Section */}
						{item.category_image?.url && (
							<img
								src={item.category_image.url}
								alt={item.category_link?.title}
								className="category-tile-image"
							/>
						)}

						{/* Title Band */}
						<div className="category-tile-band">
							{item.category_link?.title}
						</div>
					</a>
				))}
			</div>
		</section>
	);
}
