const QueryBuilder = (req) =>{
    const {filter, sort, page, size} = req.query;
    const query = {}
    const options ={
        //no of documents to be skipped
        // For page 1, page - 1 would be 0, so (page - 1) * limit would be 0 * limit, which means no documents are skipped.
        //For page 2, page - 1 would be 1, so (page - 1) * limit would be 1 * limit, which means the first limit documents are skipped.
        skip: (page - 1) * size,
        limit: parseInt(size)
    }

    if(filter){
        const filters = JSON.parse(filter);
        Object.keys(filters).forEach(key =>{
            query[key] = filters[key];
        })
    }

    if(sort){
        options.sort = JSON.parse(sort);
    }

    return {query,options};
}

module.exports = {
    QueryBuilder
}