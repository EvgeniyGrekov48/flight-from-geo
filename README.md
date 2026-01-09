<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; margin: 0; padding: 20px; }
        .badge { display: inline-block; padding: 4px 8px; margin: 0 5px 5px 0; border-radius: 3px; font-size: 12px; }
        .badge-angular { background: #dd0031; color: white; }
        .badge-ts { background: #3178c6; color: white; }
        .badge-status { background: #28a745; color: white; }
        .section { margin: 30px 0; }
        .code-block { background: #f5f5f5; padding: 15px; border-radius: 5px; overflow-x: auto; }
        .file-tree { font-family: monospace; white-space: pre; }
    </style>
</head>
<body>

<h1>Flight From Geo - Карта парапланерных объектов</h1>
<p><strong>Веб-приложение на Angular 20 для интерактивного отображения тематических объектов на карте (горы для парапланеризма, термические потоки, аэродромы).</strong></p>
<p><em>Прототип системы автоматической обработки геоданных.</em></p>

<div>
    <span class="badge badge-angular">Angular 20</span>
    <span class="badge badge-ts">TypeScript 5.9</span>
    <span class="badge">Zoneless</span>
    <span class="badge badge-status">Status: 86%</span>
</div>

<hr>

<div class="section">
    <h2>Функциональность</h2>
    <ul>
        <li><strong>Интерактивная карта</strong> с 4 базовыми слоями (улицы, спутник, топо, рельеф)</li>
        <li><strong>Список объектов</strong> в сайдбаре</li>
        <li><strong>Маркеры объектов</strong> на карте</li>
        <li><strong>Детальный просмотр</strong> объектов</li>
        <li><strong>Синхронизация выделенного объекта</strong> на карте и в сайдбаре</li>
        <li><strong>Фильтрация объектов</strong> по видимой области карты</li>
        <li><strong>Геолокация</strong> с центрированием карты на пользователе</li>
        <li><strong>Панель управления картой</strong> (слои, зум, геолокация)</li>
    </ul>
</div>

<hr>

<div class="section">
    <h2>Установка и запуск</h2>
    
    <h3>Установка зависимостей</h3>
    <div class="code-block">
        pnpm install
    </div>
    
    <h3>Конфигурация API</h3>
    <p>Для изменения адреса API отредактируйте файл <code>src/app/core/services/api.service.ts</code>:</p>
    <div class="code-block">
        private readonly _URL = "http://localhost:3000"
    </div>
    
    <h3>Запуск JSON Server (мок API)</h3>
    <p>В файле <code>package.json</code> запустите скрипт: <code>"json-server"</code></p>
    <p>Сервер запустится на <strong>http://localhost:3000</strong></p>
    
    <h3>Запуск Angular приложения</h3>
    <p>В файле <code>package.json</code> запустите скрипт: <code>"start"</code></p>
    <p>Приложение откроется на <strong>http://localhost:4200</strong></p>
</div>

<hr>

<div class="section">
    <h2>Структура проекта</h2>
    <div class="code-block file-tree">
src/
├── core/                   # Ядро приложения
│   ├── services/           # Сервисы бизнес-логики
│   ├── stores/             # Сторы для состояния
│   └── types/              # Типы и интерфейсы
├── features/               # Фичи/страницы
│   ├── main-map/           # Главная карта
│   ├── map-object-list/    # Список объектов
│   └── object-detail/      # Детальный просмотр
├── ui/                     # Переиспользуемые UI компоненты
│   ├── main-layout/        # Главный слой приложения
│   ├── map-controls-panel/ # Панель управления картой
│   └── map-object-card/    # Карточка объекта
└── styles/                 # Глобальные стили
    </div>
</div>

<hr>

<div class="section">
    <h2>Формат данных</h2>
    <p>Данные хранятся в <code>json-server/db.json</code>:</p>
    <div class="code-block">
{
  "mapObjects": [
    {
      "id": 1,
      "title": "Название объекта",
      "description": "Описание",
      "coords": { "lat": 44.101, "lng": 39.023 },
      "type": "paragliding"
    }
  ]
}
    </div>
</div>

<hr>

<div class="section">
    <h2>Зависимости</h2>
    <ul>
        <li><strong>Angular 20</strong> (zoneless режим)</li>
        <li><strong>Taiga UI + less</strong> - компонентная библиотека</li>
        <li><strong>Leaflet</strong> - карты</li>
        <li><strong>JSON Server</strong> - мок API</li>
    </ul>
</div>

<hr>

<div class="section">
    <h2>Планы развития</h2>
    <ul>
        <li>Загрузка изображений объектов</li>
        <li>Формы создания/редактирования объектов</li>
        <li>Полный CRUD функционал</li>
        <li>Адаптация под мобильные устройства</li>
        <li>Сохранение состояния карты в URL</li>
    </ul>
</div>

</body>
</html>