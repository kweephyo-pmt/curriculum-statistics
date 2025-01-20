<template>
  <div class="flex h-screen">
    <!-- Dashboard (Sidebar + App Bar) -->
    <Dashboard :sidebarOpen="sidebarOpen" @toggleSidebar="toggleSidebar" />

    <!-- Main Content -->
    <div
      :class="[
        'flex-1 transition-all duration-300 ease-in-out',
        sidebarOpen ? 'ml-64' : 'ml-0' // Dynamically adjust content position based on sidebar state
      ]"
      class="pt-24 p-8 overflow-auto"
    >
      <div class="research space-y-6">
        <h1 class="text-3xl font-semibold text-gray-800">Faculty Dashboard</h1>

        <!-- Dropdowns -->
        <div class="flex justify-between items-center mt-4 mb-8">
          <!-- Left Dropdown -->
          <select class="dropdown dropdown-left" v-model="selectedOption1">
            <option value="option1">Dean</option>
            <option value="option2">Lecturer</option>
            <option value="option3">Secretary</option>
          </select>
        </div>

        <!-- Dean, Lecturer, and Secretary Cards -->
        <div v-if="selectedOption1 === 'option1'" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <!-- Dean Cards -->
          <div v-for="(card, index) in deanCards" :key="index" class="card shadow-lg p-6 rounded-lg bg-dean">
            <div class="card-content">
              <i class="card-icon">👨‍🎓</i> <!-- Example icon for Dean -->
              <h2 class="font-semibold text-lg text-gray-800">{{ card.title }}</h2>
              <p class="text-gray-600">{{ card.description }}</p>
            </div>
          </div>
        </div>

        <div v-if="selectedOption1 === 'option2'" class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <!-- Lecturer Cards -->
          <div v-for="(card, index) in lecturerCards" :key="index" class="card shadow-lg p-6 rounded-lg bg-lecturer">
            <div class="card-content">
              <i class="card-icon">👩‍🏫</i> <!-- Example icon for Lecturer -->
              <h2 class="font-semibold text-lg text-gray-800">{{ card.title }}</h2>
              <p class="text-gray-600">{{ card.description }}</p>
            </div>
          </div>
        </div>

        <div v-if="selectedOption1 === 'option3'" class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <!-- Secretary Cards -->
          <div v-for="(card, index) in secretaryCards" :key="index" class="card shadow-lg p-6 rounded-lg bg-secretary">
            <div class="card-content">
              <i class="card-icon">🗂️</i> <!-- Example icon for Secretary -->
              <h2 class="font-semibold text-lg text-gray-800">{{ card.title }}</h2>
              <p class="text-gray-600">{{ card.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// Import the Dashboard component
import Dashboard from "@/components/DashBoard.vue";

export default {
  name: "HomePage",
  components: {
    Dashboard,
  },
  data() {
    return {
      sidebarOpen: false, // Initial state for sidebar (open)
      selectedOption1: "option3", // Initially selected option (Dean)

      // Cards for Dean role
      deanCards: [
        { title: "KPI Data", description: "The Dean can view and analyze all departmental KPI data." },
        { title: "Curriculum Statistics", description: "The Dean can access and manage curriculum statistics." },
        { title: "Research Oversight", description: "The Dean can approve and oversee research projects." },
        { title: "Academic Services", description: "The Dean can manage academic services and offerings." },
        { title: "Collaboration Opportunities", description: "The Dean can initiate and manage collaboration projects." },
        { title: "Faculty & Staff Management", description: "The Dean can manage faculty assignments and staff." },
        { title: "Alumni Relations", description: "The Dean can oversee alumni relations and events." },
        { title: "SDGs Impact Reporting", description: "The Dean can monitor and report SDG impact progress." },
        { title: "Management Reports", description: "The Dean can generate and review management and performance reports." },
      ],

      // Cards for Lecturer role
      lecturerCards: [
        { title: "Research Collaboration", description: "The Lecturer can collaborate on research projects." },
        { title: "Curriculum Development", description: "The Lecturer can contribute to curriculum development." },
        { title: "Academic Service Participation", description: "The Lecturer can participate in academic service activities." },
        { title: "SDGs Impact Contribution", description: "The Lecturer can contribute to SDG-related research." },
      ],

      // Cards for Secretary role
      secretaryCards: [
        { title: "Meeting Coordination", description: "The Secretary can schedule and manage meetings." },
        { title: "Document Management", description: "The Secretary can organize and manage documents." },
        { title: "Announcement Communication", description: "The Secretary can send announcements to faculty and staff." },
      ],
    };
  },
  methods: {
    toggleSidebar() {
      this.sidebarOpen = !this.sidebarOpen; // Toggle the sidebar state
    },
  },
};
</script>

<style scoped>
.research {
  padding: 20px;
  background-color: #f9fafb; /* Light background color for better contrast */
  border-radius: 8px; /* Rounded corners */
}

h1 {
  margin-bottom: 16px;
  color: #2d3748; /* Dark color for the title */
}

p {
  margin-bottom: 20px;
  color: #4a5568;
  line-height: 1.6;
}

.dropdown {
  padding: 12px 16px;
  font-size: 16px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  background-color: white;
  color: #4a5568;
  width: 200px;
}

.dropdown-left {
  margin-right: auto; /* Align left dropdown to the start */
}

/* Card Styles */
.card {
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Subtle shadow */
  padding: 20px;
  text-align: center;
  transition: transform 0.3s ease-in-out;
  height: 250px; /* Square card height */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.card:hover {
  transform: translateY(-10px); /* Hover effect */
}

.card h2 {
  font-size: 18px;
  color: #2d3748;
}

.card p {
  font-size: 14px;
  color: #4a5568;
}

.grid {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); /* Ensure cards are responsive */
}

.card-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.card-icon {
  font-size: 30px;
  margin-bottom: 16px;
}

/* Background colors for each card */
.bg-dean {
  background-color: #f3f4f6; /* Light blue-gray for Dean */
}

.bg-lecturer {
  background-color: #fef2f2; /* Light pink for Lecturer */
}

.bg-secretary {
  background-color: #e6fffa; /* Light teal for Secretary */
}
</style>
