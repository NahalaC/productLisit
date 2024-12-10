import React from 'react';
import { AppProvider } from '@shopify/polaris';
import enTranslations from '@shopify/polaris/locales/en.json';
import ProductTable from '../components/ProductTable';
import ProductModal from '../components/ProductModal';

export default function Home() {
  return (
    <AppProvider i18n={enTranslations}>
      <ProductTable />
      <ProductModal />
    </AppProvider>
  );
}