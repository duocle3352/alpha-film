import classNames from 'classnames/bind';
import { Formik, Form, FastField, Field } from 'formik';
import * as Yup from 'yup';

import InputField from '~/custom-field/InputField';
import SelectField from '~/custom-field/SelectField';
import { GENDER_OPTION } from '~/constans';
import { Button } from '~/components/Button';
import style from './Header.module.scss';

const cx = classNames.bind(style);

function RegisterForm() {
    const initialValues = {
        email: '',
        password: '',
        gender: null,
        old: null,
        policy: null,
        picked: '',
    };

    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Please enter a valid e-mail address.').required('This field is request.'),

        password: Yup.string()
            .matches(
                '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$',
                'Minimum 8 characters with at least one uppercase, one lowercase, one special character and a number.',
            )
            .required('This field is request.'),

        gender: Yup.number().required('This field is request.').nullable(),
        old: Yup.array().required('You are too young to register / order.').nullable(),
        policy: Yup.array().required('Invalid value.').nullable(),
        picked: Yup.string().required('Invalid value.'),
    });

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values) => {
                console.log(values);
            }}
        >
            {(formikProps) => {
                const { errors, touched } = formikProps;

                return (
                    <Form>
                        <FastField name="email" component={InputField} label="Email" placeholder="Email*" />

                        <FastField
                            name="password"
                            component={InputField}
                            label="Password"
                            type="password"
                            placeholder="Password*"
                        />

                        <FastField
                            name="gender"
                            component={SelectField}
                            label="Gender"
                            placeholder="Gender*"
                            options={GENDER_OPTION}
                        />

                        <div className={cx('checkbox-group')}>
                            <label className={cx('checkbox-label')}>
                                <Field type="checkbox" name="old" value="yes" />
                                <div>
                                    <p className={cx('checkbox-description')}>Yes, I am 16+ years old.</p>
                                    {errors.old && touched.old && <p className={cx('error-message')}>{errors.old}</p>}
                                </div>
                            </label>

                            <label className={cx('checkbox-label')}>
                                <Field type="checkbox" name="policy" value="yes" />
                                <div>
                                    <p className={cx('checkbox-description')}>
                                        I have read, understood and accepted the adidas Privacy Policy, the adiClub
                                        Terms and Conditions and Website Terms and Conditions.
                                    </p>
                                    {errors.policy && touched.policy && (
                                        <p className={cx('error-message')}>{errors.policy}</p>
                                    )}
                                </div>
                            </label>
                        </div>

                        <div id="radio-group" className={cx('form-title')}>
                            Picked
                        </div>
                        <div className={cx('radio-group')}>
                            <label>
                                <Field type="radio" name="picked" value="One" />
                                One
                            </label>
                            <label>
                                <Field type="radio" name="picked" value="Two" />
                                Two
                            </label>
                            {errors.picked && touched.picked && <p className={cx('error-message')}>{errors.picked}</p>}
                        </div>

                        <Button primary type="submit">
                            REGISTER
                        </Button>
                    </Form>
                );
            }}
        </Formik>
    );
}

export default RegisterForm;
