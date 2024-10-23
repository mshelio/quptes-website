import { Wheel } from "react-custom-roulette";
import { useState } from "react";
import '../styles/main-page-style.css'

const data = [
    { option: 'Faith and Christianity', style: { backgroundColor: '#ADD8E6', textColor: '#000' } },
    { option: 'Wisdom and Life Lessons', style: { backgroundColor: '#E6E6FA', textColor: '#000' } },
    { option: 'Love and Relationships', style: { backgroundColor: '#FFDAB9', textColor: '#000' } },
    { option: 'Courage and Perseverance', style: { backgroundColor: '#FFB6C1', textColor: '#000' } },
    { option: 'Gratitude and Positivity', style: { backgroundColor: '#FFFACD', textColor: '#000' } },
    { option: 'Reasons why I love you', style: { backgroundColor: '#98FB98', textColor: '#000' } },
];

export const MainPage = () => {
    const [mustSpin, setMustSpin] = useState(false);
    const [prizeNumber, setPrizeNumber] = useState(0);

    const handleSpinClick = () => {
        if (!mustSpin) {
            const newPrizeNumber = Math.floor(Math.random() * data.length);
            setPrizeNumber(newPrizeNumber);
            setMustSpin(true);
        }
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100vh' }}>
            <h1 className={'greeting'} >HELLO VARVAR ❤️</h1>

            <Wheel
                mustStartSpinning={mustSpin}
                prizeNumber={prizeNumber}
                data={data}
                innerRadius={0}
                outerBorderWidth={2}
                textDistance={52}
                radiusLineWidth={2}    // Adjusts the radius line thickness
                fontSize={15}          // Increases the font size for better readability
                onStopSpinning={() => {
                    setMustSpin(false);
                }}
            />
            <button
                onClick={handleSpinClick}
                style={{
                    backgroundColor: '#FFB6C1',  // Pastel pink background
                    color: '#fff',               // White text
                    border: 'none',              // Remove border
                    padding: '10px 20px',        // Add padding for a better size
                    borderRadius: '10px',        // Rounded corners
                    cursor: 'pointer',           // Pointer cursor on hover
                    fontSize: '16px',            // Font size
                    transition: '0.3s',          // Smooth transition for hover effects
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = '#FF69B4'} // Change color on hover
                onMouseOut={(e) => e.target.style.backgroundColor = '#FFB6C1'}  // Reset color after hover
            >
                SPIN
            </button>

        </div>
    );
}