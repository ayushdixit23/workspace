// /** @type {import('next').NextConfig} */
// const nextConfig = {
// 	reactStrictMode: false,
// 	transpilePackages: ['@mui/x-charts'],
// 	images: {
// 		domains: ["minio.grovyo.xyz"]
// 	}
// 	//   images: {
// 	//     remotePatterns: [
// 	//       {
// 	//         protocol: "https",
// 	//         hostname: "minio.grovyo.site",
// 	//       },
// 	//     ],
// 	//   },
// 	//   images: {
// 	// 		domains: ["minio.grovyo.xyz"],
// 	// 	},
// }

// module.exports = nextConfig
// module.exports = {
// 	webpack5: true,
// 	webpack: config => {
// 		config.resolve.fallback = {
// 			fs: false,
// 		};

// 		return config;
// 	},
// };

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
	//     domains: ["minio.grovyo.xyz"],
	//   },
	,
	webpack5: true,
	webpack: config => {
		config.resolve.fallback = {
			fs: false,
			path: false,
			os: false,
			net: false,
			tls: false
		};
		return config;
	},
};

module.exports = nextConfig;
