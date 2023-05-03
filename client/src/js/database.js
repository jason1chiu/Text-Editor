import { openDB } from 'idb';

const DB_NAME = 'jate';
const DB_STORE_NAME = 'content';

const initdb = async () =>
  openDB(DB_NAME, 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains(DB_STORE_NAME)) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore(DB_STORE_NAME, { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  const db = await openDB(DB_NAME, 1);
  const tx = db.transaction(DB_STORE_NAME, 'readwrite');
  const store = tx.objectStore(DB_STORE_NAME);
  await store.put({ content });
  await tx.done;
  console.log('Content added to the database');
};

// Add logic for a method that gets all the content from the database
export const getDb = async () => {
  const db = await openDB(DB_NAME, 1);
  const tx = db.transaction(DB_STORE_NAME, 'readonly');
  const store = tx.objectStore(DB_STORE_NAME);
  const content = await store.getAll();
  await tx.done;
  console.log('Content fetched from the database', content);
  return content;
};

initdb();