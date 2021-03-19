import React from 'react';
import { FormField, Label } from 'semantic-ui-react';
import { useField } from 'formik';
const MytextArea = ({ label, ...props }) => {
	const [field, meta] = useField(props);
	return (
		<FormField error={meta.touched && !!meta.error}>
			<label>{label}</label>
			<textarea {...field} {...props} />
			{meta.touched && meta.error ? (
				<Label basic color='red' content={meta.error} />
			) : null}
		</FormField>
	);
};

export default MytextArea;
