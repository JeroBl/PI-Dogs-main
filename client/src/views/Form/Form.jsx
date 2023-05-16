import { useState } from "react";
import axios from 'axios';
import style from "./Form.module.css"

const Form = () => {

    const [form, setForm] = useState({
        name: "",
        minHeight: "",
        maxHeight: "",
        minWeight: "",
        maxWeight: "",
        life_span: "",
        temperaments: "",
        image: "",
    })

    const [errors, setErrors] = useState({
        name: "",
        minHeight: "",
        maxHeight: "",
        minWeight: "",
        maxWeight: "",
        life_span: "",
        temperaments: "",
        image: "",  
    })

    const changeHandler = (event) => {
        const property = event.target.name;
        const value = event.target.value;

        validate({...form, [property]:value})
        setForm({...form, [property]:value})
        
    }

    const validate = (form) => {
        if(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/.test(form.name)){
            setErrors({...errors, name:""})
        }else{
            setErrors({...errors, name:"Hay un error en el nombre"})
        }
        if(form.name==="") setErrors({...errors, name:"Campo obligatorio"})
    }

    const submitHandler = (event) => {
        event.preventDefault()
        axios.post("http://localhost:3001/dogs", form)
        .then(res=>alert(res))
        .catch(err=>alert(err))
    }

    return(
        <form onSubmit={submitHandler} className="form-container">
            <div className="form-field">
                <label>Nombre: </label>
                <input type="text" value={form.name} onChange={changeHandler} name="name" className="form-input"/>
                {errors.name && <span>{errors.name}</span>}
            </div>

            <div>
                <label>Altura: </label>
            <div className={style.inlineFields}>
                <input type="text" value={form.minHeight} onChange={changeHandler} name="minHeight" className={style.formInput} />
                <input type="text" value={form.maxHeight} onChange={changeHandler} name="maxHeight" className={style.formInput} />
             </div>
            </div>

            <div>
                <label>Peso: </label>
                <div className={style.inlineFields}>
                <input type="text" value={form.minWeight} onChange={changeHandler} name="minWeight" className={style.formInput} />
                <input type="text" value={form.maxWeight} onChange={changeHandler} name="maxWeight" className={style.formInput} />
                </div>
            </div>

            <div>
                <label>Años de vida: </label>
                <input type="text" value={form.life_span} onChange={changeHandler} name="life_span" className="form-input"/>
            </div>

            <div>
                <label>Temperamentos: </label>
                <input type="text" value={form.temperaments} onChange={changeHandler} name="temperaments" className="form-input"/>
            </div>

            <div>
                <label>Imagen: </label>
                <input type="text" value={form.image} onChange={changeHandler} name="image" className="form-input"/>
            </div>
            <button type="submit" className="form-button">CREAR</button>
            
        </form>
    )
}

export default Form;