/* tslint:disable:max-line-length */
import { FuseNavigationItem } from '@fuse/components/navigation';

export const defaultNavigation: FuseNavigationItem[] = [
    {
        id: 'dashboard',
        title: 'Dashboard',
        type: 'basic',
        icon: 'heroicons_outline:chart-pie',
        link: '/dashboard',
        allowedRoles: ['ADMIN'],
    },
    {
        id: 'project',
        title: 'Projects',
        type: 'basic',
        icon: 'heroicons_outline:table',
        link: '/projects',
        allowedRoles : ['ADMIN', 'SALES', 'USER', 'PM']
    },
    {
        id: 'resources',
        title: 'Resources',
        type: 'basic',
        icon: 'heroicons_outline:user-add',
        link: '/resources',
        allowedRoles: ['ADMIN', 'SALES', 'HR'],
    },
    {
        id: 'external-projects',
        title: 'External Projects',
        type: 'basic',
        icon: 'heroicons_outline:view-grid-add',
        link: '/external-projects',
        allowedRoles:['ADMIN', 'SALES', 'USER', 'PM']
    },
    {
        id: 'profit-loss',
        title: 'P & L',
        type: 'basic',
        icon: 'mat_outline:trending_up',
        link: '/profit-loss',
        allowedRoles: ['ADMIN'],
    },
    {
        id: 'forms',
        title: 'Forms',
        type: 'basic',
        icon: 'heroicons_outline:pencil-alt',
        link: '/forms',
        allowedRoles: ['ADMIN'],
    },
    {
        id: 'platform-users',
        title: 'Platform Users',
        type: 'basic',
        icon: 'heroicons_outline:users',
        link: '/platform-users',
        allowedRoles: ['ADMIN', 'HR'],
    },
];
export const compactNavigation: FuseNavigationItem[] = [];
export const futuristicNavigation: FuseNavigationItem[] = [];
export const horizontalNavigation: FuseNavigationItem[] = [];
