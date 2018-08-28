type NextPage<T=any> = {(T): JSX.Element};

interface NextInitializer {
    getInitialProps(req: any): Promise;
}