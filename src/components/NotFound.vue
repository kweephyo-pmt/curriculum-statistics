<template>
    <div class="flex flex-col min-h-screen bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-600 animate-gradient">
      <!-- Header Section -->
      <header class="bg-white shadow-lg py-6 px-10">
        <div class="flex items-center justify-between max-w-7xl mx-auto">     
          <div class="flex items-center space-x-4">
            <!-- Logo -->
            <img src="@/assets/mfu.png" alt="Logo" class="w-12 h-16" />
            <!-- App Title -->
            <h1 class="text-4xl font-extrabold text-indigo-600 tracking-wide">SOM BI</h1>
          </div>
          <nav>
            <ul class="flex space-x-8 text-lg font-medium">
              <li><a href="/" class="text-gray-600 hover:text-indigo-600 transition duration-300">Home</a></li>
              <li><a href="/about" class="text-gray-600 hover:text-indigo-600 transition duration-300">About</a></li>
              <li><a href="/contact" class="text-gray-600 hover:text-indigo-600 transition duration-300">Contact</a></li>
            </ul>
          </nav>
        </div>
      </header>
  
      <!-- Main Content -->
      <main class="flex-grow flex items-center justify-center text-center px-6">
        <div class="text-center">
          <h2 class="text-5xl font-extrabold text-white mb-8 animate-slideIn">404 - Page Not Found</h2>
          <p class="text-lg text-white mb-8">Sorry, the page you're looking for doesn't exist.</p>
          <router-link 
            to="/"
            class="bg-indigo-600 text-white py-4 px-8 rounded-full text-xl hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105 animate-fadeInUp shadow-lg">
            Go Back to Home
          </router-link>
        </div>
      </main>
  
      <!-- Footer Section -->
      <footer class="bg-white py-6 mt-12 shadow-inner">
        <div class="text-center">
          <p class="text-sm text-gray-500">© 2024 Curriculum Statistics. All rights reserved.</p>
        </div>
      </footer>
    </div>
  </template>
  
  <script>
  export default {
    name: 'NotFound'
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
      transform: translateY(-30px);
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
      transform: translateY(30px);
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
    box-shadow: 0 -3px 10px rgba(0, 0, 0, 0.1);
  }
  
  /* Button custom styling */
  button, .router-link {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    transition: transform 0.3s ease, background-color 0.3s ease;
  }
  
  button:hover, .router-link:hover {
    transform: translateY(-3px);
    background-color: #4f46e5; /* Indigio 600 */
  }
  
  button:focus, .router-link:focus {
    outline: none;
  }
  
  /* Improved font for better readability */
  h1, h2 {
    font-family: 'Inter', sans-serif;
  }
  
  p {
    font-family: 'Roboto', sans-serif;
  }
  
  html {
    scroll-behavior: smooth;
  }
  </style>
  