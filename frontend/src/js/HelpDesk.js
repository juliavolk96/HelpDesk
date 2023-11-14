// Импортируем классы TicketService, TicketView и TicketForm из соответствующих файлов
import TicketService from "./TicketService";
import TicketView from "./TicketView";
import TicketForm from "./TicketForm";

/**
 *  Основной класс приложения - HelpDesk
 * */
export default class HelpDesk {
  // Конструктор класса принимает HTML-элемент container и инициализирует основные компоненты приложения
  constructor(container) {
    // Проверяем, является ли переданный объект экземпляром HTMLElement, если нет, выбрасываем ошибку
    if (!(container instanceof HTMLElement)) {
      throw new Error("Это не HTML-элемент!");
    }
    
    // Сохраняем переданный HTML-элемент в свойстве container
    this.container = container;

    // Создаем экземпляр TicketService для работы с тикетами
    this.ticketService = new TicketService();

    // Создаем экземпляр TicketView для отображения тикетов
    this.TicketView = new TicketView();

    // Создаем экземпляр TicketForm и передаем ему функцию handleFormSubmit для обработки события отправки формы
    this.TicketForm = new TicketForm(this.handleFormSubmit.bind(this));
  }

  // Метод инициализации приложения
  init() {
    // Загружаем тикеты при старте приложения
    this.loadTickets();
  }

  // Метод загрузки тикетов
  loadTickets() {
    // Вызываем метод list у TicketService для получения списка тикетов
    this.ticketService.list((tickets) => {
      // Отображаем полученные тикеты с помощью TicketView
      this.TicketView.renderTicketList(tickets);

      // Добавляем форму создания тикета в основной контейнер
      this.container.appendChild(this.TicketForm.form);
    });
  }

  // Обработчик события отправки формы создания тикета
  handleFormSubmit(data) {
    // Вызываем метод create у TicketService для создания нового тикета, передавая ему данные из формы
    this.ticketService.create(data, () => {
      // После создания тикета обновляем список тикетов
      this.loadTickets();
    });
  }
}
