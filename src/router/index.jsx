import { createBrowserRouter } from 'react-router-dom';
import Main from '../pages/Main.jsx';
import Chat from '../pages/Chat.jsx';
import Login from '../pages/Login.jsx';
import Admin from '../pages/Admin.jsx';


export const routes = [
    {
        path: '/',
        element: (<Main />)
    },
    {
        path: '/chat',
        element: (<Chat />)
    },
    {
        path: '/login',
        element: (<Login />)
    },
    {
        path: '/admin',
        element: (<Admin />)
    }
]

const router = createBrowserRouter(routes);

export default router;