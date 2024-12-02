<template>
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
  <div class="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 animate-gradient">
    
    <div class="bg-white p-8 rounded-lg shadow-xl w-full sm:w-96 transform transition-all duration-500 hover:scale-105">
      <h2 class="text-3xl font-extrabold text-center text-gray-800 mb-8 animate-fadeIn">Login</h2>

      <!-- Error Message Alert -->
      <div
        v-if="errorMessage"
        class="flex items-center p-4 mb-6 text-red-800 bg-red-100 border border-red-300 rounded-lg"
        role="alert"
      >
        <svg
          aria-hidden="true"
          class="w-5 h-5 mr-2"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M18 13a1 1 0 01-.293.707L10.707 20.707a1 1 0 01-1.414 0L2.293 13.707A1 1 0 012 13V3a1 1 0 011-1h14a1 1 0 011 1v10zM8 8a1 1 0 102 0v4a1 1 0 11-2 0V8zm1 6a1 1 0 100 2 1 1 0 000-2z"
            clip-rule="evenodd"
          ></path>
        </svg>
        <span>{{ errorMessage }}</span>
        <button
          type="button"
          class="ml-auto text-red-500 hover:text-red-700 focus:outline-none"
          @click="clearErrorMessage"
        >
          &times;
        </button>
      </div>

      <!-- Login Form -->
      <form @submit.prevent="handleLogin">
        <!-- Email input -->
        <div class="mb-6">
          <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            v-model="email"
            class="w-full mt-1 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
            placeholder="Enter your email"
            required
          />
        </div>

        <!-- Password input -->
        <div class="mb-6">
          <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
          <div class="relative">
            <input
              :type="isPasswordVisible ? 'text' : 'password'"
              id="password"
              v-model="password"
              class="w-full mt-1 p-3 pr-12 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              placeholder="Enter your password"
              required
            />
          </div>
          <!-- Checkbox to toggle password visibility -->
          <div class="flex items-center mt-2">
            <input
              type="checkbox"
              id="showPassword"
              v-model="isPasswordVisible"
              class="mr-2"
            />
            <label for="showPassword" class="text-sm text-gray-700">Show Password</label>
          </div>
        </div>

        <!-- Submit button -->
        <button
          type="submit"
          class="w-full py-3 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300"
        >
          Login
        </button>
      </form>

      <!-- Google Sign-In Button -->
      <div class="mt-6 flex justify-center">
        <button
          @click="googleSignIn"
          class="w-16 h-16 bg-white rounded-full flex items-center justify-center border-2 border-gray-300 shadow-md transform transition-all duration-200 ease-in-out hover:scale-110 hover:shadow-xl hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <img
            src="@/assets/google.svg" 
            alt="Google logo"
            class="w-8 h-8"
          />
        </button>
      </div>
    </div>
  </div>
    <!-- Footer Section -->
    <footer class="bg-white py-4">
      <div class="text-center">
        <p class="text-sm text-gray-500">© 2024 Curriculum Statistics. All rights reserved.</p>
      </div>
    </footer>
</template>

<script>
import { auth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from "@/firebase"; // Ensure the path is correct
export default {
  data() {
    return {
      email: "",
      password: "",
      isPasswordVisible: false, // Control the password visibility
      errorMessage: "",
    };
  },
  mounted() {
    // Set Firebase Auth persistence to local only once
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("User is logged in:", user);
        if (user.email.endsWith("@lamduan.mfu.ac.th")) {
          this.$router.push("/Overview");
        } else {
          this.$router.push("/login");
        }
      } else {
        console.log("No user is signed in.");
        this.$router.push("/login"); // Ensure you redirect to login if the user is not authenticated
      }
    });
  },
  methods: {
    clearErrorMessage() {
      this.errorMessage = ""; // Clear the error message
    },

    async handleLogin() {
      this.errorMessage = ""; // Reset error message before every attempt

      try {
        // Sign in the user with email and password
        const userCredential = await signInWithEmailAndPassword(auth, this.email, this.password);
        const user = userCredential.user;

        console.log('User signed in:', user);  // Log user details for debugging

        if (user.email.endsWith("@lamduan.mfu.ac.th")) {
          this.$router.push("/Overview");
        } else {
          this.errorMessage = "Access is restricted to users with an @lamduan.mfu.ac.th email address.";
        }
      } catch (error) {
        console.error("Error signing in:", error); // Log full error for debugging

        // Handle Firebase error codes and provide custom messages directly in catch block
        if (error.message) {
          console.error("Firebase error message:", error.message);
          this.errorMessage = this.formatErrorMessage(error.message);
        } 
        // Handle specific Firebase error codes
        else if (error.code) {
          console.error("Firebase error code:", error.code);
          switch (error.code) {
            case "auth/invalid-email":
              this.errorMessage = "The email format is invalid. Please check and try again.";
              break;
            case "auth/user-not-found":
              this.errorMessage = "No account found with this email. Please sign up or check your email.";
              break;
            case "auth/wrong-password":
              this.errorMessage = "The password is incorrect. Please try again.";
              break;
            case "auth/network-request-failed":
              this.errorMessage = "Network error. Please check your internet connection and try again.";
              break;
            default:
              this.errorMessage = "An unexpected error occurred. Please try again later.";
          }
        } 
        // Handle any other errors that don't have message or code properties
        else {
          console.error("Unknown error:", error);
          this.errorMessage = "An unknown error occurred. Please try again later.";
        }
      }
    },

    // Function to handle Google Sign-In
    async googleSignIn() {
  this.errorMessage = ""; // Clear previous error message
  const provider = new GoogleAuthProvider();

  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    // Check if the user's email domain is "@lamduan.mfu.ac.th"
    if (user.email.endsWith("@lamduan.mfu.ac.th")) {
      this.$router.push("/Overview");
    } else {
      // Inform the user and log them out
      this.errorMessage = "Access is restricted to users with an @lamduan.mfu.ac.th email address.";
      await this.logout(); // Log out the user immediately
    }
  } catch (error) {
    // Check the error code for specific Firebase errors
    if (error.code === "auth/popup-closed-by-user") {
      this.errorMessage = "The popup was closed before completing the sign-in.";
    } else if (error.code === "auth/cancelled-popup-request") {
      this.errorMessage = "The popup request was cancelled.";
    } else if (error.code === "auth/network-request-failed") {
      this.errorMessage = "Network error. Please check your internet connection and try again.";
    } else {
      // Handle other errors (e.g., incorrect credentials, etc.)
      this.errorMessage = "Access is restricted to users with an @lamduan.mfu.ac.th email address.";
    }

    console.error("Google sign-in error:", error);
  }
},

    formatErrorMessage(errorMessage) {
      // Custom formatting or translating error messages if necessary
      return errorMessage;
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
header {
  background-color: white;
}

/* Custom styling for footer */
footer {
  background-color: white;
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);
}
</style>
