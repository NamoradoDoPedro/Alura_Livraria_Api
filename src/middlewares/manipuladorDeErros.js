import mongoose from 'mongoose';
import ErroBase from './err/ErroBase.js';
import ErroValidacao from './err/ErroValidacao.js';
import RequisicaoIncorreta from './err/RequisicaoIncorreta.js';

export default (err, _req, res, _next) => {
    if (err instanceof mongoose.Error.CastError) {
        new RequisicaoIncorreta().enviarResposta(res);
    } else if (err instanceof mongoose.Error.ValidationError) {
        new ErroValidacao(err).enviarResposta(res);
    } else if (err instanceof ErroBase) {
        err.enviarResposta(res);
    } else {
        new ErroBase().enviarResposta(res);
    }
};
