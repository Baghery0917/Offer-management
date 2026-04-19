// src/lib/prisma.ts

const mockApplication = {
  id: "1",
  company: "演示公司",
  position: "前端工程师",
  level: "INTERN",
  city: "北京",
  channel: "OFFICIAL",
  stage: "APPLIED",
  appliedAt: new Date(),
  lastActionAt: new Date(),
  // 核心修复点：确保 status 对象及其内部的 dot 属性存在
  status: {
    label: "已投递",
    color: "blue",
    dot: "bg-blue-500" 
  },
  events: [],
  interviews: []
};

const mockPrisma: any = new Proxy({}, {
  get: (target, prop) => {
    if (prop.toString().startsWith('$')) return () => Promise.resolve();
    return new Proxy({}, {
      get: (tableTarget, method) => {
        return async () => {
          // 统一返回包含假数据的数组或对象
          if (method === 'count') return 1;
          if (method === 'findMany') return [mockApplication];
          if (method === 'findUnique' || method === 'findFirst') return mockApplication;
          return null; 
        };
      }
    });
  }
});

export const prisma = mockPrisma;