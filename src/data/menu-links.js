export default [
    {
        name: 'Home',
        path: '/'
    },
    {
        name: 'Games',
        path: '/games',
    },
    {
        name: 'Teams',
        path: '/teams'
    },
    {
        name: 'Players',
        path: '/players',
    },
    {
        name: 'Page 1',
        path: '/page1',
        children: [
            {
                name: 'Page 11',
                path: '/page11',
            },
            {
                name: 'Page 12',
                path: '/page12',
            },
            {
                name: 'Page 13',
                path: '/page13'
            }
        ]
    },
]