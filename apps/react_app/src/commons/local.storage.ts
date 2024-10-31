import localforage from 'localforage';

export const collaboStorage = localforage.createInstance({
  name: 'na_collabo',
  driver: localforage.INDEXEDDB,
  version: 1.0,
  size: 4980736,
  storeName: 'edits',
  description: '',
});
