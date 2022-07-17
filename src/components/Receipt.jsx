import React from 'react'
import '../App.css'

export default function Receipt({ 
    base, distanceCost, subTotal, discount, totalCostTrip }) {
    return (
        //html table
        <div >
            <h4 style={{ color: 'black', marginBottom: "1%" }}>Break Down of Cost</h4>
            <table>
            
                <tbody>
                    <tr>
                        <th scope="row">#</th>
                        <td>Base Rate</td>
                        <td>Distance Cost Breakdown</td>
                        <td>Sub-Total</td>
                        <td>Discount/Other</td>
                        <td>TOTAL TO BE CHARGED</td>
                    </tr>
                    <tr>
                        <th scope="row">#</th>
                        <td>{base}</td>
                        <td>{distanceCost}</td>
                        <td>{subTotal}</td>
                        <td>{discount}</td>
                        <td>{totalCostTrip}</td>
                    </tr>
                </tbody>
            </table>
        </div>

    )
}
