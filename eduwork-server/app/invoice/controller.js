const { subject } = require('@casl/ability');
const Invoice = require('./model');
const { policyFor } = require('../../utils/getToken');

const show = async (req, res, next) => {
    try {
        let { order_id } = req.params;
        console.log('Order ID:', order_id);

        // Mencari invoice berdasarkan order_id
        let invoice = await Invoice.findOne({ order: order_id }).populate('order').populate('user');
        console.log('Invoice Query Result:', invoice);

        if (!invoice) {
            return res.json({
                err: 1,
                msg: 'Invoice not found for the provided order_id.',
            });
        }

        // Mendapatkan policy untuk pengguna
        let policy = policyFor(req.user);
        console.log('Policy:', policy);

        // Menggunakan subject dengan data yang benar
        let subjectInvoice = subject('Invoice', { order: invoice.order, user_id: invoice.user._id });
        console.log('Subject Invoice:', subjectInvoice);

        // Memeriksa apakah pengguna memiliki izin untuk melihat invoice ini
        if (!policy.can('read', subjectInvoice)) {
            return res.json({
                err: 1,
                msg: 'You do not have permission to view this invoice.',
            });
        }

        if (!policy.can('read', 'Invoice')) {
            return res.json({
                err: 1,
                msg: 'You are not allowed to perform this action.',
            });
        }

        // Jika izin ada, mengembalikan invoice
        return res.json(invoice);
    } catch (err) {
        console.error('Error Details:', err);
        return res.json({
            err: 1,
            msg: 'Error fetching invoice',
        });
    }
};

module.exports = {
    show
};
