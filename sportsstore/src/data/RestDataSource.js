import Axios from "axios";
import { RestUrls } from "./Urls";

export class RestDataSource {

    GetData = (dataType) => {
        console.log("data type in RestDataSource is: ", dataType);
        console.log("URL in dataType is ", RestUrls[dataType]);
        return this.SendRequest("get", RestUrls[dataType]);
    }
    SendRequest = (method, url) => Axios.request({ method, url});
    
}