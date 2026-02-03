"use client";
import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import "./BannerCarousel.css";

export default function BannerCarousel({ data }: { data: any }) {
	const slides = data.banner_carousel?.[0]?.slides || [];
	const [emblaRef] = useEmblaCarousel({ loop: true });

	return (
		<section className="banner-viewport" ref={emblaRef}>
			<div className="banner-container">
				{slides.map((slide: any, index: number) => (
					<div key={index} className="banner-slide">
						{/* Background Image */}
						{slide.slide_image && (
							<img
								src={slide.slide_image.url}
								alt={slide.slide_heading}
								className="banner-img"
							/>
						)}

						{/* Text Overlay */}
						<div className="banner-content">
							{slide.slide_heading && (
								<h2 className="banner-title">
									{slide.slide_heading}
								</h2>
							)}
							{slide.slide_text && (
								<p className="banner-text">
									{slide.slide_text}
								</p>
							)}
							{slide.slide_cta_link && (
								<a
									href={slide.slide_cta_link}
									className="banner-cta"
								>
									{slide.slide_cta_text || "Learn More"}
								</a>
							)}
						</div>
					</div>
				))}
			</div>
		</section>
	);
}
