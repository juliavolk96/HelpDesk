// Определение класса Ticket с использованием синтаксиса классов ECMAScript 2015
export default class Ticket {
  // Конструктор класса, который вызывается при создании нового экземпляра тикета
  constructor({ id, name, description, status, created }) {
    // Присваиваем переданные параметры объекта конкретным свойствам экземпляра тикета
    this.id = id;
    this.name = name;
    this.description = description;
    this.status = status;
    this.created = created;
  }
}
