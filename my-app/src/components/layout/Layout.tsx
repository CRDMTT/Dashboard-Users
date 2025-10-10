import { Header, Main, Footer } from './index';

export default function Layout() {
    return (
    <div className='page-container mx-auto'>
			<Header />
			<Main />
			<Footer />
		</div>
	);
}
