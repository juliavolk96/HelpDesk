export default class TicketView {
  constructor(onSubmitDelete, onSubmitEdit) {
    this.onSubmitDelete = onSubmitDelete;
    this.onSubmitEdit = onSubmitEdit;
  }

  // Отображения одного тикета ticket
  renderTicket(ticket) {
    const ticketElement = document.createElement('div');
    ticketElement.innerHTML = `
      <h3>${ticket.name}</h3>
      <p>${ticket.description}</p>
      <p>Status: ${ticket.status ? 'Выполнено' : 'В ожидании'}</p>
      <p>Создано: ${new Date(ticket.created).toLocaleString()}</p>
      <input type="checkbox" id="ticketStatus_${ticket.id}" ${ticket.status ? 'checked' : ''}>
      <button class="detailsBtn" data-ticket-id="${ticket.id}">Подробности</button>
      <button class="editBtn" data-ticket-id="${ticket.id}">✎</button>
      <button class="deleteBtn" data-ticket-id="${ticket.id}">Х</button>
    `;

    // Добавление обработчиков событий для кнопок "Подробности", "Изменить" и "Удалить"
    // const detailsBtn = ticketElement.querySelector('.detailsBtn');
    // detailsBtn.addEventListener('click', () => this.showDetails(ticket));

    const editBtn = ticketElement.querySelector('.editBtn');
    editBtn.addEventListener('click', () => this.editTicket(ticket));

    const deleteBtn = ticketElement.querySelector('.deleteBtn');
    deleteBtn.addEventListener('click', () => this.confirmDelete(ticket));

    // Сохранение ссылки на элемент тикета в объекте тикета
    ticket.element = ticketElement;

    return ticketElement;
  }

  // Отображения списка тикетов ticketList
  renderTicketList(ticketList) {
    const ticketListElement = document.createElement('div');
    ticketList.forEach((ticket) => {
      const ticketElement = this.renderTicket(ticket);
      ticketListElement.appendChild(ticketElement);
    });

    // Очистка корневого элемента и добавление списка тикетов
    document.getElementById('root').innerHTML = '';
    document.getElementById('root').appendChild(ticketListElement);
  }

  // Метод для отображения подробностей тикета (в данном случае, выводит alert)
  // showDetails(ticket) {
  //   alert(`Подробное описание: ${ticket.description}`);
  // }

  // Отображение модального окна редактирования тикета
  async editTicket(ticket) {
    const editModal = this.createEditModal(ticket);
    // Добавляем модальное окно редактирования внутри элемента тикета
    ticket.element.appendChild(editModal);
  }

  // Метод для создания модального окна редактирования тикета
  createEditModal(ticket) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
      <div class="modal-content">
        <span class="close">&times;</span>
        <h2>Редактирование тикета</h2>
        <label for="shortDescription">Краткое описание:</label>
        <input type="text" id="shortDescription" name="shortDescription" value="${ticket.name}" required>
        <br>
        <label for="detailedDescription">Подробное описание:</label>
        <textarea id="detailedDescription" name="detailedDescription">${ticket.description}</textarea>
        <br>
        <button type="button" id="cancelEdit">Отмена</button>
        <button type="button" id="confirmEdit">OK</button>
      </div>
    `;

    // Добавление обработчиков событий для кнопок "Отмена" и "OK"
    const closeModalButton = modal.querySelector('.close');
    closeModalButton.addEventListener('click', () => {
      ticket.element.removeChild(modal);
    });

    const cancelEditButton = modal.querySelector('#cancelEdit');
    cancelEditButton.addEventListener('click', () => {
      ticket.element.removeChild(modal);
    });

    const confirmEditButton = modal.querySelector('#confirmEdit');
    confirmEditButton.addEventListener('click', async () => {
      const editedShortDescription = document.getElementById('shortDescription').value;
      const editedDetailedDescription = document.getElementById('detailedDescription').value;

      // Проверка, что оба поля заполнены
      if (editedShortDescription && editedDetailedDescription) {
        this.onSubmitEdit(ticket.id, { name: editedShortDescription, description: editedDetailedDescription });
        ticket.element.removeChild(modal);
      } else {
        alert('Пожалуйста, заполните все поля.');
      }
    });
    // Возвращение созданного модального окна
    return modal;
  }

  // Отображение модального окна подтверждения удаления тикета
  confirmDelete(ticket) {
    const confirmModal = this.createDeleteModal(ticket);
    // Добавление модального окна подтверждения удаления внутри элемента тикета
    ticket.element.appendChild(confirmModal);
  }

  // Создание модального окна подтверждения удаления тикета
  createDeleteModal(ticket) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
      <div class="modal-content">
        <span class="close">&times;</span>
        <h2>Удаление тикета</h2>
        <p>Вы действительно хотите удалить тикет?</p>
        <button type="button" id="cancelDelete">Отмена</button>
        <button type="button" id="confirmDelete">OK</button>
      </div>
    `;

    // Добавление обработчиков событий для кнопок "Отмена" и "OK"
    const closeModalButton = modal.querySelector('.close');
    closeModalButton.addEventListener('click', () => {
      ticket.element.removeChild(modal);
    });

    const cancelDeleteButton = modal.querySelector('#cancelDelete');
    cancelDeleteButton.addEventListener('click', () => {
      ticket.element.removeChild(modal);
    });

    const confirmDeleteButton = modal.querySelector('#confirmDelete');
    confirmDeleteButton.addEventListener('click', () => {
      this.onSubmitDelete(ticket.id); // передаем id тикета в метод onSubmit
      ticket.element.removeChild(modal);
    });

    // Возвращение созданного модального окна
    return modal;
  }
}
