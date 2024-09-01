import * as React from "react";
import { useState, useEffect } from "react";
import { ref, get } from "firebase/database";
import { database } from "../../../lib/firebase/firebase";
import Item from "./item/Item";
import { Container, Typography, CircularProgress, Grid, Box } from "@mui/material";
import { styled } from "@mui/material/styles";

const Header = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(to bottom, #8cbb6f, black)',// Degradê rosa para preto
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
  marginBottom: theme.spacing(4),
  textAlign: 'center',
  color: theme.palette.common.white,
}));

export default function Listagem() {
  const [itens, setItens] = useState([]); // Estado para armazenar os itens
  const [loading, setLoading] = useState(true); // Estado para controlar o carregamento
  const userId = "usuario_id"; // ID do usuário autenticado (pode vir de autenticação)

  useEffect(() => {
    const fetchItens = async () => {
      try {
        const itensRef = ref(database, "itens"); // Referência ao nó "itens" no Firebase
        const snapshot = await get(itensRef); // Busca os dados do Firebase
        if (snapshot.exists()) {
          const data = snapshot.val(); // Obtém os dados
          const itensList = Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
          })); // Converte os dados em uma lista de itens
          setItens(itensList); // Atualiza o estado com a lista de itens
        } else {
          console.log("Nenhum item encontrado.");
        }
      } catch (error) {
        console.error("Erro ao buscar itens: ", error);
      } finally {
        setLoading(false); // Finaliza o carregamento
      }
    };

    fetchItens(); // Chama a função para buscar os itens quando o componente for montado
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Header>
        <Typography variant="h4" component="h1" sx={{ fontWeight: "bold" }}>
          Escolha Seus Itens
        </Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          Selecione os itens que você pretende dar. Lembre-se, os itens da lista são sugestões, e qualquer coisa fora da lista também é muito bem-vinda!
        </Typography>
      </Header>

      {/* Exibe o indicador de carregamento ou a lista de itens */}
      {loading ? (
        <CircularProgress sx={{ display: 'block', margin: '0 auto' }} /> // Indicador de progresso centralizado
      ) : itens.length > 0 ? (
        <Grid container spacing={4}>
          {itens.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <Item
                itemId={item.id}
                nome={item.nome}
                imagem={item.imagem}
                cores={item.cores}
                usuariosSelecionaram={item.usuariosSelecionaram}
                userId={userId} // Passa o ID do usuário autenticado
              />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="body1" component="p" align="center">
          Nenhum item encontrado.
        </Typography>
      )}
    </Container>
  );
}
