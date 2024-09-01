import * as React from "react";
import { useState, useEffect } from "react";
import { ref, get, update } from "firebase/database";
import { database } from "../../../../lib/firebase/firebase";
import { Button, Box, Typography, useTheme, Card, CardContent, Snackbar, IconButton } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { styled } from "@mui/material/styles";
import DoDisturbAltIcon from '@mui/icons-material/DoDisturbAlt';

const StyledCard = styled(Card)(({ theme, isSelected }) => ({
  maxWidth: 600,
  width: '100%',
  borderRadius: 8,
  overflow: 'hidden',
  boxShadow: theme.shadows[4],
  marginBottom: theme.spacing(4),
  background: 'linear-gradient(to bottom, #8cbb6f, black)', // Degradê rosa para preto
  position: 'relative',
}));

const StyledButton = styled(IconButton)(({ theme, isSelected }) => ({
  position: 'absolute',
  bottom: theme.spacing(2),
  right: theme.spacing(2),
  backgroundColor: isSelected ? theme.palette.error.main : theme.palette.primary.main,
  color: theme.palette.common.white,
  '&:hover': {
    backgroundColor: isSelected ? theme.palette.error.dark : theme.palette.primary.dark,
  },
}));

const ImageBox = styled(Box)({
  width: '100%',
  height: 300,
  overflow: 'hidden',
});

export default function Item({ itemId, nome, imagem, cores, usuariosSelecionaram, userId }) {
  const theme = useTheme();
  const [isSelected, setIsSelected] = useState(false);
  const [usuarios, setUsuarios] = useState(usuariosSelecionaram || []);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    setIsSelected(usuariosSelecionaram?.includes(userId));
  }, [usuariosSelecionaram, userId]);

  const updateUserSelection = async (action) => {
    try {
      const itemRef = ref(database, `itens/${itemId}`);
      const snapshot = await get(itemRef);
      if (snapshot.exists()) {
        const itemData = snapshot.val();
        let updatedUsuarios = itemData.usuariosSelecionaram || [];

        if (action === "add" && !updatedUsuarios.includes(userId)) {
          updatedUsuarios.push(userId);
          await update(itemRef, { usuariosSelecionaram: updatedUsuarios });
          setIsSelected(true);
          setSnackbarMessage("Item adicionado com sucesso!");
        } else if (action === "remove" && updatedUsuarios.includes(userId)) {
          updatedUsuarios = updatedUsuarios.filter((id) => id !== userId);
          await update(itemRef, { usuariosSelecionaram: updatedUsuarios });
          setIsSelected(false);
          setSnackbarMessage("Item removido com sucesso!");
        }

        setUsuarios(updatedUsuarios);
        setOpenSnackbar(true);
      }
    } catch (e) {
      console.error("Erro ao atualizar a seleção do item: ", e);
      setSnackbarMessage("Erro ao atualizar o item!");
      setOpenSnackbar(true);
    }
  };

  const handleButtonClick = () => {
    if (isSelected) {
      updateUserSelection("remove");
    } else {
      updateUserSelection("add");
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <>
      <StyledCard isSelected={isSelected}>
        <ImageBox>
          <img
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            src={nome ? `/produtos/${nome}.jpeg` : '/produtos/default.png'}
            alt={nome}
            loading="lazy"
          />
        </ImageBox>

        <CardContent sx={{ p: 3, textAlign: 'left', color: theme.palette.text.primary }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, color: 'white' }}>
            {nome ? nome.toUpperCase() : ""}
          </Typography>

          {cores && cores.length > 0 ? (
            <Box sx={{ mb: 2 }}>
              <Typography variant="body1" sx={{ fontWeight: "bold", color: '#b0b0b0' }}>
                Cores de preferência:
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                {cores.map((cor, index) => (
                  <Box
                    key={index}
                    sx={{
                      width: 30,
                      height: 30,
                      borderRadius: "50%",
                      backgroundColor:                          
                       cor.toLowerCase() === "black"
                      ? "#0e0e0e"
                      : cor.toLowerCase() === "graffiti"
                      ? "#626262"
                      : cor.toLowerCase() === "pastel brown"
                      ? "#e0ca8a"
                      : cor,
                    }}
                  />
                ))}
              </Box>
            </Box>
          ) : (
            <Box sx={{ mb: 2 }}>
              <Typography variant="body1" sx={{ fontWeight: "bold", color: '#b0b0b0' }}>
                Cores de preferência:
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1, background: 'linear-gradient(to right, #428c55, #59b162, #8cbb6f)', borderRadius: 2, p: 1 }}>
                <Typography variant="body1" sx={{ color: 'white' }}>
                  Nenhuma cor de preferência
                </Typography>
              </Box>
            </Box>
          )}

          <Box sx={{ mb: 2 }}>
            <Typography variant="body1" sx={{ fontWeight: "bold", color: '#b0b0b0' }}>
              {usuarios.length} {usuarios.length === 1 ? 'Pessoa escolheu' : 'Pessoas escolheram'}
            </Typography>
          </Box>
        </CardContent>

        <StyledButton
          onClick={handleButtonClick}
          isSelected={isSelected}
        >
          {isSelected ? <RemoveIcon /> : <AddIcon />}
        </StyledButton>
      </StyledCard>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleCloseSnackbar}
          >
            <DoDisturbAltIcon fontSize="small" />
          </IconButton>
        }
        sx={{ '& .MuiSnackbarContent-root': { backgroundColor: theme.palette.background.paper, color: theme.palette.text.primary } }}
      />
    </>
  );
}
