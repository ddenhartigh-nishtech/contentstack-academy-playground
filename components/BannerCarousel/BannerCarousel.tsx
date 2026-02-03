"use client";
import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import "./BannerCarousel.css";

export default function BannerCarousel({ data }: { data: any }) {
	const slides = data.banner_carousel?.[0]?.slides || [];
	const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
	const [selectedIndex, setSelectedIndex] = useState(0);

	const scrollPrev = useCallback(() => {
		if (emblaApi) emblaApi.scrollPrev();
	}, [emblaApi]);

	const scrollNext = useCallback(() => {
		if (emblaApi) emblaApi.scrollNext();
	}, [emblaApi]);

	const scrollTo = useCallback(
		(index: number) => {
			if (emblaApi) emblaApi.scrollTo(index);
		},
		[emblaApi],
	);

	const onSelect = useCallback(() => {
		if (!emblaApi) return;
		setSelectedIndex(emblaApi.selectedScrollSnap());
	}, [emblaApi]);

	useEffect(() => {
		if (!emblaApi) return;
		onSelect();
		emblaApi.on("select", onSelect);
		emblaApi.on("reInit", onSelect);
	}, [emblaApi, onSelect]);

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

			{/* Navigation Buttons */}
			<button
				className="banner-nav banner-nav-prev"
				onClick={scrollPrev}
				aria-label="Previous slide"
			>
				‹
			</button>
			<button
				className="banner-nav banner-nav-next"
				onClick={scrollNext}
				aria-label="Next slide"
			>
				›
			</button>

			{/* Dot Indicators */}
			<div className="banner-dots">
				{slides.map((_: any, index: number) => (
					<button
						key={index}
						className={`banner-dot ${
							index === selectedIndex ? "banner-dot-active" : ""
						}`}
						onClick={() => scrollTo(index)}
						aria-label={`Go to slide ${index + 1}`}
					/>
				))}
			</div>
		</section>
	);
}
