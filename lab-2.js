/**
 * CRUD WITH MODEL RELATIONSHIPS
 */

// 1. require your models
const db = require('./models')

// 1. READ an owner with thier id and includ thier properties, and console log the name of all of thier properties
// you can check in your psql shell to find an owner with properties!
// https://sequelize.org/master/manual/model-querying-finders.html
// https://sequelize.org/master/manual/eager-loading.html
async function findProperties() {
  try {
    const owner = await db.owner.findByPk(2, {
      include: [db.property]
    }) 
    owner.properties.forEach(property => {
      console.log(property.name)
    })
  } catch (err) {
    console.log("🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥\n", err)
  }
}

// 2. READ one of the owners from the db (your choice) and also the property named Brookevista. Add the Brookevista to the owner.
// https://sequelize.org/master/manual/model-querying-finders.html
// https://sequelize.org/master/manual/model-querying-basics.html#applying-where-clauses
// https://sequelize.org/master/manual/assocs.html#-code-foo-belongsto-bar---code-
async function addPropertyToOwner() {
  try {
    const property = await db.property.findOne({
      where: {
        name: 'Brookvista'
      }
    })

    const owner = await db.owner.findOne({
      where: {
        name: 'Yuki'
      }
    })

    owner.addProperty(property)

  } catch (err) {
    console.log("🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥\n", err)
  }
}

// uncomment to see the output
// addPropertyToOwner()

// 3. CREATE an owner named Erin age 21 who owns a property named Green Haven with 40 units 
// BONUS add more than one proptery at the time of creation
// https://sequelize.org/master/manual/creating-with-associations.html#hasmany---belongstomany-association
async function createOwnerAndProperty() {
  try {
    const newOwner = {
      name: 'Erin',
      age: 21,
      properties: [{
          name: 'Green Haven',
          units: 40
        }, {
          name: 'Fair Creek',
          units: 35
        }] 
    } 

    const options = {
      include: [db.property]
    }

    const owner = await db.owner.create(newOwner, options)
    owner.properties.forEach(property => {
      console.log(`new owner ${owner.name} owns ${property.name}`)
    })
  } catch (err) {
    console.log("🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥\n", err)
  }
}

// uncomment to see output
// createOwnerAndProperty()

// 5. READ the owner named Erin and console log all of thier properties
// https://sequelize.org/master/manual/eager-loading.html#fetching-a-single-associated-element
async function readProperties() {
  try {
    const owner = await db.owner.findOne({
      where: {
        name: 'Erin'
      },
      include: [db.property]
    })
    owner.properties.forEach(property => {
      console.log(property.name)
    })
  } catch (err){
    console.log("🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥\n", err)
  }
}

// uncomment to see output
// readProperties()
