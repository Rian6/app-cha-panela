import * as React from "react";
import { useState, useEffect } from "react";
import { ref, get } from "firebase/database";
import { database } from "../../../lib/firebase/firebase"; // Certifique-se de que o Firebase esteja configurado corretamente
import Item from "./item/Item";

export default function Listagem() {
  const [itens, setItens] = useState([]); // Estado para armazenar os itens
  const userId = "usuario_id"; // ID do usuário autenticado (pode vir de autenticação)

  useEffect(() => {
    // Função para buscar os itens do Firebase
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
      }
    };

    fetchItens(); // Chama a função para buscar os itens quando o componente for montado
  }, []);

  return (
    <div style={{ maxWidth: "100vw", margin: 20 }}>
      <p style={{ fontWeight: "700", width: 300 }}>
        Selecione os itens que você pretende dar, lembrando que os itens da lista são itens de sugestão, qualquer coisa fora da lista é muito bem-vinda.
      </p>

      {/* Renderiza os itens se houver dados */}
      {itens.length > 0 ? (
        itens.map((item) => (
          <Item
            key={item.id}
            itemId={item.id}
            nome={item.nome}
            imagem={item.imagem}
            cores={item.cores}
            usuariosSelecionaram={item.usuariosSelecionaram}
            userId={userId} // Passa o ID do usuário autenticado
          />
        ))
      ) : (
        <p>Carregando itens...</p> // Mensagem de carregamento enquanto os itens são buscados
      )}
    </div>
  );
}
