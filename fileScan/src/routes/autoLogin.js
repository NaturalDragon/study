
import config from "../utils/config";


function Index(){
    window.localStorage.setItem(config.pkey, "woyufent");
    return <div>成功</div>
}
export default Index;