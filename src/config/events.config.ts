import Emmiter from 'events';
let eventEmitter: Emmiter;

export const initEvent = () => {
    eventEmitter = new Emmiter();
    eventEmitter.on('updateIndex', () => {
        console.log('updating index!');
    });
    eventEmitter.emit('event');
}

export const getEvent = () => {
    return eventEmitter;
}