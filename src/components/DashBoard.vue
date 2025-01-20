<template>
  <div>
    <!-- App Bar with Hamburger Menu and Logout Button -->
    <div class="bg-[#034E69] text-white p-3 fixed top-0 left-0 w-full z-20 flex justify-between items-center shadow-md">
      <div class="flex items-center space-x-3">
        <!-- Hamburger Menu -->
        <div class="cursor-pointer z-30 ml-2" @click="$emit('toggleSidebar')" aria-label="Open Sidebar">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </div>
        <!-- Logo and App Title -->
        <div class="flex items-center space-x-3">
          <img src="@/assets/mfu.png" alt="Logo" class="w-8 h-12" />
          <h2 class="text-xl font-semibold">SOM BI</h2>
        </div>
      </div>
      <div>
        <!-- Logout Button -->
        <button @click="showLogoutModal = true" class="text-white transition-all duration-300 transform hover:scale-105" aria-label="Logout">
          <font-awesome-icon :icon="['fas', 'right-from-bracket']" class="w-8 h-8" />
        </button>
      </div>
    </div>

    <!-- Sidebar -->
    <div
      :class="[
        sidebarOpen ? 'translate-x-0' : '-translate-x-full',
        'bg-[#F3F4F6] text-[#1F2937] w-64 p-4 fixed top-0 left-0 h-full z-10 transition-transform duration-300 ease-in-out shadow-lg flex flex-col'
      ]"
    >
      <h2 class="text-3xl font-bold mb-4 text-center text-[#034E69]">SOM BI</h2>
      <ul class="space-y-3 flex-1">
        <li v-for="(item, index) in menuItems" :key="index">
          <router-link
            :to="item.path"
            class="flex items-center space-x-4 text-lg font-medium py-2 px-4 rounded-lg transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#034E69] focus:ring-offset-2"
            :class="{
              'bg-gray-300 text-[#034E69] font-semibold': $route.path === item.path, // Selected state
              'text-[#034E69] hover:bg-gray-200 hover:text-[#034E69]': $route.path !== item.path || $route.path === item.path // Permanent hover effect for selected items
            }"
          >
            <span class="w-6 h-6" :class="{
              'text-[#034E69]': $route.path === item.path,
              'text-gray-600 hover:text-[#034E69]': $route.path !== item.path
            }">
              <font-awesome-icon :icon="item.icon" />
            </span>
            <span :class="{
              'text-[#034E69]': $route.path === item.path,
              'text-gray-600 hover:text-[#034E69]': $route.path !== item.path
            }">
              {{ item.label }}
            </span>
          </router-link>
        </li>
      </ul>

      <!-- Logout Button at Bottom -->
      <div class="mt-auto">
        <button @click="showLogoutModal = true" class="w-full text-white flex items-center justify-center space-x-3 py-2 px-4 rounded-lg transition-all duration-300 ease-in-out bg-[#034E69] hover:bg-gray-700">
          <font-awesome-icon :icon="['fas', 'right-from-bracket']" class="w-6 h-6" />
          <span>Logout</span>
        </button>
      </div>
    </div>

   <!-- Logout Confirmation Modal -->
    <div v-if="showLogoutModal" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-40">
      <div class="bg-white p-8 rounded-lg shadow-lg w-96 max-w-sm transition-all transform scale-95 hover:scale-100">
        <h3 class="text-2xl font-semibold mb-6 text-center text-[#034E69]">Confirm Logout</h3>
        <p class="text-gray-600 text-center mb-6">Are you sure you want to log out?</p>
        <div class="flex justify-center gap-4">
          <!-- Logout Button -->
          <button @click="logout" class="w-32 bg-[#034E69] text-white py-2 rounded-md hover:bg-[#022F48] transition-all duration-300 transform hover:scale-105 focus:outline-none">
            Logout
          </button>
          <!-- Cancel Button -->
          <button @click="showLogoutModal = false" class="w-32 bg-gray-300 text-gray-700 py-2 rounded-md hover:bg-gray-400 transition-all duration-300 transform hover:scale-105 focus:outline-none">
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
// Import the necessary Font Awesome components
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faRightFromBracket,
  faHome,
  faChartLine,
  faGraduationCap,
  faBriefcase,
  faHandshake,
  faUserTie,
  faUserGraduate,
  faUsers,
  faGlobe,
  faBookOpen,
  faCogs,
} from "@fortawesome/free-solid-svg-icons";
import { signOut } from "firebase/auth"; // Import the signOut method
import { auth } from "@/firebase"; // Import the Firebase auth instance

// Add the icons to the library
library.add(faRightFromBracket, faHome, faChartLine, faUserGraduate, faGraduationCap, faBriefcase, faBookOpen, faHandshake, faUserTie, faUsers, faGlobe, faCogs);

export default {
  components: {
    FontAwesomeIcon
  },
  props: {
    sidebarOpen: Boolean
  },
  data() {
    return {
      showLogoutModal: false, // Controls modal visibility
      menuItems: [
        { label: "Home", path: "/Overview", icon: ["fas", "home"] },
        { label: "KPI", path: "/kpi", icon: ["fas", "chart-line"] },
        { label: "Curriculum Statistics", path: "/curriculum-statistics", icon: ["fas", "graduation-cap"] },
        { label: "Research", path: "/research", icon: ["fas", "briefcase"] },
        { label: "Academic Service", path: "/academic-service", icon: ["fas", "book-open"] },
        { label: "Collaboration", path: "/collaboration", icon: ["fas", "handshake"] },
        { label: "Faculty & Staff", path: "/faculty-staff", icon: ["fas", "users"] },
        { label: "Alumni", path: "/alumni", icon: ["fas", "user-graduate"] },
        { label: "SDGs Impact", path: "/sdgs-impact", icon: ["fas", "globe"] },
        { label: "Management", path: "/management", icon: ["fas", "cogs"] },
      ],
    };
  },
  methods: {
    async logout() {
      try {
        await signOut(auth);
        console.log('Successfully logged out.');
        this.$router.replace('/login');
      } catch (error) {
        console.error('Error logging out:', error);
        alert('An error occurred while logging out. Please try again.');
        this.$router.push('/login');
      }
    },
  }
};
</script>

<style scoped>
/* App Bar Styles */
.bg-custom {
  background-color: #034E69;
}

.text-white {
  color: white;
}

.fixed {
  position: fixed;
}

.top-0 {
  top: 0;
}

.left-0 {
  left: 0;
}

.w-full {
  width: 100%;
}

.z-20 {
  z-index: 20;
}

.p-4 {
  padding: 1rem;
}

.flex {
  display: flex;
}

.justify-between {
  justify-content: space-between;
}

.items-center {
  align-items: center;
}

.shadow-md {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

/* Sidebar Styles */
.sidebar {
  transition: transform 0.3s ease-in-out;
}

.sidebar.hidden {
  transform: translateX(-100%); /* Sidebar is off-screen */
}

.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: 10;
  width: 16rem; /* Sidebar width */
}

ul {
  margin-top: 2rem; /* Reduced space below the app bar */
  padding-left: 0;
}

ul li {
  padding-left: 1rem;
}

.router-link-active {
  color: white;
  background-color: rgba(255, 255, 255, 0.1);
}

/* Adjust Menu Item Styles */
ul li a {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  font-size: 1rem; /* Slightly smaller font size */
}
ul li a:hover {
  transform: scale(1.1); /* Enlarge the item slightly on hover */
  transition: transform 0.3s ease-in-out; /* Smooth transition */
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1); /* Optional: subtle shadow for better visibility */
}

/* Modal Styles */
.fixed {
  position: fixed;
}

.inset-0 {
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

.bg-black {
  background-color: rgba(0, 0, 0, 0.5);
}

.bg-white {
  background-color: white;
}

.rounded-lg {
  border-radius: 0.5rem;
}

.shadow-lg {
  box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.1);
}

.w-80 {
  width: 20rem;
}

.text-xl {
  font-size: 1.25rem;
}

.mb-4 {
  margin-bottom: 1rem;
}

.text-center {
  text-align: center;
}

.mt-6 {
  margin-top: 1.5rem;
}

.flex {
  display: flex;
}

.justify-between {
  justify-content: space-between;
}

.bg-#034E69 {
  background-color: #034E69;
}

.text-white {
  color: white;
}

.hover\:bg-gray-700:hover {
  background-color: #2d3748;
}

.bg-gray-300 {
  background-color: #e2e8f0;
}

.text-gray-600 {
  color: #718096;
}
</style>
