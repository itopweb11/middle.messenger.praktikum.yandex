// Импортируем необходимые библиотеки для тестирования
import Block, { IProps } from "../Block.ts"; // Импортируем класс Block, который мы будем тестировать
import { expect } from "chai"; // Импортируем функцию expect из библиотеки Chai для проверки условий
import sinon from "sinon"; // Импортируем библиотеку Sinon для создания подмен и шпионов

// Определяем тестовый блок для класса Block
describe('Block', () => {
    // Определяем интерфейс для компонента с дополнительным свойством text
    interface IComponent extends IProps {
        text: string;
    }

    // Создаем класс Component, который наследуется от Block
    class Component extends Block {
        constructor(props: IComponent) {
            super(props);
        }

        // Геттер для получения приведенных к нужному типу props
        public get props() {
            return this._props as IComponent;
        }

        // Переопределяем метод render, возвращающий строку
        render(): string {
            return '<div></div>';
        }
    }

    // Тестируем создание экземпляра Component
    it('Create Component is correct', () => {
        const block = new Component({ text: 'text' }); // Создаем экземпляр Component
        expect(block.getContent()).not.null; // Проверяем, что getContent возвращает не null
    });

    // Тестируем вызов метода render
    it('Component should render', () => {
        const block = new Component({ text: 'text' }); // Создаем экземпляр Component
        const render = sinon.spy(block, 'render'); // Создаем шпион для метода render
        expect(render.calledOnce); // Проверяем, что render был вызван один раз
    });

    // Тестируем повторный вызов метода render после изменения props
    it('Component should render again after change props', () => {
        const block = new Component({ text: 'text' }); // Создаем экземпляр Component
        const render = sinon.spy(block, 'render'); // Создаем шпион для метода render
        expect(render.calledOnce); // Проверяем, что render был вызван один раз
        block.props.text = 'new text'; // Изменяем свойство text в props
        block.setProps(block.props); // Вызываем setProps с измененными props
        expect(render.called); // Проверяем, что render был вызван хотя бы один раз
    });
});


