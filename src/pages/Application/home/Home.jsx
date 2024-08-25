import * as React from 'react';
import { Input, Button, Flex, Box } from '@chakra-ui/react';
import { ref, get } from "firebase/database";
import { database } from "../../../lib/firebase/firebase";

export default function Home(props) {
    const [login, setLogin] = React.useState('');
    const [codigo, setCodigo] = React.useState('');

    React.useEffect(() => {
        // Função para testar a inserção de um item (opcional)
        // addTestItem();
    }, []);

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
                const user = userArray.find(user => user.codigo == codigo);
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
