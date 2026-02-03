import React from "react";
import "./FeaturedProducts.css";

export default function FeaturedProducts({ data }: { data: any }) {
	// Accessing the main object from the modular block
	const content = data.featured_products?.[0];

	if (!content) return null;

	const bannerImage = content.featured_products_banner_image?.url;
	const products = content.products || [];

	return (
		<section className="featured-products-section">
			<div className="featured-container">
				{/* Top Centered Banner Image */}
				{bannerImage && (
					<div className="featured-banner-wrapper">
						<img
							src={bannerImage}
							alt="Featured Banner"
							className="featured-banner-img"
						/>
					</div>
				)}

				{/* Bottom Row: 3 Images */}
				<div className="products-grid">
					{products.slice(0, 3).map((item: any, index: number) => (
						<div key={index} className="product-item">
							{item.featured_product_image?.url && (
								<img
									src={item.featured_product_image.url}
									alt={`Product ${index + 1}`}
									className="product-img"
								/>
							)}
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
