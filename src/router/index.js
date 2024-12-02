import { createRouter, createWebHistory } from 'vue-router'
import Welcome from '../components/WelcomePage.vue'
import Login from '../components/LoginPage.vue'
import Dashboard from '../components/DashBoard.vue'
import { auth } from '@/firebase';  // Make sure to import auth from Firebase

const routes = [
  { path: '/', component: Welcome },
  { path: '/login', component: Login },
  { path: '/dashboard', 
    component: Dashboard, 
    beforeEnter: (to, from, next) => {
      const user = auth.currentUser;
      if (user) {
        next();
      } else {
        next('/login');
      }
    }
  },
  { path: "/Overview", name: "Overview", component: () => import("../views/OverviewPage.vue") },
  { path: "/kpi", name: "KPI", component: () => import("../views/KPIPage.vue") },
  { path: "/curriculum-statistics", name: "Curriculum Statistics", component: () => import("../views/CurriculumStatistics.vue") },
  { path: "/research", name: "Research", component: () => import("../views/ResearchPage.vue") },
  { path: "/academic-service", name: "Academic Service", component: () => import("../views/AcademicService.vue") },
  { path: "/collaboration", name: "Collaboration", component: () => import("../views/CollaborationPage.vue") },
  { path: "/faculty-staff", name: "Faculty & Staff", component: () => import("../views/FacultyStaff.vue") },
  { path: "/alumni", name: "Alumni", component: () => import("../views/AlumniPage.vue") },
  { path: "/sdgs-impact", name: "SDGs Impact", component: () => import("../views/SDGsImpactPage.vue") },
  { path: "/management", name: "Management", component: () => import("../views/ManagementPage.vue") },
  { path: '/:catchAll(.*)', redirect: '/login' }  // Redirect for undefined routes
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

// Apply a global navigation guard
router.beforeEach((to, from, next) => {
  // Skip the guard for the Welcome and Login pages
  if (to.path === '/' || to.path === '/login') {
    next();
  } else {
    // Check if the user is authenticated
    const user = auth.currentUser;
    if (user) {
      next();  // Proceed to the route
    } else {
      next('/login');  // Redirect to the login page if not authenticated
    }
  }
});

export default router;
