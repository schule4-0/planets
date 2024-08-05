import '../app/globals.css';
import { AppProps } from 'next/app';
import HeaderMain from '@/app/components/header/HeaderMain';
import Dictionary from "@/app/components/dictionary/Dictionary";

export default function MyApp({ Component, pageProps }: AppProps) {

    return (
        <>
            <HeaderMain />
            <Dictionary/>
            <Component {...pageProps} />
        </>
    );
}
