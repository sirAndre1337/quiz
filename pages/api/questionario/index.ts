import { embaralhar } from "../../../functions/arrays";
import questoes from "../bancoDeQuestoes"


export default function handler(req, res) {
    const idQuestoes = questoes.map(questao => questao.id);
    const questoesEmbaralhadas = embaralhar(idQuestoes)
    res.status(200).json(questoesEmbaralhadas);
}