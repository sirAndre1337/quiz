import QuestaoModel from "../../model/questao";
import RespostaModel from "../../model/resposta";

const questoes : QuestaoModel[] = [
    new QuestaoModel(306, 'Qual bicho transmite a Doenca de Chagas ?' , [
       RespostaModel.errada('Abelha'),
       RespostaModel.errada('Barata'),
       RespostaModel.errada('Pulga'),
       RespostaModel.certa('Barbeiro'),
    ]),
    new QuestaoModel(202, 'Fruta e conhecido no Norte e Nordeste como "jerimum" ?' , [
        RespostaModel.errada('Caju'),
        RespostaModel.errada('Coco'),
        RespostaModel.errada('Chuchu'),
        RespostaModel.certa('Abobora'),
     ])
]

export default questoes;