cd backend &&
npm install &&
npx prisma migrate deploy &&
npx prisma generate &&
npx tsx populate.ts
