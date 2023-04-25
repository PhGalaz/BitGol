import { WebSocketServer } from "ws";

const port = 1234;
const wss = new WebSocketServer({ port });
const clients = new Map();

wss.on("connection", (ws) => {
    const id = uuidv4();
    const color = Math.floor(Math.random() * 360);
    const metadata = { id, color };
  
    clients.set(ws, metadata);
    console.log(metadata);
    ws.on('message', (data: string) => {
        const message = JSON.parse(data);
        const metadata = clients.get(ws);
    
        message.sender = metadata.id;
        message.color = metadata.color;
    
        const outbound = JSON.stringify(message);
    
        [...clients.keys()].forEach((client) => {
          client.send(outbound);
        });
    });

    ws.on("close", () => {
        clients.delete(ws);
    });
});


function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
}

console.log(`WSS listening at port ${port}`);

export { wss };
