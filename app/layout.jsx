import '@styles/globals.css';
import Nav from '@components/Nav'
import Provider from '@components/Provider';

import { Children } from 'react';
export const metadata={
    title:"promptopia",
    description:"discover and share AI prompts"
}

const RootLayout = ({children}) => {
  return (
    <html lang='en'>
        <body>
            <Provider>
            <div className='main'>
                <div className='gradient'/>
            </div>

            <main className='app'>
                <Nav />
                {children}
            </main>
            </Provider>
        </body>

    </html>
  )
}

export default RootLayout;