interface ObjectPagination{
    currentPage: number,
    limitItem: number,
    skip?:number,
    totalPage?:number
}

const paginationHelper = (objectPagination:ObjectPagination,query:Record<string,any>,CountRecord:number):ObjectPagination=>{

    if(query.page){
        objectPagination.currentPage=parseInt(query.page);
    }
    
    objectPagination.skip = (objectPagination.currentPage - 1)*objectPagination.limitItem;
    
    const totalPage = Math.ceil(CountRecord/objectPagination.limitItem);
    
    objectPagination.totalPage=totalPage;
    
    return objectPagination;
}
export default paginationHelper