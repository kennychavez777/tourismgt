import { initializedApp } from 'firebase/app';
import firebaseConfig from './firebaseConfig';

const app = initializedApp(firebaseConfig);

export default app;