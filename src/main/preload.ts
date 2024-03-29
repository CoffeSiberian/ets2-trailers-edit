// Disable no-unused-vars, broken for spread args
/* eslint no-unused-vars: off */
import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';
import { Profile } from 'renderer/types/SaveGameTypes';

export type Channels = 'ipc-example';
export type ChannelsDocsDir = 'pathDocsDir';
export type ChannelsReadProfileNames = 'readProfileNames';

const electronHandler = {
  ipcRenderer: {
    sendMessage(channel: Channels, ...args: unknown[]) {
      ipcRenderer.send(channel, ...args);
    },
    on(channel: Channels, func: (...args: unknown[]) => void) {
      const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
        func(...args);
      ipcRenderer.on(channel, subscription);

      return () => {
        ipcRenderer.removeListener(channel, subscription);
      };
    },
    once(channel: Channels, func: (...args: unknown[]) => void) {
      ipcRenderer.once(channel, (_event, ...args) => func(...args));
    },
  },
  pathDocsDir: {
    async getDocsDir(channel: ChannelsDocsDir) {
      return await ipcRenderer.invoke(channel);
    },
  },
  readProfileNames: {
    async readProfileNames(
      channel: ChannelsReadProfileNames
    ): Promise<Array<Profile>> {
      return await ipcRenderer.invoke(channel);
    },
  },
};

contextBridge.exposeInMainWorld('electron', electronHandler);

export type ElectronHandler = typeof electronHandler;
