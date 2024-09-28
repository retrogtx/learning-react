interface MainProps {
    data: {
        hdurl: string;
        title?: string;
    };
}

export default function Main({ data }: MainProps) {
    console.log('Main component data:', data)

    return (
        <div className="imgContainer" style={{ border: '2px solid red' }}>
            <img 
                src={data.hdurl} 
                alt={data.title || 'NASA Astronomy Picture of the Day'} 
                className="bgImage" 
                onError={(e) => console.error('Image failed to load:', e)}
            />
        </div>
    )
}