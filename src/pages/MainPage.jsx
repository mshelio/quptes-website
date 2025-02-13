import { Wheel } from "react-custom-roulette";
import { useState } from "react";
import '../styles/main-page-style.css';
import quotesData from '../data/Quotes.json'; // Import your JSON file

const data = [
    //{ option: 'Faith and Christianity', style: { backgroundColor: '#ADD8E6', textColor: '#000' } },
    //{ option: 'Wisdom and Life Lessons', style: { backgroundColor: '#E6E6FA', textColor: '#000' } },
    { option: 'Love and Relationships', style: { backgroundColor: '#FFDAB9', textColor: '#000' } },
    //{ option: 'Courage and Perseverance', style: { backgroundColor: '#FFB6C1', textColor: '#000' } },
    //{ option: 'Gratitude and Positivity', style: { backgroundColor: '#FFFACD', textColor: '#000' } },
    { option: 'Reasons Why I Love You', style: { backgroundColor: '#98FB98', textColor: '#000' } },
];

export const MainPage = () => {
    const [mustSpin, setMustSpin] = useState(false);
    const [prizeNumber, setPrizeNumber] = useState(0);
    const [quote, setQuote] = useState('');
    const [author, setAuthor] = useState('');

    // Make a copy of the quotes so you don't mutate the original data
    const quotes = [...quotesData];

    const handleSpinClick = () => {
        if (!mustSpin) {
            const newPrizeNumber = Math.floor(Math.random() * data.length);
            setPrizeNumber(newPrizeNumber);
            setMustSpin(true);
        }
    };

    const getRandomQuote = (category) => {
        // Filter quotes by selected category and pick only those with Status 0
        const categoryQuotes = quotes.filter(q => q.Category === category && q.Status === 0);

        if (categoryQuotes.length === 0) {
            return { sentence: "No more new quotes available.", source: "" }; // No more new quotes in this category
        }

        // Get a random quote from the filtered category
        const randomQuote = categoryQuotes[Math.floor(Math.random() * categoryQuotes.length)];

        // Mark the quote as picked by changing its status to 1
        const quoteIndex = quotes.findIndex(q => q.Sentence === randomQuote.Sentence);
        if (quoteIndex !== -1) {
            quotes[quoteIndex].Status = 1; // Change the status to 1
        }

        return { sentence: randomQuote.Sentence, source: randomQuote.Source };
    };

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
                radiusLineWidth={2}
                fontSize={15}
                onStopSpinning={() => {
                    setMustSpin(false);
                    // Set a random quote after the wheel stops spinning
                    const selectedQuote = getRandomQuote(data[prizeNumber].option);
                    setQuote(selectedQuote.sentence);
                    setAuthor(selectedQuote.source);
                }}
            />

            <button
                onClick={handleSpinClick}
                style={{
                    backgroundColor: '#FFB6C1',
                    color: '#fff',
                    border: 'none',
                    padding: '10px 20px',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    fontSize: '16px',
                    transition: '0.3s',
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = '#FF69B4'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#FFB6C1'}
            >
                SPIN
            </button>

            {quote && (
                <div
                    className="quote-display"
                    style={{
                        marginTop: '20px',
                        fontStyle: 'italic',
                        textAlign: 'center',
                        backgroundColor: '#f0f8ff', // Light blue background for the quote
                        padding: '20px',
                        borderRadius: '10px',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    }}
                >
                    <p style={{ fontSize: '18px', color: '#333' }}>{quote}</p>
                    {author && <p style={{ fontSize: '16px', fontWeight: 'bold', marginTop: '10px', color: '#666' }}>- {author}</p>}
                </div>
            )}
        </div>
    );
};
