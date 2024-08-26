import * as React from 'react';
import { Input, Button, Flex, Box } from '@chakra-ui/react';
import { ref, get, set, push } from "firebase/database";
import { database } from "../../../lib/firebase/firebase";

export default function Home(props) {
    const [login, setLogin] = React.useState('');
    const [codigo, setCodigo] = React.useState('');

    React.useEffect(() => {
        // Função para testar a inserção de um item (opcional)
        for (const item of obj) {
            //vaddItemToDatabase(item);
        }
        //addUserToDatabase({id: 1, nome: "rian", codigo: "123"})  

    }, [0]);

    const addItemToDatabase = async (item) => {
        try {
          // Cria uma referência para a coleção de itens
          const itemsRef = ref(database, 'usuarios/');
          
          // Cria uma nova chave para o item
          const newItemRef = ref(database, `usuarios/${item.nome}`);
          
          // Adiciona o item ao banco de dados
          await set(newItemRef, item);
          console.log("Item adicionado com sucesso.");
        } catch (error) {
          console.error("Erro ao adicionar item ao banco de dados: ", error);
        }
      };

       const addUserToDatabase = async (user) => {
        try {
          // Cria uma referência para a coleção de usuários
          const usersRef = ref(database, 'usuarios/');
          
          // Adiciona o usuário ao banco de dados com uma nova chave única
          const newUserRef = push(usersRef);
          await set(newUserRef, user);
          
          console.log("Usuário adicionado com sucesso.");
        } catch (error) {
          console.error("Erro ao adicionar usuário ao banco de dados: ", error);
        }
      };

    const obj = [
  {
    "nome": "Balde",
    "imagem": "https://example.com/imagem-balde.jpg",
    "cores": []
  },
  {
    "nome": "Jogo de prato",
    "imagem": "https://example.com/imagem-jogo-de-prato.jpg",
    "cores": []
  },
  {
    "nome": "Utensílios domésticos",
    "imagem": "https://example.com/imagem-utensilios-domesticos.jpg",
    "cores": ["black", "pastel brown"]
  },
  {
    "nome": "Cortina",
    "imagem": "https://example.com/imagem-cortina.jpg",
    "cores": ["black", "brown", "graffiti"]
  },
  {
    "nome": "Cabide",
    "imagem": "https://example.com/imagem-cabide.jpg",
    "cores": []
  },
  {
    "nome": "Ferro de passar",
    "imagem": "https://example.com/imagem-ferro-de-passar.jpg",
    "cores": []
  },
  {
    "nome": "Varal",
    "imagem": "https://example.com/imagem-varal.jpg",
    "cores": []
  },
  {
    "nome": "Cesto de roupa",
    "imagem": "https://example.com/imagem-cesto-de-roupa.jpg",
    "cores": []
  },
  {
    "nome": "Jogo de lixeira",
    "imagem": "https://example.com/imagem-jogo-de-lixeira.jpg",
    "cores": []
  },
  {
    "nome": "Chaleira elétrica",
    "imagem": "https://example.com/imagem-chaleira-eletrica.jpg",
    "cores": ["black", "graffiti"]
  },
  {
    "nome": "cafeteira elétrica",
    "imagem": "https://example.com/imagem-cafeteira-eletrica.jpg",
    "cores": ["Black", "Graffiti"]
  },
  {
    "nome": "frigideira",
    "imagem": "https://example.com/imagem-frigideira.jpg",
    "cores": ["Black", "graffiti"]
  },
  {
    "nome": "Jogo de taça",
    "imagem": "https://example.com/imagem-jogo-de-taca.jpg",
    "cores": []
  },
  {
    "nome": "Sanduícheira",
    "imagem": "https://example.com/imagem-sanduicheira.jpg",
    "cores": ["Black", "Graffiti"]
  },
  {
    "nome": "Fritadeira",
    "imagem": "https://example.com/imagem-fritadeira.jpg",
    "cores": ["Black", "Graffiti"]
  },
  {
    "nome": "processador",
    "imagem": "https://example.com/imagem-processador.jpg",
    "cores": ["Black", "Graffiti"]
  },
  {
    "nome": "liquidificador",
    "imagem": "https://example.com/imagem-liquidificador.jpg",
    "cores": ["Black", "Graffiti"]
  },
  {
    "nome": "Batedeira",
    "imagem": "https://example.com/imagem-batedeira.jpg",
    "cores": ["Black", "Graffiti"]
  },
  {
    "nome": "Forma de pudim",
    "imagem": "https://example.com/imagem-forma-de-pudim.jpg",
    "cores": []
  },
  {
    "nome": "Garrafa térmica",
    "imagem": "https://example.com/imagem-garrafa-termica.jpg",
    "cores": ["Black", "pastel brown"]
  },
  {
    "nome": "escorredor de macarrão",
    "imagem": "https://example.com/imagem-escorredor-de-macarrao.jpg",
    "cores": []
  },
  {
    "nome": "Potes de mantimentos",
    "imagem": "https://example.com/imagem-potes-de-mantimentos.jpg",
    "cores": ["Transparent"]
  },
  {
    "nome": "Travessa de vidro",
    "imagem": "https://example.com/imagem-travessa-de-vidro.jpg",
    "cores": []
  },
  {
    "nome": "Forma de bolo",
    "imagem": "https://example.com/imagem-forma-de-bolo.jpg",
    "cores": []
  },
  {
    "nome": "Jarra",
    "imagem": "https://example.com/imagem-jarra.jpg",
    "cores": []
  },
  {
    "nome": "kit cozinha",
    "imagem": "https://example.com/imagem-kit-cozinha.jpg",
    "cores": ["Black", "pastel brown"]
  },
  {
    "nome": "kit tempero",
    "imagem": "https://example.com/imagem-kit-tempero.jpg",
    "cores": []
  },
  {
    "nome": "Pano de prato",
    "imagem": "https://example.com/imagem-pano-de-prato.jpg",
    "cores": []
  },
  {
    "nome": "Escorredor de louça",
    "imagem": "https://example.com/imagem-escorredor-de-louca.jpg",
    "cores": []
  },
  {
    "nome": "Jogo de xícara",
    "imagem": "https://example.com/imagem-jogo-de-xicara.jpg",
    "cores": []
  },
  {
    "nome": "Tábua",
    "imagem": "https://example.com/imagem-tabua.jpg",
    "cores": []
  },
  {
    "nome": "kit de faca",
    "imagem": "https://example.com/imagem-kit-de-faca.jpg",
    "cores": []
  },
  {
    "nome": "jogo de panela",
    "imagem": "https://example.com/imagem-jogo-de-panela.jpg",
    "cores": ["Graffiti"]
  },
  {
    "nome": "jogo de copo",
    "imagem": "https://example.com/imagem-jogo-de-copo.jpg",
    "cores": []
  },
  {
    "nome": "jogo de talher",
    "imagem": "https://example.com/imagem-jogo-de-talher.jpg",
    "cores": []
  }
]

    // Função para validar o usuário
    const validateUser = async () => {
        try {
            // Referência ao nó "usuarios" no Firebase
            const usersRef = ref(database, 'usuarios');
            const snapshot = await get(usersRef);

            if (snapshot.exists()) {
                const users = snapshot.val();
                // Converte o objeto de usuários em um array para busca
                const userArray = Object.values(users);
                console.log(users)

                // Verifica se há um usuário que corresponde ao login e código fornecidos
                const user = userArray.find(user => user.codigo === codigo);
                console.log(codigo)
                if (user) {
                    props.setIsLogado(true);
                    console.log("Usuário autenticado com sucesso!");
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
        <Flex
            minHeight="100vh"
            width="100%"
            justifyContent="center"
            alignItems="center"
            backgroundColor="black"
        >
            <Box p={8} maxWidth="400px" width="100%" backgroundColor="white" borderRadius="md" boxShadow="md">
                <Input
                    placeholder="Nome"
                    marginBottom={4}
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}
                />
                <Input
                    placeholder="Código de Acesso"
                    type="password"
                    marginBottom={4}
                    value={codigo}
                    onChange={(e) => setCodigo(e.target.value)}
                />
                <Button
                    colorScheme="blue"
                    width="100%"
                    onClick={validateUser}
                >
                    Entrar
                </Button>
            </Box>
        </Flex>
    );
}
