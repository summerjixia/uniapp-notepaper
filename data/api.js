import { get, post } from "./request"

//记录登录信息
const saveLoginInfo = (param) => post("/saveLoginInfo", param)

//菜单目录
//[{id: "1",name: "笔记",subMenu: [{ id: "1-1", name: "笔记1" },{ id: "1-2", name: "笔记2" }]},{id: "2",name: "废纸篓"},{id: "3",name: "欢迎"}],
const getMenu = (param) => get("/queryCatalogue", param)
//添加新目录
const saveMenu = (param) => post("/saveCatalogue", param)
//更新目录
const updateMenu = (param) => post("/updateCatalogue", param)
//删除目录
const deleteMenu = (param) => get("/deleteCatalogue", param )


//目录下包括子目录笔记
const getNotePaperByAll = (param) => get("/queryList",  param )
//某个子目录下的笔记
const getNotePaperById = (param) => get("/queryListById",  param )
//模糊搜索所有目录下的笔记
const getNotePaperByLike = (param) => get("/queryListByContentLike",  param )
//保存笔记
const saveNotePaper = async (param) => { let result = await post("/saveNoteList", param); console.log(result) }
//更新笔记
const updateNotePaper = async (param) => { let result = await post("/updateNodeList", param); console.log(result) }
//更新是否为置顶
const updateTop = (param) => post("/updateTop", param)
//删除
const deleteNotePaper = (param) => get("/deleteNodeList",  param )

export default{
	saveLoginInfo,
	getMenu,
	saveMenu,
	updateMenu,
	deleteMenu,
	getNotePaperByAll,
	getNotePaperById,
	getNotePaperByLike,
	saveNotePaper,
	updateNotePaper,
	updateTop,
	deleteNotePaper
}