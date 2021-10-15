export default {
    routes: [{
        path: '/',
        component: '../layout/index',
        routes: [
          {
            path: '/',
            component: './home',
          },
          {
            path: '/register',
            component: './register',
          },
          {
            path: '/login',
            component: './login',
          },
          {
            path: '/admin',
            component: './admin',
          },
          {
            path: '/user',
            component: './user',
          },
          {
            path: '/interests',
            component: './interests',
          },
          {
            path: '/test',
            component: './test',
          },
          {
            path: '/rostering',
            component: './rostering',
          },
        ]
    }],
    antd: {}
};