import type { ReactElement } from 'react';

import Form from './components/Form/Form';
import List from './components/List/List';

export default function Home(): ReactElement {
  return (
    <main>
      <h1>hello</h1>
      <Form />
      <List />
    </main>
  );
}
