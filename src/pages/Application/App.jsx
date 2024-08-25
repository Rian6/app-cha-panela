import * as React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import Home from './home/Home'
import Listagem from './listagem/Listagem'

function App(params) {
  const [isLogado, setIsLogado] = React.useState(false);

  return (
    <>
    { !isLogado ?
      <ChakraProvider>
        <Home setIsLogado={setIsLogado}/>
      </ChakraProvider> 
      : <Listagem/>
    }
    </>
  )
}
export default App
