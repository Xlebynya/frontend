<template>
    <div style="width: 550px;">
        <div class="content-section">
            <header class="app-header">
                <h1>Прогнозы</h1>
            </header>
            <div class="add-btn-container">
                <input type="file" ref="fileInput" @change="handleFileUpload" accept=".json" style="display: none">
                <button @click="triggerFileInput" class="add-btn">Спрогнозировать</button>
            </div>
            <div class="roads-list">
                <div v-if="history.length === 0" class="empty-list">
                    Нет прогнозов
                </div>
                <ul v-else>
                    <li v-for="(row, index) in history" :key="index" class="road-item">
                        <div class="road-info">
                            <h3> {{ row.date }}</h3>
                        </div>
                        <button @click="download(row.path)" :disabled="!row.ready" class="add-btn">{{ row.ready ?
                            'Отчёт' : 'Обработка' }}
                        </button>

                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script lang="ts">

interface ForecastHistory {
    date: string
    path: string
    ready: boolean
}
export default {
    data() {
        return {
            history: [{
                'date': '2025-01-02',
                'path': '/report-example.xlsx',
                'ready': true,
            }] as ForecastHistory[],
        }
    },
    methods: {
        triggerFileInput() {
            (this.$refs.fileInput as HTMLInputElement).click();
        },
        async handleFileUpload(event: Event) {
            const input = event.target as HTMLInputElement;
            if (input.files && input.files[0]) {
                const file = input.files[0];

                // Проверяем, что файл имеет расширение .json
                if (!file.name.endsWith('.json') && !file.name.endsWith('.xml')) {
                    alert("Можно загрузить только JSON и XML файлы")
                    return
                }

                // Добавляем в историю (пример)
                this.history.unshift({
                    date: new Date('02.05.2025').toJSON().slice(0, 10),
                    path: "/report-new-example.xlsx", // В реальном приложении это будет путь от сервера
                    ready: false,
                });

                // Сбрасываем значение input, чтобы можно было выбрать тот же файл снова
                input.value = '';
                await new Promise(resolve => setTimeout(resolve, 4000))
            }
            this.history[0].ready = true
        },
        download(path: string) {
            const link = document.createElement('a');
            link.href = path;
            link.download = 'report.xlsx'; // Имя файла при скачивании
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }
}
</script>

<style scoped>
.app-header {
    display: flex;
    justify-content: center;
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

.add-btn:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
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
