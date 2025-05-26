<template>
  <div class="auth-container" style="width: 600px">
    <h2>Регистрация</h2>
    <form @submit.prevent="handleSubmit" class="auth-form">
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email" required placeholder="Введите ваш email">
      </div>

      <button type="submit" :disabled="loading" class="submit-btn">
        {{ loading ? 'Отправка..' : 'Восстановить пароль' }}
      </button>
      <button type="button" v-show="!loading" @click="handleLogin" class="submit-btn">
        Войти
      </button>
      <div v-show="error" class="error-message">
        {{ error }}
      </div>
    </form>
  </div>
</template>


<script lang="ts">
export default {
  data() {
    return {
      name: '',
      surname: '',
      email: '',
      password: '',
      submitpassword: '',
      loading: false,
      error: ''
    }
  },
  methods: {
    async handleSubmit() {
      this.loading = true;
      this.error = '';

      try {
        if (this.password !== this.submitpassword) {
          throw new Error("Пароли не совпадают");
        }

        // Проверяем, есть ли уже пользователь с таким email
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const userExists = users.some((user: any) => user.email === this.email);

        if (!userExists) {
          throw new Error("Пользователя с таким email не существует");
        }

        // Переходим на страницу входа
        this.$router.push('/login');

      } catch (err: any) {
        this.error = err.message || 'Ошибка регистрации';
      } finally {
        this.loading = false;
      }
    },
    handleLogin() {
      this.$router.push('/login')
    }
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