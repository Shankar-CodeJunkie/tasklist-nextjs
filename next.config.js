/** @type {import('next').NextConfig} */
const nextConfig = {
    async headers() {
        return [
            {
                source: '/tasklist',
                headers: [
                    {
                        key:"Cache-Control",
                        value: "no-store, no-cache, must-revalidate, proxy-revalidate"
                    }
                ]
            },
            {
                source: '/api/*',
                headers: [
                    {
                        key:"Cache-Control",
                        value: "no-store, no-cache, must-revalidate, proxy-revalidate"
                    }
                ]
            }
        ]
    }
}

module.exports = nextConfig
