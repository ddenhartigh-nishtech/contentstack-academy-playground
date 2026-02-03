import React from "react";
import "./ShopByCategory.css";

export default function ShopByCategory({ data }: { data: any }) {
	// Accessing the first item in the array from your JSON structure
	const content = data.shop_by_category?.[0];

	if (!content) return null;

	return (
		<section className="shop-category-section">
			{/* Background Image */}
			{content.shop_by_category_background?.url && (
				<img
					src={content.shop_by_category_background.url}
					alt={content.title || "Shop by Category"}
					className="shop-category-bg"
				/>
			)}

			{/* Centered Content */}
			<div className="shop-category-content">
				{content.title && (
					<h2 className="shop-category-title">{content.title}</h2>
				)}
				{content.shop_by_category_blurb && (
					<p className="shop-category-blurb">
						{content.shop_by_category_blurb}
					</p>
				)}

				{/* Note: If your JSON has a CTA field, replace "Request Product Sample" */}
				<a href="#" className="shop-category-cta">
					Request Product Sample
				</a>
			</div>
		</section>
	);
}
