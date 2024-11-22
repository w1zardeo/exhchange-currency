import 'intl-pluralrules';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          settings: {
            title: "Settings",
            toggleTheme: "Toggle theme",
            numberOfFractionDigits: "Number of fraction digits",
            selectLanguage: "Select Language"
          },
          text: {
            header: 'Converter',
            edit: 'Edit',
            done: 'Done',
            addCurrencies: 'Add Currencies',
            search: 'Search',
            incompleteLower: 'incomplete',
            incompleteUpper: 'Incomplete',
            completedUpper: 'Completed',
            completedLower: 'completed',
            addTask: 'Click + to add a task',
            markTask: 'Mark a task done to get it completed',
            calendar: 'Calendar',
            addNewTask: 'Add New Task',
            finance: '💵Finance',
            weeding: '💍Weeding',
            freelance: '💼Freelance',
            shoppingList: '🛒Shopping List',
            enterTask: 'Enter Task',
            addImages: 'Add Images',
            addTaskUpper: 'Add Task',
            close: 'Close',
            today: 'Today'
          },
          monthDay: {
            jan: 'January',
            feb: 'February',
            mar: 'March',
            apr: 'April',
            may: 'May',
            jun: 'June',
            jul: 'July  ',
            aug: 'August',
            sep: 'September ',
            oct: 'October',
            nov: 'November',
            dec: 'December'
          },
          weekDay: {
            mon: 'Mon',
            tue: 'Tue',
            wed: 'Wed ',
            thu: 'Thu',
            fri: 'Fri',
            sat: 'Sat',
            sun: 'Sun'
          }
        }
      },
      ua: {
        translation: {
          settings: {
            title: "Налаштування",
            toggleTheme: "Перемикач теми",
            numberOfFractionDigits: "Кількість знаків після коми",
            selectLanguage: "Виберіть мову"
          },
          text: {
            header: 'Конвертер',
            edit: 'Змінити',
            done: 'Готово',
            addCurrencies: 'Додати валюти',
            search: 'Пошук',
            incompleteLower: 'невиконананих',
            incompleteUpper: 'Невиконані',
            completedUpper: 'Виконані',
            completedLower: 'виконаних',
            addTask: 'Натисніть +, щоб додати завдання',
            markTask: 'Позначте завдання, щоб виконати його',
            calendar: 'Календар',
            addNewTask: 'Додати Нове Завдання',
            finance: '💵Фінанси',
            weeding: '💍Весілля',
            freelance: '💼Фріланс',
            shoppingList: '🛒Список покупок',
            enterTask: 'Введіть завдання',
            addImages: 'Додати зображення',
            addTaskUpper: 'Додати Завдання',
            close: 'Закрити',
            today: 'Сьогодні'
          },
          monthDay: {
            jan: 'Січень',
            feb: 'Лютий',
            mar: 'Березень',
            apr: 'Квітень',
            may: 'Травень',
            jun: 'Червень',
            jul: 'Липень',
            aug: 'Серпень',
            sep: 'Вересень',
            oct: 'Жовтень',
            nov: 'Листопад',
            dec: 'Грудень'
          },
          weekDay: {
            mon: 'Пн',
            tue: 'Вт',
            wed: 'Ср',
            thu: 'Чт',
            fri: 'Пт',
            sat: 'Сб',
            sun: 'Нд'
          }
        }
      },
      es: {
        translation: {
          settings: {
            title: "Ajustes",
            toggleTheme: "Cambiar tema",
            numberOfFractionDigits: "Número de dígitos decimales",
            selectLanguage: "Seleccionar idioma"
          },
          text: {
            header: 'Convertidor',
            edit: 'Editar',
            done: 'Hecho',
            addCurrencies: 'Añadir monedas',
            search: 'Buscar',
            incompleteLower: 'incompleto',
            incompleteUpper: 'Incompleto',
            completedUpper: 'Realizado',
            completedLower: 'realizado',
            addTask: 'Haga clic en + para agregar una tarea',
            markTask: 'Marcar una tarea como completada para completarla',
            calendar: 'Calendario',
            addNewTask: 'Agregar nueva tarea',
            finance: '💵Finanzas',
            weeding: '💍Deshierbe',
            freelance: '💼Independiente',
            shoppingList: '🛒Lista de compras',
            enterTask: 'Ingresar tarea',
            addImages: 'Yadd Imágenes',
            addTaskUpper: 'Agregar Tarea',
            close: 'Cerca',
            today: 'Hoy'
          },
          monthDay: {
            jan: 'Enero',
            feb: 'Febrero',
            mar: 'Marzo',
            apr: 'Abril',
            may: 'Mayo',
            jun: 'Junio',
            jul: 'Julio',
            aug: 'Agosto',
            sep: 'Septiembre',
            oct: 'Octubre',
            nov: 'Noviembre',
            dec: 'Diciembre'
          },
          weekDay: {
            mon: 'Lun',
            tue: 'Mar',
            wed: 'Mié',
            thu: 'Jue',
            fri: 'Vie',
            sat: 'Sáb',
            sun: 'Dom'
          },
        }
      }
    },
    lng: 'ua', 
    fallbackLng: 'en', 
    interpolation: {
      escapeValue: false, 
    }
  });

export default i18n;