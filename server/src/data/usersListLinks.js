// :TODO ДОПИСАТЬ АЛГОРИТМ ПРОВЕРКИ ДОСТУПА ПОЛЬЗОВАТЕЛЯ К ССЫЛКАМ, ПОКА ЧТО ПРОВЕРЯТЬ ВХОДНУЮ ССЫЛКУ, ЕСЛИ БУДУТ ОТЛИЧИЯ ПО ДОЧЕРНИМ, БУДЕТ ПУСКАТЬ

const linksUser = {
    'администратор': [
        {
            name: 'wikipedia',
            title: 'википедия',
            link: '',
            child:
                [
                    {
                        name: 'organization',
                        title: 'организация',
                        link: '/:id/wiki/organization',
                        child: []
                    },
                    {
                        name: 'useful links',
                        title: 'полезные ссылки',
                        link: '/:id/wiki/usefulLinks',
                        child: []
                    },
                    {
                        name: 'innovation',
                        title: 'нововедения',
                        link: '/:id/wiki/innovation',
                        child: []
                    },
                ]
        },
        {
            name: 'administration',
            title: 'администрирование',
            link: '/:id/administration',
            child: []
        },
        {
            name: 'testings',
            title: 'тестирование',
            link: '',
            child: [
                {
                    name: 'newTestings',
                    title: 'создать тест',
                    link: '/:id/testings/newTest',
                    child: []
                },
                {
                    name: 'allTestings',
                    title: 'все тесты',
                    link: '/:id/testings/allTestings',
                    child: []
                }
            ]
        },
        {
            name: 'storage file',
            title: 'файловое хранилище',
            link: '/:id/storageFile',
            child: []
        },
        {
            name: 'support',
            title: 'техническая поддержка',
            link: '/:id/support',
            child: []
        },
        //:TODO НОВЫЙ БЛОК
        {
            name: 'settings',
            title: 'настройки',
            link: '',
            child:
                [
                    {
                        name: 'theme',
                        title: 'тема',
                        link: '/:id/settings/theme',
                        child: []
                    },
                    {
                        name: 'widgets',
                        title: 'виджеты',
                        link: '/:id/settings/widgets',
                        child: []
                    },
                ]
        },
    ],
    'пользователь': [
        {
            name: 'wikipedia',
            title: 'википедия',
            link: '/:id/wiki',
            child: []
        },
        {
            name: 'storage file',
            title: 'файловое хранилище',
            link: '/:id/storageFile',
            child: []
        },

    ],
    'технолог': [
        {
            name: 'wikipedia',
            title: 'википедия',
            link: '/:id/wiki',
            child: [
                {
                    name: 'organization',
                    title: 'организация',
                    link: '/:id/wiki/organization',
                    child: []
                },
                {
                    name: 'good links',
                    title: 'полезнве ссылки',
                    link: '/:id/wiki/goolinks',
                    child: []
                },
            ]
        },
        {
            name: 'testings',
            title: 'тестирование',
            link: '/:id/testings',
            child: [
                {
                    name: 'newTestings',
                    title: 'создать тест',
                    link: '/:id/testings/newTest',
                    child: []
                },
            ]
        },
    ]
};


module.exports = {
    roleLinks: linksUser
}