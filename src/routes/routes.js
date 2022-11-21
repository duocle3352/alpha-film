import config from '~/config';
// import { HeaderOnly } from '~/layouts';

import { Home } from '~/page/Home';
import { Discovery } from '~/page/Discovery';
import { Community } from '~/page/Community';
import { ComingSoon } from '~/page/ComingSoon';
import { Search } from '~/page/Search';
// import { TV } from '~/page/TV';
// import { Movie } from '~/page/Movie';
import { Detail } from '~/page/Detail';
import { Profile } from '~/page/Profile';

const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.community, component: Community },
    { path: config.routes.discovery, component: Discovery },
    { path: config.routes.discoveryPage, component: Discovery },
    { path: config.routes.coming, component: ComingSoon },
    { path: config.routes.comingPage, component: ComingSoon },
    { path: config.routes.search, component: Search },
    { path: config.routes.detail, component: Detail },
    { path: config.routes.profile, component: Profile, layout: null },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
