import TicketService from "./TicketService";
import TicketView from "./TicketView";
import TicketForm from "./TicketForm";

/**
 *  Основной класс приложения
 * */
export default class HelpDesk {
  constructor(container) {
    if (!(container instanceof HTMLElement)) {
      throw new Error("This is not HTML element!");
    }
    this.container = container;
    this.ticketService = new TicketService();
    this.TicketView = new TicketView();
    this.TicketForm = new TicketForm(this.handleFormSubmit.bind(this));
  }

  init() {
    this.loadTickets();
  }

  loadTickets() {
    this.ticketService.list((tickets) => {
      this.TicketView.renderTicketList(tickets);
      this.container.appendChild(this.TicketForm.form);
    });
  }

  handleFormSubmit(data) {
    this.ticketService.create(data, () => {
      this.loadTickets();
    });
  }
}
