// components/Item.js
import * as React from "react";
import { ref, get, update } from "firebase/database";
import { database } from "../../../../lib/firebase/firebase";
import { Button, Paper, Box, Divider, Badge } from "@mui/material";

export default function Item({ itemId, nome, imagem, cores, usuariosSelecionaram, userId }) {
  const addUserToItem = async (itemId, userId) => {
    try {
      const itemRef = ref(database, `itens/${itemId}`);
      const snapshot = await get(itemRef);
      if (snapshot.exists()) {
        const itemData = snapshot.val();
        const updatedUsuarios = itemData.usuariosSelecionaram || [];
        if (!updatedUsuarios.includes(userId)) {
          updatedUsuarios.push(userId);
          await update(itemRef, { usuariosSelecionaram: updatedUsuarios });
          console.log("Usuário adicionado ao item com sucesso.");
        } else {
          console.log("Usuário já está na lista.");
        }
      } else {
        console.log("Item não encontrado.");
      }
    } catch (e) {
      console.error("Erro ao adicionar usuário ao item: ", e);
    }
  };

  const handleAddUser = () => {
    if (itemId && userId) {
      addUserToItem(itemId, userId);
    } else {
      console.log("ID do item ou ID do usuário não fornecido.");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Divider orientation="horizontal" style={{ backgroundColor: "white" }} flexItem />
      <h3>{nome}</h3>
      <Paper
        elevation={4}
        style={{ width: "90vw", maxWidth: 600, height: 350, marginBottom: 10 }}
      >
        <img
          style={{ height: "100%", width: "100%", objectFit: "cover" }}
          src={imagem}
          alt={nome}
          loading="lazy"
        />
      </Paper>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 1,
          padding: 2,
          marginBottom: 2,
          width: "90vw",
          maxWidth: 600,
        }}
      >
        <>
          <p>Cores de preferência: </p>
          <div style={{ marginLeft: 5, flexDirection: "row", display: "flex" }}>
            {cores && cores.map((cor, index) => (
              <div
                key={index}
                style={{
                  width: 25,
                  height: 25,
                  marginRight: 5,
                  backgroundColor: cor,
                }}
              ></div>
            ))}
          </div>
        </>
        <Divider orientation="vertical" style={{ backgroundColor: "white" }} flexItem />
        <>
          <p>Pessoas que já selecionaram esse item: </p>
          <div style={{ flexDirection: "column", display: "flex", marginLeft: 20, alignItems: "flex-start" }}>
            <Badge color="success" badgeContent={usuariosSelecionaram ? usuariosSelecionaram.length : 0} showZero></Badge>
          </div>
        </>
      </Box>

      <Button
        variant="contained"
        color="success"
        style={{
          borderRadius: 30,
          height: 50,
          width: 300,
          backgroundColor: "#78e65f",
          color: "black",
          marginBottom: 20,
        }}
        onClick={handleAddUser}
      >
        Adicionar
      </Button>
      <Divider orientation="horizontal" style={{ backgroundColor: "white" }} flexItem />
    </div>
  );
}
