class QueryHandler {
    constructor(query, str) {
        this.query = query
        this.str = str
    }

    search() {
        const keyword = this.str.keyword ? {
            name: {
                $regex: this.str.keyword,
                $options: 'i'
            }
        } : {}

        this.query = this.query.find({ ...keyword })
        return this
    }

    filter() {
        const nstr = { ...this.str }

        const fields = ["keyword", "page", "limit"]

        fields.forEach(field => {
            delete nstr[field]
        })

        let qstr = JSON.stringify(nstr);
        qstr = qstr.replace(/\b(gt|lt|gte|lte)\b/g, key => `$${key}`)   //need to search

        this.query = this.query.find(JSON.parse(qstr))
        return this
    }

    pagination(prodCount) {
        const currPage = Number(this.str.page) || 1;
        const skip = prodCount * (currPage - 1)
        this.query = this.query.limit(prodCount).skip(skip)
        return this
    }

}

module.exports = QueryHandler