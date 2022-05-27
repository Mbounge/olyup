import nats, { Stan } from 'node-nats-streaming';

class NatsWrapper {
  private _client?: Stan;

  // if we try to connect to nats before, it's connected to the client throw an error
  get client() {
    if (!this._client) {
      throw new Error('Cannot access NATS client before connecting to it!');
    }

    return this._client;
  }

  connect(clusterId: string, clientId: string, url: string) {
    this._client = nats.connect(clusterId, clientId, {
      url,
      waitOnFirstConnect: true,
    });

    return new Promise<void>((resolve, reject) => {
      this.client.on('connect', () => {
        console.log('Connected to Nats!!!');
        resolve();
      });
      this.client.on('error', (err) => {
        reject(err);
      });
    });
  }
}

// Exporting one single instance of the class around the app
export const natsWrapper = new NatsWrapper();
