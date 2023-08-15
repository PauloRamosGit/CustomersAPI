const express = require('express');
const Joi = require('joi'); //used for validation
const app = express();
app.use(express.json());

const customers = [
    {
        id: 1,
        customerName: 'Afonso Miguel Silva',
        address: 'Rua da Liberdade, 100, 1000-123 Lisboa',
        NIF: 1234567890,
        phone: 9612345678
    },
    {
        id: 2,
        customerName: 'Martim Rafael Pereira',
        address: 'Avenida da Liberdade, 200, 2000-234 Porto',
        NIF: 2345678901,
        phone: 9123456789
    },
    {
        id: 3,
        customerName: 'Duarte Manuel Rodrigues',
        address: 'Rua de São Bento, 10, 3000-001 Coimbra',
        NIF: 3456789012,
        phone: 9323456780
    },
    {
        id: 4,
        customerName: 'Mariana Rodrigues',
        address: 'Avenida dos Aliados, 1, 4000-000 Guimarães',
        NIF: 4567890123,
        phone: 9623456781
    }
]

//READ Request Handlers
app.get('/', (req, res) => {
    res.send('Welcome to Edurekas REST API with Node.js Tutorial!!');
});

app.get('/api/customers', (req, res) => {
    res.send(customers);
});

app.get('/api/customers/:id', (req, res) => {
    const customer = customers.find(c => c.id === parseInt(req.params.id));

    if (!customer) res.status(404).send('<h2 style="font-family: Malgun Gothic; color: darkred;">Ooops... Cant find what you are looking for!</h2>');
    res.send(customer);
});

//CREATE Request Handler
app.post('/api/customers', (req, res) => {

    const { error } = validatecustomer(req.body);
    if (error) {
        res.status(400).send(error.details[0].message)
        return;
    }
    const customer = {
        id: customers.length + 1,
        customerName: req.body.customerName,
        address: req.body.address,
        NIF: req.body.NIF,
        phone: req.body.phone
    };
    customers.push(customer);
    res.send(customer);
});

//UPDATE Request Handler
app.put('/api/customers/:id', (req, res) => {
    const customer = customers.find(c => c.id === parseInt(req.params.id));
    if (!customer) res.status(404).send('<h2 style="font-family: Malgun Gothic; color: darkred;">Not Found!! </h2>');

    const { error } = validatecustomer(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    customer.customerName = req.body.customerName;
    res.send(customer);
});

//DELETE Request Handler
app.delete('/api/customers/:id', (req, res) => {

    const customer = customers.find(c => c.id === parseInt(req.params.id));
    if (!customer) res.status(404).send('<h2 style="font-family: Malgun Gothic; color: darkred;"> Not Found!! </h2>');

    const index = customers.indexOf(customer);
    customers.splice(index, 1);

    res.send(customer);
});

function validatecustomer(customer) {
    const schema = {
        customerName: Joi.string().min(3).required()
    };
    return Joi.validate(customer, schema);

}

//PORT ENVIRONMENT VARIABLE
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}..`));