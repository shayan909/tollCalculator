import React, { useEffect, useState } from "react";
import '../App.css';
import Receipt from './Receipt';
import Constants from '../constants/Constants'
import http from '../services/http'
import CalculateTollPrice from '../services/calculator'

function ExitToll({ prevStep }) {
    const [interchange, setInterchange] = useState('');
    const [numberPlate, setNumberPlate] = useState("");
    const [date, setDate] = useState("");
    const [tollData, setTollData] = useState([]);

    const [distanceCost, setDistanceCost] = useState(0);
    const [subTotal, setSubTotal] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [totalCostTrip, settotalCostTrip] = useState(0);




    const [isMousedOver, setMouseOver] = useState(false);



    useEffect(() => {
        http.get('/',
            function (response) {
                console.log(response);
                setTollData(response);
            },
            function (error) {
                console.log(error)
            }
        );
    }, [])


    function handle_interChange() {
        setInterchange(document.getElementById("demo-simple-select").value);
    }
    function handleMouseOver() {
        setMouseOver(!isMousedOver);
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        const carData = tollData.find(
            (item) => item.tripStatus === "Active" && item.numberPlate === numberPlate
        );
        let entryDateTime = carData.entryDateTime.split("T")
        let calculation = CalculateTollPrice(carData.entryInterchange, interchange, numberPlate, entryDateTime[0])
        const exitObject = {
            ...carData,
            "exitInterchange": interchange,
            "exitDateTime": date + "Z",
            "tripStatus": "Completed",
            "distanceCost": carData.entryInterchange + interchange,
            "discountedPrice": calculation[0],
            "discount": calculation[2],
            "totalCostTrip": calculation[1],
        }
        console.log("Form Data", exitObject);
        setDistanceCost(carData.entryInterchange + interchange)
        setSubTotal(calculation[0])
        setDiscount(calculation[2])
        settotalCostTrip(calculation[1])

        // try {
        //     const result = await http.put('/ID', exitObject);
        //     if (result.status === 200 || result.status === 204) {
        //         alert('Success', 'Post has been Sent')
        //     }
        // } catch (ex) {
        //     alert('Error', 'Something went wrong');
        // }

    }

    return (

        <div className="container">

            <h1>Exit</h1>

            <form onSubmit={onSubmit}>
                <select
                    style={{
                        marginBottom: "10px",
                        height: "50px",
                        width: "100%",
                        borderColor: "lightgrey",
                        borderRadius: "5px",
                        backgroundColor: "rgba(252, 252, 252, 0.2)"

                    }}
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
                    id="numberPlate"
                // value={name}
                />        <input
                    onChange={(e) => setDate(e.target.value)}
                    type="datetime-local"
                    step="0.001"
                    placeholder="Date"

                />
                <button
                    style={{ backgroundColor: isMousedOver ? "Yellow" : "white" }}
                    type="submit"
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOver}
                    onClick={(e) => onSubmit(e)}

                >
                    Calculate
                </button>
            </form>

            <button
                style={{ backgroundColor: "Red" }}
                onMouseOver={handleMouseOver}
                onMouseOut={handleMouseOver}
                onClick={() => prevStep()}
            >Go Back</button>
            <Receipt
                base={Constants.BASE_RATE}
                distanceCost={distanceCost}
                subTotal={subTotal}
                discount={discount}
                totalCostTrip={totalCostTrip}
            />
        </div>
    );
}

export default ExitToll;