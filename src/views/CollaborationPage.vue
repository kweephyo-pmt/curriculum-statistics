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
        <h1 class="text-3xl font-semibold text-gray-800">Collaboration Page</h1>
        <p class="text-lg text-gray-600">This is Collaboration Page.</p>

        <!-- Power BI Embed (full screen except app bar) -->
       
      </div>
    </div>
  </div>
</template>

<script>
// Import the Dashboard component
import Dashboard from "@/components/DashBoard.vue";

export default {
  name: "CollaborationPage",
  components: {
    Dashboard, // Register the Dashboard component
  },
  data() {
    return {
      sidebarOpen: true, // Initial state for sidebar (open)
      iframeHeight: 0,   // To store the calculated height of the iframe
    };
  },
  mounted() {
    this.adjustIframeHeight(); // Adjust height on component mount
    window.addEventListener("resize", this.adjustIframeHeight); // Adjust height on window resize
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.adjustIframeHeight); // Cleanup event listener
  },
  methods: {
    adjustIframeHeight() {
      const appBarHeight = 64; // Set the height of your app bar here (matches the header height)
      const windowHeight = window.innerHeight;
      this.iframeHeight = windowHeight - appBarHeight; // Subtract app bar height from window height
    },
    toggleSidebar() {
      this.sidebarOpen = !this.sidebarOpen; // Toggle the sidebar state
    },
  },
  computed: {
    iframeStyle() {
      return {
        width: "100%", // Make iframe take full width of the container
        height: `${this.iframeHeight}px`, // Dynamically set iframe height
      };
    },
  },
};
</script>

<style scoped>
.research {
  padding: 20px; /* Add padding for spacing */
  background-color: #f9fafb; /* Light background color for better contrast */
  border-radius: 8px; /* Rounded corners */
}

h1 {
  margin-bottom: 16px; /* Add margin below the title */
  color: #2d3748; /* Dark color for the title */
}

p {
  margin-bottom: 20px; /* Add margin below the paragraph */
  color: #4a5568; /* Lighter color for the paragraph */
  line-height: 1.6; /* Improve readability with line-height */
}

/* Ensure smooth layout when toggling sidebar */
.transition-all {
  transition: margin-left 0.3s ease-in-out;
}

/* Adjust padding for the app bar */
.pt-16 {
  padding-top: 4rem; /* Matches the height of the app bar */
}

/* Ensure content doesn't overflow */
body {
  margin: 0;
  overflow: hidden;
}

/* Ensure iframe takes up the remaining height and looks good */
iframe {
  border-radius: 8px; /* Rounded corners for the iframe */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Subtle shadow for the iframe */
}
</style>
