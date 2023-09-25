import React, { useState } from "react";
import Modal from "../../../components/UI/modal/Modal";
import Select from "react-select";
function ModalWhy({ onClose, data, selectedData }) {
    const [selectedOption, setSelectedOption] = useState(null);
    const formattedOptions = data?.map((option) => ({
        value: option.id,
        label: option.firstName + option.lastName + " -" + option.role,
    }));

    const handleChange = (selectedOption) => {
        setSelectedOption(selectedOption);
        console.log(`Option selected:`, selectedOption);
        selectedData(selectedOption);
    };
    return (
        <div>
            <Modal title='Для кого ' onClose={onClose}>
                <div style={{ marginBottom: "30%" }}>
                    <h5>Причина</h5>
                    <Select
                        options={formattedOptions}
                        styles={{
                            menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                        }}
                        onChange={handleChange}
                    />
                </div>
            </Modal>
        </div>
    );
}

export default ModalWhy;
