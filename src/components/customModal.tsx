import React, { useState } from 'react';
import styled from 'styled-components';
import Select from 'react-select';

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
`;

const ModalTitle = styled.h2`
  font-size: 20px;
  margin-bottom: 16px;
`;

const SelectContainer = styled.div`
  margin-top: 16px;
`;

function CustomModal({ isOpen, onClose }) {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const options = [
    { value: 'option1', label: 'Opción 1' },
    { value: 'option2', label: 'Opción 2' },
    { value: 'option3', label: 'Opción 3' },
  ];

  const handleSelectChange = (selectedValues) => {
    setSelectedOptions(selectedValues);
  };

  return (
    <>
      {isOpen && (
        <ModalWrapper>
          <ModalContent>
            <ModalTitle>Selecciona opciones</ModalTitle>
            <SelectContainer>
              <Select
                options={options}
                isMulti
                value={selectedOptions}
                onChange={handleSelectChange}
              />
            </SelectContainer>
            <button onClick={onClose}>Cerrar</button>
          </ModalContent>
        </ModalWrapper>
      )}
    </>
  );
}

export default CustomModal;
