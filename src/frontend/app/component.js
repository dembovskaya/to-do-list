import { Header } from './components/header';
import { Main } from './components/main';

export function App() {
  const app = document.createDocumentFragment();
  
  app.append(Header(), Main());

  return app;
}

