import { Header, Main, Footer } from './index';

export default function Layout() {
    return (
    <div className='page-container mx-auto pt-3'>
			<Header />
			<Main />
			<Footer />
		</div>
	);
}
