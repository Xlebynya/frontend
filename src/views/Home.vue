<template>
    <div style="width: 600px;">
        <!-- Шапка с кнопкой выхода -->
        <header class="app-header">
            <h1>Имя Фамилия</h1>
            <button @click="$router.push('/login')" class="logout-btn">
                Выйти
            </button>
        </header>
        <div class="add-btn-container">
            <button @click="showAddModal = true" class="add-btn">Добавить дорогу</button>
        </div>

        <!-- Список существующих дорог -->
        <div class="content-section">
            <!-- Список существующих дорог -->
            <div class="roads-list">
                <h2>Список дорог</h2>
                <div v-if="roads.length === 0 || true" class="empty-list">
                    Нет добавленных дорог
                </div>
                <ul v-else>
                    <li v-for="(road, index) in roads" :key="road.id" class="road-item">
                        <div class="road-info" @click="$router.push('/road/' + road.id)">
                            <h3>{{ road.name }}</h3>
                            <p><strong>Длина:</strong> {{ road.length }} км</p>
                            <p><strong>Регион:</strong> {{ road.region }}</p>
                        </div>
                        <div style="width: 30%;">
                            <button @click="$router.push('/forecasts/' + road.id)" class="add-btn"
                                style="width: 100%; margin-bottom: 5px;">Прогнозы</button>
                            <button @click="removeRoad(index)" class="remove-btn" style="width: 100%;">Удалить</button>
                        </div>
                    </li>
                </ul>
            </div>

            <!-- Модальное окно добавления дороги -->
            <div v-if="showAddModal" class="modal-overlay">
                <div class="modal-content">
                    <h2>Добавить новую дорогу</h2>
                    <form @submit.prevent="addNewRoad">
                        <div class="form-group">
                            <label>Название дороги:</label>
                            <input type="text" v-model="newRoad.name" required>
                        </div>
                        <div class="form-group">
                            <label>Описание:</label>
                            <textarea v-model="newRoad.description" required></textarea>
                        </div>
                        <div class="form-group">
                            <label>Длина дороги (км):</label>
                            <input type="number" v-model="newRoad.length" required>
                        </div>
                        <div class="form-group">
                            <label>Регион:</label>
                            <input type="text" v-model="newRoad.region" required>
                        </div>
                        <div class="modal-buttons">
                            <button type="button" @click="showAddModal = false" class="cancel-btn">Отмена</button>
                            <button type="submit" class="submit-btn">Добавить</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'

interface Road {
    id: number
    name: string
    description: string
    length: string
    region: string
}

interface RoadForm {
    name: string
    description: string
    length: string
    region: string
}

export default defineComponent({
    name: 'RoadsView',

    data() {
        return {
            showAddModal: false,
            newRoad: {
                name: '',
                description: '',
                length: '',
                region: ''
            } as RoadForm,
            roads: [{
                'id': 1,
                'name': 'А-289',
                'description': "Краснодар-Керч Скоростная дорога, открытая в декабре 2024 года",
                'length': '180',
                'region': 'Краснодар-Керч'
            }] as Road[]
        }
    },

    methods: {
        handleLogout(): void {
            const router = useRouter()
            router.push('/login')
        },

        addNewRoad(): void {
            if (this.newRoad.name && this.newRoad.description && this.newRoad.length && this.newRoad.region) {
                this.roads.push({
                    id: Math.max(...this.roads.map(road => road.id)),
                    name: this.newRoad.name,
                    description: this.newRoad.description,
                    length: this.newRoad.length,
                    region: this.newRoad.region
                })

                // Сброс формы и закрытие модального окна
                this.newRoad = {
                    name: '',
                    description: '',
                    length: '',
                    region: ''
                }
                this.showAddModal = false
            }
        },

        removeRoad(index: number): void {
            this.roads.splice(index, 1)
        }
    }
})
</script>

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

.add-btn-container {
    display: flex;
    justify-content: center;
}

.add-btn {
    padding: 8px 15px;
    background-color: #42b983;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.logout-btn {
    padding: 8px 15px;
    margin-left: 15px;
    background-color: #ff4444;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.content-section {
    padding: 20px;
}

.roads-list {
    margin-top: 20px;
}

.road-item {
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 400px;
    padding: 15px;
    margin-bottom: 15px;
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.road-info h3 {
    margin: 0 0 10px 0;
    color: #333;
}


.road-info p {
    margin: 5px 0;
    color: #555;
}

.remove-btn {
    padding: 8px 15px;
    background-color: #ff4444;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.empty-list {
    color: #666;
    font-style: italic;
    padding: 20px;
    text-align: center;
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

/* Стили для модального окна */
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
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
