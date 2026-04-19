// src/lib/prisma.ts
const mockData = [
  {
    id: "1",
    company: "字节跳动",
    position: "后端工程师",
    stage: "INTERVIEW_1",
    status: { dot: "blue" }, // 补上可能缺失的属性
    appliedAt: new Date(),
    events: [],
    interviews: []
  }
];

const mockPrisma: any = new Proxy({}, {
  get: (target, prop) => {
    if (prop.toString().startsWith('$')) return () => Promise.resolve();
    return new Proxy({}, {
      get: (tableTarget, method) => {
        return async () => {
          if (method === 'count') return 1;
          if (method === 'findMany') return mockData; // 返回一条假数据
          if (method === 'findUnique' || method === 'findFirst') return mockData[0];
          return null; 
        };
      }
    });
  }
});

export const prisma = mockPrisma;