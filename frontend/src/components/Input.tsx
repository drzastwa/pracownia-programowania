import React from "react";

interface IInputProps {
    fieldName: string,
    type: string,
    form: string,
    isDisabled: boolean
    value?: string
}

export default class Input extends React.Component<IInputProps, any> {
    constructor(props: IInputProps) {
        super(props);
    }

    render() {
        const {fieldName, type, form, isDisabled} = this.props;
        return <div>
            <input type={type} id={fieldName} form={form} disabled={isDisabled} value={this.props.value}/>
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