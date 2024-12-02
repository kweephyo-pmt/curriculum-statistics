import { createRouter, createWebHistory } from 'vue-router'
import Welcome from '../components/WelcomePage.vue'
import Login from '../components/LoginPage.vue'
import Dashboard from '../components/DashBoard.vue'

const routes = [
  { path: '/', component: Welcome },
  { path: '/login', component: Login },
  { path: '/dashboard', component: Dashboard },
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
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
