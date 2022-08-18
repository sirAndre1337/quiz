import questoes from "../bancoDeQuestoes"


export default function handler(req, res) {
    const idQuestoes = questoes.map(questao => questao.id);
    res.status(200).json(idQuestoes);
}