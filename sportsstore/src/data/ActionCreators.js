import { ActionTypes } from "./Types";
// import { data as phData } from "./placeHolderData";
import { RestDataSource } from "./RestDataSource";

const dataSource = new RestDataSource();

export const loadData = (dataType) => ({
    type: ActionTypes.DATA_LOAD,
    payload: dataSource.GetData(dataType)
        .then(response => ({ dataType, data: response.data}))
})