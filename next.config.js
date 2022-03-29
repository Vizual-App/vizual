module.exports = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/dex/:path*',
        destination: 'http://212.2.246.126:5556/dex/:path*',
      },
    ]
  },
}
