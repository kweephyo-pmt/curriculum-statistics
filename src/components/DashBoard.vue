<template>
  <div>
    <!-- App Bar with Hamburger Menu and Logout Button -->
    <div class="bg-[#034E69] text-white p-4 fixed top-0 left-0 w-full z-20 flex justify-between items-center shadow-md">
      <!-- Left Side: Hamburger Menu and Logo + Title -->
      <div class="flex items-center space-x-3">
        <!-- Hamburger Menu (Visible on all screen sizes) -->
        <div class="cursor-pointer lg:hidden z-30" @click="$emit('toggleSidebar')" aria-label="Open Sidebar">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-8 h-8">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </div>

        <!-- Logo and App Title -->
        <div class="flex items-center space-x-3">
          <!-- Logo -->
          <img src="@/assets/mfu.png" alt="Logo" class="w-8 h-12" />
          <!-- App Title -->
          <h2 class="text-2xl font-semibold">SOM BI</h2>
        </div>
      </div>

      <!-- Right Side: Logout Icon -->
      <div>
        <!-- Logout Button -->
        <button 
          @click="showLogoutModal = true"
          class="text-white hover:text-red-400 transition-all duration-300 transform hover:scale-105" 
          aria-label="Logout"
        >
          <font-awesome-icon :icon="['fas', 'right-from-bracket']" class="w-8 h-8" />
        </button>
      </div>
    </div>

    <!-- Sidebar -->
    <div
      :class="[
        sidebarOpen ? 'translate-x-0' : '-translate-x-full',
        'bg-[#034E69] text-white w-64 p-6 fixed top-0 left-0 h-full z-10 transition-transform duration-300 ease-in-out'
      ]"
    >
      <h2 class="text-4xl font-bold mb-6 text-center text-white">SOM BI</h2>
      <!-- Menu Items -->
      <ul class="space-y-4">
        <li v-for="(item, index) in menuItems" :key="index">
          <router-link
            :to="item.path"
            class="flex items-center space-x-4 text-lg font-medium text-gray-300 hover:text-white hover:bg-gray-700 py-2 px-4 rounded-lg transition-all duration-300 ease-in-out"
            :class="{ 'bg-gray-700 text-white': $route.path === item.path }"
          >
            <span class="w-6 h-6">
              <font-awesome-icon :icon="item.icon" />
            </span>
            <span>{{ item.label }}</span>
          </router-link>
        </li>
      </ul>
    </div>

    <!-- Logout Confirmation Modal -->
    <div v-if="showLogoutModal" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-40">
      <div class="bg-white p-6 rounded-lg shadow-lg w-80">
        <h3 class="text-xl font-semibold mb-4 text-center">Confirm Logout</h3>
        <p class="text-gray-600 text-center">Are you sure you want to log out?</p>
        <div class="mt-6 flex justify-between">
          <button @click="logout" class="bg-[#034E69] text-white px-4 py-2 rounded-md hover:bg-gray-700">Logout</button>
          <button @click="showLogoutModal = false" class="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400">Cancel</button>
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
      // Sign out the user using Firebase Auth
      await signOut(auth);
      console.log('Successfully logged out.');

      // Clear any user session or local data (optional, based on your app logic)
      // localStorage.clear(); // If you are using localStorage for session data

      // Redirect to login page after logout
      this.$router.replace('/login');
    } catch (error) {
      console.error('Error logging out:', error);
      // Optionally, show an error message to the user
      alert('An error occurred while logging out. Please try again.');

      // Redirect to login page in case of an error
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
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.15); /* Subtle shadow */
  transform: scale(1.05); /* Slight zoom effect */
}


/* Media Queries for Responsiveness */
@media (min-width: 1024px) {
  /* Always visible hamburger on large screens */
  .lg\:hidden {
    display: block;
  }

  /* Sidebar always visible on large screens */
  .sidebar {
    transform: translateX(0) !important;
  }

  .sidebarOpen .main-content {
    margin-left: 16rem; /* Sidebar width */
  }
}

button:hover {
  color: #787878; /* Change color on hover */
  transform: scale(1.1); /* Slight zoom effect */
}

.mt-6.flex.justify-between {
  justify-content: space-evenly;
  gap: 1rem; /* Add consistent spacing between buttons */
}


</style>
