import { autores } from '../models/index.js';
import NotFound from '../middlewares/err/NotFound.js';

class AutorController {
    static listarAutores = async (req, _res, next) => {
        try {
            const autoresResultado = autores.find();
            req.resultado = autoresResultado;
            next();
        } catch (err) {
            next(err);
        }
    };

    static listarAutorPorId = async (req, res, next) => {
        try {
            const { id } = req.params;
            const autorResultado = await autores.findById(id);

            if (autorResultado !== null) {
                res.status(200).json(autorResultado);
            } else {
                next(new NotFound('Id do Autor não encontrado'));
            }
        } catch (err) {
            next(err);
        }
    };

    static cadastrarAutor = async (req, res, next) => {
        try {
            const autor = new autores(req.body);
            await autor.save();
            res.status(200).json(autor);
        } catch (err) {
            next(err);
        }
    };

    static atualizarAutor = async (req, res, next) => {
        try {
            const { id } = req.params;

            const autorResultado = await autores.findById(id);

            if (autorResultado !== null) {
                await autores.findByIdAndUpdate(id, { $set: req.body });
                res.status(200).send({
                    message: 'Autor atualizado com sucesso',
                });
            } else {
                next(new NotFound('Id do Autor não localizado.'));
            }
        } catch (err) {
            next(err);
        }
    };

    static excluirAutor = async (req, res, next) => {
        try {
            const { id } = req.params;
            const autorResultado = await autores.findById(id);

            if (autorResultado !== null) {
                await autores.findByIdAndDelete(id);
                res.status(200).send({
                    message: 'Autor deletado com sucesso',
                });
            } else {
                next(new NotFound('Id do Autor não localizado.'));
            }
        } catch (err) {
            next(err);
        }
    };
}

export default AutorController;
