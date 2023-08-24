/** @type {import('next').NextConfig} */
const nextConfig = {
    async headers() {
        return [
            {
                source: '/tasklist',
                headers: [
                    {
                        key:"Cache-Control",
                        value: "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0"
                    }
                ]
            },
            {
                source: '/api/gettasks',
                headers: [
                    {
                        key:"Cache-Control",
                        value: "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0"
                    }
                ]
            }
        ]
    }
}

module.exports = nextConfig
