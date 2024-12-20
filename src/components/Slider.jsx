import { useState } from "react";

const Slider = ({ defaultValue, min, max, className, onValueChange }) => {
    const [value, setValue] = useState(defaultValue);

    const handleChange = (e) => {
        const newValue = e.target.value;
        setValue(newValue);
        onValueChange([newValue]);
    };

    return (
        <input
            type="range"
            min={min}
            max={max}
            value={value}
            onChange={handleChange}
            className={`slider ${className}`}
            style={{
                appearance: "none",
                width: "120px",
                height: "3px",
                background: "white",
                borderRadius: "5px",
                outline: "none",
                cursor: "pointer",
            }}
        />
    );
};

export default Slider;
