"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SearchHelper = (query) => {
    let ObjectSearch = {
        keyword: ""
    };
    if (query.keyword) {
        ObjectSearch.keyword = query.keyword;
        const regex = new RegExp(ObjectSearch.keyword, "i");
        ObjectSearch.regex = regex;
    }
    return ObjectSearch;
};
exports.default = SearchHelper;
