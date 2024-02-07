/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	transpilePackages: ['@mui/x-charts'],
	images: {
		domains: ["minio.grovyo.xyz"]
	},
};

module.exports = nextConfig;
