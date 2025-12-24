cd backend &&
npm install &&
npx prisma migrate deploy &&
npx prisma generate &&
npm tsx populate.ts
