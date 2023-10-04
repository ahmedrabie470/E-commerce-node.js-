class ApiFeatures {
    constructor(mongooseQuery,queryString) {
        this.mongooseQuery= mongooseQuery;
        this.queryString = queryString;
    }


    //pagination 
    pagination(){
    let page = this.queryString.page * 1 || 1
    if(page<0) page = 1
    let limit = 5
    let skip = (page-1) * limit
    this.mongooseQuery.skip(skip).limit(limit)
    this.page =  page 
    return this;
    }

    //sort
    sort(){

        if (this.queryString.sort){
            let sortedBy = this.queryString.sort.split(',').join(' ');
            this.mongooseQuery.sort(sortedBy);
        }
        return this;
    }

     //filter
    filter(){

        let queryString={...this.queryString}
        let excludedQueryFields = ['page', 'sort', 'keyword', 'fields']
        excludedQueryFields.forEach((element)=>{
            delete queryString[element]
        })
        queryString =  JSON.stringify(queryString);
        queryString = queryString.replace(/\b(gte|gt|lte|lt )\b/g,match =>`$${match}`)
        queryString = JSON.parse(queryString)
        this.mongooseQuery.find(queryString)
        return this;
    }

        // search
        search(){

            if (this.queryString.keyword) {
                let word = this.queryString.keyword
                this.mongooseQuery.find({ 
                $or: [
                { name: { $regex: word, $options: 'i' } },
                { description: { $regex: word, $options: 'i' } }
            ] })
            }
            return this;

        }

    //select fields 
    fields(){
        if(this.queryString.fields){
            let fields = this.queryString.fields.split(',').join(' ');
            this.mongooseQuery.select(fields); 
        }
        return this ; 
      
    }

       
    
}

module.exports=ApiFeatures