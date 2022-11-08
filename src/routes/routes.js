import config from '~/config';
// import { HeaderOnly } from '~/layouts';

import { Home } from '~/page/Home';
import { Search } from '~/page/Search';
import { TV } from '~/page/TV';
import { Movie } from '~/page/Movie';
import { Detail } from '~/page/Detail';
import { Profile } from '~/page/Profile';

const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.search, component: Search },
    { path: config.routes.tv, component: TV },
    { path: config.routes.movie, component: Movie },
    { path: config.routes.detail, component: Detail },
    { path: config.routes.profile, component: Profile, layout: null },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
