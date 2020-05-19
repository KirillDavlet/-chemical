/**
 * функция генерации строки
 * @param nameTable - имя таблицы
 * @param template - щ=шаблон по которому строим
 * @returns {string} - готовый запрос к бд для создания новой строки
 */
const generationRow = (nameTable, template) => {
    return `INSERT INTO ${nameTable} ${template}`;
        // `users` (`id`, `login`, `pass`, `mail`, `status`) VALUES (NULL, '123123', '123123', 'qweqwe', '1');
}