<template>
  <div class="flex flex-col min-h-screen bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-600 animate-gradient">
    <!-- Header Section -->
    <header class="bg-white shadow-md py-4 px-8">
      <div class="flex items-center justify-between max-w-7xl mx-auto">     
        <div class="flex items-center space-x-3">
          <!-- Logo -->
          <img src="@/assets/mfu.png" alt="Logo" class="w-10 h-15" />
          <!-- App Title -->
          <h1 class="text-3xl font-extrabold text-indigo-600">SOM BI</h1>
        </div>
        <nav>
          <ul class="flex space-x-6">
            <li><a href="/" class="text-gray-600 hover:text-gray-800">Home</a></li>
            <li><a href="/about" class="text-gray-600 hover:text-gray-800">About</a></li>
            <li><a href="/contact" class="text-gray-600 hover:text-gray-800">Contact</a></li>
          </ul>
        </nav>
      </div>
    </header>

    <!-- Main Content -->
    <main class="flex-grow flex items-center justify-center text-center">
      <div class="text-center">
        <h2 class="text-4xl font-extrabold text-white mb-6 animate-slideIn">Welcome to SOM BI</h2>
        <button 
          @click="goToLogin"
          class="bg-blue-600 text-white py-3 px-6 rounded-full text-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 animate-fadeInUp">
          Go to Login
        </button>
      </div>
    </main>

    <!-- Footer Section -->
    <footer class="bg-white py-4 mt-8">
      <div class="text-center">
        <p class="text-sm text-gray-500">© 2024 Curriculum Statistics. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  methods: {
    goToLogin() {
      this.$router.push('/login');
    }
  }
}
</script>

<style scoped>
/* Gradient animation */
@keyframes gradientBackground {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

/* Add gradient animation to the background */
.animate-gradient {
  background-size: 200% 200%;
  animation: gradientBackground 3s ease infinite;
}

/* Animation for slide-in effect for the main header */
@keyframes slideIn {
  0% {
    opacity: 0;
    transform: translateY(-20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Animation for fading in the button with an upward motion */
@keyframes fadeInUp {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Applying the animations */
.animate-slideIn {
  animation: slideIn 1s ease-out;
}

.animate-fadeInUp {
  animation: fadeInUp 1s ease-out;
}

/* Custom styling for header */
header {
  background-color: white;
}

/* Custom styling for footer */
footer {
  background-color: white;
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);
}
</style>
