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
    const id: String = req.params.id;
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
//[PATCH] /api/v1/tasks/change-multi
export const changeMulti = async (req: Request, res: Response) => {
    const { ids, key, value } = req.body;
    switch (key) {
        case "status":
            await Task.updateMany(
                {
                    _id: { $in: ids }
                }, {
                status: value
            }
            )
            res.json({
                code: 200,
                message: "Cập nhật trạng thái thành công"
            });
            break;
        case "delete":
            await Task.updateMany(
                {
                    _id: { $in: ids }
                }, {
                deleted: true,
                deletedAt: new Date()
            }
            )
            res.json({
                code: 200,
                message: "Xóa thành công"
            });
            break;
        default:
            res.json({
                code: 400,
                message: "Không tồn tại"
            });
            break;
    }
}
//[POST] /api/v1/tasks/create
export const createPost = async (req: Request, res: Response) => {
    const task = new Task(req.body);
    const data = await task.save();
    res.json({
        code: 200,
        message: "Tao thành công",
        data: data
    });
}
//[PATCH] /api/v1/tasks/edit/:id
export const edit = async (req: Request, res: Response) => {
    const id = req.params.id;
    await Task.updateOne({ _id: id }, req.body);
    res.json({
        code: 200,
        message: "Cập nhật thành công"
    });
}
