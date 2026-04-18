// prisma/seed.ts

async function main() {
  console.log("Mock seed: 数据库功能已禁用，跳过数据填充。");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });