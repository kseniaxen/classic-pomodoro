export default function Background() {
    return (
        <div className="fixed inset-0 -z-10">
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                    backgroundImage: "url('/images/background.jpg')",
                }}
            />
            <div className="absolute inset-0 bg-black/50" />
        </div>
    );
}