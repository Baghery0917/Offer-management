// src/lib/prisma.ts

// 创建一个递归的 Proxy，无论访问多深都返回它自己或安全值
const deepSafeObject: any = new Proxy(() => {}, {
  get: (target, prop) => {
    if (prop === 'toString' || prop === Symbol.toPrimitive) return () => "";
    if (prop === 'toJSON') return () => ({});
    // 针对常见的 UI 渲染需求返回安全值
    if (prop === 'map') return (cb: any) => [cb(deepSafeObject, 0)].filter(Boolean);
    if (prop === 'id') return "1";
    if (prop === 'company') return "演示公司";
    if (prop === 'dot') return "bg-blue-500"; // 强制给 dot 一个值
    return deepSafeObject;
  },
  apply: () => deepSafeObject,
});

const mockPrisma: any = new Proxy({}, {
  get: (target, prop) => {
    // 拦截 Prisma 的数据库方法
    if (prop.toString().startsWith('$')) return () => Promise.resolve();
    return new Proxy({}, {
      get: (tableTarget, method) => {
        return async () => {
          if (method === 'count') return 1;
          if (method === 'findMany') return [deepSafeObject];
          if (method === 'findUnique' || method === 'findFirst') return deepSafeObject;
          return null;
        };
      }
    });
  }
});

export const prisma = mockPrisma;