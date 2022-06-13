class Apifeatures{
    constructor(query, queryStr){
        this.query = query;
        this.queryStr = queryStr;
    }

    //methods:
    search(){
        const keyword = (this.queryStr.keyword) ? {
            name:{
                $regex : this.queryStr.keyword,
                $options : "i",
            }
        } : {} ;

        this.query = this.query.find({...keyword});

        return this;
    }


    filter(){
        const queryCpy = {...this.queryStr};

        //Removing some non-essential feilds
        const toRemove = ["keyword", "page", "limit"];
        toRemove.forEach( (val) => delete queryCpy[val] );

        //Filter for price & rating
        let queryStr = JSON.stringify(queryCpy);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key)=> `$${key}`);
        
        
        this.query = this.query.find(JSON.parse(queryStr));
        return this;
    }
    

    pagination(suppliesperPage){
        const currentpage = Number(this.queryStr.page) || 1;

        const skip = suppliesperPage * (currentpage - 1);

        this.query = this.query.limit(suppliesperPage).skip(skip);

        return this;
    }
};


export default Apifeatures;