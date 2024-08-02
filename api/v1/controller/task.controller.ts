import { Request, Response } from "express"
import Task from "../models/task.model";
import paginationHelper from "../../../helper/paganition";
import SearchHelper from "../../../helper/search";

//[GET] /api/v1/tasks
export const index = async (req: Request, res: Response) => {
    //find
    interface Find {
        deleted: boolean,
        status?: string,
        title?: RegExp
    }
    const find: Find = {
        deleted: false
    }
    if (req.query.status) {
        find.status = req.query.status.toString();
    }
    //end find

    // pagination
    const CountTask = await Task.countDocuments(find);
    let objectPagination = paginationHelper({
        currentPage: 1,
        limitItem: 2
    }, req.query, CountTask);
    // end pagination

    //search
    const ObjectSearch = SearchHelper(req.query);
    if (req.query.keyword) {
        find.title = ObjectSearch.regex
    }
    //end search

    //sort
    const sort = {};
    if (req.query.sortKey && req.query.sortValue) {
        const sortKey = req.query.sortKey.toString();
        sort[sortKey] = req.query.sortValue;
    }
    //end sort
    const tasks = await Task
        .find(find)
        .sort(sort)
        .limit(objectPagination.limitItem)
        .skip(objectPagination.skip);

    res.json({
        code: 200,
        tasks: tasks
    });
}
//[GET] /api/v1/tasks/detail/:id
export const detail = async (req: Request, res: Response) => {
    const id: string = req.params.id;
    const tasks = await Task.find({
        _id: id,
        deleted: false
    })
    res.json({
        code: 200,
        tasks: tasks
    });
}
//[PATCH] /api/v1/tasks/change-status/:id
export const changeStatus = async (req: Request, res: Response) => {
    const id:String= req.params.id;
    const status = req.body.status;
    await Task.updateOne({
        _id: id
    }, {
        status: status
    })

    res.json({
        code: 200,
        message: "Cập nhật trạng thái thành công"
    });
}