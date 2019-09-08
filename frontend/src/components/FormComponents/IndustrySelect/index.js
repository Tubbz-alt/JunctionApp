import React, { useCallback, useEffect } from 'react';
import './style.scss';

import { Select } from 'antd';
import { Industries } from '@hackjunction/shared';

const { Option } = Select;

const options = Industries.industries.map(industry => <Option key={industry}>{industry}</Option>);

const IndustrySelect = React.memo(
    ({
        value,
        name,
        setFieldValue,
        setFieldTouched,
        validateField,
        touched,
        placeholder = 'Choose as many as you like'
    }) => {
        useEffect(() => {
            if (!touched) return;
            validateField(name);
        }, [name, touched, validateField, value]);

        const onChange = useCallback(
            value => {
                setFieldValue(name, value);
                setFieldTouched(name);
            },
            [name, setFieldTouched, setFieldValue]
        );

        return (
            <Select
                style={{ width: '100%' }}
                value={value}
                onChange={onChange}
                size="large"
                placeholder={placeholder}
                showSearch
                mode="multiple"
            >
                {options}
            </Select>
        );
    }
);

export default IndustrySelect;