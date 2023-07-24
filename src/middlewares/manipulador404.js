import NotFound from './err/NotFound.js';

export default (req, res, next) => {
    const err404 = new NotFound();
    next(err404);
};
