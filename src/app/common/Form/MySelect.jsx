import React from 'react';
import { FormField, Label, Select } from 'semantic-ui-react';
import { useField } from 'formik';
const MySelect = ({ label, ...props }) => {
	const [field, meta, helpers] = useField(props);
	return (
		<FormField error={meta.touched && !!meta.error}>
			<label>{label}</label>
			<Select
				clearable
				value={field.value || null}
				onChange={(event, data) => {
					helpers.setValue(data.value);
				}}
				onBlur={() => {
					helpers.setTouched(true);
				}}
				{...props}
			/>
			{meta.touched && meta.error ? (
				<Label basic color='red' content={meta.error} />
			) : null}
		</FormField>
	);
};

export default MySelect;
