/**
 * BASIC CRUD OPERATIONS
 */

// 1. require your models
const db = require('./models')

// 2. CREATE an owner John age 33 and console log the result
// https://sequelize.org/master/manual/model-querying-basics.html#simple-insert-queries
async function createOwner() {
  try {
    // create returns the row that was created
    const createdOwner = await db.owner.create({
      name: 'John',
      age: 33
    })
    console.log(`created new owner: ${createdOwner.name} who is ${createdOwner.age}`)
  } catch (err) {
    console.log("🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥\n", err)
  }
}

// uncomment to see output
createOwner()


// 2. CREATE a property named Brookevista with 20 units
// https://sequelize.org/master/manual/model-querying-basics.html#simple-insert-queries
async function createProperty() {
  try {
    const newProperty = await db.property.create({
      name: 'Brookvista',
      units: 20
    })

    console.log(`created new property ${newProperty.name}`)
  } catch (err) {
    console.log("🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥\n", err)
  }
}

// uncomment to see output
// createProperty()

// 3. READ all owners and console log thier names
// https://sequelize.org/master/manual/model-querying-basics.html#simple-select-queries
async function ownerNames() {
  try {
    // findAll returns an iterable
    const owners = await db.owner.findAll()
  
    // log the names of each owner
    owners.forEach(owner => {
      console.log(owner.name)
    })
  } catch (err) {
    console.log("🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥\n", err)
  }
}

// uncomment to see output
// ownerNames()

// 4. READ the property with an id of 1 and log the name and id
// https://sequelize.org/master/manual/model-querying-finders.html
// solve with findByPk
async function solveOne() {
  try {
    const property = await db.property.findByPk(1)
    console.log(property.name, property.id)
  } catch(err) {
    console.log("🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥\n", err)
  }
}

// uncomment to see output
// solveOne()

// solve with findOne and a where clause
async function solveTwo() {
  try {
    const options = {
      where: {
        id: 1
      }
    }
    const property = await db.property.findOne(options)
    console.log(property.name, property.id)
  } catch(err) {
    console.log("🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥\n", err)
  }
}

// uncomment to see output
// solveTwo()

// 5. UPDATE the owner named John's age to 43 console log the rows updated
// https://sequelize.org/master/manual/model-querying-basics.html#simple-select-queries
async function updateOwner() {
  try {
    // what to update
    const update = {
      age: 43
    }
    // where to updated
    const options = {
      where: {
        name: 'John'
      }
    }
    // takes the columns to update as first argument
    // update returns the number of rows that where updated
    const rowsUpdated = await db.owner.update(update, options)
    console.log(`number of rows changed: ${rowsUpdated}`)
  } catch(err) {
    console.log("🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥\n", err)
  }
}

// uncomment to see output
// updateOwner()

// 6. DESTROY the owner named John 
// https://sequelize.org/master/manual/model-querying-basics.html#simple-delete-queries
async function destroyOwner() {
  try {
    // returns the number of rows deleted from the db
    const numRowsDeleted = await db.owner.destroy({
      where: { 
        name: 'John' 
      }
    })
    console.log(`${numRowsDeleted} removed from the db`)
  } catch (error) {
    console.log(error)
  }
}

// destroyOwner()
