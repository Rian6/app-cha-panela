import React from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Image, useDisclosure } from '@chakra-ui/react';

export default function WelcomeModal({ isOpen, onClose }) {
    return (
        <Modal isOpen={isOpen} onClose={onClose} size="lg">
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Bem-vindo!</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Image
                        src="https://example.com/welcome-image.jpg" // Substitua pelo URL da imagem desejada
                        alt="Imagem de boas-vindas"
                        borderRadius="md"
                        boxSize="100%" // Ajusta a imagem para o tamanho do modal
                    />
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}
