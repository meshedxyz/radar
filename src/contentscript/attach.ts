// meshed.xyz

import AttachedMessageChannel from "./AttachedMessageChannel";
import {
  RADAR_EVENT,
  PROXIED_FUNCTIONS,
  RADAR_METHODS,
} from "../constants/Types";

let radarProxy: any;
let provider = (window as any).ethereum;
const channelName = document.currentScript?.getAttribute("channelName")!;
document.currentScript?.setAttribute("channelName", "");
const channel = new AttachedMessageChannel(channelName);

const radarHandler = {
  get(target: any, prop: any, receiver: any) {
    const originalFunction = Reflect.get(target, prop, receiver);
    if (!PROXIED_FUNCTIONS.has(prop)) {
      return originalFunction;
    }

    return async (...args: any) => {
      try {
        const arg0IsMethodString = typeof args[0] === "string";
        const method = arg0IsMethodString ? args[0] : args[0].method;
        const params = arg0IsMethodString ? args[1] : args[0].params;

        if (RADAR_METHODS.has(method)) {
          const providerInfo = {
            chainId: await target.request({ method: "eth_chainId" }),
          };

          channel.request(RADAR_EVENT, {
            providerInfo,
            params,
            method,
          });
        }
      } catch (e) {
        // Do nothing - let tx pass
        console.debug(`Error: ${e}`);
      }

      return originalFunction(...args);
    };
  },
};

Object.defineProperty(window, "ethereum", {
  get() {
    if (!radarProxy) {
      radarProxy = new Proxy(provider, radarHandler);
      provider = undefined;
      console.log("Radar by meshed.xyz attached!");
    }
    return radarProxy;
  },
  set(newProvider) {
    radarProxy = new Proxy(newProvider, radarHandler);
  },
  configurable: true,
});
