// ** @type {import('next').NextConfig} *



const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-eval' 'unsafe-inline';
    style-src 'self' 'unsafe-inline';
    img-src 'self' blob: data:;
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    allow-all-mixed-content;
    allow-insecure-requests;`


const nextConfig = {
  reactStrictMode: true, // Recommended for Next.js 13 and above
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: cspHeader.replace(/\n/g, 'http://ec2-13-234-135-50.ap-south-1.compute.amazonaws.com'),
          },
        ],
      },
    ]
  },
  images: {
    remotePatterns: [
      {
        hostname: "utfs.io",
      },
      {
        hostname: "lh3.googleusercontent.com",
      },
      {
        hostname: "avatars.githubusercontent.com",
      },
    ],
  },
};

export default nextConfig;


