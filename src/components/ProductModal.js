import React from 'react';
import { Modal, TextContainer, Thumbnail } from '@shopify/polaris';

const ProductModal = ({ product, onClose }) => {
  return (
    <Modal open={!!product} onClose={onClose} title={product?.title}>
      <Modal.Section>
        <TextContainer>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
            <Thumbnail source={product?.image} alt={product?.title} size="large" />
          </div>
         
         
          <p><strong>Description:</strong> {product?.description}</p>
        
        </TextContainer>
      </Modal.Section>
    </Modal>
  );
};

export default ProductModal;