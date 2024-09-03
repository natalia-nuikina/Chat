export default {
  ru: {
    translation: {
      languages: {
        ru: 'Русский',
      },
      logo: 'Hexlet Chat',
      signUpForm: {
        heading: 'Регистрация',
        username: 'Имя пользователя',
        password: 'Пароль',
        confirmPassword: 'Подтвердите пароль',
        signupBtn: 'Зарегистрироваться',
      },
      loginForm: {
        username: 'Ваш ник',
        password: 'Пароль',
        login: 'Войти',
        futter: 'Нет аккаунта? ',
        signUp: 'Регистрация',
      },
      errors: {
        wasFound: 'Такой пользователь уже существует',
        validation: {
          required: 'Обязательное поле',
          confirmPassword: 'Пароли должны совпадать',
          range: 'От 3 до 20 символов',
          minRange: 'Не менее 6 символов',
          notFound: 'Неверные имя пользователя или пароль',
          unique: 'Должно быть уникальным',
        },
      },
      chat: {
        channels: 'Каналы',
        messages: {
          key_one: '{{count}} сообщение',
          key_few: '{{count}} сообщения',
          key_many: '{{count}} сообщений',
        },
        write: 'Введите сообщение...',
        send: 'Отправить',
        logOut: 'Выйти',
        add: '+',
        labelChannel: '#',
        delete: 'Удалить',
        rename: 'Переименовать',
        change: 'Управление каналом',
      },
      modals: {
        add: 'Добавить канал',
        channelName: 'Имя канала',
        cansel: 'Отмена',
        send: 'Отправить',
        removeChannel: 'Удалить канал',
        sure: 'Уверены?',
        remove: 'Удалить',
        renameChannel: 'Переименовать канал',
      },
      404: {
        error: '404 page not found',
        message: 'Такой страници нет на нашем сайте. Возможно вы ввели не верный адресс или она была удалена. Но вы можете вернуться на ',
        main: 'главную',
      },
      toasts: {
        add: 'Канал создан',
        remove: 'Канал удален',
        rename: 'Канал переименован',
        networkErr: 'Ошибка соединения',
        error: 'Ошибка загрузки данных',
      },
    },
  },
};
