import React, { useState } from "react";
import '../App.css';
import Constants from '../constants/Constants'
import http from '../services/http';

function EntryToll({ nextStep, prevStep }) {
    const [interchange, setInterchange] = useState('');
    const [numberPlate, setNumberPlate] = useState("");
    const [date, setDate] = useState("");

    const [isMousedOver, setMouseOver] = useState(false);

    function handle_interChange() {
        setInterchange(document.getElementById("demo-simple-select").value);
    }

    function handleMouseOver() {
        setMouseOver(!isMousedOver);
    }


    const submitPost = async (e) => {
        const entryObject = {
            "entryInterchange": interchange,
            "numberPlate": numberPlate,
            "entryDateTime": date + "Z",
            "tripStatus": "Active"
        }
        console.log("Form Data", entryObject);

        try {
            const result = await http.post('/', entryObject);
            if (result.status === 201) {
                alert('Success', 'Post has been Sent')
            }
        } catch (ex) {
            alert('Error', 'Something went wrong');
        }
        e.preventDefault();
    }

    return (
        <div className="container">
            <h1>Entry</h1>
            <form onSubmit={submitPost}>
                <select
                    style={{
                        marginBottom: "10px",
                        height: "50px",
                        width: "100%",
                        borderColor: "lightgrey",
                        borderRadius: "5px",
                        backgroundColor: "rgba(252, 252, 252, 0.2)"

                    }}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    defaultValue={0}
                    label="Interchange"
                    onChange={() => handle_interChange()}
                >
                    {Constants.INTERCHANGE.map((option) => (
                        <option value={option.distance}>{option.name}</option>
                    ))}
                </select>
                <input
                    onChange={(e) => setNumberPlate(e.target.value)}
                    type="text"
                    placeholder="Number Plate"
                // value={name}
                />       <input
                    onChange={(e) => setDate(e.target.value)}
                    type="datetime-local"
                    step="0.001"
                    placeholder="Date"
                />
                <button
                    style={{ backgroundColor: "green" }}
                    type="button"
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOver}
                    onClick={(e) => submitPost(e)}
                >
                    Submit
                </button>
            </form>
            <button
                style={{ backgroundColor: "Red" }}
                onMouseOver={handleMouseOver}
                onMouseOut={handleMouseOver}
                onClick={() => prevStep()}
            >Go Back</button>
        </div >
    );
}

export default EntryToll;