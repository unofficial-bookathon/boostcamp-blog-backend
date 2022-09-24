import express from 'express';

export class App {
  private readonly app;

  constructor() {
    this.app = express();

    this.app.get('/', (req, res) => {
      res.send('hello world');
    });
  }

  listen(port: number) {
    this.app.listen(port, () => {
      console.log(`Listening Port: ${port}`);
    });
  }
}
