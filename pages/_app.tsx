import '../app/globals.css';
import { AppProps } from 'next/app';
import HeaderMain from '@/app/components/header/HeaderMain';
import HeaderSubpage from '@/app/components/header/HeaderSubpage';
import { useRouter } from 'next/router';

export default function MyApp({ Component, pageProps }: AppProps) {
    const router = useRouter();
    const isSubpage = router.pathname === '/imprint';

    return (
        <>
            {isSubpage ? <HeaderSubpage /> : <HeaderMain />}
            <Component {...pageProps} />
        </>
    );
}
