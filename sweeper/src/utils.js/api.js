const url = 'wss://hometask.eg1236.com/game1/';

export const ws = new WebSocket(url);

export const createConnnection = () => {
  ws.addEventListener('open', () => {
    console.log('connection established!');
  });
};

export const createGameApi = (level) => {
  ws.send(`new ${level}`);
};

export const openCellApi = (x, y) => {
  ws.send(`open ${x} ${y}`);
};
