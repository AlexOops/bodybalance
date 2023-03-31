import s from "./Select.module.scss";
import "../../../index.scss";
import {useState} from "react";

const Select = () => {
    const options = [
        {value: "Выберите тему:"},
        {value: "Обратная связь"},
        {value: "Определиться с услугой"},
        {value: "Консультация"},
    ];

    const [open, setOpen] = useState(false);

    const [value, setValue] = useState(String);

    const onElementClicked = (item) => {
        const option = item.toString();
        setValue(option);
    }

    const onSelected = () => {
        setOpen((prevOpen) => !prevOpen);
    }

    return (
        <div className={s.selectWrapper}>
            <div onClick={() => onSelected()}    //переделать
                 className={s.select}>{value ? value : "Выберите тему:"}</div>
            {
                open &&
                <div className={s.option}>
                    {
                        options.map((item, idx) => {
                            return <div onClick={() => {
                                        onElementClicked(item.value)
                                        onSelected()    // переделать
                                        }}
                                        key={idx}
                                        className={s.optionItem}>{item.value}</div>
                        })
                    }
                </div>
            }
        </div>
    );
};

export default Select;