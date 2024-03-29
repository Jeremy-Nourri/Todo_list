/* eslint-disable linebreak-style */
import { createRoot } from 'react-dom/client';

import App from 'src/components/App';

const rootReactElement = <App />;

const root = createRoot(document.getElementById('root'));

root.render(rootReactElement);
