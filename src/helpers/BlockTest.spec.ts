// Импортируем класс Block и интерфейс IProps из файла Block.ts
import Block, { IProps } from "./Block.ts";
// Импортируем expect из библиотеки chai для утверждений
import { expect } from "chai";
// Импортируем sinon для создания шпионов и моков
import sinon from "sinon";

// Описание тестового блока для класса Block
describe('Block', () => {

    // Интерфейс IComponent, который расширяет IProps и добавляет новое свойство text
    interface IComponent extends IProps {text: string;}

    // Класс Component, который наследуется от Block
    class Component extends Block {
        // Конструктор принимает props типа IComponent
        constructor(props: IComponent) {super(props)} // Вызываем конструктор родительского класса

        // Геттер для получения свойств компонента
        public get props() {return this._props as IComponent} // Приводим _props к типу IComponent

        // Метод render, который возвращает строку HTML
        render(): string {return '<div></div>'} // Возвращаем простой HTML-код
    }

    // Тест для проверки создания компонента
    it('Проверки создания компонента', () => {
        const block = new Component({ text: 'text' }); // Создаем новый экземпляр Component
        expect(block.getContent()).not.null; // Проверяем, что содержимое блока не равно null
    });

    // Тест для проверки, что компонент рендерится
    it('Проверки, что компонент рендерится', () => {
        const block = new Component({ text: 'text' }); // Создаем новый экземпляр Component
        const render = sinon.spy(block, 'render'); // Создаем шпион для метода render
        expect(render.calledOnce); // Проверяем, что метод render был вызван один раз
    });

    // Тест для проверки рендеринга компонента после изменения свойств
    it('Проверка рендеринга компонента после изменения свойств', () => {
        const block = new Component({ text: 'text' }); // Создаем новый экземпляр Component
        const render = sinon.spy(block, 'render'); // Создаем шпион для метода render
        expect(render.calledOnce); // Проверяем, что метод render был вызван один раз
        block.props.text = 'new text'; // Изменяем свойство text
        block.setProps(block.props); // Устанавливаем новые свойства в компонент
        expect(render.called); // Проверяем, что метод render был вызван снова
    });
});