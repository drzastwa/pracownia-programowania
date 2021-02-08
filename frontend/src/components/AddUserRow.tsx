import React from "react";
import classnames from "classnames";
import Input from "./Input";

interface IAddUserRowProps {
}

interface IAddUserRowState {
    isDisabled: boolean
}

const FORM_NAME = "form1";

export default class AddUserRow extends React.Component<IAddUserRowProps, IAddUserRowState> {
    constructor(props: IAddUserRowProps) {
        super(props);
        this.state = {
            isDisabled: false
        }

    }

    getTodayDate(): string {
        const curr = new Date();
        curr.setDate(curr.getDate());
        return curr.toISOString().substr(0, 10);
    }


    render() {
        return <tr className={classnames({
            "addUserRow": true,
            "disabledAddUserRow": this.state.isDisabled
        })}>

            <td>
                <b>Automatically Generated </b>
            </td>
            <td>
                <Input fieldName={"Name"} type={"text"} form={FORM_NAME} isDisabled={this.state.isDisabled}/>
            </td>
            <td>
                <Input fieldName={"Surname"} type={"text"} form={FORM_NAME} isDisabled={this.state.isDisabled}/>
            </td>
            <td>
                <Input fieldName={"Login"} type={"text"} form={FORM_NAME} isDisabled={this.state.isDisabled}/>
            </td>
            <td>
                <Input fieldName={"Date of Birth"} type={"date"} form={FORM_NAME} isDisabled={this.state.isDisabled} value={this.getTodayDate()}/>
            </td>
            <td>
                <Input fieldName={"Password"} type={"text"} form={FORM_NAME} isDisabled={this.state.isDisabled}/>
            </td>

            <td>
                <button form="form1" type="submit" disabled={this.state.isDisabled}>
                    add
                </button>
            </td>

        </tr>
    }
}