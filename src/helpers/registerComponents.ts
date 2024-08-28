import Handlebars from 'handlebars'; // Импортируем библиотеку Handlebars для работы с шаблонами
import Block from "./Block.ts"; // Импортируем класс Block, который будет использоваться для создания компонентов
import { HelperOptions } from "handlebars"; // Импортируем тип HelperOptions из библиотеки Handlebars

// Функция для регистрации компонента в Handlebars
export function registerComp(name: string, Component: typeof Block) {
    // Проверяем, не зарегистрирован ли уже помощник с таким именем
    if (name in Handlebars.helpers) {throw `Пользователь ${name} уже зарегистрирован!`} // Выбрасываем ошибку, если помощник уже существует

    // Регистрируем помощник в Handlebars с указанным именем
    Handlebars.registerHelper(name, function (this: unknown, { hash, data, fn }: HelperOptions) {
        // Создаем экземпляр компонента с переданными хэш-параметрами
        const component = new Component(hash);
        // Формируем атрибут data-id для идентификации компонента
        const dataAttribute = `data-id="${component.id}"`;

        // Если в хэш-параметрах есть ссылка (ref), сохраняем компонент в корневом объекте данных
        if ('ref' in hash) {(data.root.__refs = data.root.__refs || {})[hash.ref] = component}

        // Добавляем компонент в массив дочерних компонентов в корневом объекте данных
        (data.root.__children = data.root.__children || []).push({component,
            // Функция для встраивания компонента в фрагмент
            embed(fragment: DocumentFragment) {
                // Находим заглушку для компонента в фрагменте
                const stub = fragment.querySelector(`[${dataAttribute}]`);
                // Если заглушка не найдена, выходим из функции
                if (!stub) {return;}
                // Получаем содержимое компонента
                const element = component.getContent();
                // Перемещаем дочерние узлы заглушки в содержимое компонента
                element?.append(...Array.from(stub.childNodes));
                // Заменяем заглушку содержимым компонента
                stub.replaceWith(element!);
            }
        });

        // Получаем содержимое компонента, если оно есть
        const contents = fn ? fn(this) : '';
        // Возвращаем HTML-разметку для компонента с атрибутом data-id
        return `<div ${dataAttribute}>${contents}</div>`;
    });
}


