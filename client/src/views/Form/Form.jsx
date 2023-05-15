import { useState } from "react";
import axios from 'axios';

const Form = () => {

    const [form, setForm] = useState({
        name: "",
        height: "",
        weight: "",
        life_span: "",
        temperaments: "",
        image: "",
    })

    const [errors, setErrors] = useState({
        name: "",
        height: "",
        weight: "",
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
        <form onSubmit={submitHandler}>
            <div>
                <label>Nombre: </label>
                <input type="text" value={form.name} onChange={changeHandler} name="name" />
                {errors.name && <span>{errors.name}</span>}
            </div>

            <div>
                <label>Altura: </label>
                <input type="text" value={form.height} onChange={changeHandler} name="height" />
            </div>

            <div>
                <label>Peso: </label>
                <input type="text" value={form.weight} onChange={changeHandler} name="weight" />
            </div>

            <div>
                <label>Años de vida: </label>
                <input type="text" value={form.life_span} onChange={changeHandler} name="life_span" />
            </div>

            <div>
                <label>Temperamentos: </label>
                <input type="text" value={form.temperaments} onChange={changeHandler} name="temperaments" />
            </div>

            <div>
                <label>Imagen: </label>
                <input type="text" value={form.image} onChange={changeHandler} name="image" />
            </div>
            <button type="submit">CREAR</button>
            
        </form>
    )
}

export default Form;