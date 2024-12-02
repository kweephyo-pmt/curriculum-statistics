<template>
  <div>
    <!-- App Bar with Hamburger Menu and Logout Button -->
    <div class="bg-[#034E69] text-white p-4 fixed top-0 left-0 w-full z-20 flex justify-between items-center shadow-md">
      <!-- Left Side: Hamburger Menu and Logo + Title -->
      <div class="flex items-center space-x-3">
        <!-- Hamburger Menu (Visible on all screen sizes) -->
        <div class="cursor-pointer lg:hidden z-30" @click="$emit('toggleSidebar')">
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
        <button 
          @click="logout"
          class="text-white hover:text-red-400 transition-all duration-300 transform hover:scale-105">
          <!-- Font Awesome Logout Icon -->
          <font-awesome-icon :icon="['fas', 'right-from-bracket']" class="w-8 h-8"/>
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
      <ul class="space-y-4">
        <li v-for="(item, index) in menuItems" :key="index">
          <router-link
            :to="item.path"
            class="block text-lg font-medium text-gray-200 hover:text-white hover:bg-gray-700 py-2 px-4 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            {{ item.label }}
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
// Import the necessary Font Awesome components
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

// Add the icon to the library
library.add(faRightFromBracket);

export default {
  components: {
    FontAwesomeIcon
  },
  props: {
    sidebarOpen: Boolean
  },
  data() {
    return {
      menuItems: [
        { label: "Home", path: "/Overview" },
        { label: "KPI", path: "/kpi" },
        { label: "Curriculum Statistics", path: "/curriculum-statistics" },
        { label: "Research", path: "/research" },
        { label: "Academic Service", path: "/academic-service" },
        { label: "Collaboration", path: "/collaboration" },
        { label: "Faculty & Staff", path: "/faculty-staff" },
        { label: "Alumni", path: "/alumni" },
        { label: "SDGs Impact", path: "/sdgs-impact" },
        { label: "Management", path: "/management" }
      ]
    };
  },
  methods: {
    logout() {
      // Implement your logout logic here
      console.log('Logging out...');
      // For example, if you're using Firebase:
      // firebase.auth().signOut().then(() => {
      //   this.$router.push('/login');
      // });

      // Redirect to login page after logging out
      this.$router.push('/login');
    }
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
</style>
