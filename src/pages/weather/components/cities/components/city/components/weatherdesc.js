import Clouds from "../../../../../../../assets/img/clouds.png";
import ClearSky from "../../../../../../../assets/img/clear sky.png";
import LightRain from "../../../../../../../assets/img/lightrain.png";
import BrokenClouds from "../../../../../../../assets/img/broken-clouds.png";

import "./weatherdesc.css"
function Weatherdesc(props){

    if (props.desc == "few clouds"){
        var ico = Clouds;
    } else if (props.desc == "clear sky"){
        var ico = ClearSky;
    } else if (props.desc == "light rain"){
        var ico = LightRain;
    } else{
        var ico = BrokenClouds;
    }



    return(
        <div className="d-flex justify-content-md-center">
            <img className="des-ico" src={ico}/>
            <p className="no-bot-mar">{props.desc}</p>
        </div>
    )
}

export default Weatherdesc;