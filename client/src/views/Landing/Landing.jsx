import {Link} from "react-router-dom";
import style from "./Landing.module.css"

const Landing = () => {

    return(
        <div className={style.container}>
            <div className={style.h1Container}>
            <h1 className={style.h1}>Dogs, el mejor amigo</h1>
            </div>
            <div className={style.divButtons}>
            <Link  to="/home"><button className={style.button}>Ingresar</button></Link>
            </div>
        </div>
    )
}

export default Landing;