/** @type {import('next').NextConfig} */
const nextConfig = {

  env: {
    LANGFLOW_API_URL: process.env.LANGFLOW_API_URL,
    LANGFLOW_API_TOKEN: process.env.LANGFLOW_API_TOKEN,

  },
};

export default nextConfig;
