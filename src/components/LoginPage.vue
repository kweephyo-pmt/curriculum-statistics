<template>
  <div class="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 animate-gradient">
    <div class="bg-white p-8 rounded-lg shadow-xl w-full sm:w-96 transform transition-all duration-500 hover:scale-105">
      <h2 class="text-3xl font-extrabold text-center text-gray-800 mb-8 animate-fadeIn">Login</h2>
      <form @submit.prevent="handleLogin">
        <!-- Username input -->
        <div class="mb-6">
          <label for="username" class="block text-sm font-medium text-gray-700">Username</label>
          <input 
            type="text" 
            id="username" 
            v-model="username" 
            class="w-full mt-1 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
            placeholder="Enter your username"
            required 
          />
        </div>

        <!-- Password input -->
        <div class="mb-6">
          <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
          <input 
            type="password" 
            id="password" 
            v-model="password" 
            class="w-full mt-1 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
            placeholder="Enter your password"
            required 
          />
        </div>

        <!-- Submit button -->
        <button 
          type="submit" 
          class="w-full py-3 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300"
        >
          Login
        </button>

        <!-- Forgot password link -->
        <div class="mt-4 text-center">
          <a href="#" class="text-sm text-blue-500 hover:underline">Forgot password?</a>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: ''
    };
  },
  methods: {
    handleLogin() {
      // Implement your login logic here
      // For now, we simply navigate to the dashboard
      this.$router.push('/Overview');
    }
  }
};
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

/* Fade-in effect for the header */
@keyframes fadeIn {
  0% {
    opacity: 0;
    transform: translateY(-10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fadeIn {
  animation: fadeIn 1s ease-out;
}

</style>
