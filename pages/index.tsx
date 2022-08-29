import { useRouter } from 'next/router';
import { useEffect, useState } from 'react'
import Questionario from '../components/Questionario'
import QuestaoModel from '../model/questao'

const BASE_URL = 'https://quiz-andre.vercel.app/api';

export default function Home() {
  const [idsDasQuestoes, setIdsDasQuestoes] = useState<number[]>([])
  const [questao, setQuestao] = useState<QuestaoModel>();
  const [respostasCertas, setRespostasCertas] = useState<number>(0);

  const router = useRouter()

  async function carregarIDSQuestoes() {
    const resp = await fetch(`${BASE_URL}/questionario`)
    const idsDasQuestoes = await resp.json()
    setIdsDasQuestoes(idsDasQuestoes)
  }

  async function carregarQuestao(idQuestao: number) {
    const resp = await fetch(`${BASE_URL}/questoes/${idQuestao}`)
    const obj = await resp.json()
    const novaQuestao = QuestaoModel.criarUsandoObjeto(obj);
    setQuestao(novaQuestao);
  }

  useEffect(() => {
    carregarIDSQuestoes()
  },[])

  useEffect(() => {
    idsDasQuestoes.length > 0 && carregarQuestao(idsDasQuestoes[0])
  },[idsDasQuestoes])

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

  function questaoRespondida(questaoRespondida: QuestaoModel){
      setQuestao(questaoRespondida)
      const acertou = questaoRespondida.acertou;
      setRespostasCertas(respostasCertas + (acertou ? 1 : 0))
  }

  function idProximaPergunta() {
    const proximoIndice = idsDasQuestoes.indexOf(questao?.id) + 1
    return idsDasQuestoes[proximoIndice]
  }

  function irParaProximoPasso() {
    const proximoId = idProximaPergunta()
    proximoId ? irParaProximaQuestao(proximoId) : finalizar()
  }

  function irParaProximaQuestao(proximoId: number) {
      carregarQuestao(proximoId)
  }

  function finalizar() {
      router.push({
        pathname: '/resultado',
        query: {
          total: idsDasQuestoes.length,
          certas: respostasCertas
        }
      })
  }

  return (
      <Questionario 
      questao={questao}
      ultima={idProximaPergunta() ? false : true}
      questaoRespondida={questaoRespondida}
      irParaProximoPasso={irParaProximoPasso}
      />
  )
}
