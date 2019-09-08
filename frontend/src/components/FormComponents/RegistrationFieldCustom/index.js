import React from 'react';

import { Input, Select } from 'antd';

import FormikField from '../FormikField';

const RegistrationFieldCustom = React.memo(({ section, question }) => {
    const name = `${section.name}.${question.name}`;
    const renderInputForField = ({ field, form }) => {
        switch (question.fieldType) {
            case 'text': {
                return <Input {...field} />;
            }
            case 'textarea': {
                return (
                    <Input.TextArea
                        autosize={{ minRows: 10, maxRows: 20 }}
                        {...field}
                        placeholder="Max 1000 characters"
                    />
                );
            }
            case 'single-choice': {
                return (
                    <Select
                        style={{ width: '100%' }}
                        placeholder="Choose one"
                        onChange={value => form.setFieldValue(name, value)}
                    >
                        {question.settings.options.map(option => (
                            <Select.Option key={option}>{option}</Select.Option>
                        ))}
                    </Select>
                );
            }
            case 'multiple-choice': {
                return (
                    <Select
                        style={{ width: '100%' }}
                        placeholder="Choose as many as you like"
                        onChange={value => form.setFieldValue(name, value)}
                        mode="multiple"
                    >
                        {question.settings.options.map(option => (
                            <Select.Option key={option}>{option}</Select.Option>
                        ))}
                    </Select>
                );
            }
            case 'checkbox': {
                return <span>CHECKBOX</span>;
            }
            case 'boolean': {
                return <span>BOOLEAN</span>;
            }
            default:
                return null;
        }
    };

    const renderValueForField = value => {
        return '';
    };

    return (
        <FormikField
            name={name}
            label={question.label}
            hint={question.hint}
            hintMarkdown={true}
            isFast={true}
            required={question.fieldRequired}
            validate={() => {}}
            alwaysFocused={false}
            render={renderInputForField}
            renderValue={renderValueForField}
        />
    );
});

export default RegistrationFieldCustom;