import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { useState } from 'react';
import { BiHide, BiShow } from 'react-icons/bi';
import style from './CustomField.module.scss';

const cx = classNames.bind(style);

function InputField({ field, form, type = 'text', label = '', placeholder = '', disable = false }) {
    const [inputType, setInputType] = useState(type);

    const { name } = field;
    const { errors, touched } = form;
    const showError = errors[name] && touched[name];

    const showPassword = () => {
        setInputType('text');
    };

    const hidePassword = () => {
        setInputType('password');
    };

    return (
        <div className={cx('wrapper')}>
            {label && (
                <label className={cx('label')} htmlFor={name}>
                    {label}
                </label>
            )}
            <input
                id={name}
                className={cx('input', { error: showError })}
                {...field}
                type={inputType}
                placeholder={placeholder}
                disabled={disable}
            />
            {type === 'password' &&
                (inputType === 'password' ? (
                    <button className={cx('show-btn')} type="button" onClick={showPassword}>
                        <BiShow /> Show
                    </button>
                ) : (
                    <button className={cx('show-btn')} type="button" onClick={hidePassword}>
                        <BiHide /> Hide
                    </button>
                ))}

            {showError && <p className={cx('error-message')}>{errors[name]}</p>}
        </div>
    );
}

InputField.propTypes = {
    field: PropTypes.object.isRequired,
    type: PropTypes.string,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    disable: PropTypes.bool,
};

export default InputField;
