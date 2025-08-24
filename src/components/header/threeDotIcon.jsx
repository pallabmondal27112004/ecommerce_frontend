import React, { useState, useRef, useEffect } from "react";
import Dropdown from "react-bootstrap/Dropdown";

const CustomDropdown = ({ component = [], action = [] }) => {
    const [show, setShow] = useState(false);
    const dropdownRef = useRef(null);

    // Close dropdown if clicked outside
    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setShow(false);
        }
    };

    useEffect(() => {
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    return (
        <div
            ref={dropdownRef}
            className="d-inline-block"
            onMouseEnter={() => setShow(true)}
            onMouseLeave={() => setShow(false)}
        >
            {/* Hoverable area */}
            <div className="custom-dropdown-trigger px-2 cursor-pointer">
                {Array.isArray(component) ? (
                    component.map((e, index) => (
                        <div className="  link-115 p-0 d-flex justify-content-center align-items-center" key={index}>
                            <p className="px-2 fs-5 mb-3 cursor-pointer text-white">{e.icon}</p>
                            <p className="  p-0  cursor-pointer responsive-text text-white">{e.text}</p>
                        </div>
                    ))
                ) : (
                    <p>
                        {component.icon} {component.text}
                    </p>
                )}
            </div>


            {/* Dropdown Menu */}
            <Dropdown show={show}>
                <Dropdown.Menu className="custom-dropdown">
                    {action.map((e, index) => (
                        <Dropdown.Item key={index} href={e.link || ""}>
                            {e.icon} {e.text}
                        </Dropdown.Item>
                    ))}
                </Dropdown.Menu>
            </Dropdown>
        </div>
    );
};

export default CustomDropdown;
