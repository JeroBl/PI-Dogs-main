import { useState, useEffect } from "react";
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
    temperaments: [],
    image: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    minHeight: "",
    maxHeight: "",
    minWeight: "",
    maxWeight: "",
    life_span: "",
    temperaments: "",
    image: "",
  });

  const [temperamentList, setTemperamentList] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/temperaments")
      .then(res => {
        setTemperamentList(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  const changeHandler = (event) => {
    const property = event.target.name;
    let value = event.target.value;

    if (property === "temperaments") {
      value = Array.from(event.target.selectedOptions, option => option.value);
    }

    setForm({ ...form, [property]: value });
  };

  const validateField = (fieldName, value) => {
    switch (fieldName) {
      case "name":
        if (!/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/.test(value)) {
          return "Hay un error en el nombre";
        }
        if (value === "") {
          return "Campo obligatorio";
        }
        break;
      case "minHeight":
        if (value === "") {
          return "Campo obligatorio";
        }
        if (!/^\d+$/.test(value)) {
          return "Debe ser un número";
        }
        break;
      case "maxHeight":
        if (value === "") {
          return "Campo obligatorio";
        }
        if (!/^\d+$/.test(value)) {
          return "Debe ser un número";
        }
        if (Number(value) < Number(form.minHeight)) {
          return "Debe ser mayor o igual que la altura mínima";
        }
        break;
      case "minWeight":
        if (value === "") {
          return "Campo obligatorio";
        }
        if (!/^\d+$/.test(value)) {
          return "Debe ser un número";
        }
        break;
      case "maxWeight":
        if (value === "") {
          return "Campo obligatorio";
        }
        if (!/^\d+$/.test(value)) {
          return "Debe ser un número";
        }
        if (Number(value) < Number(form.minWeight)) {
          return "Debe ser mayor o igual que el peso mínimo";
        }
        break;
      case "temperaments":
        if (value.length === 0) {
          return "Debe seleccionar al menos un temperamento";
        }
        break;
      default:
        break;
    }

    return "";
  };

  const blurHandler = (event) => {
    const fieldName = event.target.name;
    const value = event.target.value;
    const errorMessage = validateField(fieldName, value);
    setErrors({ ...errors, [fieldName]: errorMessage });
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const isFormValid = Object.values(errors).every(error => error === "");
    if (!isFormValid) {
      alert("Debe completar todos los campos correctamente antes de crear el perro.");
      return;
    }

    const height = `${form.minHeight}-${form.maxHeight}`;
    const weight = `${form.minWeight}-${form.maxWeight}`;

    const newForm = {
      ...form,
      height: height,
      weight: weight
    };

    axios.post("http://localhost:3001/dogs", newForm)
      .then(res => {
        console.log(res.data);
        setForm({
          name: "",
          minHeight: "",
          maxHeight: "",
          minWeight: "",
          maxWeight: "",
          life_span: "",
          temperaments: [],
          image: "",
        });
        alert("El perro se creó exitosamente.");
      })
      .catch(err => console.log(err));
  };

  return (
    <form onSubmit={submitHandler} className="form-container">
      <div className="form-field">
        <label>Nombre: </label>
        <input type="text" value={form.name} onChange={changeHandler} onBlur={blurHandler} name="name" className="form-input" />
        {errors.name && <span>{errors.name}</span>}
      </div>

      <div className={style.inlineFields}>
        <label>Altura: </label>
        <input type="text" value={form.minHeight} onChange={changeHandler} onBlur={blurHandler} name="minHeight" className={style.formInput} />
        {errors.minHeight && <span>{errors.minHeight}</span>}
        <input type="text" value={form.maxHeight} onChange={changeHandler} onBlur={blurHandler} name="maxHeight" className={style.formInput} />
        {errors.maxHeight && <span>{errors.maxHeight}</span>}
      </div>

      <div className={style.inlineFields}>
        <label>Peso: </label>
        <input type="text" value={form.minWeight} onChange={changeHandler} onBlur={blurHandler} name="minWeight" className={style.formInput} />
        {errors.minWeight && <span>{errors.minWeight}</span>}
        <input type="text" value={form.maxWeight} onChange={changeHandler} onBlur={blurHandler} name="maxWeight" className={style.formInput} />
        {errors.maxWeight && <span>{errors.maxWeight}</span>}
      </div>

      <div>
        <label>Años de vida: </label>
        <input type="text" value={form.life_span} onChange={changeHandler} onBlur={blurHandler} name="life_span" className="form-input" placeholder="valores dividos por (-)" />
      </div>

      <div>
        <label>Temperamentos: </label>
        <select multiple value={form.temperaments} onChange={changeHandler} onBlur={blurHandler} name="temperaments" className="form-input">
          {temperamentList.map((temperament, index) => (
            <option key={index} value={temperament.name}>{temperament.name}</option>
          ))}
        </select>
        {errors.temperaments && <span>{errors.temperaments}</span>}
      </div>

      <div>
        <label>Imagen: </label>
        <input type="text" value={form.image} onChange={changeHandler} onBlur={blurHandler} name="image" className="form-input" />
      </div>

      <button type="submit" className="form-button">CREAR</button>
    </form>
  );
};

export default Form;





