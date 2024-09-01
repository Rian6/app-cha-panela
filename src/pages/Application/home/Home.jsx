import * as React from "react";
import { useState } from "react";
import { Box, Typography, Button, Modal, useTheme, styled } from "@mui/material";
import { ref, get } from 'firebase/database';
import { database } from '../../../lib/firebase/firebase';

const StyledBox = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: theme.palette.background.default,
}));

const LoginCard = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
  maxWidth: 400,
  width: '100%',
  backgroundColor: theme.palette.background.paper,
  borderRadius: 8,
  boxShadow: theme.shadows[4],
}));

const InputField = styled('input')(({ theme }) => ({
  width: '93%',
  padding: theme.spacing(1.5),
  borderRadius: 4,
  border: `1px solid ${theme.palette.divider}`,
  marginBottom: theme.spacing(2),
}));

const ModalContent = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
  backgroundColor: theme.palette.background.paper,
  borderRadius: 8,
  boxShadow: theme.shadows[5],
  textAlign: 'center',
}));

export default function Home(props) {
  const [login, setLogin] = useState('');
  const [codigo, setCodigo] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const theme = useTheme();

  const validateUser = async () => {
    try {
        const usersRef = ref(database, 'usuarios');
        const snapshot = await get(usersRef);

        if (snapshot.exists()) {
            const users = snapshot.val();
            const userArray = Object.values(users);
            const user = userArray.find(user => user.codigo === codigo);

            if (user) {
                props.setIsLogado(true);
                setIsModalOpen(true); // Abre o modal se o login for bem-sucedido
            } else {
                console.log("Nome ou código de acesso inválido.");
            }
        } else {
            console.log("Nenhum usuário encontrado.");
        }
    } catch (error) {
        console.error("Erro ao validar usuário: ", error);
    }
};

  return (
    <StyledBox>
      <LoginCard>
        <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 4, textAlign: 'center', color: theme.palette.text.primary }}>
          Bem Vindo
        </Typography>
        <Box mb={2}>
          <Typography variant="body1" sx={{ color: theme.palette.text.primary }}>
            Código de Acesso
          </Typography>
          <InputField 
            type="password" 
            value={codigo} 
            onChange={(e) => setCodigo(e.target.value)} 
          />
        </Box>
        <Button 
          variant="contained" 
          color="primary" 
          fullWidth 
          onClick={validateUser}
          sx={{ backgroundColor: '#8cbb6f', '&:hover': { backgroundColor: '#6da153' } }}
        >
          Entrar
        </Button>
      </LoginCard>

      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <ModalContent>
          <Typography variant="h6" sx={{ mb: 2, color: '#8cbb6f' }}>
            Bem-vindo!
          </Typography>
          <img 
            src="https://example.com/welcome-image.jpg" 
            alt="Imagem de Boas-Vindas"
            style={{ width: '100%', height: 'auto', borderRadius: '4px' }}
          />
        </ModalContent>
      </Modal>
    </StyledBox>
  );
}
