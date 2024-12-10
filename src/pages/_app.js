import '@/styles/globals.css'
import { AppProvider } from '@shopify/polaris';
import '@shopify/polaris/build/esm/styles.css'

export default function App({ Component, pageProps }) {
  return (
    <AppProvider>
      <Component {...pageProps} />
    </AppProvider>
  )
}
