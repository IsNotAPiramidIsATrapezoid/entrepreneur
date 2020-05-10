module.exports = function setupEntrepredeur(EntrepreneurModel){

    async function createEntrepreneur(entrepreneur){
        const result =  await EntrepreneurModel.create(entrepreneur)
        return result.toJSON()
    }    

    async function getEntrepreneurById(id){
        const result = await EntrepreneurModel.findByPk(id)
        return result.toJSON()
    }

    async function getAllEntrepreneurs(){
        const result = await EntrepreneurModel.findAll()
        return result
    }

    async function updateEntrepreneur(entrepreneur){  /////////////// TODO in API//////////////////
        const result = await EntrepreneurModel.update(entrepreneur)
        return result.toJSON()
    }

    return {
        createEntrepreneur,
        updateEntrepreneur,  /////////////// TODO  in API//////////////////
        getEntrepreneurById,
        getAllEntrepreneurs
    }

}