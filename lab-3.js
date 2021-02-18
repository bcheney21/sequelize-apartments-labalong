/**
 * Using operaotrs, ordering and limiting
 * for advanced queries
 */

// 1. require the db models
const db = require('./models')
// 2. require the sequelize operators
const { Op } = require('sequelize')

// 3. Show the names and ages of all owners who are older than 30.
// https://sequelize.org/master/manual/model-querying-basics.html#operators
async function olderThanThirty() {
  try {
    // options with a where clause and greater than operator
    const options = {
      where: {
        age: {
          [Op.gt]: 30
        }
      }
    }
    // find every entry in the owners table
    const owners = await db.owner.findAll(options)
    
    // log the names of each owner
    owners.forEach(owner => {
      console.log(`${owner.name} is ${owner.age} years old.`)
    })
  } catch (err) {
    console.log("🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥\n", err)
  }
}

// uncomment to see output
// olderThanThirty()

// 4. Show the name of all properties whose name contains an `a`.
// https://sequelize.org/master/manual/model-querying-basics.html#operators
async function containsSubstring() {
  try {
    // options with a where clause and substring operatpr
    const options = {
      where: {
        name: {
          [Op.substring]: 'a'
        }
      }
    }
    // find every entry in the properties table
    const properties = await db.property.findAll(options)
    
    // log the names of each property
    properties.forEach(property => {
      console.log(property.name)
    })
  } catch (err) {
    console.log("🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥\n", err)
  }
}

// uncomment to see output
// containsSubstring()

// 5. Show the ages of all of the owners in ascending order.
// https://sequelize.org/master/manual/model-querying-basics.html#ordering
async function unitsDescending() {
  try {
    // ordering options for ascending age
    const options = {
      order: [
        ['units', 'DESC']
      ]
    }
    
    // find every entry in the owners table with the query options
    const properties = await db.property.findAll(options)
    
    // log the ages of each owner
    properties.forEach(property => {
      console.log(`${property.name} has ${property.units} units`)
    })
  } catch (err) {
    console.log("🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥\n", err)
  }
}

// uncomment to see output
// unitsDescending()

// 6. Show the names of the first three properties in your properties table.
// https://sequelize.org/master/manual/model-querying-basics.html#limits-and-pagination
async function limitProperties() {
  try {
    const properties = await db.property.findAll({ limit: 4 })
    properties.forEach(property => {
      console.log(property.name)
    })
  } catch (err) {
    console.log("🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥\n", err)
  }
}

// uncomment to see output
limitProperties()