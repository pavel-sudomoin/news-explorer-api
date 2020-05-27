const isNotString = (field) => `Поле ${field} должно быть строкой`;
const isNotUrl = (field) => `Поле ${field} должно быть валидным url`;
const isRequired = (field) => `Поле ${field} является обязательным`;

module.exports = {
  main: {
    isWrongRequest: 'Запрашиваемый ресурс не найден',
    isServerError: 'На сервере произошла ошибка',
  },
  registration: {
    isNotUniqueEmail: 'Уже существует пользователь с данным email',
  },
  authorization: {
    isRequired: 'Необходима авторизация',
    isSuccess: 'Вы успешно авторизованы',
    isWrongData: 'Неправильные почта или пароль',
  },
  logout: {
    isSuccess: 'Вы успешно вышли из аккаунта',
  },
  article: {
    isWrongArticle: 'Вы не сохраняли статью с таким id',
  },
  validation: {
    user: {
      name: {
        isShort: 'Имя должно быть не менее 2 символов',
        isLong: 'Имя должно быть не более 30 символов',
        isWrongPattern: 'Имя должно быть от 2 до 30 символов без пробелов в начале и конце',
        isWrongType: isNotString('name'),
        isRequired: isRequired('name'),
      },
      email: {
        isNotEmail: 'Поле email должно содержать валидную почту',
        isRequired: isRequired('email'),
      },
      password: {
        isShort: 'Длина пароля минимум 8 символов',
        isWrongPattern: 'Пароль не менее 8 символов, допустимы только цифры и латинские буквы',
        isWrongType: isNotString('password'),
        isRequired: isRequired('password'),
      },
    },
    article: {
      keyword: {
        isWrongType: isNotString('keyword'),
        isRequired: isRequired('keyword'),
      },
      title: {
        isWrongType: isNotString('title'),
        isRequired: isRequired('title'),
      },
      text: {
        isWrongType: isNotString('text'),
        isRequired: isRequired('text'),
      },
      date: {
        isWrongType: isNotString('date'),
        isRequired: isRequired('date'),
      },
      source: {
        isWrongType: isNotString('source'),
        isRequired: isRequired('source'),
      },
      link: {
        isNotUrl: isNotUrl('link'),
        isRequired: isRequired('link'),
      },
      image: {
        isNotUrl: isNotUrl('image'),
        isRequired: isRequired('image'),
      },
    },
    id: {
      isNotObjectId: 'Некорректный id',
    },
    bodyFormat: {
      isAdditionalProperties: 'Дополнительные поля в теле запроса запрещены',
      isWrongJson: 'Передан некорректный JSON',
    },
  },
};
