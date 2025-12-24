cd backend &&
npm install &&
npx prisma migrate reset --force &&
npx prisma migrate deploy &&
npx prisma generate &&
npx tsx populatedb.ts
