import { v4 as uuidv4 } from 'uuid';

// Function to generate a UUID asynchronousl
 async function generateUUID() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const uuid = uuidv4();
      resolve(uuid);
    }, 0); 
  });
}


export {generateUUID};