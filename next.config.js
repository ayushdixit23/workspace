/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	transpilePackages: ['@mui/x-charts'],
	images: {
		domains: ["minio.grovyo.xyz"]
	}
	//   images: {
	//     remotePatterns: [
	//       {
	//         protocol: "https",
	//         hostname: "minio.grovyo.site",
	//       },
	//     ],
	//   },
	//   images: {
	// 		domains: ["minio.grovyo.xyz"],
	// 	},
}

module.exports = nextConfig
