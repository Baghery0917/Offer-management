// src/lib/prisma.ts

/**
 * 这是一个“瞒天过海”的假 Prisma 客户端
 * 它的作用是拦截所有对数据库的操作，并返回默认值，
 * 从而彻底避免 Vercel 上的 SQLite 路径报错。
 */

const mockPrisma: any = new Proxy({}, {
  get: (target, prop) => {
    // 如果代码访问的是 prisma.$connect 或 $on 等方法
    if (prop.toString().startsWith('$')) {
      return () => Promise.resolve();
    }

    // 否则它就是在访问某个表（如 prisma.application）
    return new Proxy({}, {
      get: (tableTarget, method) => {
        // 无论调用 findMany, count, findFirst 等任何方法
        // 我们都统一返回一个返回默认值的异步函数
        return async (...args: any[]) => {
          console.log(`[Mock Prisma] 调用了: ${prop.toString()}.${method.toString()}`);
          
          // 根据常见需求返回默认值
          if (method === 'count') return 0;
          if (method === 'findMany') return [];
          return null; 
        };
      }
    });
  }
});

// 导出这个假客户端
export const prisma = mockPrisma;