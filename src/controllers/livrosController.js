import { autores, livros } from '../models/index.js';
import NotFound from '../middlewares/err/NotFound.js';

class LivroController {
    static listarLivros = async (req, _res, next) => {
        try {
            const buscaLivros = livros.find();
            req.resultado = buscaLivros;
            next();
        } catch (err) {
            next(err);
        }
    };

    static listarLivroPorId = async (req, res, next) => {
        try {
            const { id } = req.params;
            const livroResultado = await livros.findById(id);

            if (livroResultado !== null) {
                res.status(200).json(livroResultado);
            } else {
                next(new NotFound('Id do livro não encontrado'));
            }
        } catch (err) {
            next(err);
        }
    };

    static cadastrarLivro = async (req, res, next) => {
        try {
            const livro = new livros(req.body);
            await livro.save();

            res.status(200).json(livro);
        } catch (err) {
            next(err);
        }
    };

    static atualizarLivro = async (req, res, next) => {
        try {
            const { id } = req.params;
            const livroResultado = await livros.findById(id);

            if (livroResultado !== null) {
                await livros.findByIdAndUpdate(id, { $set: req.body });
                res.status(200).send({
                    message: 'Livro atualizado com sucesso',
                });
            } else {
                next(new NotFound('Id do livro não encontrado'));
            }
        } catch (err) {
            next(err);
        }
    };

    static excluirLivro = async (req, res, next) => {
        try {
            const { id } = req.params;
            const livroResultado = await livros.findById(id);

            if (livroResultado !== null) {
                await livros.findByIdAndDelete(id, { $set: req.body });
                res.status(200).send({ message: 'Livro deletado com sucesso' });
            } else {
                next(new NotFound('Id do livro não encontrado'));
            }
        } catch (err) {
            next(err);
        }
    };

    static listarLivroPorFiltro = async (req, res, next) => {
        try {
            const busca = await processaBusca(req.query);

            if (busca !== null) {
                const livrosResultado = livros.find(busca);
                req.resultado = livrosResultado;
                next();
            } else {
                res.status(200).send([]);
            }
        } catch (err) {
            next(err);
        }
    };
}

async function processaBusca(params) {
    const { editora, titulo, minPaginas, maxPaginas, nomeAutor } = params;
    let busca = {};

    if (editora) busca.editora = editora;
    if (titulo) busca.titulo = { $regex: titulo, $options: 'i' };

    if (minPaginas || maxPaginas) busca.numeroPaginas = {};

    if (minPaginas) busca.numeroPaginas.$gte = minPaginas;
    if (maxPaginas) busca.numeroPaginas.$lte = maxPaginas;

    if (nomeAutor) {
        const autor = await autores.findOne({ nome: nomeAutor });
        if (autor !== null) {
            busca.autor = autor._id;
        } else {
            busca = null;
        }
    }

    return busca;
}

export default LivroController;
