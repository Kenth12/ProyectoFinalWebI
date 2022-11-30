import React,{useState,useEffect} from "react";
import {db} from '../Firebase';
import {collection , doc , addDoc, onSnapshot, deleteDoc, updateDoc } from "firebase/firestore";


const Formulario = () => {
    const[Elemento, setElemento] = useState('');
    const[Apellido, setApellido] = useState('');
    const[Numero, setNumero] = useState('');
    const[Descripcion, setDescripcion] = useState('');
    const[Pais, setPais] = useState('');
    const[Cedula, setCedula] = useState('');
    const[Edad, setEdad] = useState('');
    const Image = ('https://picsum.photos/40');
    const[id, setId] = useState(0);
    const[Edicion, setEdicion] = useState(false);
    const[Lista, setLista] = useState([]);

    
    useEffect(()=>{
       const obtenerDatos = async () =>{
        try {
            await onSnapshot(collection(db,'Elemento'), (query)=>{
                setLista(query.docs.map((doc) => ({...doc.data(), id:doc.id,})));
            });
        } catch (x) {
           console.log(x);
        }
       }
       obtenerDatos();
       //console.log(Lista);
    },[]);

   

    const guardarElement = async (e) =>  {
        e.preventDefault();
       //const Image='https://picsum.photos/40'; 
        try {
            const data = await addDoc(collection(db,'Elemento'),{
                nombreElemento: Elemento,
                nombreApellido: Apellido,
                nombreDescripcion: Descripcion,
                numeroCedula: Cedula,
                numeroEdad: Edad,
                numeroCelular: Numero,
                nombrePais: Pais,     
            })
            setLista(
                [...Lista, {
                    nombreElemento: Elemento,
                    nombreApellido: Apellido,
                    nombreDescripcion: Descripcion,   
                    numeroCedula: Cedula,
                    numeroEdad: Edad,
                    numeroCelular: Numero,
                    nombrePais: Pais,
                    id: data.id,
                    img: Image,
                }]
            );
            setElemento('');
            setDescripcion('');
            setApellido('');
            setPais('');
            setCedula('');
            setNumero('');
            setEdad('');
        } catch (error) {
            console.log(error);
        }
        //console.log(Elemento);
    }

    const Eliminar = async id =>{
        try {
            await deleteDoc(doc(db,'Elemento',id));
        } catch (error) {
            console.log(error);
        }

    }

    


    return (
        <div className=" container mt-5">
            <h1 className="text-center">Crud Desarrollo</h1>
            <hr />
            <div className="row">
                <div className="col-8">
                    <h4 className="text-center">Listado Elementos</h4>
                    <ul className="list-group">
                        {
                            Lista.map(item => (
                                <li className="list-group-item" key={item.id}>
                                    <span className="lead font-size:2px"><img src={item.img}/> {item.nombreElemento} - {item.nombreApellido} 
                                    - {item.numeroCelular} - {item.numeroCedula} - {item.numeroEdad} - {item.nombrePais} -  {item.nombreDescripcion} </span>
                                    <button className="btn btn-danger btn-sm float-end mx-2" onClick={()=>Eliminar(item.id)}>Eliminar</button>
                                    <button className="btn btn-warning btn-sm float-end" onClick=''/*{()=> Editar(item)}*/>Editar</button>
                                </li>

                            ))
                        }
                    </ul>
                </div>
            <div className=" container col-4">
                <h4 className="text-center"> { Edicion ? 'Edicion Elemento':'Agregar Elemento'}</h4>
                <form onSubmit={ /*Edicion ? EditarElemento :*/  guardarElement}>
                    
                    <input type="text" className="form-control mb-2" placeholder="Ingrese Nombre Persona" required pattern="[a-zA-Z]+"  value={Elemento} onChange={(e)=>setElemento(e.target.value)}/>
                    <input type="text" className="form-control mb-2" placeholder="Ingrese Apellido Persona" required pattern="[a-zA-Z]+" value={Apellido} onChange={(e)=>setApellido(e.target.value)}/>
                    <input type="number" className="form-control mb-2" placeholder="Ingrese Numero Celular" ondrop="return false;" onpaste="return false;"
                        onkeypress="return event.charCode>=48 && event.charCode<=57" required value={Numero} onChange={(e)=>setNumero(e.target.value)}/>
                    <input type="number" className="form-control mb-2" placeholder="Ingrese Numero Cedula" ondrop="return false;" onpaste="return false;"
                        onkeypress="return event.charCode>=48 && event.charCode<=57" required value={Cedula} onChange={(e)=>setCedula(e.target.value)}/>
                    <input type="number" className="form-control mb-2" placeholder="Ingrese Edad Persona" ondrop="return false;" onpaste="return false;"
                        onkeypress="return event.charCode>=48 && event.charCode<=57" required value={Edad} onChange={(e)=>setEdad(e.target.value)}/>
                    <input type="text" className="form-control mb-2" placeholder="Ingrese Pais Origen" required pattern="[a-zA-Z]+" value={Pais} onChange={(e)=>setPais(e.target.value)}/>
                    <input type="text" className="form-control mb-2" placeholder="Ingrese Descripcion Persona" pattern="[a-zA-Z]+" required value={Descripcion} onChange={(e)=>setDescripcion(e.target.value)}/>
                    {
                        Edicion ?
                        (
                            <>
                           
                                <button className="btn btn-warning btn-block" on="submit">Editar</button>
                                <button className="btn btn-dark btn-block mx-2" onClick=''/*{()=>Cancelar()}*/>Cancelar</button>
                            
                            </>
                        )
                        :
                        
                            <button className="btn btn-primary btn-block" on="submit">Agregar</button>
                        
                        
                    }
                </form>
                </div>
            </div>
        </div>
    )
}

export default Formulario;