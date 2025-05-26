<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const roadId = Number(route.params.id); // Получаем `id` из URL (/road/123 → 123)

interface Road {
    id: number
    name: string
    description: string
    length: string
    region: string
}

const road = ref<Road>({
    id: 0,
    name: '',
    description: '',
    length: '',
    region: ''
});

// Загружаем данные дороги при монтировании компонента
onMounted(() => {
    loadRoadData();
});

function loadRoadData() {
    // Получаем все дороги из localStorage
    const savedRoads = localStorage.getItem('roads');
    if (savedRoads) {
        const roads: Road[] = JSON.parse(savedRoads);
        const foundRoad = roads.find(r => r.id === roadId);
        if (foundRoad) {
            road.value = { ...foundRoad };
        }
    }
}

function saveRoad() {
    // Получаем текущий список дорог
    const savedRoads = localStorage.getItem('roads');
    let roads: Road[] = [];
    
    if (savedRoads) {
        roads = JSON.parse(savedRoads);
        
        // Находим индекс редактируемой дороги
        const index = roads.findIndex(r => r.id === roadId);
        
        if (index !== -1) {
            // Обновляем данные дороги
            roads[index] = { ...road.value };
        } else {
            // Если дорога не найдена, добавляем новую (на случай, если id был изменен)
            roads.push({ ...road.value });
        }
    } else {
        // Если дорог еще нет, создаем новый массив с текущей дорогой
        roads = [{ ...road.value }];
    }
    
    // Сохраняем обновленный список
    localStorage.setItem('roads', JSON.stringify(roads));
    
    // Переходим на главную страницу
    router.push('/home');
}
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
                <button @click="saveRoad" class="submit-btn">Сохранить</button>
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