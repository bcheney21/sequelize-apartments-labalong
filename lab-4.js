/**
 * Bonus tasks and complex queries
 */

// 1. require the db models
const db = require('./models')
// 2. require sequelize operators
const { Op } = require('sequelize')

// uncomment to see output
// ownerNames()

// 3. Show the ages of all of the owners in ascending order.
// https://sequelize.org/master/manual/model-querying-basics.html#ordering
async function ownerAgesAscending() {
  try {
    // ordering options for ascending age
    const options = {
      order: [
        ['age', 'ASC']
      ]
    }
    
    // find every entry in the owners table with the query options
    const owners = await db.owner.findAll(options)
    
    // log the ages of each owner
    owners.forEach(owner => {
      console.log(owner.age)
    })
  } catch (err) {
    console.log("🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥\n", err)
  }
}

// uncomment to see output
// ownerAgesAscending()

// 4. Show the names and ages of all owners who are older than 30.
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

// 4. Show the names of the first three owners in your owners table.
// https://sequelize.org/master/manual/model-querying-basics.html#limits-and-pagination
async function limitOwners() {
  try {
    const owners = await db.owner.findAll({ limit: 3 })
    owners.forEach(owner => {
      console.log(owner.name)
    })
  } catch (err) {
    console.log("🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥\n", err)
  }
}

// uncomment to see output
// limitOwners()

// 5. Show the highest age of all owners.
async function ownerAgeMax() {
  try {
    const maxAge = await db.owner.max('age')
    console.log(maxAge)
  } catch (err) {
    console.log("🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥\n", err)
  }
}

// uncomment to see output
// ownerAgeMax()

// 10. Show the highest age of owners who are under 30 and whose name contains an `o`. Limit to one result.
// https://sequelize.org/master/manual/model-querying-basics.html#operators
// https://sequelize.org/master/manual/model-querying-basics.html#limits-and-pagination
// https://sequelize.org/master/manual/model-querying-basics.html#-code-max--code----code-min--code--and--code-sum--code-
async function maxAgeOperators() {
  try {
    // where clause with operations and a limit
    const options = {
      where: {
        age: {
          [Op.lt]: 30
        }, 
        name: {
          [Op.substring]: 'o'
        }
      }
    }
    // find the max with options
    const oldestAge = await db.owner.max('age', options)
    
    // log the age
    console.log(oldestAge)
  } catch (err) {
    console.log("🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥\n", err)
  }
}

// uncomment to see output
maxAgeOperators()

// 6. Show all of the properties in alphabetical order that are not named Archstone and do not have an id of 3 or 5.
// https://sequelize.org/master/manual/model-querying-basics.html#ordering
// https://sequelize.org/master/manual/model-querying-basics.html#operators
async function orderAndOperators() {
  try {
    // ordering options for ascending name and a where clause and operators
    const options = {
      where: {
        name: {
          [Op.not]: 'Archstone'
        },
        id: {
          [Op.not]: [3, 5]
        }
      },
      order: [
        ['name', 'ASC']
      ]
    }
    
    // find every entry in the owners table with the query options
    const properties = await db.property.findAll(options)
    
    // log the properties returned
    properties.forEach(property => {
      console.log(`${property.name} is id ${property.id}`)
    })
  } catch (err) {
    console.log("🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥\n", err)
  }
}

// uncomment to see output
// findProperties()

// uncomment to see output
// yukiProperties()

// 9. Show the name of of a properties owner by looking up the property
async function propertyLookup(){
  try {
    const options = {
      where: {
        name: 'Willowspring'
      },
      include: [{
          model: db.owner
        }]
    }
    const property = await db.property.findOne(options)
    console.log(property.owner.name)
  } catch (err) {
    console.log("🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥\n", err)
  }
}
// uncomment to see the output
// propertyLookup()

// 10. Count the total number of properties where the ownerId is between 1 and 3.
// https://sequelize.org/master/manual/model-querying-basics.html#operators
async function countProperties() {
  try {
    // ordering options for ascending name and a where clause with operators
    const options = {
      where: {
        ownerId: {
          [Op.between]: [1, 3]
        }
      }
    }
    
    // find every entry in the owners table with the query options
    const amount = await db.property.count(options)
    
    // log the number of properties that meet the condition
    console.log(`there are ${amount} properties where the ownerId is between 1 and 3`)
  } catch (err) {
    console.log("🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥\n", err)
  }
}

// uncomment to see output
// countProperties()

// 11. List all properties sorted by the owners names 
// https://sequelize.org/master/manual/model-querying-basics.html#ordering
async function propertiesByOwnerName() {
  try {
    // ordering options for ascending age
    const options = {
      include: [db.property],
      order: [
        ['name', 'ASC']
      ]
    }
    
    // find every entry in the owners table with the query options
    const owners = await db.owner.findAll(options)
    
    // log the ages of each owner
    owners.forEach(owner => {
      owner.properties.forEach(property => {
        console.log(`${owner.name} owns ${property.name}`)
      })
    })
  } catch (err) {
    console.log("🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥\n", err)
  }
}
// uncomment to see output
// propertiesByOwnerName()


// 12. READ one of the owners that has mulitiple properties and destroy them all
async function destroyProperties() {
  try {
    const options = {
      where: {
        name: 'Erin'
      },
      include: [db.property]
    }
    // find the owner
    const owner = await db.owner.findOne(options)
    // map the property ids to where clause options
    const destroyIds = owner.properties.map(property => {
      return  { id: property.id }
    })
    // use the array for the AND operator
    const destroyOptions = {
      where: {
        [Op.and]: destroyIds
      }
    }
    // DESTROY
   const propertyDestruction =  await db.property.destroy(destroyOptions)
   console.log(`${owner.name} has had ${propertyDestruction} properties destroyed`)

  } catch (err) {
    console.log("🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥\n", err)
  }
}

// uncomment to see output
// destroyProperties()