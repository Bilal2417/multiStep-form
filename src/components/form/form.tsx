"use client";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./form.css";
import { useState } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from "yup";


interface FormData {
    fullName: string;
    email: string;
    password: string;
    company: string;
    address: string;
}

const FormPage: React.FC = () => {
    const [data, setData] = useState<FormData>({
        fullName: "",
        email: "",
        password: "",
        company: "",
        address: "",
    });

    const [currentStep, setCurrentStep] = useState<number>(0);

    const nextStep = (newData: Partial<FormData>) => {
        setData(prev => ({ ...prev, ...newData }));
        setCurrentStep(prev => prev + 1);
    };

    const prevStep = (newData: Partial<FormData>) => {
        setData(prev => ({ ...prev, ...newData }));
        setCurrentStep(prev => prev - 1);
    };

    const stepOneValidationSchema = Yup.object().shape({
        fullName: Yup.string().required("Name is required").label("Name"),
        email: Yup.string().email("Invalid email format").required("Email is required").label("Email"),
        password: Yup.string().required("Password is required").min(8, "Password must be at least 8 characters").label("Password"),
    });

    const StepOne: React.FC<{ next: (data: Partial<FormData>) => void; data: FormData; }> = ({ next, data }) => {
        return (
            <Formik
                validationSchema={stepOneValidationSchema}
                initialValues={data}
                onSubmit={next}
            >
                {() => (
                    <Form>
                        <div id="contact-form" className="form-container">
                            <div className="row">
                                <div className="form-title">
                                    <span>Sign Up</span>
                                </div>
                            </div>
                            <div className="input-container">
                                <div className="row">
                                    <Field name="fullName" placeholder="Full Name" className="form-control" />
                                    <ErrorMessage name='fullName' component="div" className="error-message" />
                                </div>
                                <div className="row">
                                    <Field type="email" name="email" placeholder="Email" className="form-control" />
                                    <ErrorMessage name='email' component="div" className="error-message" />
                                </div>
                                <div className="row">
                                    <Field type="password" name="password" placeholder="Password" className="form-control" />
                                    <ErrorMessage name='password' component="div" className="error-message" />
                                </div>
                                <div className="row submit-row">
                                    <button type="submit" className="btn btn-block submit-form">
                                        Next
                                    </button>
                                </div>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        );
    };

    const StepTwo: React.FC<{ next: (data: Partial<FormData>) => void; prev: (data: Partial<FormData>) => void; data: FormData; }> = ({ next, prev, data }) => {
        const stepTwoValidationSchema = Yup.object().shape({
            company: Yup.string().required("Company Name is required").label("Company Name"),
            address: Yup.string().required("Address is required").min(5, "Address must be at least 5 characters").label("Address"),
        });

        return (
            <Formik
                validationSchema={stepTwoValidationSchema}
                initialValues={data}
                onSubmit={next}
            >
                {() => (
                    <Form>
                        <div id="login-form" className="form-container">
                            <div className="row">
                                <div className="form-title">
                                    <span>Additional Information</span>
                                </div>
                            </div>
                            <div className="input-container">
                                <div className="row">
                                    <Field name="company" placeholder="Company" className="form-control" />
                                    <ErrorMessage name='company' component="div" className="error-message" />
                                </div>
                                <div className="row">
                                    <Field name="address" placeholder="Address" className="form-control" />
                                    <ErrorMessage name='address' component="div" className="error-message" />
                                </div>
                                <div className="row">
                                    <button type="button" onClick={() => prev(data)} className="create-account backButton">Back</button>
                                </div>
                                <div className="row submit-row">
                                    <button type="submit" className="btn btn-block submit-form">
                                        Submit
                                    </button>
                                </div>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        );
    };

    const StepThree: React.FC<{ prev: (data: Partial<FormData>) => void; data: FormData; }> = ({ prev, data }) => {
        return (
            <Formik
                initialValues={data}
                onSubmit={() => console.log("Submit", data)} // handle final submission here
            >
                {() => (
                    <Form>
                        <div id="login-form" className="form-container">
                            <div className="row">
                                <div className="form-title">
                                    <span>Your Data</span>
                                </div>
                            </div>
                            <div className="input-container">
                                <div className="row">
                                    <span>Name</span>
                                    <Field name="fullName" className="form-control" readOnly />
                                </div>
                                <div className="row">
                                    <span>Email</span>
                                    <Field name="email" className="form-control" readOnly />
                                </div>
                                <div className="row">
                                    <span>Password</span>
                                    <Field name="password" className="form-control" readOnly />
                                </div>
                                <div className="row">
                                    <span>Company</span>
                                    <Field name="company" className="form-control" readOnly />
                                </div>
                                <div className="row">
                                    <span>Address</span>
                                    <Field name="address" className="form-control" readOnly />
                                </div>
                                <div className="row">
                                    <button type="button" onClick={() => prev(data)} className="create-account backButton">Back</button>
                                </div>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        );
    };

    const steps = [
        <StepOne next={nextStep} data={data} />,
        <StepTwo next={nextStep} prev={prevStep} data={data} />,
        <StepThree prev={prevStep} data={data} />
    ];

    return (
        <div className="col-md-4">
            {steps[currentStep]}
        </div>
    );
};

export default FormPage;
