const nextConfig = {
	images: {
		remotePatterns: [
			{ protocol: "https", hostname: "images.unsplash.com" },
			{ protocol: "https", hostname: "fakestoreapi.com" },
			{ protocol: "https", hostname: "images.pexels.com" },
			{ protocol: "https", hostname: "images.asos-media.com" },
			{ protocol: "https", hostname: "ui-avatars.com" },
			{ protocol: "https", hostname: "m.media-amazon.com" },
			{ protocol: "https", hostname: "avatars.githubusercontent.com" },
			{ protocol: "https", hostname: "external-content.duckduckgo.com" },
		],
	},
	allowedDevOrigins: ["http://127.0.0.1:3000", "http://localhost:3000"],
};

export default nextConfig;
