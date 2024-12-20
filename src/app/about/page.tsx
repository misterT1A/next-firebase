import type { ReactElement } from 'react';

import About from '@/components/About/About';

const ProfilePage = (): ReactElement => {
  return (
    <section className="flex w-full items-center justify-center p-4">
      <About />
    </section>
  );
};

export default ProfilePage;
