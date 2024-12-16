const isProd = process.env.NODE_ENV === 'production';
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true, // Disable default image optimization
  },
  assetPrefix: isProd ? '/admission.sec.ac.bd/' : '',
  basePath: isProd ? '/admission.sec.ac.bd' : '',
  output: 'export'
};

export default nextConfig;