import { storage } from "../config/firebaseConfig";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";


export const uploadImage = (file) => {
  const imageRef = ref(storage, `storeImage/${file.name}`);
  const uploadTask = uploadBytesResumable(imageRef, file);

  return new Promise((resolve, reject) => {
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // You can handle progress here if needed
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
      },
      (error) => {
        console.error(error);
        reject(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
          .then((response) => {
            // If you want to do something with the image URL, you can handle it here
            resolve(response);
          })
          .catch((error) => {
            console.error(error);
            reject(error);
          });
      }
    );
  });
};



