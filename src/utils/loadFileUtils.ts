// Функция для загрузки нового файла из события перетаскивания или выбора файла
export const loadFileFrom = <TEvent>(e: TEvent, name: string = 'avatar'): FormData | null => {
    // Инициализируем переменную для хранения файла
    let file = null;
    // Проверяем, является ли событие событием перетаскивания
    if (e instanceof DragEvent) {
        // Получаем объект dataTransfer из события перетаскивания
        const dt = e.dataTransfer;
        // Если объект dataTransfer существует, получаем первый файл
        if (dt) {file = dt.files[0]}
    }
    // Проверяем, является ли событие обычным событием (например, выбор файла)
    if (e instanceof Event) {
        // Получаем файлы из целевого элемента
        const files = (e.target as unknown as HTMLInputElement)?.files;
        // Если файлы существуют, получаем первый файл
        if (files) file = files[0];
    }
    // Если файл был найден, создаем FormData и добавляем файл
    if (file) {
        // Создаем новый объект FormData
        const formData = new FormData();
        // Добавляем файл в FormData с указанным именем
        formData.append(name, file);
        // Возвращаем FormData
        return formData;
    }
    return null; // Если файл не найден, возвращаем null
}

// Функция для удаления активного состояния элемента
export const deleteActive = (e: Event) => {
    // Предотвращаем стандартное поведение события
    e.preventDefault();
    // Останавливаем всплытие события
    e.stopPropagation();
    // Удаляем класс 'highlight' у целевого элемента
    (e.target as HTMLElement)?.classList.remove('highlight');
}

// Функция для добавления активного состояния элементу
export const addActive = (e: Event) => {
    // Предотвращаем стандартное поведение события
    e.preventDefault();
    // Останавливаем всплытие события
    e.stopPropagation();
    // Добавляем класс 'highlight' к целевому элементу
    (e.target as HTMLElement)?.classList.add('highlight');
}

