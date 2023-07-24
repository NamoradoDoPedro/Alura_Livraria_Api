import ErroBase from './ErroBase.js';

class ErroValidacao extends ErroBase {
    constructor(err) {
        const mensagensErro = Object.values(err.errors)
            .map((err) => err.message)
            .join('; ');
        super(`Os seguintes erros foram encontrados: ${mensagensErro}`, 400);
    }
}
export default ErroValidacao;
