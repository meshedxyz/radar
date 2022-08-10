// meshed.xyz
import { nanoid } from "nanoid";
import { browser } from "webextension-polyfill-ts";
import AttachedMessageChannel from "./AttachedMessageChannel";

function injectScript(url: string, channelName: string) {
  const container = document.head || document.documentElement;
  const s = document.createElement("script");
  s.setAttribute("channelName", channelName);
  s.src = browser.runtime.getURL(url);
  container.insertBefore(s, container.children[0]);
  s.onload = function () {
    s.remove();
  };
}

try {
  const channelName = nanoid();
  const channel = new AttachedMessageChannel(channelName);

  // new requests to background
  channel.setDefaultListener(async (message) => {
    return browser.runtime.sendMessage(message);
  });

  // new requests to frontend
  browser.runtime.onMessage.addListener(async function (message) {
    const { type, data } = message;
    return channel.request(type, data);
  });

  injectScript("attach.js", channelName);
} catch (error) {
  console.error("Radar injection failed.", error);
}
