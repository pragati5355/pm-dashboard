/* tslint:disable:max-line-length */
import { FuseNavigationItem } from '@fuse/components/navigation';

export const defaultNavigation: FuseNavigationItem[] = [
    {
        id: 'dashboard',
        title: 'Dashboard',
        type: 'basic',
        icon: 'heroicons_outline:chart-pie',
        link: '/dashboard',
    },
    {
        id: 'project',
        title: 'Project',
        type: 'basic',
        icon: 'heroicons_outline:table',
        link: '/projects',
    },
    {
        id: 'resources',
        title: 'Resources',
        type: 'basic',
        icon: 'heroicons_outline:user-add',
        link: '/resources',
    },
    {
        id: 'external-projects',
        title: 'External Projects',
        type: 'basic',
        icon: 'heroicons_outline:view-grid-add',
        link: '/external-projects',
    },
    {
        id: 'forms',
        title: 'Forms',
        type: 'basic',
        icon: 'heroicons_outline:pencil-alt',
        link: '/forms',
    },
    {
        id: 'platform-users',
        title: 'Platform Users',
        type: 'basic',
        icon: 'heroicons_outline:users',
        link: '/platform-users',
    },
];
export const compactNavigation: FuseNavigationItem[] = [];
export const futuristicNavigation: FuseNavigationItem[] = [];
export const horizontalNavigation: FuseNavigationItem[] = [];
