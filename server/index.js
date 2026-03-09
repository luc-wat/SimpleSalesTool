import { createApp } from './createApp.js';

const app = createApp();

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
      console.log(`Running on Port ${PORT}`)
});