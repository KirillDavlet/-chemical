'use strict';
const transfer = {
  // ['en', 'ru', 'de']
  // навигационное меню
  'menu': ['menu', 'меню', 'speisekarte'],
  'settings': ['settings', 'настройки', 'einstellungen'],
  'storage file': ['local storage', 'локальное хранилище', 'lokaler Speicher'],
  'themes': ['themes', 'темы', 'themen'],
  'training': ['training', 'обучение', 'ausbildung'],
  'services': ['Services', 'сервисы', 'dienstleistungen'],
  'support': ['tech support', 'техподдержка', 'technischer Support'],
  'wikipedia': ['wikipedia', 'википедия', 'wikipedia'],
  'organization': ['organization', 'организация', 'die Organisation'],
  'useful links': ['useful links', 'полезные ссылки', 'nützliche Links'],
  'innovation': ['innovation', 'инновация', 'Innovation'],
  'administration': ['administration', 'администрирование', 'verwaltung'],
  'testings': ['testing', 'тестирование', 'testen'],
  'newTestings': ['new testings', 'новый тест', 'neuer test'],
  'allTestings': ['all testings', 'все тесты', 'alle tests'],
  'create tests': ['create tests', 'создать тесты', 'tests erstellen'],
  'all tests': ['all tests', 'все тесты', 'alle tests'],


  //actions
  'remove': ['remove', 'очистить', 'klar'],
  'delete': ['delete', 'удалить', 'entfernen'],
  'edit': ['edit', 'редактировать', 'bearbeiten'],
  'view': ['view', 'просмотр', 'anzeigen'],
  'reply': ['reply', 'ответить', 'zu antworten'],
  'save': ['save', 'сохранить', 'speichern'],
  'exit': ['exit', 'выйти', 'geh raus'],
  'create': ['create', 'создать', 'schaffen'],
  'performed': ['performed', 'выполнено', 'fertig'],
  'change status': ['change status', 'изменить статус', 'status ändern'],
  'generation': ['generation', 'генерация', 'generation'],

  // РОЛИ
  'administrator': ['administrator', 'администратор', 'Administrator'],
  'user': ['user', 'пользователь', 'der Benutzer'],
  'technologist': ['technologist', 'технолог', 'Technologe'],

  // switcher
  'posts': ['posts', 'сообщения', 'Beiträge'],
  'alerts': ['alerts', 'оповещения', 'Warnungen'],
  'message': ['message', 'сообщения', 'Beiträge'],
  'design theme': ['design theme', 'тема оформления', 'Design-Thema'],
  'language': ['language', 'язык', 'die Zunge'],
  // calendar
  'calendar': ['calendar', 'календарь', 'der Kalender'],
  'day': ['day', 'день', 'tag'],
  'month': ['month', 'месяц', 'monat'],
  'year': ['year', 'год', 'jahr'],
  'today': ['today', 'сегодня', 'heute'],
  // месяца
  'january': ['January', 'январь', 'Der January'],
  'february': ['February', 'февраль', 'Der Februar'],
  'march': ['March', 'март', 'heute'],
  'april': ['April', 'апрель', 'avril'],
  'may': ['May', 'май', 'Der Mai'],
  'june': ['June', 'июнь', 'Der Juni'],
  'july': ['July', 'июль', 'Der Juli'],
  'august': ['August', 'август', 'Der August'],
  'september': ['September', 'сентябрь', 'Der September'],
  'october': ['October', 'октябрь', 'Der Oktober'],
  'november': ['November', 'ноябрь', 'Der Der November'],
  'december': ['December', 'декабрь', 'Der Dezember'],

  'create event': ['create event', 'создать событие', 'ereignis erstellen'],

  //DAYS WEEK
  'monday': ['mon', 'пн', 'mon'],
  'tuesday': ['tue', 'вт', 'die'],
  'wednesday': ['wed', 'ср', 'mit'],
  'thursday': ['thu', 'чт', 'don'],
  'friday': ['fri', 'пт', 'fre'],
  'saturday': ['sat', 'сб', 'sam '],
  'sunday': ['sun', 'вс', 'son'],



  //are common
  'from': ['from', 'от', 'von'],
  'theme': ['theme', 'тема', 'das Thema'],
  'tasks': ['tasks', 'задачи', 'die aufgaben'],
  'events': ['events', 'события', 'ereignisse'],
  'not': ['not','не','nicht'],

  // сокращения
  'y': ['y.', 'г.','j.'], // год

  // Заголовки
  'innovations': ['innovations','нововедения','Innovationen'],

  //заголовки таблиц
  'mail':['mail','почта','mail'],
  'system':['system','система','das system'],
  'status':['status','статус','status'],
  'id':['id','идентификатор','kennung'],
  'login':['Login','логин','einloggen'],
  'nameUser':['name','имя','vorname'],
  'firstName':['first name','фамилия','nachname'],
  'lastName':['last name','отчество','zweiter Vorname'],
  'phone':['phone','телефон','telefon'],
  'positionUser':['position user','должность','position'],
  'role':['role','роль','die rolle'],
  'id_user':['id user','идентификатор пользователя','benutzer-ID'],
  'fio_user':['FIO user','ФИО пользователя','vollständiger Name des benutzers'],
  'date':['date','дата','datum'],

  // общие слова
  'recipient' : ['recipient', 'получатель','der empfänger'],
  'filter' : ['filter', 'фильтр','filter'],

  //фразы
  'reminder the day before the event': ['reminder the day before the event (email)', 'напоминание за день до события (почта )', 'erinnerung am Tag vor der veranstaltung (mail)'],
  'enable reminder': ['enable reminder', 'включить напоминание', 'erinnerung aktivieren'],
  'write a letter (mail)': ['write a letter (mail)', 'написать письмо (почта)', 'brief schreiben (mail)'],
  'write a letter (system)': ['write a letter (system)', 'написать письмо (система)', 'brief schreiben (das system)'],
  'send a message': ['send a message', 'отправить сообщение', 'nachricht senden'],
  'turn off reminder': ['turn off reminder', 'отключить напоминание', 'Erinnerung ausschalten'],
  'F shortcut': ['F shortcut', 'быстрая клавиша F', 'F Verknüpfung'],
  'resolved issues': ['resolved issues', 'решенные вопросы', 'behobene probleme'],
  'all questions': ['all questions', 'все вопросы', 'all fragen'],
  'all records': ['all records', 'все записи', 'alle Aufzeichnungen'],
  'active records': ['active records', 'активные записи', 'aktive datensätze'],
  'password reset': ['password reset', 'сброс паролей', 'passwort zurücksetzen'],
  'account generation': ['account generation', 'сгенирировать учю записи', 'Kontoerstellung'],
  'how much to generate': ['how much to generate', 'сколько сгенернировать', 'wie viel zu generieren'],
  'confirm password change for all users': ['confirm password change for all users', 'подвердите изменение паролей всех пользователей', 'Bestätigen Sie die Kennwortänderung für alle Benutzer'],


};

module.exports = transfer;
