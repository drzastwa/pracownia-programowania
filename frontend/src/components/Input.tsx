import React from "react";

export interface IInputProps {
    fieldName: string,
    type: string,
    form: string,
    isDisabled: boolean
    isRequired: boolean,
    value?: string
    onChange?: (event: any) => void
}

export default class Input extends React.Component<IInputProps, any> {
    constructor(props: IInputProps) {
        super(props);
    }

    render() {
        const {fieldName, type, form, isDisabled, isRequired} = this.props;
        return <div>
            <input required={isRequired}
                   type={type} id={fieldName}
                   form={form}
                   disabled={isDisabled}
                   value={this.props.value}
                   onChange={this.props.onChange}
            />
            <p
                style={{
                    color: 'red',
                    visibility: 'hidden'
                }}
                id={fieldName + "error"}
            >
                Field {this.props.fieldName} required!
            </p>
        </div>
    }
}