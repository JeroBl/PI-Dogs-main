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

    const validate =  (form) => {
  //FALTA VALIDAR
    }

    const submitHandler = (event) => {
        event.preventDefault();

        // Combina los valores de altura y peso en un solo campo
        const height = `${form.minHeight}-${form.maxHeight}`;
        const weight = `${form.minWeight}-${form.maxWeight}`;

        // Crea una nueva versión del formulario con los campos combinados
        const newForm = {
            ...form,
            height: height,
            weight: weight
        };

        axios.post("http://localhost:3001/dogs", newForm)
            .then(res => {
                console.log(res.data);
                // Restablecer los valores del formulario a su estado inicial
                setForm({
                    name: "",
                    minHeight: "",
                    maxHeight: "",
                    minWeight: "",
                    maxWeight: "",
                    life_span: "",
                    temperaments: "",
                    image: "",
                });
            })
            .catch(err => console.log(err));
    };

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
                    <input type="text" value={form.minHeight} onChange={changeHandler} name="minHeight" className={style.formInput}  />
                    <input type="text" value={form.maxHeight} onChange={changeHandler} name="maxHeight" className={style.formInput}  />
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
                <input type="text" value={form.life_span} onChange={changeHandler} name="life_span" className="form-input" placeholder="valores dividos por (-)"/>
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


