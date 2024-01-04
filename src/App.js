import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import Header from './components/Header';
import Body from './components/Body';
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom"
import About from './components/About';
import Contact from './components/Contact';
import Error from './components/Error';
import RestaurantMenu from './components/RestaurantMenu';
import { Provider } from 'react-redux';
import appStore from './utils/appStore';
import Cart from './components/Cart';
import CartHeader from './components/CartHeader';
import Search from './components/Search';
const Grocery = lazy(() => import('./components/Grocery'))


const AppLayout = () => {
	return (
		<Provider store={appStore}>
			<div className='app'>
				<Header />
				<Outlet />
			</div>
		</Provider>
	);
};

const CartLayout = ({ children }) => (
	<Provider store={appStore}>
		<div className='app'>
			{/* New header specifically for the Cart component */}
			{/* <CartHeader /> */}
			{children}
		</div>
	</Provider>
);

const appRouter = createBrowserRouter([
	{
		path: "/",
		element: <AppLayout />,
		children: [
			{
				path: "/",
				element: <Body />
			},
			{
				path: "/search",
				element: <Search />
			},
			{
				path: "/about",
				element: <About />
			},
			{
				path: "/contact",
				element: <Contact />
			},
			{
				path: "/restaurant/:resId",
				element: <RestaurantMenu />
			},
			{
				path: "/cart",
				element: <CartLayout><Cart /></CartLayout>
			}
		],
		errorElement: <Error />,
	},
])

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<RouterProvider router={appRouter} />)