/**
 *  Класс для отображения тикетов на странице.
 *  Он содержит методы для генерации разметки тикета.
 * */
export default class TicketView {
  constructor() {}

  renderTicket(ticket) {
    const ticketElement = document.createElement('div');
    ticketElement.innerHTML = `
    <h3>${ticket.name}</h3>
    <p>${ticket.description}</p>
    <p>Status: ${ticket.status ? 'Completed' : 'Pending'}</p>
    <p>Created: ${new Date(ticket.created).toLocaleString()}</p>
    `;
    return ticketElement;
  }

  renderTicketList(ticketList) {
    const ticketListElement = document.createElement('div');
    ticketList.forEach((ticket) => {
      const ticketElement = this.renderTicket(ticket);
      ticketListElement.appendChild(ticketElement);
    });
    document.getElementById('root').innerHTML = '';
    document.getElementById('root').appendChild(ticketListElement);
  }
}
