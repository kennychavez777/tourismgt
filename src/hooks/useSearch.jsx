import { FIRESTORE as db } from '../firebase/config.js';
import { collection, getDocs, query } from 'firebase/firestore';

export function useSearch () {
  const getAllPosts = async () => {
    const q = query(collection(db, "posts"));
    let posts = [];

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((item) => {
      const p = item.data();
      p.id = item.id;
      posts.push(p)
    });

    return posts;
  }

  return { getAllPosts };
}