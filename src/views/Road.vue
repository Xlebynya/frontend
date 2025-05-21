<script setup lang="ts">
import { defineComponent } from 'vue'
import { useRoute } from 'vue-router';

const route = useRoute();
const roadId = route.params.id; // Получаем `id` из URL (/road/123 → 123)

interface Road {
    id: number
    name: string
    description: string
    length: string
    region: string
}

const road = {
    'id': 1,
    'name': 'А-289',
    'description': "Краснодар-Керч Скоростная дорога, открытая в декабре 2024 года",
    'length': '180',
    'region': 'Краснодар-Керч'
};

</script>

<template>
    <header class="app-header">
        <h1>Редактор дороги</h1>
    </header>
    <div class="modal-content" style="width: 600px;">
        <h2>Добавить новую дорогу</h2>
        <form>
            <div class="form-group">
                <label>Название дороги:</label>
                <input type="text" v-model="road.name">
            </div>
            <div class="form-group">
                <label>Описание:</label>
                <textarea v-model="road.description" style="resize: none;"></textarea>
            </div>
            <div class="form-group">
                <label>Длина дороги (км):</label>
                <input type="number" v-model="road.length">
            </div>
            <div class="form-group">
                <label>Регион:</label>
                <input type="text" v-model="road.region">
            </div>
            <div class="modal-buttons">
                <button @click="$router.push('/home')" class="submit-btn">Сохранить</button>
            </div>
        </form>
    </div>
</template>

<style scoped>
.app-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
    padding: 15px;
    background-color: #f5f5f5;
    border-radius: 8px;
}

.modal-content {
    background: white;
    padding: 25px;
    border-radius: 8px;
    width: 500px;
    max-width: 90%;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.modal-content h2 {
    margin-top: 0;
    color: #333;
}

.form-group {
    margin-bottom: 15px;
}

.form-group label {
    display: block;
    margin-bottom: 5px;
    font-weight: 500;
}

.form-group input,
.form-group textarea {
    width: 100%;
    padding: 8px 12px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;
}

.form-group textarea {
    min-height: 80px;
    resize: vertical;
}

.modal-buttons {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    margin-top: 20px;
}

.cancel-btn {
    padding: 8px 15px;
    background-color: #f0f0f0;
    color: #333;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.submit-btn {
    padding: 8px 15px;
    background-color: #42b983;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

button:hover {
    opacity: 0.9;
}
</style>