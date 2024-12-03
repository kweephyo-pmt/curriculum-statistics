import { createRouter, createWebHistory } from 'vue-router';
import { auth } from '@/firebase';
import { onAuthStateChanged } from 'firebase/auth';

// Lazy load the components for better performance
const Welcome = () => import('../components/WelcomePage.vue');
const Login = () => import('../components/LoginPage.vue');
const Dashboard = () => import('../components/DashBoard.vue');
const Overview = () => import('../views/OverviewPage.vue');
const KPI = () => import('../views/KPIPage.vue');
const CurriculumStatistics = () => import('../views/CurriculumStatistics.vue');
const Research = () => import('../views/ResearchPage.vue');
const AcademicService = () => import('../views/AcademicService.vue');
const Collaboration = () => import('../views/CollaborationPage.vue');
const FacultyStaff = () => import('../views/FacultyStaff.vue');
const Alumni = () => import('../views/AlumniPage.vue');
const SDGsImpact = () => import('../views/SDGsImpactPage.vue');
const Management = () => import('../views/ManagementPage.vue');
const NotFound = () => import('../components/NotFound.vue'); // 404 Page

const routes = [
  { path: '/', name: 'Welcome', component: Welcome },
  { path: '/login', name: 'Login', component: Login },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: { requiresAuth: true }, // Protected route
  },
  { path: '/overview', name: 'Overview', component: Overview, meta: { requiresAuth: true } },
  { path: '/kpi', name: 'KPI', component: KPI, meta: { requiresAuth: true } },
  { path: '/curriculum-statistics', name: 'Curriculum Statistics', component: CurriculumStatistics, meta: { requiresAuth: true } },
  { path: '/research', name: 'Research', component: Research, meta: { requiresAuth: true } },
  { path: '/academic-service', name: 'Academic Service', component: AcademicService, meta: { requiresAuth: true } },
  { path: '/collaboration', name: 'Collaboration', component: Collaboration, meta: { requiresAuth: true } },
  { path: '/faculty-staff', name: 'Faculty & Staff', component: FacultyStaff, meta: { requiresAuth: true } },
  { path: '/alumni', name: 'Alumni', component: Alumni, meta: { requiresAuth: true } },
  { path: '/sdgs-impact', name: 'SDGs Impact', component: SDGsImpact, meta: { requiresAuth: true } },
  { path: '/management', name: 'Management', component: Management, meta: { requiresAuth: true } },
  { path: '/:catchAll(.*)', name: 'NotFound', component: NotFound }, // 404 Page
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// Ensure Firebase initializes before route navigation
let isAuthInitialized = false;

const waitForAuth = () =>
  new Promise((resolve) => {
    if (isAuthInitialized) {
      resolve(auth.currentUser);
    } else {
      onAuthStateChanged(auth, (user) => {
        isAuthInitialized = true;
        resolve(user);
      });
    }
  });

router.beforeEach(async (to, from, next) => {
  const user = await waitForAuth();

  if (to.meta.requiresAuth && !user) {
    next('/login'); // Redirect to login if the route is protected and user is not authenticated
  } else if ((to.path === '/login' || to.path === '/') && user) {
    next('/overview'); // Redirect logged-in users away from login and welcome page
  } else {
    next(); // Allow access
  }
});

export default router;
