export default class Ticket {
  // Конструктор класса, который вызывается при создании нового экземпляра тикета
  constructor({ id, name, description, status, created }) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.status = status;
    this.created = created;
  }
}
