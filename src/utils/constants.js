/* eslint-disable indent */
// eslint-disable-next-line quote-props
// eslint-disable-next-line quotes

const dataMain = {
  event: {
      id: 11,
      tags: [
          {
              id: 111,
              name: 'Волонтёры',
              slug: 'volunteers'
          },
          {
              id: 112,
              name: 'Дети',
              slug: 'children'
          }
      ],
      title: 'Субботний meet up: учимся проходить интевью',
      startAt: '2021-05-08T19:22:00Z',
      endAt: '2021-05-08T21:22:00Z',
      address: 'Садовническая наб., д. 77 стр. 1 (офис компании Ernst&Young)',
      contact: 'Александра, +7 926 356-78-90',
      remainSeats: 5,
      description: 'Наконец-то наступила весна и мы пережили эту долгую зиму! И возможно, что внутренних сил и ресурса сейчас не так много, а до окончания учебного года ещё целых несколько месяцев. Поэтому приглашаем вас на встречу нашего ресурсного клуба "Наставник PRO", которую мы хотим посвятить теме поиска моральных сил, смыслов и внутреннего ресурса для общения и взаимодействия с нашими подопечными.',
      booked: true
  },
  history: {
      id: 21,
      imageUrl: 'https://picsum.photos/870/520',
      title: 'История Марины и Алины'
  },
  place: {
      chosen: true,
      id: 31,
      title: 'Сплав на байдарках в две строки',
      name: 'усадьба Архангельское в две строки',
      info: 'Девока, 10 лет. Активный отдых',
      description: 'Аннотация статьи в несколько абзацев. В тот момент, как ребёнок научился говорить, и не одно слово, а задавать бесконечное количество вопросов, жизнь меняется. Вы будете не понимать друг друга,  потом понимать чуть лучше и, Аннотация статьи в несколько абзацев. В тот момент, как ребёнок научился говорить, и не одно слово, а задавать бесконечное количество вопросов, жизнь меняется. Вы будете не понимать друг друга,  потом понимать чуть лучше и,\nАннотация статьи в несколько абзацев. В тот момент, как ребёнок научился говорить, и не одно слово, а задавать бесконечное количество вопросов, жизнь меняется. Вы будете не по Аннотация статьи в несколько абзацев. В тот момент, как ребёнок научился говорить, и не одно слово, а задавать бесконечное количество вопросов, жизнь меняется.',
      imageUrl: 'https://picsum.photos/1125/394',
      link: 'https://www.moscowzoo.ru/'
  },
  articles: [
      {
          id: 41,
          color: '#C8D1FF',
          title: 'Развитие детей-сирот отличается от развития детей, живущих в семьях. Все  этапы развития у детей-сирот проходят с искажениями и имеют ряд негативных  особенностей. '
      },
      {
          id: 42,
          color: '#8CDD94',
          title: 'У таких детей возникает ощущение отверженности. Оно приводит к напряженности и  недоверию к людям и, как итог, к реальному неприятию себя и окружающих.'
      }
  ],
  movies: [
      {
          id: 51,
          imageUrl: 'https://picsum.photos/420/239',
          title: 'Жутко громко и запредельно близко',
          info: 'Василий Сигарев, Борисов-Мусотов (Россия), 2009 год',
          link: 'https://youtu.be/8VzzlhOyOSI',
          tags: [
              {
                  id: 551,
                  name: 'рубрика',
                  slug: 'rubric'
              },
              {
                  id: 552,
                  name: 'рубрика',
                  slug: 'rubric'
              }
          ]
      },
      {
          id: 52,
          imageUrl: 'https://picsum.photos/420/239',
          title: 'Жутко громко и запредельно близко',
          info: 'Василий Сигарев, Борисов-Мусотов (Россия), 2009 год',
          link: 'https://youtu.be/8VzzlhOyOSI',
          tags: [
              {
                  id: 551,
                  name: 'рубрика',
                  slug: 'rubric'
              },
              {
                  id: 552,
                  name: 'рубрика',
                  slug: 'rubric'
              }
          ]
      },
      {
          id: 53,
          imageUrl: 'https://picsum.photos/420/239',
          title: 'Жутко громко и запредельно близко',
          info: 'Василий Сигарев, Борисов-Мусотов (Россия), 2009 год',
          link: 'https://youtu.be/8VzzlhOyOSI',
          tags: [
              {
                  id: 551,
                  name: 'рубрика',
                  slug: 'rubric'
              },
              {
                  id: 552,
                  name: 'рубрика',
                  slug: 'rubric'
              }
          ]
      },
      {
          id: 54,
          imageUrl: 'https://picsum.photos/420/239',
          title: 'Жутко громко и запредельно близко',
          info: 'Василий Сигарев, Борисов-Мусотов (Россия), 2009 год',
          link: 'https://youtu.be/8VzzlhOyOSI',
          tags: [
              {
                  id: 551,
                  name: 'рубрика',
                  slug: 'rubric'
              },
              {
                  id: 552,
                  name: 'рубрика',
                  slug: 'rubric'
              }
          ]
      }
  ],
  video: {
      id: 61,
      title: 'Эфир с выпускником нашей программы',
      info: 'Иван Рустаев, выпускник программы',
      link: 'https://youtu.be/H980rXfjdq4',
      imageUrl: 'https://picsum.photos/1199/675',
      duration: 134
  },
  questions: [
      {
          id: 71,
          tags: [
              {
                  id: 771,
                  name: 'рубрика',
                  slug: 'rubric'
              }
          ],
          title: 'Я боюсь, что ребёнок ко мне слишком сильно привяжется. Что делать?'
      },
      {
          id: 72,
          tags: [
              {
                  id: 771,
                  name: 'рубрика',
                  slug: 'rubric'
              }
          ],
          title: 'Возможно ли продлить срок участия в программе, если и я и мой «младший» хотим остаться в программе?'
      },
      {
          id: 73,
          tags: [
              {
                  id: 771,
                  name: 'рубрика',
                  slug: 'rubric'
              }
          ],
          title: 'Что делать если Ваш младший решил закрыть пару, т.к. слишком занят с учебой и друзьями?'
      }
  ]
};

const dataMainEmpty = {
    event: {
        id: 0,
        tags: [
            {
                id: 0,
                name: '',
                slug: ''
            },
            {
                id: 0,
                name: '',
                slug: ''
            }
        ],
        title: '',
        startAt: '',
        endAt: '',
        address: '',
        contact: '',
        remainSeats: 0,
        description: '',
        booked: false
    },
    history: {
        id: 0,
        imageUrl: '',
        title: ''
    },
    place: {
        chosen: false,
        id: 0,
        title: '',
        name: '',
        info: '',
        description: '',
        imageUrl: '',
        link: ''
    },
    articles: [
        {
            id: 0,
            color: '',
            title: ''
        },
        {
            id: 0,
            color: '',
            title: ''
        }
    ],
    movies: [
        {
            id: 0,
            imageUrl: '',
            title: '',
            info: '',
            link: '',
            tags: [
                {
                    id: 0,
                    name: '',
                    slug: ''
                },
                {
                    id: 0,
                    name: '',
                    slug: ''
                }
            ]
        },
        {
            id: 0,
            imageUrl: '',
            title: '',
            info: '',
            link: '',
            tags: [
                {
                    id: 0,
                    name: '',
                    slug: ''
                },
                {
                    id: 0,
                    name: '',
                    slug: ''
                }
            ]
        },
        {
            id: 0,
            imageUrl: '',
            title: '',
            info: '',
            link: '',
            tags: [
                {
                    id: 0,
                    name: '',
                    slug: ''
                },
                {
                    id: 0,
                    name: '',
                    slug: ''
                }
            ]
        },
        {
            id: 0,
            imageUrl: '',
            title: '',
            info: '',
            link: '',
            tags: [
                {
                    id: 0,
                    name: '',
                    slug: ''
                },
                {
                    id: 0,
                    name: '',
                    slug: ''
                }
            ]
        }
    ],
    video: {
        id: 0,
        title: '',
        info: '',
        link: '',
        imageUrl: '',
        duration: 0
    },
    questions: [
        {
            id: 0,
            tags: [
                {
                    id: 0,
                    name: '',
                    slug: ''
                }
            ],
            title: ''
        },
        {
            id: 0,
            tags: [
                {
                    id: 0,
                    name: '',
                    slug: ''
                }
            ],
            title: ''
        },
        {
            id: 0,
            tags: [
                {
                    id: 0,
                    name: '',
                    slug: ''
                }
            ],
            title: ''
        }
    ]
  };

export { dataMain, dataMainEmpty };
