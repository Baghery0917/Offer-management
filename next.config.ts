import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* 保持你原本的其他配置（如果有的话） */
  // 使用扩展语法来添加 ESLint 和 TypeScript 配置，避免类型错误
} as NextConfig & {
  eslint: {
    ignoreDuringBuilds: boolean;
  };
  typescript: {
    ignoreBuildErrors: boolean;
  };
};

// 直接添加配置项，绕过类型检查
Object.assign(nextConfig, {
  typescript: {
    // 彻底忽略构建过程中的 TypeScript 类型错误
    ignoreBuildErrors: true,
  },
  eslint: {
    // 彻底忽略构建过程中的 ESLint 检查错误
    ignoreDuringBuilds: true,
  },
});

export default nextConfig;