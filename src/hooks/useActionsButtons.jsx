import { FIRESTORE as db } from '../firebase/config.js';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

export function useActionsButtons () {
  const getPost = async (id) => {
    let post = {}
    const postRef = doc(db, 'posts', id);
    const snapshot = await getDoc(postRef)
    // console.log('snapshot ', snapshot.data())
    if (snapshot.exists()) {
      post = snapshot.data();
      post.id = snapshot.id;

      return post;
    }
    
    return post;
  }

  const updateLikes = (likes, postId) => {
    const docRef = doc(db, 'posts', postId);
    updateDoc(docRef, {
      likes: likes
    });
  }

  return { getPost, updateLikes };
}