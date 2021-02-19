/**
 * a space for your code along notes 👾
 */
const db = require('./models')

//  owners: 
//  sequelize model:generate --name=owner --attributes name:text,age:integer
// properties:
// sequelize model:generate --name=property --attributes ownerId:integer,name:text,units:integer

// CREATE
// async function creating() {
//     try {
//         // simple create
//         const owner = await db.owner.create({
//             name: 'William',
//             age: 27

//         })
//         console.log(owner)
//     } catch (error) {
//         console.log(error)
//     }
// }
// creating()
async function creating() {
    try {
        const options = {
            where: { name: 'Jane'},
            defualts: {age: 35 }
        }
        const [owner, created] = await db.owner.findOrCreate(options)
        if(created === true) console.log(owner.name)
        const propertyOptions = {
            where: { name: 'Mesa Verde'},
            defaults: { units: 1000}
        }
        const [property, propertyCreated] = await db.property.findOrCreate(propertyOptions)
        if(propertyCreated === true) console.log(property.name)

        await owner.addProperty(property)
        const foundProperties = await owner.getProperties()
        // console.log(foundProperties)
        // new owner with properties created
        const newOwner = {
            name: 'Jack',
            age: 70,
        }
        // create the owner
        const createdOwner = await db.owner.create(newOwner)

        await createdOwner.createProperty({
            name: 'New Apartments',
            units: 45
        })
        console.log(createdOwner.name)
        // ask what the owners properties are
        const createdOwnerProps = await owner.getProperties()
        console.log(createdOwnerProps)
    } catch (error) {
        console.log(error)
    }
}

// READ
async function reading(){
    try {
        const owners = await db.owner.findAll()
        owners.forEach(owner => {
            console.log('${owners.name} is ${owner.age} years old')
        })
        const william = await db.owner.findOne({
            where: {
                name: 'William'
            }
        })
        console.log('found user ' + william.name + " with id of " + william.id)
    } catch(error) {
        console.log(error)
    }
}
// reading()

// UPDATE
async function updating() {
    try{
        const numRowsUpdated = db.owner.update({
            name: "Bill"
        }, {
            where: {
                name: "William"
            }
        })
        console.log(numRowsUpdated)
    } catch(error){
        console.log(error)
    }
}
// updating()
// DESTROY

async function destroying() {
    try{
        const numOwnersDestroyed = await db.owner.destorying({
            where: {
                id: 2
            }
        })

    } catch (error) {
        console.log(error)
    }
}

// destroying()


