import { Image as UnpicImage } from "@unpic/react";
import type { ComponentProps } from "react";

interface ImageProps {
	src: string;
	alt: string;
	width: number;
	height: number;
	className?: string;
	title?: string;
	priority?: boolean;
	onError?: ComponentProps<"img">["onError"];
}

/**
 * Thin wrapper around @unpic/react's Image (constrained layout).
 * Replaces next/image — responsive, lazy by default, works with any remote src.
 */
export function Image(props: ImageProps) {
	return <UnpicImage layout="constrained" {...props} />;
}
