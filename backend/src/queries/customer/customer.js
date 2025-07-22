const logger = require('../../config/logger')
const sequelize = require('../../models/sequelize/index')

module.exports = {
    findCustomerById: async(Id) => {
        try {
            return await sequelize.models.Customers.findByPk(Id)
        } catch (e) {
            throw new Error(e)
        }
    },
    createCustomer: async(customerData) => {
        const { customerType, branchId, permissions, personData, customerEmail, customerPassword, scope } = customerData
        const t = await sequelize.transaction()
        try {
            //Create a Person 
            const person = await sequelize.models.People.create({...personData }, { transaction: t })
            const savedPerson = await person.save()
                //Create customer and associate him with the created person
            const customer = await sequelize.models.Customers.create({
                personId: savedPerson.personId,
                customerType,
                branchId,
                permissions,
                scope,
                customerEmail,
                customerPassword
            }, { transaction: t })
            const savedCustomer = await customer.save()
            await t.commit()
            return { customer: savedCustomer, person: savedPerson }
        } catch (e) {
            await t.rollback()
            throw e
        }

    },
    findCustomerByEmail: async(email) => {        
        try {
            const customer = await sequelize.models.Customer.findOne({
                where: {
                    email: email
                }
            })
            
            return customer
        } catch (e) {
            logger.error(e)
        }

    },
    findPersonById: async(id) => {
        const person = await sequelize.models.People.findByPk(id)
        return person
    },
    getAccessibleCustomersQuery: async(customerIds, t = null) => {
        const customers = await sequelize.models.CustomerAccessPrivileges.findAll({
            where: {
                accessibleBy: customerIds,
            },
            attributes: ['customerId']
        })

        return customers
    },
    updateCustomerById: async(customerId, customerData, t = null) => {
        const customer = await sequelize.models.Customers.findByPk(customerId)
        if (customer !== null) {
            return await customer.update({...customerData }, { transaction: t })
        } else {
            return null
        }
    },
    deleteCustomerAccessPrivileges: async(opts, t = null) => {
        const uap = await sequelize.models.CustomerAccessPrivileges.destroy({...opts, transaction: t })
        return uap
    },
    updateCustomerBynewPasswordQuery: async(customerEmail, password) => {
        const unp = await sequelize.models.Customers.findOne({
            where: {
                customerEmail: customerEmail
            }
        })

        let u = await unp.update({ customerPassword: password })
        return u;
    },
    findCustomersByOptsQ: async(opts)=>{
        const customers = await sequelize.models.Customers.findAll(opts)
        return customers
    }
}