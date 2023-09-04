import { createRouter, createWebHistory } from "vue-router"

import adminLayout from './layouts/admin/theme.vue'

import adminDashboard from './views/admin/dashboard.vue'
import adminCategory from './views/admin/category.vue'
import adminGenre from './views/admin/genre.vue'
import adminCountry from './views/admin/country.vue'
import adminMovie from './views/admin/movie.vue'
import adminServer from './views/admin/server.vue'
import adminEpisode from './views/admin/episode.vue'
import adminTheme from './views/admin/theme.vue'
const routes = [
    { 
        path: '/admin/thong-ke', 
        name:'admin-dashboard-router',
        component: adminDashboard ,
        meta:{
            layout:adminLayout
        }
    },
    { 
        path: '/admin/danh-muc', 
        name:'admin-category-router',
        component: adminCategory ,
        meta:{
            layout:adminLayout
        }
    },
    { 
        path: '/admin/the-loai', 
        name:'admin-genre-router',
        component: adminGenre ,
        meta:{
            layout:adminLayout
        }
    },
    { 
        path: '/admin/quoc-gia', 
        name:'admin-country-router',
        component: adminCountry ,
        meta:{
            layout:adminLayout
        }
    },
    { 
        path: '/admin/danh-sach-phim', 
        name:'admin-movie-router',
        component: adminMovie ,
        meta:{
            layout:adminLayout
        }
    },
    { 
        path: '/admin/server-phim', 
        name:'admin-server-router',
        component: adminServer ,
        meta:{
            layout:adminLayout
        }
    },
    { 
        path: '/admin/danh-sach-tap-phim', 
        name:'admin-episode-router',
        component: adminEpisode,
        meta:{
            layout:adminLayout
        }
    },
    { 
        path: '/admin/giao-dien', 
        name:'admin-theme-router',
        component: adminTheme,
        meta:{
            layout:adminLayout
        }
    },
]
const router = createRouter({
    history: createWebHistory(),
    routes,
})


export default router;