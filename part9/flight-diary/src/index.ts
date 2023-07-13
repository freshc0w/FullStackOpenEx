import express from 'express';
import cors from 'cors';
import diaryRouter from './routes/diaries';
const app = express();

// const allowedOrigins = ['http://localhost:3000', 'http://localhost:3001'];

// const options: cors.CorsOptions = {
// 	origin: allowedOrigins,
// };

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors());
app.use(express.json());

const PORT = 3001;

app.get('/ping', (_req, res) => {
	console.log('someone pinged here');
	res.send('pong');
});

app.use('/api/diaries', diaryRouter);

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
