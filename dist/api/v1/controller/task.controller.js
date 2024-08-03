"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.edit = exports.createPost = exports.changeMulti = exports.changeStatus = exports.detail = exports.index = void 0;
const task_model_1 = __importDefault(require("../models/task.model"));
const paganition_1 = __importDefault(require("../../../helper/paganition"));
const search_1 = __importDefault(require("../../../helper/search"));
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const find = {
        deleted: false
    };
    if (req.query.status) {
        find.status = req.query.status.toString();
    }
    const CountTask = yield task_model_1.default.countDocuments(find);
    let objectPagination = (0, paganition_1.default)({
        currentPage: 1,
        limitItem: 2
    }, req.query, CountTask);
    const ObjectSearch = (0, search_1.default)(req.query);
    if (req.query.keyword) {
        find.title = ObjectSearch.regex;
    }
    const sort = {};
    if (req.query.sortKey && req.query.sortValue) {
        const sortKey = req.query.sortKey.toString();
        sort[sortKey] = req.query.sortValue;
    }
    const tasks = yield task_model_1.default
        .find(find)
        .sort(sort)
        .limit(objectPagination.limitItem)
        .skip(objectPagination.skip);
    res.json({
        code: 200,
        tasks: tasks
    });
});
exports.index = index;
const detail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const tasks = yield task_model_1.default.find({
        _id: id,
        deleted: false
    });
    res.json({
        code: 200,
        tasks: tasks
    });
});
exports.detail = detail;
const changeStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const status = req.body.status;
    yield task_model_1.default.updateOne({
        _id: id
    }, {
        status: status
    });
    res.json({
        code: 200,
        message: "Cập nhật trạng thái thành công"
    });
});
exports.changeStatus = changeStatus;
const changeMulti = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { ids, key, value } = req.body;
    switch (key) {
        case "status":
            yield task_model_1.default.updateMany({
                _id: { $in: ids }
            }, {
                status: value
            });
            res.json({
                code: 200,
                message: "Cập nhật trạng thái thành công"
            });
            break;
        case "delete":
            yield task_model_1.default.updateMany({
                _id: { $in: ids }
            }, {
                deleted: true,
                deletedAt: new Date()
            });
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
});
exports.changeMulti = changeMulti;
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const task = new task_model_1.default(req.body);
    const data = yield task.save();
    res.json({
        code: 200,
        message: "Tao thành công",
        data: data
    });
});
exports.createPost = createPost;
const edit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    yield task_model_1.default.updateOne({ _id: id }, req.body);
    res.json({
        code: 200,
        message: "Cập nhật thành công"
    });
});
exports.edit = edit;
const deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    yield task_model_1.default.updateOne({ _id: id }, {
        deleted: true,
        deletedAt: new Date()
    });
    res.json({
        code: 200,
        message: "Xóa thành công"
    });
});
exports.deleteTask = deleteTask;
