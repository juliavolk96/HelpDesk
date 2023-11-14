// Импортируем класс HelpDesk из файла './HelpDesk'
import HelpDesk from './HelpDesk';

// Получаем элемент с идентификатором 'root' из DOM
const root = document.getElementById('root');

// Создаем новый экземпляр класса HelpDesk, передавая ему элемент 'root'
const app = new HelpDesk(root);

// Инициализируем (запускаем) приложение HelpDesk
app.init();
