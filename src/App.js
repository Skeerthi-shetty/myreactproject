import AddTodos from './components/addtodos/AddTodos';
import './App.css';
import RootLayout from './components/RootLayout';
import {createBrowserRouter,RouterProvider} from 'react-router-dom';

function App() {

  const router=createBrowserRouter([
    {
      path:"/",
      element:<RootLayout/>,
      children:[
        {
          path:"/",
          element:<AddTodos/>
        },
        {
          path:"/addtodos",
          element:<AddTodos/>
        },
        
      ],
    },
  ]);

  return(
    <div>
      <RouterProvider router={router}/>
    </div>
  )
  }
export default App;


