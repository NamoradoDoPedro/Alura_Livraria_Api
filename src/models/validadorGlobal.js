import mongoose from 'mongoose';

mongoose.Schema.Types.String.set('validate', {
    validator: (valor) => valor.trim() !== '',
    message: ({ path }) => `o campo ${path} foi fornecido em branco.`,
});
