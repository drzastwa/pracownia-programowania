import React from "react";
import classnames from "classnames";
import Input, {IInputProps} from "./Input";

// import {getTodayDateInString} from "../utils/utils";

interface IAddUserRowProps {
}

interface IFieldValues {
    name: string,
    surname: string,
    login: string,
    dateOfBirth: string,
    password: string,
}

interface IAddUserRowState extends IFieldValues {
    isDisabled: boolean,
}


const FORM_NAME = "form1";

type field = {
    key: keyof IFieldValues;
}

const fields: (field & IInputProps)[] = [
    {
        key: "name",
        fieldName: "Name",
        type: "text",
        form: FORM_NAME,
        isRequired: true,
        isDisabled: false,
    },
    {
        key: "surname",
        fieldName: "Surname",
        type: "text",
        form: FORM_NAME,
        isRequired: true,
        isDisabled: false,
    },
    {
        key: "login",
        fieldName: "Login",
        type: "text",
        form: FORM_NAME,
        isRequired: true,
        isDisabled: false,
    },
    {
        key: "dateOfBirth",
        fieldName: "Date of 'Birth",
        type: "date",
        form: FORM_NAME,
        isRequired: false,
        isDisabled: false,
    },
    {
        key: "password",
        fieldName: "Password (MD5)",
        type: "text",
        form: FORM_NAME,
        isRequired: true,
        isDisabled: false,
    },


];

type fieldData = {
    value: string,
    valid: boolean,
}

export default class AddUserRow extends React.Component<IAddUserRowProps, IAddUserRowState> {
    constructor(props: IAddUserRowProps) {
        super(props);
        this.state = {
            isDisabled: false,
            name: "",
            surname: "",
            login: "",
            dateOfBirth: "",
            password: ""
        }
    }

    validateForm(): boolean {


        for (const field of fields) {
            const {isRequired, key, fieldName} = field;
            if (isRequired) {
                const inputErrorField = document.getElementById(fieldName + "error");

                if (inputErrorField) {
                    if (!this.state[key]) {
                        inputErrorField.style.visibility = "visible";
                    } else {
                        inputErrorField.style.visibility = "hidden";
                    }
                }
            }
        }


        return true;
    }


    renderInputFields() {
        return <>
            {
                fields.map(({key, isRequired, fieldName, type, form}) => {
                        return <td>
                            <Input
                                value={this.state[key]}
                                onChange={(event) => {
                                    let stateTemp = {...this.state};
                                    stateTemp[key] = event.target.value;
                                    console.log('state temp', stateTemp);
                                    this.setState({
                                        ...stateTemp
                                    })
                                }}
                                isRequired={isRequired}
                                fieldName={fieldName}
                                type={type} form={form}
                                isDisabled={this.state.isDisabled}/>
                        </td>
                    }
                )
            }
        </>

    }

    render() {
        return <tr className={classnames({
            "addUserRow": true,
            "disabledAddUserRow": this.state.isDisabled
        })}>

            <td>
                <b>Automatically Generated </b>
            </td>

            {this.renderInputFields()}

            <td>
                <button
                    onClick={() => this.validateForm()}
                    form={FORM_NAME} type="submit"
                    disabled={this.state.isDisabled}
                >
                    add
                </button>
            </td>

        </tr>
    }
}