export default class TicketView {
  constructor(onSubmitDelete, onSubmitEdit) {
    this.onSubmitDelete = onSubmitDelete;
    this.onSubmitEdit = onSubmitEdit;
    this.editModalOpen = false;
  }

  // Отображения одного тикета ticket
  renderTicket(ticket) {
    const ticketElement = document.createElement('div');
    ticketElement.innerHTML = `
    <div class="one-ticket-container">
      <h2 class="ticket-name">${ticket.name}</h2>
      <div class="description-container">
        <p class="hidden">${ticket.description}</p>
      </div>
      
      <div class="container-btn">
        <div class="container-status"> 
          <p class="status ${ticket.status && ticket.status ? 'completed' : ''}">${ticket.status ? 'Выполнено' : 'В ожидании'}</p>
          <p class="created">${new Date(ticket.created).toLocaleString()}</p>
        </div>
        <div class="container-checkbox-btn">
          <input type="checkbox" class="custom-checkbox" id="ticketStatus_${ticket.id}" ${ticket.status ? 'checked' : ''}>
          <button class="editBtn" data-ticket-id="${ticket.id}">✎</button>
          <button class="deleteBtn" data-ticket-id="${ticket.id}">Х</button>
        </div> 
      </div>
    </div>
    `;

    // Добавление обработчика события для раскрытия/скрытия описания
    const ticketName = ticketElement.querySelector('.ticket-name');
    const description = ticketElement.querySelector('.description-container p');

    ticketName.addEventListener('click', () => {
      description.classList.toggle('hidden');
    });


    const checkbox = ticketElement.querySelector(`#ticketStatus_${ticket.id}`);
    checkbox.addEventListener('change', () => {
      ticket.status = !ticket.status;

      const statusParagraph = ticketElement.querySelector('.status');
      statusParagraph.textContent = `${ticket.status ? 'Выполнено' : 'В ожидании'}`;
      statusParagraph.classList.toggle('completed', ticket.status)
      this.onSubmitEdit(ticket.id, { status: ticket.status });

    });
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
    const sortedTicketList = ticketList.sort((a, b) => b.created - a.created);

    const ticketListElement = document.createElement('div');
    sortedTicketList.forEach((ticket) => {
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
    if (this.editModalOpen) {
      return;
    }
    this.editModalOpen = true;

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
      <h2 class="modal-title">Редактирование тикета</h2>
      <label for="shortDescription">Краткое описание:</label>
      <textarea type="text" id="shortDescription" name="shortDescription" value="${ticket.name}" required></textarea>
      <br>
      <label for="detailedDescription">Подробное описание:</label>
      <textarea id="detailedDescription" name="detailedDescription">${ticket.description}</textarea>
      <br>
      <button type="button" id="cancelEdit" class="cancel-edit">Отмена</button> <!-- Add 'cancel-edit' class -->
      <button type="button" id="confirmEdit" class="confirm-edit">OK</button> <!-- Add 'confirm-edit' class -->
    </div>
    `;

    // Добавление обработчиков событий для кнопок "Отмена" и "OK"
    const closeModalButton = modal.querySelector('.close');
    closeModalButton.addEventListener('click', () => {
      this.editModalOpen = false;
      ticket.element.removeChild(modal);
    });

    const cancelEditButton = modal.querySelector('#cancelEdit');
    cancelEditButton.addEventListener('click', () => {
      this.editModalOpen = false;
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
      this.editModalOpen = false;
    });
    // Возвращение созданного модального окна
    return modal;
  }

  // Отображение модального окна подтверждения удаления тикета
  confirmDelete(ticket) {
    if (this.editModalOpen) {
      return;
    }
    this.editModalOpen = true;
    const confirmModal = this.createDeleteModal(ticket);
    // Добавление модального окна подтверждения удаления внутри элемента тикета
    ticket.element.appendChild(confirmModal);
  }

  // Создание модального окна подтверждения удаления тикета
  createDeleteModal(ticket) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
      <div class="modal-content content-delete">
        <span class="close">&times;</span>
        <h2 class="modal-title">Удаление тикета</h2>
        <p class="content-delete-question">Вы действительно хотите удалить тикет?<br>Это действие необратимо.</p>
        <div class="delete-buttons">
          <button type="button" id="cancelDelete">Отмена</button>
          <button type="button" id="confirmDelete">OK</button>
        </div>
      </div>
    `;

    // Добавление обработчиков событий для кнопок "Отмена" и "OK"
    const closeModalButton = modal.querySelector('.close');
    closeModalButton.addEventListener('click', () => {
      this.editModalOpen = false;
      ticket.element.removeChild(modal);
    });

    const cancelDeleteButton = modal.querySelector('#cancelDelete');
    cancelDeleteButton.addEventListener('click', () => {
      this.editModalOpen = false;
      ticket.element.removeChild(modal);
    });

    const confirmDeleteButton = modal.querySelector('#confirmDelete');
    confirmDeleteButton.addEventListener('click', () => {
      this.onSubmitDelete(ticket.id); // передаем id тикета в метод onSubmit
      this.editModalOpen = false;

      ticket.element.removeChild(modal);
    });

    // Возвращение созданного модального окна
    return modal;
  }
}
