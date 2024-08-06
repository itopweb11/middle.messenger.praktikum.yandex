//Функция для глубокого сравнения двух объектов
export const areObjectsEqual = <T extends object>(object1: { [index: string]: T }, object2: { [index: string]: T }) => {
    //Получаем ключи первого и второго объектов
    const objKeys1 = Object.keys(object1);
    const objKeys2 = Object.keys(object2);

    // если количество ключей различно, объекты не равны
    if (objKeys1.length !== objKeys2.length) return false;

    //проходим по всем ключам первого объекта
    for (const key of objKeys1) {
        const value1 = object1[key];
        const value2 = object2[key];

        // Проверяем, являются ли оба значения объектами
        const isObjects = isObject(value1) && isObject(value2);

        //Если оба значения - объекты, рекурсивно сравниваем их
        if ((isObjects && !areObjectsEqual(value1 as { [index: string]: T }, value2 as { [index: string]: T })) ||
            (!isObjects && value1 !== value2)
        ) {
            return false;
        }
    }
    return true;
};

//функция для проверки, является ли значение объектом
const isObject = (object: object) => {
    return object != null && typeof object === "object";
};
