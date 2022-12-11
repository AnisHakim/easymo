import React from 'react'
const bg = <svg id="Layer_3" xmlns="http://www.w3.org/2000/svg" width="1920.1" height="502.591" viewBox="0 0 1920.1 502.591">
    <g id="Groupe_1" data-name="Groupe 1">
        <path id="Tracé_1" data-name="Tracé 1" d="M218.1,226.3c117.8,5.2,230.3,30.7,337.5,62.9,3.4,1,6.6,2,10,3,205.2,62.5,411.2,138.3,637.5,181.2,238.5,45.2,484,35.6,716.7-12.9V0H0V247.1A786.035,786.035,0,0,1,218.1,226.3Z" fill="rgba(82,163,255,0.53)" />
        <path id="Tracé_2" data-name="Tracé 2" d="M1919.9,0H0V118.9a702.99,702.99,0,0,1,230.6-16.8c112.3,10.6,216.6,41.6,315.9,78.2,3.1,1.1,6.1,2.3,9.2,3.4C745.8,254.5,939.3,332.8,1156,378.4c252.6,53.2,516.9,42.8,763.9-14.5V0Z" fill="rgba(78,155,255,0.53)" />
        <path id="Tracé_3" data-name="Tracé 3" d="M1919.9,0H597.6c141.7,74.9,292.2,143.5,464.1,188.6,230.1,60.4,480,65.2,714,18.4,49-9.8,97.3-22,144.4-36.4V0Z" fill="rgba(68,140,255,0.53)" />
        <path id="Tracé_4" data-name="Tracé 4" d="M1578.3,63.2c90.4-11,178.7-32.4,260.1-63.2H970.9C1160.1,61.9,1373.6,88.1,1578.3,63.2Z" fill="rgba(55,125,255,0.53)" />
    </g>
</svg>
const StandarAuth = (props) => {
    return (
        <div className='vh-100 w-100 flex justify-center auth-page relative '>
            <div className='absolute bg-img h-32'>
                {bg}
                <div className='white-svg' >
                    {props.svg}
                </div>
            </div>
            <div className='content-auth-page pt-7 w-100'>
                <div className="container-auth ">
                    {props.children}
                </div>
            </div>
        </div>
    )
}

export default StandarAuth
