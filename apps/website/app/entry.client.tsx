import { RemixBrowser } from '@remix-run/react';
import { hydrateRoot } from 'react-dom/client';

import { connect } from '~/api/socket';

hydrateRoot(document, <RemixBrowser />);

(async () => {
  await connect();
})();
