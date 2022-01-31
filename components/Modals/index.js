import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

import { toast, ToastContainer } from 'react-toastify';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: '100%',
    overflowY: 'auto',
    maxHeight: '100vh',
  },
};

Modal.setAppElement('body');  


export default function BeerInfo({openModal, setOpenModal, activeProduct}) {


  function afterOpenModal() {

  }

  function closeModal() {
    setOpenModal(false);
  }

  return (
    <div style={{overflow: 'auto'}}>
      <Modal
        isOpen={openModal}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <p style={{fontWeight: '600', fontSize: '30px', textAlign: 'center', marginBottom: '30px' }}>{activeProduct.name }</p>
        <p style={{textAlign: 'center'}}>{activeProduct.description ?? 'No Description Provided' }</p>

        <p style={{fontWeight: '600', fontSize: '30px', textAlign: 'center', marginBottom: '30px' }}>Address</p>
        <p style={{textAlign: 'center'}}>{activeProduct.address ?? 'No Address Provided' }  -  {activeProduct.city+' '  ?? 'No City Provided ' }  
         -  {activeProduct.state ?? 'No State Provided'  }  -  {activeProduct.country ?? 'No Country Provided' }</p>

        <p style={{fontWeight: '600', fontSize: '30px', textAlign: 'center', marginBottom: '30px' }}>Coordinates</p>
        <p style={{textAlign: 'center'}}>{activeProduct.coordinates  ?? 'No Coordinates Provided' }</p>

        <button onClick={() =>  closeModal()}>back</button>

      </Modal>
    </div>
  );
}