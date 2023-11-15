// Импортируем fetch из браузерного API для выполнения HTTP-запросов
const createRequest = async (options = {}) => {
  // Извлекаем необходимые параметры из объекта options
  const { method, endpoint, body, headers } = options;

  try {
    // Выполняем HTTP-запрос с использованием fetch
    const response = await fetch(`http://localhost:3000/api${endpoint}`, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    // Проверяем, успешен ли HTTP-ответ (статус 2xx)
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Возвращаем распарсенный JSON из ответа
    if (method!='DELETE') {
      return response.json();
    }
  } catch (error) {
    // В случае ошибки логируем её и повторно выбрасываем
    console.log('Error in createRequest:', error);
    throw error;
  }
};

// Экспортируем функцию createRequest для использования в других модулях
export default createRequest;
