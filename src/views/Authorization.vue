<template>
  <div class="auth-container">
    <h2>Авторизация</h2>
    <form @submit.prevent="handleLogin" class="auth-form">
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email" required placeholder="Введите ваш email">

        <label for="password">Пароль:</label>
        <input type="password" id="password" v-model="password" required placeholder="Введите пароль">
      </div>

      <button type="submit" :disabled="loading" class="submit-btn">
        {{ loading ? 'Загрузка...' : 'Войти' }}
      </button>
      <button type="button" @click="handleReg" v-show="!loading" class="submit-btn">
        Зарегистрироваться
      </button>

      <div v-show="error !== ''" class="error-message">
        {{ error }}
      </div>
    </form>
  </div>
</template>


<script lang="ts">
export default {
  data() {
    return {
      email: '',
      password: '',
      loading: false,
      error: ''
    }
  },
  methods: {
    async handleLogin() {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const user = users.find(
        (u: any) => u.email === this.email && u.password === this.password
      );

      if (!user) {
        this.error = "Неверный email или пароль";
        return;
      }

      // В реальном приложении здесь может быть JWT-токен
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.$router.push('/home');
    },

    async handleReg() {
      this.$router.push('/reg')
    },
  }
}
</script>

<style scoped>
.auth-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.form-group label {
  font-weight: bold;
}

.form-group input {
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
}

.submit-btn {
  padding: 10px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.submit-btn:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.error-message {
  color: #ff4444;
  text-align: center;
  margin-top: 10px;
}
</style>