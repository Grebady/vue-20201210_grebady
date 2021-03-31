# nextTick

👶🏻 _Несложная задача_<br>
⭐ _Дополнительная задача_

Во Vue.js DOM изменяется "сам" как реакция на изменение реактивных данных. Но это действие не мгновенное. Происходит множество действий, связанных с реактивностью, формированием нового виртуального дерева, сравнения виртуальных DOM, и обновления реального DOM. И происходит это при изменении значения **асинхронно**.

Обычной это не создаёт проблем, так как мы не манипулируем реальным DOM. Но есть несколько ситуаций, когда может понадобиться дождаться этого обновления.

### Получение актуальных свойств DOM элементов 

Иногда в компоненте нужно получать такие данные DOM, как размер элементов, позиция прокрутки и т.д.  

```html
<ul ref="list">
  <li v-for="item in items">{{ item }}</li>
</ul>
```
```javascript
addItem(newItem) {
  this.items.push(newItem);
  this.$refs['list'].clientHeight; // ?
}
```

Кажется, что после добавления нового `item` должен увеличиться список и его высота, которая сразу доступна (мы ведь не делали сами асинхронных действий?).

Однако в момент обращения к `clientHeight` DOM ещё не был обновлён, и будет получена старая высота.

### Обращение к динамически появляющемуся узлу

Аналогичная ситуация происходит, если обращаться к узлу, появляющемуся в шаблоне динамически.

```html
<input v-if="show" ref="input" />
```

```javascript
// show === false
this.show = true;
this.$refs['input'] // undefined
this.$refs['input'].focus(); // Не работает
```

Отображаем поле ввода и устанавливаем на него фокус. Но, хотя в момент установки фокуса уже `show === true`, узла в DOM ещё нет, произойдёт ошибка.

### Необходимость разбить одно обновление DOM на два

Иногда, например, для анимации, требуется, чтобы DOM прошёл через несколько состояний.

### Другие применения

- Определение момента, когда срендерился компонент целиком со своими дочерними компонентами (`mounted` срабатывает после рендера непосредственно компонента);
- Работа со сторонними библиотеками;
- Тестирование;
- Отладка.

### nextTick

Первое решение, которое можно придумать - это сделать `setTimeout()` на какое-то небольшое время. И это решение даже работает! 

Но, как и в решении других проблем асинхронности, это решение неверное.

Во Vue.js есть специальный метод `$nextTick` у компонента и глобальный метод `Vue.nextTick`.

Этот метод позволяет выполнить некоторый код только после обновления DOM и работает в двух вариантах. Либо вызывает переданный callback, либо возвращает promise, если ничего не передано.

### Задача

Дана маленькая реализация "мессенджера". Компонент `MessegesList` выводит список сообщений, а компонент `MiniMessenger` реализуется маленький мессенджер: даёт форму для добавления сообщения и их вывод через `MessegesList`.

Мессенджер фиксированный по размеру, а новые сообщения добавляются вниз. Требуется изменить компонент `MiniMessenger` так, чтобы после добавления сообщения список автоматически прокручивался вниз.

<img src="https://i.imgur.com/eZ8ObrU.gif" alt="Example" />

---

### Инструкция

📝 Для решения задачи отредактируйте файл: `components/MiniMessenger.vue`.

🚀 Команда запуска для ручного тестирования: `npm run serve`;<br>
приложение будет доступно на [http://localhost:8080/06-deep-vue/05-nextTick](http://localhost:8080/06-deep-vue/05-nextTick).

💬 Задача проверяется вручную на Code Review.