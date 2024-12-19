import React, { useState } from "react";
import useAxiosPrivate from "../hooks/axiosPrivate";
import usePat from "../hooks/usePat";

export const Prescadd = () => {
    const [supplements, setsupplements] = useState([]);
    const [search, setsearch] = useState([]);
    const [Response, setResponse] = useState([]);
    const axiosprivate = useAxiosPrivate();
    const { pat } = usePat();
    console.log(pat);

    const [prescData, setPrescData] = useState({
        id: pat._id,
        PrescName: '',
        Note: '',
        Quantity: '',
        Dosage: '',
        Units: 'mg', // default value for the unit
        Schedule: {
            Monday: '',
            Tuesday: '',
            Thursday: '',
            Friday: '',
            Saturday: '',
            Sunday: ''
        }
    });

    const searchbar = (event) => {
        setsearch(event.target.value);
    }

    async function addPresc(e) {
        e.preventDefault();
        console.log(prescData);  // Logs the current form data for submission
        try {
            await axiosprivate.post("http://localhost:8000/supplement", { prescData }).then(resp => { 
                console.log(resp.data);
                setResponse(resp.data)
             })
        } catch (e) {
            console.log(e)
        }
    }

    const handlePrescChange = (e) => {
        const { name, value } = e.target;
        if (name in prescData.Schedule) {
            // If the input is related to the schedule (time fields)
            setPrescData(prevData => ({
                ...prevData,
                Schedule: {
                    ...prevData.Schedule,
                    [name]: value
                }
            }));
        } else {
            // Otherwise, update the general prescription data
            setPrescData(prevData => ({
                ...prevData,
                [name]: value
            }));
        }
    }

    return (
        <div>
            <h1>Prescription Information</h1>
            <form onSubmit={addPresc}>
                Name: <input type="text" name="PrescName" value={prescData.PrescName} onChange={handlePrescChange} /> <br />
                Note: <input type="text" name="Note" value={prescData.Note} onChange={handlePrescChange} /> <br />
                Quantity: <input type="number" name="Quantity" value={prescData.Quantity} onChange={handlePrescChange} /> <br />
                Dosage: <input type="number" name="Dosage" value={prescData.Dosage} onChange={handlePrescChange} /> <br />
                Units: <select name="Units" value={prescData.Units} onChange={handlePrescChange}>
                    <option value="mg">mg</option>
                    <option value="g">g</option>
                    <option value="ug">ug</option>
                    <option value="ng">ng</option>
                    <option value="kg">kg</option>
                    <option value="ml">L</option>
                    <option value="ul">ul</option>
                    <option value="cc">cc</option>
                    <option value="fl">oz</option>
                </select> <br />
                <p className="text-green-500">{Response}</p>
                <button type="submit" className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-500 transition-colors duration-300 ease-in-out">
                    Submit
                </button>
            </form>

            {(typeof supplements === 'undefined') ? (
                <p>loading...</p>) : (
                supplements.map((item, i) =>
                    // URL, DSLD ID, Product Name, Brand Name, Bar Code, Net Contents, Serving Size, Product Type [LanguaL], Supplement Form [LanguaL], Date Entered into DSLD, Market Status, Suggested Use
                    <p key={i}>{item['DSLD']} {item['Product Name']} {item['Brand Name']}</p>
                )
            )}
        </div>
    );
};

export default Prescadd;

