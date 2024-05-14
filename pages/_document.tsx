import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';
import Footer from "@/app/components/footer/Footer";
import HeaderSubpage from '@/app/components/header/HeaderSubpage';
import HeaderMain from '@/app/components/header/HeaderMain';



class MyDocument extends Document {
    static async getInitialProps(ctx: DocumentContext) {
        const initialProps = await Document.getInitialProps(ctx);
        return { ...initialProps };
    }

    render() {
        return (
            <Html lang="de">
                <Head />
                <body>
                <HeaderMain/>
                <Main />
                <Footer/>
                <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;