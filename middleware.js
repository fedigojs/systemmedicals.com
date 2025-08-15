import createMiddleware from 'next-intl/middleware';
import intlConfig from './next-intl.config.js'; // import the TS config

export default createMiddleware(intlConfig);

export const config = {
    matcher: ['/((?!_next|favicon.ico|robots.txt|sitemap.xml|images|assets).*)']
};
