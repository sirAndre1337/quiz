import { useState } from 'react'
import Botao from '../components/Botao'
import Questao from '../components/Questao'
import Questionario from '../components/Questionario'
import QuestaoModel from '../model/questao'
import RespostaModel from '../model/resposta'

const questaoMock = new QuestaoModel(1, 'Melhor cor?', [
  RespostaModel.errada('Verde'),
  RespostaModel.errada('Vermelha'),
  RespostaModel.errada('Azul'),
  RespostaModel.certa('Preta'),
])


export default function Home() {

  const [questao, setQuestao] = useState(questaoMock);

  function respostaFornecida(indice: number) {
    console.log(indice);
    setQuestao(questao.responderCom(indice))
    console.log(questao);
  }

  function tempoEsgotado() {
    if (!questao.respondida) {
      setQuestao(questao.responderCom(-1))
    }
  }

  function questaoRespondida(){

  }

  function irParaProximoPasso() {

  }

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      flexDirection : 'column',
      alignItems: 'center',
      height: '100vh',
    }}>
      <Questionario 
      questao={questao}
      ultima={false}
      questaoRespondida={questaoRespondida}
      irParaProximoPasso={irParaProximoPasso}
      />
    </div>
  )
}
