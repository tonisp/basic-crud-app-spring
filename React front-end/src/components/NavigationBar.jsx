import React from 'react'
import { Link } from "react-router-dom"

function NavigationBar() {
    return (
        <div>

      <Link to="">
      <button className="button">Home</button>
      </Link>
      <Link to="countries">
      <button className="button">Countries</button>
      </Link>

        </div>
    )
}

export default NavigationBar
