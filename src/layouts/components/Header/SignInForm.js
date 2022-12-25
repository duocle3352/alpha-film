import classNames from 'classnames/bind';
import { Formik, Form, FastField } from 'formik';
import * as Yup from 'yup';

import InputField from '~/custom-field/InputField';
import { Button } from '~/components/Button';
import { Link } from 'react-router-dom';
import config from '~/config';
import style from './Header.module.scss';

const cx = classNames.bind(style);

function SignInForm() {
    const initialValues = {
        email: '',
        password: '',
    };

    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Please enter a valid e-mail address.').required('This field is request.'),

        password: Yup.string()
            .matches(
                '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$',
                'Minimum 8 characters with at least one uppercase, one lowercase, one special character and a number.',
            )
            .required('This field is request.'),
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
                // eslint-disable-next-line no-unused-vars
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

                        <Link className={cx('forgot-password')} to={config.routes.home}>
                            Forgotten Your Password?
                        </Link>

                        <Button primary type="submit">
                            SIN IN
                        </Button>
                    </Form>
                );
            }}
        </Formik>
    );
}

export default SignInForm;
