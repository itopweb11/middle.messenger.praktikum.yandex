// Функция для получения короткой даты из строкового представления даты
export const getShortDate = (date: string) => {
    let result = ''; // Инициализируем результат пустой строкой
    try {
        const _date = new Date(date); // Создаем объект даты из входной строки
        const now = new Date(); // Получаем текущую дату
        if (_date.getFullYear() === now.getFullYear()) { // Проверяем, что год даты совпадает с текущим годом
            result = `${_date.getFullYear()} ${_date.getMonth()} ${_date.getDate()}`; // Формируем результат в формате "год месяц день"
            if (_date.getMonth() === now.getMonth() && _date.getDate() - now.getDate() < 8) { // Проверяем, что дата находится в текущем месяце и не более 7 дней назад
                result = getWeekDay(_date); // Получаем день недели даты
                if (_date.getDate() === now.getDate()) { // Если дата совпадает с текущей
                    result = `${_date.getHours()}:${_date.getMinutes()}`; // Формируем результат в формате "часы:минуты"
                }
            }
        }
    }
    catch {
        return ''; // Если произошла ошибка при создании объекта даты, возвращаем пустую строку
    }
    return result; // Возвращаем сформированный результат
}

// Вспомогательная функция для получения дня недели из объекта даты
function getWeekDay(date: Date) {
    const days = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']; // Массив сокращений дней недели
    return days[date.getDay()]; // Возвращаем сокращение дня недели для данной даты
}


