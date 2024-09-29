module.exports = async function autoGenerateId(dataModel, data, dataId){
    const recentlyAddedData = await dataModel.find().sort({ _id: -1 }).limit(1).exec();
        if (recentlyAddedData.length === 0) {
            data[dataId] = 1;
        } else {
            data[dataId] = recentlyAddedData[0][dataId] + 1;
        }
        return data;
}

