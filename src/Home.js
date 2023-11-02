import React from 'react'
import './Home.css'
import ProjectList from './ProjectList'

function Home() {
    return (
        <div className="home">
            <div className="home_container">
                <img className="home_image" alt="" src="./images/fnaf.jpg" />
                
                <div className="home_row">
                    <ProjectList/>   
                </div>
            </div>
            
            
        </div>
    )
}
               // <img className="home_image" alt="" src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg" />

export default Home
