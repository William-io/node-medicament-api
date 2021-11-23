//1. Adicionar uma chave secreta que tera apenas no servidor.
global.SALT_KEY = 'f5b99242-6504-4ca3-90f2-05e78e5761ef';
global.EMAIL_TMPL = 'Olá, <strong>{0}</strong>, seja bem vindo à Node Medicament!';

module.exports = {
    connectionString: 'mongodb+srv://william-io:root@ndstr.bgmwl.mongodb.net/ndstr?retryWrites=true&w=majority',
    sendgridKey: 'CHAVE',
    containerConnectionString: 'CONNECTION STRING'
}