import React from "react";
import classnames from "classnames";
import Input, {IInputProps} from "./Input";
import {addUser} from "../backendQueries/queries";
import {User} from "../types/user";
import {getTodayDateInString} from "../utils/utils";

type fieldData = {
    value: string,
    isValid: boolean,
}

interface IFieldValues {
    name: fieldData,
    surname: fieldData,
    login: fieldData,
    dateOfBirth: fieldData,
    password: fieldData,
}

interface IAddUserRowProps {
    addUserToList: (user: User) => void
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
        isValid: true
    },
    {
        key: "surname",
        fieldName: "Surname",
        type: "text",
        form: FORM_NAME,
        isRequired: true,
        isDisabled: false,
        isValid: true
    },
    {
        key: "login",
        fieldName: "Login",
        type: "text",
        form: FORM_NAME,
        isRequired: true,
        isDisabled: false,
        isValid: true
    },
    {
        key: "dateOfBirth",
        fieldName: "Date of 'Birth",
        type: "date",
        form: FORM_NAME,
        isRequired: true,
        isDisabled: false,
        isValid: true
    },
    {
        key: "password",
        fieldName: "Password",
        type: "text",
        form: FORM_NAME,
        isRequired: true,
        isDisabled: false,
        isValid: true
    },


];

export default class AddUserRow extends React.Component<IAddUserRowProps, IAddUserRowState> {
    constructor(props: IAddUserRowProps) {
        super(props);
        this.state = {
            isDisabled: false,
            name: {
                value: "",
                isValid: true
            },
            surname: {
                value: "",
                isValid: true
            },
            login: {
                value: "",
                isValid: true
            },
            dateOfBirth: {
                value: getTodayDateInString(),
                isValid: true
            },
            password: {
                value: "",
                isValid: true
            },
        }
    }

    saveUser = async () => {
        if (this.formIsValid()) {
            const user: User = {
                name: this.state.name.value,
                surname: this.state.surname.value,
                login: this.state.login.value,
                dateOfBirth: this.state.dateOfBirth.value,
                passwordMd5: this.state.password.value,
                isDeleted: false

            }
            this.setState({
                isDisabled: true
            }, async () => {
                const response = await addUser(user);
                if (response.status === 200) {
                    this.props.addUserToList(response.data);
                    this.setState({
                        isDisabled: false
                    })
                }
            })
        }
    }

    formIsValid(): boolean {
        let validationWentThrough = true;
        for (const field of fields) {
            const {isRequired, key} = field;
            if (isRequired) {
                let tempState = {...this.state};
                if (!tempState[key].value) {
                    tempState[key].isValid = false;
                    validationWentThrough = false;
                } else {
                    tempState[key].isValid = true;
                }

                this.setState(tempState)
            }
        }


        return validationWentThrough;
    }

    renderInputFields() {
        return <>
            {
                fields.map(({key, isRequired, fieldName, type, form}) => {
                        return <td key={key}>
                            <Input
                                value={this.state[key].value}
                                onChange={(event) => {
                                    let stateTemp = {...this.state};
                                    stateTemp[key].value = event.target.value;
                                    this.setState({
                                        ...stateTemp
                                    })
                                }}
                                isRequired={isRequired}
                                fieldName={fieldName}
                                type={type} form={form}
                                isDisabled={this.state.isDisabled}
                                isValid={this.state[key].isValid}
                            />
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
                    onClick={() => this.saveUser()}
                    form={FORM_NAME} type="submit"
                    disabled={this.state.isDisabled}
                >
                    add
                </button>
            </td>

        </tr>
    }
}