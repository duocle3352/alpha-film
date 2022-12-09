import config from '~/config';

import { Home } from '~/page/Home';
import { Discovery } from '~/page/Discovery';
import { ComingSoon } from '~/page/ComingSoon';
import { Detail } from '~/page/Detail';
import { Recent } from '~/page/Recent';
import { Bookmark } from '~/page/Bookmark';
import { Search } from '~/page/Search';
import { Profile } from '~/page/Profile';

const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.discovery, component: Discovery },
    { path: config.routes.discoveryPage, component: Discovery },
    { path: config.routes.coming, component: ComingSoon },
    { path: config.routes.comingPage, component: ComingSoon },
    { path: config.routes.recent, component: Recent },
    { path: config.routes.bookmark, component: Bookmark },
    { path: config.routes.search, component: Search },
    { path: config.routes.detail, component: Detail },
    { path: config.routes.profile, component: Profile, layout: null },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
