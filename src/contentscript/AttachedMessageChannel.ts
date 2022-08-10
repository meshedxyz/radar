import { nanoid } from "nanoid";

export default class AttachedMessageChannel {
  private waitingRequestMap;
  private requestListenerMap;
  private defaultListener: ((message: any) => any) | null;
  private channel;

  constructor(channelName: string) {
    this.defaultListener = null;
    this.requestListenerMap = new Map<string, (data: any) => any>();
    this.waitingRequestMap = new Map<
      string,
      {
        resolve: (arg: any) => any;
        reject: (arg: any) => any;
      }
    >();

    this.channel = new BroadcastChannel(channelName);

    this.channel.onmessage = (message) => {
      if (message.data) {
        const { id, type, data, err } = message.data;
        // responses
        if (this.waitingRequestMap.has(id)) {
          const { resolve, reject } = this.waitingRequestMap.get(id)!;
          err ? reject(err) : resolve(data);
          // requests
        } else if (this.requestListenerMap.has(type)) {
          this.requestListenerMap.get(type)!(data)
            .then((result: any) => {
              this.channel.postMessage({
                data: result,
                id: id,
              });
            })
            .catch((err: any) => {
              this.channel.postMessage({
                err: err,
                id: id,
              });
            });
        } else if (this.defaultListener) {
          this.defaultListener(message.data)
            .then((result: any) => {
              this.channel.postMessage({
                data: result,
                id: id,
              });
            })
            .catch((err: any) => {
              this.channel.postMessage({
                err: err,
                id: id,
              });
            });
        }
      }
    };
  }

  public request = (type: string, data: any) => {
    return new Promise((resolve, reject) => {
      const requestId = nanoid();
      this.waitingRequestMap.set(requestId, {
        resolve,
        reject,
      });
      this.channel.postMessage({
        type: type,
        data: data,
        id: requestId,
      });
    });
  };

  public addListener = (type: string, handler: (data: any) => Promise<any>) => {
    this.requestListenerMap.set(type, handler);
  };

  public setDefaultListener = (handler: (message: any) => Promise<any>) => {
    this.defaultListener = handler;
  };
}
