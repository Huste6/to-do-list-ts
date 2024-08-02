interface ObjectSearch{
    keyword:string,
    regex?:RegExp
}
const SearchHelper =(query: Record<string,any>):ObjectSearch=>{
    let ObjectSearch:ObjectSearch={
        keyword:""
    }
    if (query.keyword) {
        ObjectSearch.keyword = query.keyword
        //c1: find.title = { $regex: keyword, $options: "i" };
        // c2:
        const regex = new RegExp(ObjectSearch.keyword,"i")
        ObjectSearch.regex=regex
    }
    return ObjectSearch
}
export default SearchHelper;