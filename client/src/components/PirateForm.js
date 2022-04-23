import React from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";

const Pirateform = (props) => {

    const {onSubmitProp} = props;

    return (
        <div>
          <Formik
    
            initialValues={{
              name: "",
              image:"",
              treasures:"",
              frase:"",
              role:"Powder Monkey",
              skill1: true,
              skill2: true,
              skill3: true,
            }}
    
            validationSchema={Yup.object().shape({
                name: Yup.string()
                .required("Por favor ingresa un nombre"),
                image: Yup.string()
                .required("Imagen Obligatoria"),
                treasures: Yup.number()
                .required("Se requieren los tesoros"),
                frase: Yup.string()
                .required("Frase del pirata obligatoria"),
                role: Yup.string()
                .required("Se necesita un mando"),
                skill1: Yup.bool(),
                skill2: Yup.bool(),
                skill3: Yup.bool(),
            })}
    
            onSubmit={(values,{setSubmitting})=>{
                onSubmitProp(values);
            }}
    
          >
               {({errors,
                touched,
                handleSubmit})=>{
    
                    return (
                        <div className="container text-start">
                            <Form onSubmit={handleSubmit}>
                                <div className="row">
                                    <div className="d-inline-block col-4">
                                        <label htmlFor='name' className="m-2">Pirate Name</label>
                                        <Field id="name" type="text" placeholder="Nombre" name="name" className="form-control w-50 m-2" />
                                        {errors.name && touched.name && <p className='error'>{errors.name} </p>}
            
                                        <label htmlFor='image' className="m-2">Imagen URL</label>
                                        <Field id="image" type="text" placeholder="url" name="image" className="form-control w-50 m-2" />
                                        {errors.image && touched.image && <p className='error'>{errors.image} </p>}
            
                                        <label htmlFor='treasures' className="m-2"># of Treasures Chest:</label>
                                        <Field id="treasures" type="number" placeholder="Tesoros" name="treasures" className="form-control w-50 m-2" />
                                        {errors.treasures && touched.treasures && <p className='error'>{errors.treasures} </p>}
            
                                        <label htmlFor='frase' className="m-2">Pirate Catch Phrase</label>
                                        <Field  id="frase" type="text" placeholder="Arg arg" name="frase" className="form-control w-50 m-2" />
                                        {errors.frase && touched.frase && <p className='error'>{errors.frase} </p>}<br></br>
        
                                    </div>
                                    <div className="d-inline-block col-4 offset-md-4">
                                        <label htmlFor="role" className="m-2" >Crew Position: </label> <br></br>
                                        <Field  id='role' type="text" as='select' name='role' className="m-2">
                                            <option value="Captain">Captain</option>
                                            <option value="First Male">First Male</option>
                                            <option value="Boatswain">Boatswain</option>
                                            <option value="Powder Monkey">Powder Monkey</option>
                                        </Field>
                                        <br></br>
            
                                        <br></br>
                                        <Field className="m-2" id="skill1" type="checkbox" name="skill1" />
                                        <label  htmlFor='skill1'>Peg leg</label> <br></br>
                                        {errors.skill1 && touched.skill1 && <p className='error'>{errors.skill1} </p>}
            
                                        <Field className="m-2" id="skill2" type="checkbox" name="skill2"  />
                                        <label htmlFor='skill2'>Eye Patch</label> <br></br>
                                        {errors.skill2 && touched.skill2 && <p className='error'>{errors.skill2} </p>}
            
                                        <Field className="m-2" id="skill3" type="checkbox" name="skill3" />
                                        <label htmlFor='skill1'>Hook Hand</label>
                                        {errors.skill3 && touched.skill3 && <p className='error'>{errors.skill3} </p>}                         
                                        <br></br>
                                        <button type="submit" disabled={Object.values(errors).length>0} className="btn btn-primary rounded-pill border border-dark m-3">Add Pirate</button>
                                    </div>
                                </div>
                                
                            </Form>
                        </div>
                    )
    
                }}
    
          </Formik>
        </div>
      );
    };

export default Pirateform;
