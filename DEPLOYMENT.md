Deployment checklist (quick)

1. Create MongoDB Atlas cluster and a database user. Copy the connection string.
2. On your host (Render/Heroku/Railway), set env vars: `MONGO_URI`, `JWT_SECRET`, and any storage creds (Cloudinary/S3).
3. For backend, start command: `npm start`. Ensure `PORT` is not hard-coded (this repo uses `process.env.PORT`).
4. For frontend, set `VITE_API_URL` to your backend URL on Vercel/Netlify; build command: `npm run build`, output: `dist`.
5. Move image uploads off local disk for production (use Cloudinary or S3).
6. Test register/login, `/api/auth/me`, and item upload after deploy.
